// src/pages/contact/index.jsx
import React, { useState } from 'react';
import ContactInfo from './components/ContactInfo';
import ContactForm from './components/ContactForm';
import toast from 'react-hot-toast';
import axios from 'axios';

const ContactPage = () => {
  const [formState, setFormState] = useState('idle');

  const onSubmit = async (formData) => {
    setFormState('submitting');

    // Combine phone number before sending
    const formattedData = {
      ...formData,
      phone: `${formData.countryCode} ${formData.phone}`,
    };

    const data = {
      service_id: import.meta.env.VITE_EMAILJS_SERVICE_ID,
      template_id: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      user_id: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      template_params: formattedData
    };

    try {
      const res = await axios.post('https://api.emailjs.com/api/v1.0/email/send', data);
      if (res.data === 'OK') {
        return setFormState('submitted');
      } else {
        toast.error('Something went wrong, Please try again');
        setFormState('idle');
      }
    } catch (error) {
      toast.error('Failed to send email. Please check your network and try again.');
      setFormState('idle');
    }
  };


  return (
    <div>
      <section className='flex flex-wrap-reverse w-full justify-center items-center gap-[4rem] px-[2rem] sm:px-0  sm:pt-[2.5rem] mb-[5rem] bg-[#F9F9F9] '>
        <ContactInfo/>
        <ContactForm formState={formState} onSubmit={onSubmit}/>        
      </section>

      {formState === 'submitted' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="rounded-lg overflow-hidden bg-white border border-[#cfcfcf] p-[1.75rem] max-w-md mx-4 card-shadow">
            <div className="text-center font-inter">
              <div className="text-6xl mb-4">📧</div>
              <p className="text-2xl font-bold  text-gray-900 mb-4">Message Sent!</p>
              <p className="text-gray-500 mb-6">
                Thank you for reaching out <br></br> We'll get back to you within 24 hours.
              </p>
              <button onClick={() => setFormState('idle')} className="font-semibold rounded-[25px] transition-colors duration-200 cursor-pointer inline-flex items-center justify-center bg-[#e76f51] text-white text-[0.7rem] sm:text-[1rem] px-[2rem] py-[0.5rem] hover:bg-[#d65a3f] focus:ring-[#e76f51]">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactPage;
