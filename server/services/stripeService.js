import Stripe from 'stripe';
import crypto from 'crypto';
import Donation from '../models/Donations.js';
import Kit from '../models/Kit.js';
import GroceryItem from '../models/GroceryItem.js';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey)
  console.warn('STRIPE_SECRET_KEY is not set. Stripe payments will not work until configured.');

const stripe = stripeSecretKey ? new Stripe(stripeSecretKey, { apiVersion: '2024-06-20' }) : null;

const reuseExistingDonationIfAny = async (idempotencyKey) => {
  const existingDonation = await Donation.findOne({ idempotencyKey, status: 'pending' }).lean();
  if (!existingDonation?.stripeCheckoutSessionId) return null;

  const session = await stripe.checkout.sessions.retrieve(existingDonation.stripeCheckoutSessionId);
  return { sessionUrl: session.url, sessionId: session.id, donationId: existingDonation._id.toString() };
};

const normalizeItemsAndComputeAmount = async ({ donationType, items, amount }) => {
  if (donationType !== 'items')
    return { finalAmount: amount, normalizedItems: [] };

  let finalAmount = 0;
  const normalizedItems = [];

  for (const item of items) {
    if (!item.itemId || !item.itemType)
      throw new Error('Each item must include itemId and itemType');

    const quantity = item.quantity > 0 ? item.quantity : 1;
    let entity;

    if (item.itemType === 'Kit') 
      entity = await Kit.findById(item.itemId).lean();
    else if (item.itemType === 'GroceryItem') 
      entity = await GroceryItem.findById(item.itemId).lean();
    else 
      throw new Error('Unsupported itemType in donation');

    if (!entity || entity.active === false)
      throw new Error('Invalid or inactive item in donation');

    finalAmount += entity.price * quantity;
    normalizedItems.push({
      itemId: item.itemId, itemType: item.itemType,
      itemName: entity.name, quantity, price: entity.price,
    });
  }

  if (finalAmount <= 0)
    throw new Error('Computed donation amount must be greater than zero');

  return { finalAmount, normalizedItems };
};

const persistPendingDonation = async (payload) => {
  try {
    const donation = new Donation(payload);
    await donation.save();
    return donation;
  } catch (error) {
    if (error.code === 11000 || error.code === 11001) {
      const existingDonation = await Donation.findOne({ idempotencyKey: payload.idempotencyKey }).lean();
      if (existingDonation?.stripeCheckoutSessionId) {
        const session = await stripe.checkout.sessions.retrieve(existingDonation.stripeCheckoutSessionId);
        return {
          reused: true,
          response: { sessionUrl: session.url, sessionId: session.id, donationId: existingDonation._id.toString() },
        };
      }
    }
    throw error;
  }
};

const buildLineItems = ({ donationType, items, amount, donatedFor }) => {
  if (donationType === 'items') {
    return items.map((item) => ({
      price_data: {
        currency: 'inr',
        product_data: { name: item.itemName },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));
  }

  return [{
    price_data: {
      currency: 'inr',
      product_data: { name: donatedFor ? `Donation - ${donatedFor}` : 'Donation' },
      unit_amount: Math.round(amount * 100),
    },
    quantity: 1,
  }];
};

const handleSucceedEvent = async (session) => {
  const donationId = session.metadata?.donationId;
  if (!donationId) return;

  const donation = await Donation.findById(donationId);
  if (!donation || ['succeeded', 'failed'].includes(donation.status)) return;

  donation.status = 'succeeded';
  donation.statusHistory.push({ status: 'succeeded', source: 'webhook:checkout.session.completed' });

  if (session.payment_intent)
    donation.stripePaymentIntentId =
      typeof session.payment_intent === 'string' ? session.payment_intent : session.payment_intent.id;

  await donation.save();
};

const handleFailedEvent = async (session) => {
  const donationId = session.metadata?.donationId;
  if (!donationId) return;

  const donation = await Donation.findById(donationId);
  if (!donation || ['succeeded', 'failed'].includes(donation.status)) return;

  donation.status = 'failed';
  donation.statusHistory.push({
    status: 'failed',
    source: 'webhook:checkout.session.expired',
    reason: 'session_expired',
  });

  await donation.save();
};

export const createStripeCheckoutSession = async ({
  donationType, donatedFor = null, items = [], amount,
  donorInfo, successUrl, cancelUrl, idempotencyKey: requestIdempotencyKey,
}) => {
  if (!stripe) throw new Error('Stripe is not configured');
  if (donationType === 'amount' && (!amount || amount <= 0))
    throw new Error('Invalid donation amount');

  const idempotencyKey = requestIdempotencyKey || crypto.randomUUID();

  if (requestIdempotencyKey) {
    const reused = await reuseExistingDonationIfAny(idempotencyKey);
    if (reused) return reused;
  }

  const { finalAmount, normalizedItems } =
    await normalizeItemsAndComputeAmount({ donationType, items, amount });

  const persisted = await persistPendingDonation({
    donorInfo, donationType, donatedFor,
    items: normalizedItems, amount: finalAmount,
    currency: 'INR', paymentProvider: 'stripe',
    status: 'pending',
    statusHistory: [{ status: 'pending', source: 'api:create-checkout-session' }],
    idempotencyKey,
  });

  if (persisted.reused) return persisted.response;

  const donation = persisted;
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    line_items: buildLineItems({ donationType, items: normalizedItems, amount: finalAmount, donatedFor }),
    success_url: successUrl,
    cancel_url: cancelUrl,
    currency: 'inr',
    customer_email: donorInfo.email,
    metadata: { donationId: donation._id.toString(), donationType, donatedFor: donatedFor || '' },
  });

  donation.stripeCheckoutSessionId = session.id;
  if (session.payment_intent)
    donation.stripePaymentIntentId =
      typeof session.payment_intent === 'string' ? session.payment_intent : session.payment_intent.id;

  await donation.save();
  return { sessionUrl: session.url, sessionId: session.id, donationId: donation._id.toString() };
};

export const handleStripeWebhook = async (request, signature, webhookSecret) => {
  if (!stripe) throw new Error('Stripe is not configured');

  let event;
  try {
    event = stripe.webhooks.constructEvent(request.body, signature, webhookSecret);
  } catch (err) {
    throw new Error(`Webhook signature verification failed: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed')
    await handleSucceedEvent(event.data.object);
  else if (event.type === 'checkout.session.expired')
    await handleFailedEvent(event.data.object);
};

export const getStripeSessionAndDonation = async (sessionId) => {
  if (!stripe) throw new Error('Stripe is not configured');

  const session = await stripe.checkout.sessions.retrieve(sessionId);
  const donationId = session.metadata?.donationId;
  if (!donationId) return { session, donation: null };

  const donation = await Donation.findById(donationId).lean();
  return { session, donation };
};

export const refundDonation = async ({ donationId, adminId }) => {
  if (!stripe) throw new Error('Stripe is not configured');

  const donation = await Donation.findById(donationId);
  if (!donation) 
    throw new Error('Donation not found');

  if (donation.status !== 'succeeded')
    throw new Error('Only succeeded donations can be refunded');
  if (donation.refundHistory?.length)
    throw new Error('Donation has already been refunded');
  if (!donation.stripePaymentIntentId)
    throw new Error('Donation is missing Stripe payment intent id');

  const refund = await stripe.refunds.create({ payment_intent: donation.stripePaymentIntentId });

  donation.status = 'refunded';
  donation.statusHistory.push({
    status: 'refunded',
    source: 'admin:refund',
    reason: 'full_refund',
  });

  donation.refundHistory = donation.refundHistory || [];
  donation.refundHistory.push({
    refundId: refund.id,
    refundedAt: new Date(),
    refundedBy: adminId,
  });

  await donation.save();
  return refund;
};