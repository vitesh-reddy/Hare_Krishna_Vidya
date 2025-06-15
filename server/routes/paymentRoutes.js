import express from 'express';
import { createOrder, verifyPaymentSignature } from '../services/paymentService.js';
import { saveDonation } from '../services/donationService.js';

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
    res.status(500).json({ error: error.message });
  }
});

// Route to verify payment and store donation
router.post('/verify-payment', async (req, res) => {
  try {
    const { orderId, paymentId, signature, donationData } = req.body;

    // Verify the payment signature
    const isValidSignature = verifyPaymentSignature(orderId, paymentId, signature);
    if (!isValidSignature) {
      return res.status(400).json({ error: 'Invalid payment signature' });
    }

    // Save the donation to the database using donationService
    await saveDonation(donationData);

    res.status(200).json({ message: 'Payment verified and donation saved successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;