import Razorpay from 'razorpay';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

// Comment out actual Razorpay instance for testing
const createOrder = async (amount, currency, donationType) => {
  try {
    // Actual Razorpay Logic (Commented out for testing)
    /*
    const options = {
      amount: amount, // Amount in paise
      currency: currency || 'INR',
      receipt: `donation_${donationType}_${Date.now()}`,
    };
    const order = await razorpay.orders.create(options);
    return { orderId: order.id };
    */

    // Mock Logic: Simulate Razorpay order creation
    const mockOrderId = `order_${donationType}_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    return { orderId: mockOrderId };
  } catch (error) {
    throw new Error('Failed to create Razorpay order: ' + error.message);
  }
};

const verifyPaymentSignature = (orderId, paymentId, signature) => {
  // Actual Razorpay Logic (Commented out for testing)
  /*
  const generatedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(`${orderId}|${paymentId}`)
    .digest('hex');
  return generatedSignature === signature;
  */

  // Mock Logic: Always return true for testing
  return true;
};

export { createOrder, verifyPaymentSignature };