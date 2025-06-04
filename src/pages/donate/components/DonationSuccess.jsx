// src/pages/donate/components/DonationSuccess.jsx
import React from 'react';
import Header from '../../../components/common/Header';
import Footer from '../../../components/common/Footer';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import { Link } from 'react-router-dom';

const DonationSuccess = ({ donationData, onClose }) => {
  const generateReceiptId = () => {
    return 'HKVC' + Date.now().toString().slice(-8);
  };

  return (
    <div className="min-h-screen bg-neutral-background">
      <Header />
      
      <main className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-12">
            <div className="text-8xl mb-6">🎉</div>
            <h1 className="text-4xl sm:text-5xl font-bold text-neutral-dark mb-4">
              Thank You for Your <span className="text-accent-yellow">Kindness!</span>
            </h1>
            <p className="text-xl text-text-muted max-w-2xl mx-auto">
              Your donation has been processed successfully. You're making a real difference in someone's life.
            </p>
          </div>

          {/* Donation Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Receipt Card */}
            <Card variant="default" className="p-8">
              <h2 className="text-2xl font-bold text-neutral-dark mb-6">Donation Receipt</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between py-2 border-b border-border-light">
                  <span className="text-text-muted">Receipt ID:</span>
                  <span className="font-medium text-neutral-dark">{generateReceiptId()}</span>
                </div>
                
                <div className="flex justify-between py-2 border-b border-border-light">
                  <span className="text-text-muted">Donor Name:</span>
                  <span className="font-medium text-neutral-dark">
                    {donationData.anonymous ? 'Anonymous' : donationData.name}
                  </span>
                </div>
                
                <div className="flex justify-between py-2 border-b border-border-light">
                  <span className="text-text-muted">Cause:</span>
                  <span className="font-medium text-neutral-dark">{donationData.cause.title}</span>
                </div>
                
                <div className="flex justify-between py-2 border-b border-border-light">
                  <span className="text-text-muted">Amount:</span>
                  <span className="font-bold text-xl text-accent-yellow">
                    ₹{donationData.amount.toLocaleString()}
                  </span>
                </div>
                
                <div className="flex justify-between py-2 border-b border-border-light">
                  <span className="text-text-muted">Date:</span>
                  <span className="font-medium text-neutral-dark">
                    {new Date(donationData.timestamp).toLocaleDateString()}
                  </span>
                </div>
                
                <div className="flex justify-between py-2">
                  <span className="text-text-muted">Status:</span>
                  <span className="font-medium text-green-600">✓ Confirmed</span>
                </div>
              </div>
              
              <div className="mt-6">
                <Button 
                  variant="outline" 
                  size="medium"
                  className="w-full rounded-[20px]"
                >
                  Download Receipt
                </Button>
              </div>
            </Card>

            {/* Impact Preview */}
            <Card variant="primary" className="p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Your Impact</h2>
              
              <div className="bg-white bg-opacity-20 rounded-xl p-6 mb-6">
                <img 
                  src={donationData.cause.image} 
                  alt={donationData.cause.title}
                  className="w-full h-32 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold text-white text-center">
                  {donationData.cause.title}
                </h3>
              </div>
              
              <div className="text-center">
                <div className="text-4xl mb-4">💝</div>
                <p className="text-white text-lg mb-6">
                  Your ₹{donationData.amount.toLocaleString()} donation will help provide {donationData.cause.impact[donationData.amount] || `essential support to those in need`}.
                </p>
                
                <div className="bg-white bg-opacity-10 rounded-xl p-4">
                  <h4 className="text-white font-medium mb-2">What happens next?</h4>
                  <ul className="text-white text-sm space-y-1 text-left">
                    <li>• We'll process your donation immediately</li>
                    <li>• You'll receive email updates on impact</li>
                    <li>• Tax receipt will be sent within 24 hours</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="primary" 
              size="large"
              className="px-8 py-4 text-lg rounded-[25px] shadow-custom-blue"
            >
              Donate Again
            </Button>
            
            <Link to="/">
              <Button 
                variant="outline" 
                size="large"
                className="px-8 py-4 text-lg rounded-[25px] w-full sm:w-auto"
              >
                Return Home
              </Button>
            </Link>
            
            <Button 
              variant="outline" 
              size="large"
              className="px-8 py-4 text-lg rounded-[25px]"
            >
              Share Impact
            </Button>
          </div>

          {/* Social Sharing */}
          <div className="text-center mt-12">
            <h3 className="text-xl font-semibold text-neutral-dark mb-6">
              Share Your Good Deed
            </h3>
            
            <div className="flex justify-center space-x-4">
              {[
                { name: 'Facebook', icon: '/assets/img_facebook.svg' },
                { name: 'Twitter', icon: '/assets/img_x.svg' },
                { name: 'LinkedIn', icon: '/assets/img_linkedin.svg' },
                { name: 'WhatsApp', icon: '/assets/img_phone.svg' }
              ].map((social, index) => (
                <button
                  key={index}
                  className="w-12 h-12 bg-gradient-light rounded-full flex items-center justify-center hover:bg-accent-yellow hover:bg-opacity-20 transition-colors duration-300"
                  aria-label={`Share on ${social.name}`}
                >
                  <img src={social.icon} alt={social.name} className="w-6 h-6" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DonationSuccess;