// src/pages/contact/components/ContactForm.jsx
import React, { useState } from 'react';
import Button from '../../../components/ui/Button';

const ContactForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    interest: 'general'
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        interest: 'general'
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const inputClasses = "w-full px-4 py-3 border border-border-light rounded-[15px] focus:ring-2 focus:ring-accent-yellow focus:border-accent-yellow focus:outline-none transition-colors text-neutral-dark";
  const labelClasses = "block text-sm font-medium text-neutral-dark mb-2";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name and Email Row */}
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
            placeholder="Enter your email address"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>
      </div>

      {/* Phone and Subject Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="phone" className={labelClasses}>
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={inputClasses}
            placeholder="Enter your phone number"
          />
        </div>
        
        <div>
          <label htmlFor="subject" className={labelClasses}>
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className={inputClasses}
            placeholder="Enter subject"
          />
        </div>
      </div>

      {/* Interest Type */}
      <div>
        <label htmlFor="interest" className={labelClasses}>
          I'm interested in
        </label>
        <select
          id="interest"
          name="interest"
          value={formData.interest}
          onChange={handleChange}
          className={inputClasses}
        >
          <option value="general">General Inquiry</option>
          <option value="donation">Making a Donation</option>
          <option value="volunteering">Volunteering</option>
          <option value="partnership">Partnership</option>
          <option value="sponsorship">Child Sponsorship</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className={labelClasses}>
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          value={formData.message}
          onChange={handleChange}
          className={`${inputClasses} ${errors.message ? 'border-red-500' : ''} resize-none`}
          placeholder="Tell us how we can help you..."
        />
        {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <Button 
          type="submit"
          variant="primary" 
          size="large"
          className="w-full md:w-auto px-8 py-4 rounded-[25px] shadow-custom-blue"
        >
          Send Message
        </Button>
      </div>
    </form>
  );
};

export default ContactForm;