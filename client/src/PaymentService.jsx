const initiateRazorpayPayment = async (orderData, onSuccess, onError) => {
  // Actual Razorpay Logic (Commented out for testing)
  /*
  // Load Razorpay script dynamically
  const script = document.createElement('script');
  script.src = 'https://checkout.razorpay.com/v1/checkout.js';
  script.async = true;
  script.onload = () => {
    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID, // Razorpay key_id (store in .env)
      amount: orderData.amount, // Amount in paise
      currency: 'INR',
      name: 'Hare Krishna Vidya',
      description: 'Donation Payment',
      order_id: orderData.orderId, // Razorpay order ID from backend
      handler: (response) => {
        // On successful payment, call the onSuccess callback
        onSuccess(response);
      },
      prefill: {
        name: orderData.donorName,
        email: orderData.email,
        contact: orderData.phone,
      },
      theme: {
        color: '#F97316', // Match your theme
      },
      modal: {
        ondismiss: () => {
          onError('Payment modal closed');
        },
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.on('payment.failed', (response) => {
      onError(response.error.description);
    });
    razorpay.open();
  };
  script.onerror = () => {
    onError('Failed to load Razorpay SDK');
  };
  document.body.appendChild(script);
  */

  // Mock Logic: Simulate a successful Razorpay payment
  setTimeout(() => {
    const mockResponse = {
      razorpay_payment_id: `pay_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      razorpay_order_id: orderData.orderId,
      razorpay_signature: 'mock-signature', // Not used in mock verification
    };
    console.log('Mock Razorpay Payment Successful:', mockResponse);
    onSuccess(mockResponse); // Call the success callback with mock response
  }, 1000); // Simulate a 1-second delay for payment processing
};

export { initiateRazorpayPayment };