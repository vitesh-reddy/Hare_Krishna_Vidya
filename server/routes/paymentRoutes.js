import express from 'express';
import rateLimitMiddleware from '../middlewares/rateLimitMiddleware.js';
import { createStripeCheckoutSession, getStripeSessionAndDonation } from '../services/stripeService.js';

const router = express.Router();

// Stripe Checkout session creation for both amount and items donations
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

// Endpoint used by the donation success page to hydrate UI from server state
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

export default router;