const initiateRazorpayPayment = async (orderData, onSuccess, onError) => {
  // Load Razorpay script dynamically
  const script = document.createElement('script');
  script.src = 'https://checkout.razorpay.com/v1/checkout.js';
  script.async = true;
  script.onload = () => {
    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID, // Razorpay key_id (store in .env)
      amount: orderData.amount, // Amount in paise
      currency: 'INR',
      name: 'Your Charity Name',
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
        color: '#F97316', // Customize to match your theme
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
};

export { initiateRazorpayPayment };