import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const HeroSection = React.memo(() => {

  const [email, setEmail] = useState('');

  const BASE_URL = `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'}/api`;

  const handleSubscribe = async () => {
    toast.loading('Subscribing');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      toast.dismiss();
      toast.error('Please enter a valid email address');
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/blogs/add-subscriber`, { email });
      if (response.data?.success) {
        toast.dismiss();
        toast.success('Successfully subscribed!');
        setEmail('');
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Something went wrong';
      setEmail('');
      toast.dismiss();
      toast.error(message);
    }
  };

  return (
    <section className="w-full flex flex-col items-center justify-center pt-[5rem] pb-[4rem] text-center bg-white">
      <p className="text-[#7F56D9] text-[0.875rem] font-semibold mb-[0.75rem]">Our blog</p>
      <h1 className="text-[2rem] sm:text-[2.25rem] md:text-[2.5rem] lg:text-[2.75rem] font-semibold text-[#101828] leading-[2.75rem] mb-[1.25rem]">Stories and interviews</h1>
      <p className="text-[1rem] sm:text-[1.125rem] md:text-[1.25rem] lg:text-[1.125rem] text-[#667085] w-[80vw] mb-[1.5rem] ">
        Subscribe to learn about new product features, the latest in technology, solutions, and updates.
      </p>
      <form className="flex items-start gap-[0.75rem]" onSubmit={(e) => e.preventDefault()}>
        <div className='flex flex-col'>
        <label htmlFor="email" className="sr-only">Email address</label>
          <input
            id="email"
            type="email"
            required
            value={email}
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            className="border border-[#D0D5DD] text-[#667085] rounded-[0.5rem] px-[1rem] py-[0.6rem] text-[0.875rem] w-[15rem] md:w-[20rem]"
          />
          <p className="text-[0.7rem] md:text-[0.75rem] text-[#98A2B3] mt-[0.625rem] self-start">
            We care about your data in our <Link to="/privacy-policy" className="underline">privacy policy</Link>
          </p>
        </div>
        <button
          onClick={handleSubscribe}
          className="bg-[#7F56D9] hover:bg-[#6f47c3] text-white px-[1.25rem] py-[0.6rem] rounded-[0.5rem] text-[0.875rem] font-semibold transition-colors duration-300"
        >
          Subscribe
        </button>
      </form>

    </section>
  );
});

export default HeroSection;
