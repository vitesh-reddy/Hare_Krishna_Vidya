import React, { useState } from 'react';

const ContactForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (onSubmit) onSubmit(formData);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: '',
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-[3rem]">
      {/* Header */}
      <div className="flex flex-col space-y-[0.5rem] text-center mb-[1rem] sm:mb-[3.5rem] font-inter">
        <p className="text-[#E76F51] text-[1.5rem] sm:text-[0.9rem] font-semibold leading-3">Contact us</p>
        <p className="text-[2rem] font-semibold text-[#101828] leading-[3.5rem]">Get in touch</p>
        <p className="text-[1.125rem] text-[#667085]">We’d love to hear from you. Please fill out this form.</p>
      </div>
      <form onSubmit={handleSubmit} className="mt-10 lg:mt-0 flex flex-col space-y-6 w-[95%] font-inter text-[#344054]">
        <div className="grid gap-[1.75rem] sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-[0.8rem] font-medium text-gray-700">First name</label>
            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First name"
              className={`w-full rounded-[0.5rem] border px-[1rem] py-[0.65rem] text-[0.85rem] shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500 ${
                errors.firstName ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.firstName && <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>}
          </div>
          <div>
            <label className="mb-1 block text-[0.8rem] font-medium text-gray-700">Last name</label>
            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last name"
              className="w-full rounded-[0.5rem] border border-gray-300  px-[1rem] py-[0.65rem] text-[0.85rem] shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-[0.8rem] font-medium text-gray-700">Email</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@company.com"
            className={`w-full rounded-[0.5rem] border  px-[1rem] py-[0.65rem] text-[0.85rem] shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500 ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
        </div>

        <div>
          <label className="mb-1 block text-[0.8rem] font-medium text-gray-700">Phone number</label>
          <div className="flex">
            {/* <select className="border-l border-t border-b border-gray-300 rounded-l-md bg-white pl-4 pr-2 text-[0.85rem] text-gray-700">
              <option>US</option>
              <option>IN</option>
              <option>UK</option>
            </select> */}
            <input
              type="tel"
              placeholder="+91 98765 43210"
              className="flex-1 border px-[1rem] py-[0.65rem] text-[0.85rem] border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-[0.8rem] font-medium text-gray-700">Message</label>
          <textarea
            name="message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            placeholder="Leave a message..."
            className={`w-full rounded-[0.5rem] border  px-[1rem] py-[0.65rem] text-[0.85rem] shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500 ${
              errors.message ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
        </div>

        <div className="flex items-center">
          <div className="flex h-5 items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              className="h-[1rem] w-[1rem]  border-[#D0D5DD]/70 text-orange-600 focus:ring-orange-500"
            />
          </div>
          <div className="ml-2 text-[0.85rem]">
            <label htmlFor="terms" className="font-medium text-[#344054]">
              You agree to our friendly{' '}
              <a href="/privacy-policy" className="underline">
                privacy policy
              </a>
              .
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-[#E76F51] hover:bg-orange-600 text-white font-semibold py-3 px-6 text-[0.85rem] rounded-[0.5rem]"
        >
          Send message
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
