import React from 'react';

const ContactInfo = () => {
  return (
    <div className="space-y-[2.5rem] w-full max-w-md">
      {/* Visit us */}
      <div className="flex flex-col items-center space-y-[1rem] bg-[#F1F6FB] rounded-[1.5rem] px-[2rem]  py-[2.25rem] shadow-custom-content-card">
        <div className="flex items-center space-x-2 mb-2 text-[#264653] font-semibold text-lg">
          <img  loading="lazy" src="/assets/location.svg" alt="Location" className="w-[1.75rem]" />
          <span className="text-[#0B3954] text-[1.5rem] font-bold">Visit us</span>
        </div>
        <p className="text-[1rem] font-medium text-[#2C2C2C] text-center sm:w-[70%]">
          Hare Krishna Golden Temple, Swayambhu Sri Lakshmi Narasimha Swamy Kshetram, NBT Nagar,
          Road No 12, Banjara Hills, Near Anti Corruption Bureau office, Hyderabad - 500034,
          Telangana.
        </p>
      </div>

      {/* Call us */}
      <div className="flex flex-col items-center space-y-[1rem] bg-[#F1F6FB] rounded-[1.5rem] px-[2rem]  py-[2.25rem] shadow-custom-content-card">
        <div className="flex items-center space-x-2 mb-2 text-[#264653] font-semibold text-lg">
          <img  loading="lazy" src="/assets/phone.svg" alt="" className="w-[1.75rem]" />
          <span className="text-[#0B3954] text-[1.5rem] font-bold">Call us</span>
        </div>
        <div className="text-[1rem] font-medium text-[#2C2C2C] flex flex-col items-center justify-evenly space-y-4">
          <p className='underline'>+91 81217 95663</p>
          <p className='underline'> +91 83283 89862</p>
        </div>
      </div>

      {/* Email at */}
      <div className="flex flex-col items-center space-y-[1rem] bg-[#F1F6FB] rounded-[1.5rem] px-[2rem]  py-[2.25rem] shadow-custom-content-card">
        <div className="flex items-center space-x-2 mb-2 text-[#264653] font-semibold text-lg">
          <img  loading="lazy" src="/assets/email.svg" alt="Email" className="w-[1.75rem]" />
          <span className="text-[#0B3954] text-[1.5rem] font-bold">Email at</span>
        </div>
        <a
          href="mailto:connect2aikyavidya@gmail.com"
          className="text-[1rem] font-medium text-[#2C2C2C] text-center underline"
        >
          connect2aikyavidya@gmail.com
        </a>
      </div>
    </div>
  );
};

export default ContactInfo;
