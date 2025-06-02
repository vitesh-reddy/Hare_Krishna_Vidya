// src/pages/donate/components/PaymentMethods.jsx
import React from 'react';
import Card from '../../../components/ui/Card';

const PaymentMethods = () => {
  const paymentMethods = [
    {
      name: 'Credit/Debit Cards',
      description: 'Visa, Mastercard, RuPay',
      icon: '/images/img_credit.png'
    },
    {
      name: 'UPI',
      description: 'PhonePe, GPay, Paytm',
      icon: '/images/img_phone.svg'
    },
    {
      name: 'Net Banking',
      description: 'All major banks',
      icon: '/images/img_settings.svg'
    },
    {
      name: 'Digital Wallets',
      description: 'PayPal, Amazon Pay',
      icon: '/images/img_mail.svg'
    }
  ];

  return (
    <Card variant="default" className="p-6">
      <h3 className="text-lg font-semibold text-neutral-dark mb-4">Accepted Payment Methods</h3>
      
      <div className="space-y-3">
        {paymentMethods.map((method, index) => (
          <div key={index} className="flex items-center space-x-3 p-3 bg-gradient-light rounded-lg">
            <div className="w-10 h-10 bg-accent-yellow bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0">
              <img src={method.icon} alt={method.name} className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-neutral-dark">{method.name}</h4>
              <p className="text-xs text-text-muted">{method.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-green-50 rounded-lg">
        <div className="flex items-center space-x-2">
          <div className="text-green-600">🔒</div>
          <div>
            <h4 className="text-sm font-medium text-green-800">Secure Payments</h4>
            <p className="text-xs text-green-600">256-bit SSL encryption</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PaymentMethods;