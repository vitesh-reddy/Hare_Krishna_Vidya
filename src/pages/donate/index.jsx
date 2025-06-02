// src/pages/donate/index.jsx
import React, { useState } from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import DonationForm from './components/DonationForm';
import DonationImpact from './components/DonationImpact';
import PaymentMethods from './components/PaymentMethods';
import DonationSuccess from './components/DonationSuccess';

const DonatePage = () => {
  const [selectedCause, setSelectedCause] = useState('annadaan');
  const [selectedAmount, setSelectedAmount] = useState(5000);
  const [showSuccess, setShowSuccess] = useState(false);
  const [donationData, setDonationData] = useState(null);

  const causes = [
    {
      id: 'annadaan',
      title: 'Annadaan',
      description: 'Provide freshly cooked, sanctified meals to those in need',
      icon: '/images/img_food_traced.svg',
      image: '/images/img_image_14.png',
      impact: {
        100: '1 meal for a child',
        500: '5 meals for a family',
        1000: '10 meals for children',
        5000: '50 meals for families'
      }
    },
    {
      id: 'education',
      title: 'Vidya Daan',
      description: 'Support education and spiritual learning for children',
      icon: '/images/img_settings.svg',
      image: '/images/img_image_15.png',
      impact: {
        100: 'School supplies for 1 child',
        500: 'Books for 5 students',
        1000: '1 month education support',
        5000: 'Educational materials for classroom'
      }
    },
    {
      id: 'sponsorship',
      title: 'Sponsor a Child',
      description: 'Complete care and education support for a child',
      icon: '/images/img_heart_traced.svg',
      image: '/images/img_image_16.png',
      impact: {
        100: 'Daily nutrition for 1 week',
        500: 'Healthcare checkup',
        1000: '1 month basic needs',
        5000: 'Complete monthly support'
      }
    }
  ];

  const amountOptions = [100, 500, 1000, 2000, 5000, 10000];

  const handleDonationSubmit = (formData) => {
    const donation = {
      ...formData,
      cause: causes.find(c => c.id === selectedCause),
      amount: selectedAmount,
      timestamp: new Date().toISOString()
    };
    
    setDonationData(donation);
    setShowSuccess(true);
  };

  if (showSuccess && donationData) {
    return (
      <DonationSuccess 
        donationData={donationData}
        onClose={() => {
          setShowSuccess(false);
          setDonationData(null);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-neutral-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="py-16 px-4 lg:py-24 bg-gradient-charity">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="bg-gradient-light rounded-[24px] p-4 shadow-custom-light inline-flex items-center space-x-3 mb-6">
                <img src="/images/img_heart_traced.svg" alt="Donate" className="w-5 h-5" />
                <span className="text-base font-semibold text-neutral-dark">Make a Donation</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-dark mb-6 leading-tight">
                Your <span className="text-accent-yellow">Kindness</span> Creates
                <br />Lasting Impact
              </h1>
              
              <p className="text-xl text-text-muted max-w-3xl mx-auto">
                Choose how you'd like to make a difference. Every contribution, no matter the size, creates meaningful change.
              </p>
            </div>
          </div>
        </section>

        {/* Donation Interface */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Cause Selection */}
              <div className="lg:col-span-2">
                <h2 className="text-3xl font-bold text-neutral-dark mb-8">Choose Your Cause</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                  {causes.map((cause) => (
                    <Card 
                      key={cause.id}
                      variant={selectedCause === cause.id ? 'primary' : 'default'}
                      className={`p-6 cursor-pointer transition-all duration-300 hover:shadow-custom-medium ${
                        selectedCause === cause.id ? 'border-2 border-accent-yellow' : 'border border-border-light'
                      }`}
                      onClick={() => setSelectedCause(cause.id)}
                    >
                      <div className="text-center">
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                          selectedCause === cause.id ? 'bg-white bg-opacity-20' : 'bg-accent-yellow bg-opacity-20'
                        }`}>
                          <img src={cause.icon} alt={cause.title} className="w-8 h-8" />
                        </div>
                        <h3 className={`text-xl font-semibold mb-2 ${
                          selectedCause === cause.id ? 'text-white' : 'text-neutral-dark'
                        }`}>
                          {cause.title}
                        </h3>
                        <p className={`text-sm ${
                          selectedCause === cause.id ? 'text-white text-opacity-90' : 'text-text-muted'
                        }`}>
                          {cause.description}
                        </p>
                      </div>
                    </Card>
                  ))}
                </div>

                {/* Amount Selection */}
                <h3 className="text-2xl font-bold text-neutral-dark mb-6">Choose Amount</h3>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                  {amountOptions.map((amount) => (
                    <Button
                      key={amount}
                      onClick={() => setSelectedAmount(amount)}
                      variant={selectedAmount === amount ? 'primary' : 'outline'}
                      className={`p-4 rounded-[20px] text-lg font-semibold ${
                        selectedAmount === amount ? 'shadow-custom-blue' : ''
                      }`}
                    >
                      ₹{amount.toLocaleString()}
                    </Button>
                  ))}
                </div>

                {/* Custom Amount */}
                <Card variant="gradient" className="p-6 mb-8">
                  <h4 className="text-lg font-semibold text-neutral-dark mb-4">Or enter custom amount</h4>
                  <div className="flex items-center space-x-4">
                    <span className="text-2xl font-bold text-neutral-dark">₹</span>
                    <input
                      type="number"
                      value={selectedAmount}
                      onChange={(e) => setSelectedAmount(Number(e.target.value))}
                      className="flex-1 px-4 py-3 border border-border-light rounded-[15px] focus:ring-2 focus:ring-accent-yellow focus:border-accent-yellow focus:outline-none text-lg font-semibold text-neutral-dark"
                      placeholder="Enter amount"
                      min="50"
                    />
                  </div>
                </Card>

                {/* Donation Form */}
                <DonationForm 
                  selectedCause={causes.find(c => c.id === selectedCause)}
                  selectedAmount={selectedAmount}
                  onSubmit={handleDonationSubmit}
                />
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Impact Preview */}
                <DonationImpact 
                  cause={causes.find(c => c.id === selectedCause)}
                  amount={selectedAmount}
                />
                
                {/* Payment Methods */}
                <PaymentMethods />
                
                {/* Trust Indicators */}
                <Card variant="gradient" className="p-6">
                  <h3 className="text-lg font-semibold text-neutral-dark mb-4">Why Donate With Us?</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-accent-yellow rounded-full"></div>
                      <span className="text-text-muted">100% secure payments</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-accent-yellow rounded-full"></div>
                      <span className="text-text-muted">Tax-deductible receipts</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-accent-yellow rounded-full"></div>
                      <span className="text-text-muted">Regular impact updates</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-accent-yellow rounded-full"></div>
                      <span className="text-text-muted">Transparent reporting</span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default DonatePage;