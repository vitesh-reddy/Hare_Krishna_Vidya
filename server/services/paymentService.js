import Razorpay from 'razorpay';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const createOrder = async (amount, currency, donationType) => {
  try {
    const options = {
      amount: amount, // Amount in paise
      currency: currency || 'INR',
      receipt: `donation_${donationType}_${Date.now()}`,
    };
    const order = await razorpay.orders.create(options);
    return { orderId: order.id };
  } catch (error) {
    throw new Error('Failed to create Razorpay order: ' + error.message);
  }
};

const verifyPaymentSignature = (orderId, paymentId, signature) => {
  const generatedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(`${orderId}|${paymentId}`)
    .digest('hex');

  return generatedSignature === signature;
};

export { createOrder, verifyPaymentSignature };