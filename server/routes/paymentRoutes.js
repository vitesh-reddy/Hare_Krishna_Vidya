import express from 'express';
import { createOrder, verifyPaymentSignature } from '../services/paymentService.js';
import { saveCampaignDonation, saveDonation } from '../services/donationService.js';

const router = express.Router();

// Route to create a Razorpay order
router.post('/create-order', async (req, res) => {
  try {
    const { amount, currency, donationType } = req.body;
    if (!amount || !donationType) {
      return res.status(400).json({ error: 'Amount and donation type are required' });
    }

    const order = await createOrder(amount, currency, donationType);
    res.status(200).json({ orderId: order.orderId });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: error.message });
  }
});

// Route to verify payment and store donation
router.post('/verify-payment', async (req, res) => {
  try {
    const { orderId, paymentId, signature, donationData, campaignId = null } = req.body;

    // Validate required fields
    if (!orderId || !paymentId || !signature || !donationData) {
      return res.status(400).json({ error: 'Order ID, payment ID, signature, and donation data are required' });
    }

    // Verify the payment signature
    const isValidSignature = verifyPaymentSignature(orderId, paymentId, signature);
    if (!isValidSignature) {
      return res.status(400).json({ error: 'Invalid payment signature' });
    }

    if (campaignId) {
      await saveCampaignDonation(campaignId, donationData)
    } else {
      const savedDonation = await saveDonation(donationData);

      if (!savedDonation) {
        return res.status(200).json({
          message: "Donation already processed"
        });
      }
    }

    res.status(200).json({ message: 'Payment verified and donation saved successfully' });
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;