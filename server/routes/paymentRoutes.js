import express from 'express';
import rateLimitMiddleware from '../middlewares/rateLimitMiddleware.js';
import { protectAdmin } from '../middlewares/authMiddleware.js';
import { createStripeCheckoutSession, getStripeSessionAndDonation, refundDonation } from '../services/stripeService.js';

const router = express.Router();

router.post('/stripe/create-checkout-session', rateLimitMiddleware, async (req, res) => {
  try {
    const { donationType, donatedFor = null, items = [], amount, donorInfo } = req.body;

    if (!donationType || !donorInfo) {
      return res.status(400).json({ error: 'donationType and donorInfo are required' });
    }

    const baseClientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
    const successUrl = `${baseClientUrl}/donation-success?session_id={CHECKOUT_SESSION_ID}`;

    const cancelUrl = donationType === 'items'
      ? `${baseClientUrl}/cart?paymentCancelled=true`
      : `${baseClientUrl}/donate-amount?paymentCancelled=true`;

    const { sessionUrl } = await createStripeCheckoutSession({
      donationType,
      donatedFor,
      items,
      amount,
      donorInfo,
      successUrl,
      cancelUrl,
    });

    return res.status(200).json({ url: sessionUrl });
  } catch (error) {
    console.error('Error creating Stripe Checkout session:', error);
    return res.status(500).json({ error: error.message || 'Failed to create Stripe Checkout session' });
  }
});

router.get('/stripe/session/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { session, donation } = await getStripeSessionAndDonation(id);

    if (!donation) {
      return res.status(404).json({ error: 'Donation not found for this session' });
    }

    return res.status(200).json({
      status: donation.status,
      donation: {
        id: donation._id,
        donationType: donation.donationType,
        donatedFor: donation.donatedFor,
        items: donation.items,
        amount: donation.amount,
        currency: donation.currency,
        donorInfo: donation.donorInfo,
        stripePaymentIntentId: donation.stripePaymentIntentId,
      },
      session: {
        id: session.id,
        payment_status: session.payment_status,
      },
    });
  } catch (error) {
    console.error('Error fetching Stripe session/donation:', error);
    return res.status(500).json({ error: error.message || 'Failed to fetch Stripe session' });
  }
});

router.post('/stripe/refund/:id', protectAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const adminId = req.user?._id?.toString() || 'unknown_admin';

    const refund = await refundDonation({ donationId: id, adminId });

    return res.status(200).json({
      message: 'Donation refunded successfully',
      refundId: refund.id,
      status: refund.status,
    });
  } catch (error) {
    const message = error.message || 'Failed to refund donation';

    if (
      message === 'Donation not found' ||
      message === 'Only succeeded donations can be refunded' ||
      message === 'Donation has already been refunded' ||
      message === 'Donation is missing Stripe payment intent id'
    ) {
      return res.status(400).json({ error: message });
    }

    console.error('Error processing refund:', error);
    return res.status(500).json({ error: 'Failed to refund donation' });
  }
});

export default router;