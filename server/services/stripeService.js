import Stripe from 'stripe';
import crypto from 'crypto';
import Donation from '../models/Donations.js';
import Kit from '../models/Kit.js';
import GroceryItem from '../models/GroceryItem.js';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
if (!stripeSecretKey)
  console.warn('STRIPE_SECRET_KEY is not set. Stripe payments will not work until configured.');

const stripe = stripeSecretKey ? new Stripe(stripeSecretKey, { apiVersion: '2024-06-20' }) : null;

const createIdempotencyKey = () => crypto.randomUUID();

export const createStripeCheckoutSession = async ({ donationType, donatedFor = null, items = [], amount, donorInfo, successUrl, cancelUrl }) => {
  if (!stripe)
    throw new Error('Stripe is not configured');

  if (!amount || amount <= 0)
    if (donationType === 'amount')
      throw new Error('Invalid donation amount');

  const idempotencyKey = createIdempotencyKey();

  let finalAmount = 0;
  let normalizedItems = [];

  if (donationType === 'items') {
    const normalized = [];
    for (const item of items) {
      if (!item.itemId || !item.itemType) {
        throw new Error('Each item must include itemId and itemType');
      }

      const quantity = item.quantity && item.quantity > 0 ? item.quantity : 1;
      let unitPrice = 0;
      let name = '';

      if (item.itemType === 'Kit') {
        const kit = await Kit.findById(item.itemId).lean();
        if (!kit || kit.active === false) {
          throw new Error('Invalid or inactive kit in donation');
        }
        unitPrice = kit.price;
        name = kit.name;
      } else if (item.itemType === 'GroceryItem') {
        const grocery = await GroceryItem.findById(item.itemId).lean();
        if (!grocery || grocery.active === false) {
          throw new Error('Invalid or inactive grocery item in donation');
        }
        unitPrice = grocery.price;
        name = grocery.name;
      } else {
        throw new Error('Unsupported itemType in donation');
      }

      finalAmount += unitPrice * quantity;
      normalized.push({
        itemId: item.itemId,
        itemType: item.itemType,
        itemName: name,
        quantity,
        price: unitPrice,
      });
    }

    if (finalAmount <= 0) {
      throw new Error('Computed donation amount must be greater than zero');
    }

    normalizedItems = normalized;
  } else {
    finalAmount = amount;
    normalizedItems = [];
  }

  const donation = new Donation({
    donorInfo,
    donationType,
    donatedFor,
    items: normalizedItems,
    amount: finalAmount,
    currency: 'INR',
    paymentProvider: 'stripe',
    status: 'pending',
    statusHistory: [
      {
        status: 'pending',
        source: 'api:create-checkout-session',
      },
    ],
    idempotencyKey,
  });

  await donation.save();

  const lineItems =
    donationType === 'items'
      ? normalizedItems.map((item) => ({
          price_data: {
            currency: 'inr',
            product_data: {
              name: item.itemName,
            },
            unit_amount: Math.round(item.price * 100),
          },
          quantity: item.quantity || 1,
        }))
      : [
          {
            price_data: {
              currency: 'inr',
              product_data: {
                name: donatedFor ? `Donation - ${donatedFor}` : 'Donation',
              },
              unit_amount: Math.round(finalAmount * 100),
            },
            quantity: 1,
          },
        ];

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    line_items: lineItems,
    success_url: successUrl,
    cancel_url: cancelUrl,
    currency: 'inr',
    customer_email: donorInfo.email,
    metadata: {
      donationId: donation._id.toString(),
      donationType,
      donatedFor: donatedFor || '',
    },
  });

  donation.stripeCheckoutSessionId = session.id;
  if (session.payment_intent) {
    donation.stripePaymentIntentId = typeof session.payment_intent === 'string'
      ? session.payment_intent
      : session.payment_intent.id;
  }

  await donation.save();

  return { sessionUrl: session.url, sessionId: session.id, donationId: donation._id.toString() };
};

export const handleStripeWebhook = async (request, signature, webhookSecret) => {
  if (!stripe) {
    throw new Error('Stripe is not configured');
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, signature, webhookSecret);
  } catch (err) {
    const error = /** @type {Error} */ (err);
    throw new Error(`Webhook signature verification failed: ${error.message}`);
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = /** @type {import('stripe').Stripe.Checkout.Session} */ (event.data.object);
      const donationId = session.metadata?.donationId;
      if (!donationId) return;

      const donation = await Donation.findById(donationId);
      if (!donation) return;

      if (donation.status === 'succeeded' || donation.status === 'failed') {
        return;
      }

      donation.statusHistory.push({
        status: 'succeeded',
        source: 'webhook:checkout.session.completed',
      });
      donation.status = 'succeeded';

      if (session.payment_intent) {
        donation.stripePaymentIntentId = typeof session.payment_intent === 'string'
          ? session.payment_intent
          : session.payment_intent.id;
      }

      await donation.save();
      break;
    }
    case 'checkout.session.expired': {
      const session = /** @type {import('stripe').Stripe.Checkout.Session} */ (event.data.object);
      const donationId = session.metadata?.donationId;
      if (!donationId) return;

      const donation = await Donation.findById(donationId);
      if (!donation) return;

      if (donation.status === 'succeeded' || donation.status === 'failed') {
        return;
      }

      donation.statusHistory.push({
        status: 'failed',
        source: 'webhook:checkout.session.expired',
        reason: 'session_expired',
      });
      donation.status = 'failed';
      await donation.save();
      break;
    }
    default:
      break;
  }
};

export const getStripeSessionAndDonation = async (sessionId) => {
  if (!stripe) {
    throw new Error('Stripe is not configured');
  }

  const session = await stripe.checkout.sessions.retrieve(sessionId);
  const donationId = session.metadata?.donationId;
  if (!donationId) {
    return { session, donation: null };
  }

  const donation = await Donation.findById(donationId).lean();
  if (!donation) {
    return { session, donation: null };
  }

  return { session, donation };
};

export const refundDonation = async ({ donationId, adminId }) => {
  if (!stripe) {
    throw new Error('Stripe is not configured');
  }

  const donation = await Donation.findById(donationId);
  if (!donation) {
    throw new Error('Donation not found');
  }

  if (donation.status !== 'succeeded') {
    throw new Error('Only succeeded donations can be refunded');
  }

  if (donation.refundHistory && donation.refundHistory.length > 0) {
    throw new Error('Donation has already been refunded');
  }

  if (!donation.stripePaymentIntentId) {
    throw new Error('Donation is missing Stripe payment intent id');
  }

  const refund = await stripe.refunds.create({
    payment_intent: donation.stripePaymentIntentId,
  });

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

  donation.status = 'refunded';
  await donation.save();

  return refund;
};
