// src/pages/donate/components/DonationForm.jsx
import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Card from '../../../components/ui/Card';

const DonationForm = ({ selectedCause, selectedAmount, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    panNumber: '',
    anonymous: false,
    newsletter: true,
    receipt: true
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^[0-9]{10}$/.test(formData.phone.replace(/\s/g, ''))) newErrors.phone = 'Phone number must be 10 digits';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const inputClasses = "w-full px-4 py-3 border border-border-light rounded-[15px] focus:ring-2 focus:ring-accent-yellow focus:border-accent-yellow focus:outline-none transition-colors text-neutral-dark";
  const labelClasses = "block text-sm font-medium text-neutral-dark mb-2";

  return (
    <Card variant="default" className="p-8">
      <h3 className="text-2xl font-bold text-neutral-dark mb-6">Donor Information</h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className={labelClasses}>
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`${inputClasses} ${errors.name ? 'border-red-500' : ''}`}
              placeholder="Enter your full name"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
          
          <div>
            <label htmlFor="email" className={labelClasses}>
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`${inputClasses} ${errors.email ? 'border-red-500' : ''}`}
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="phone" className={labelClasses}>
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`${inputClasses} ${errors.phone ? 'border-red-500' : ''}`}
              placeholder="Enter your phone number"
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>
          
          <div>
            <label htmlFor="panNumber" className={labelClasses}>
              PAN Number (for tax receipts)
            </label>
            <input
              type="text"
              id="panNumber"
              name="panNumber"
              value={formData.panNumber}
              onChange={handleChange}
              className={inputClasses}
              placeholder="ABCDE1234F"
              maxLength={10}
            />
          </div>
        </div>

        <div>
          <label htmlFor="address" className={labelClasses}>
            Address
          </label>
          <textarea
            id="address"
            name="address"
            rows={3}
            value={formData.address}
            onChange={handleChange}
            className={`${inputClasses} resize-none`}
            placeholder="Enter your address (optional)"
          />
        </div>

        {/* Preferences */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="anonymous"
              name="anonymous"
              checked={formData.anonymous}
              onChange={handleChange}
              className="w-4 h-4 text-accent-yellow bg-white border-border-light rounded focus:ring-accent-yellow focus:ring-2"
            />
            <label htmlFor="anonymous" className="text-sm text-neutral-dark">
              Make this donation anonymous
            </label>
          </div>
          
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="newsletter"
              name="newsletter"
              checked={formData.newsletter}
              onChange={handleChange}
              className="w-4 h-4 text-accent-yellow bg-white border-border-light rounded focus:ring-accent-yellow focus:ring-2"
            />
            <label htmlFor="newsletter" className="text-sm text-neutral-dark">
              Subscribe to our newsletter for impact updates
            </label>
          </div>
          
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="receipt"
              name="receipt"
              checked={formData.receipt}
              onChange={handleChange}
              className="w-4 h-4 text-accent-yellow bg-white border-border-light rounded focus:ring-accent-yellow focus:ring-2"
            />
            <label htmlFor="receipt" className="text-sm text-neutral-dark">
              Send me a tax-deductible receipt
            </label>
          </div>
        </div>

        {/* Donation Summary */}
        <div className="bg-gradient-light rounded-xl p-6">
          <h4 className="text-lg font-semibold text-neutral-dark mb-4">Donation Summary</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-neutral-dark">Cause:</span>
              <span className="font-medium text-neutral-dark">{selectedCause?.title}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-dark">Amount:</span>
              <span className="font-bold text-xl text-accent-yellow">₹{selectedAmount?.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <Button 
            type="submit"
            variant="primary" 
            size="large"
            className="w-full py-4 text-lg rounded-[25px] shadow-custom-blue"
          >
            Proceed to Payment
          </Button>
        </div>

        <div className="text-center">
          <p className="text-sm text-text-muted">
            By proceeding, you agree to our terms and conditions. Your donation is secure and tax-deductible.
          </p>
        </div>
      </form>
    </Card>
  );
};

export default DonationForm;