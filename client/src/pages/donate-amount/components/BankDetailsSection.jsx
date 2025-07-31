import React from 'react';
const BankDetailsSection = () => {
  return (
    <div className="w-full flex flex-col md:flex-row justify-between items-center gap-8 border border-dashed rounded-lg px-[3rem] sm:px-[6  rem] md:px-[6rem]">
      
      <div className="flex-1 space-y-4">
        <p className='text-[1.125rem] sm:text-[2rem] md:text-[1.5rem] lg:text-[1.75rem] font-urbanist font-bold text-[#303030]'>Donation Through Bank (NEFT/ RTGS)</p>
        
        <div className="text-[#6F6F6F] font-bold space-y-1 font-inter text-[0.8rem] sm:text-[1.125rem] md:text-[1rem] lg:text-[1.25rem]">
          <p>Beneficiary Name: HARE KRISHNA MOVEMENT</p>
          <p>Bank Name: Yes Bank Ltd.</p>
          <p>A/c No: 002288700000804</p>
          <p>IFSC code: YESB0000022</p>
        </div>

        <p className='text-[1.125rem] sm:text-[2rem] md:text-[1.5rem] lg:text-[1.75rem] font-urbanist font-bold text-[#303030]'>Pay by UPI ID</p>
        <img  loading="lazy" src="/assets/upi_apps_logo 1.png" alt="upi_apps_logo 1" className='w-[10rem] sm:w-[15rem] md:w-[15rem] lg:w-[25rem]' />
        <p className='text-[1.25rem] sm:text-[1.5rem] md:text-[1.5rem] lg:text-[1.75rem] font-urbanist font-bold text-[#2C2C2C]'>
          Mob No: 7207 188 108 
        </p>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        <img
          loading="lazy"
          src="/assets/QR Code.png"
          alt="QR Code"
          className="w-[15rem] sm:w-[20rem] md:w-[27rem]"
        />
      </div>
    </div>
  );
};

export default BankDetailsSection;
