import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full bg-[#0b3954] text-white">
      <div className="w-full px-[5rem] sm:px-[2rem] lg:px-[5rem] py-3 sm:py-16 flex justify-evenly">
        
        {/* About Section */}
        <div className="hidden sm:block space-y-[0.25rem] w-[50%] sm:pr-[2rem] lg:pr-[4.5rem]">
          <img  loading="lazy" 
            src="/assets/img_hkmi_1.png" 
            alt="HKMI Logo" 
            className="sm:w-[5rem] md:w-[7rem] lg:w-[9rem]"
          />
          <div className=''>
            <h3 className="sm:text-[1rem] md:text-[1rem] lg:text-[1.3rem] font-bold text-[#f4a261] mb-4 font-inter ">About Us</h3>
            <p className="text-[#888787] text-wrap sm:text-[0.75rem] md:text-[0.75rem] lg:text-[1rem] font-inter font-medium leading-7">
              "Hare Krishna Vidya (AlkYA viDYA)" an initiative of HARE KRISHNA MOvEMENT INDIA is designed for students of classes 1st to 10th, especially in rural areas.
            </p>
          </div>
        </div>

        <div className='flex w-full sm:w-[50%] justify-center gap-[3rem]'>
         {/* Quick Links */}
            <div className="space-y-[0.5rem]">
              <h3 className="hidden sm:block sm:[0.75rem] md:text-[1rem] lg:text-[1.25rem] font-bold text-[#f4a261]">Quick Links</h3>
              <ul className="w-[50vw] sm:w-full flex sm:flex-col flex-wrap items-center sm:items-start gap-x-3 gap-y-1 sm:gap-y-[0.25rem] text-[0.55rem] sm:text-[0.75rem] md:text-[0.75rem] lg:text-[1rem] sm:text-[#f9f9f9] font-inter">
                {[
                  { to: 'Our Initiative', path: "/our-initiative"},
                  { to: 'Gallery', path: "/gallery"},
                  { to: 'Term & Conditions', path: "/terms&conditions"},
                  { to: 'Refund Policy', path: "/refund-policy"},
                  { to: 'Privacy Policy', path: "/privacy-policy"},
                  { to: 'Certificates', path: "/certificates"},
                  { to: 'Careers', path: "/careers"},
                  { to: 'Campaign', path: "/advertforcampaign"},
                ].map(({to, path}, idx) => (
                  <li key={idx} className="flex items-center mx-auto sm:mx-0">
                    <Link
                      to={path}
                      className="text-[#F9F9F9]/70 sm:text-[#F9F9F9] font-medium hover:text-[#f4a261] transition-colors"
                    >
                      <span className="mx-1 text-[#F9F9F9]/70 sm:hidden">•</span>
                      {to}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>


 
         {/* Contact Us */}
         <div className="hidden sm:block space-y-[0.75rem]">
           <h3 className="text-[1.25rem] font-bold text-[#f4a261]">Contact Us</h3>
           <div className="space-y-[0.25rem]">
             <p className="sm:text-[0.75rem] md:text-[0.75rem] lg:text-[1rem] md:text-[#f9f9f9] leading-7">
               Hare Krishna Vidya (Aikya Vidya)<br />
               an initiative of<br />
               HARE KRISHNA MOVEMENT INDIA.
             </p>
 
             <div className="flex items-center space-x-3">
               <img  loading="lazy" src="/assets/img_phone.svg" alt="Phone" className="w-6 h-6" />
               <span className="sm:text-[0.75rem] md:text-[0.75rem] lg:text-[1rem] text-[#f9f9f9]">+91 81217.95663</span>
             </div>
 
             <div className="flex items-center space-x-3">
               <img  loading="lazy" src="/assets/img_phone.svg" alt="Phone" className="w-6 h-6" />
               <span className="sm:text-[0.75rem] md:text-[0.75rem] lg:text-[1rem] text-[#f9f9f9]">+91 83283 89862</span>
             </div>
 
             <div className="flex items-center space-x-3">
               <img  loading="lazy" src="/assets/img_mail.svg" alt="Email" className="w-6 h-6" />
               <span className="sm:text-[0.75rem] md:text-[0.75rem] lg:text-[1rem] text-[#f9f9f9]">connect2aikyavidya@gmail.com</span>
             </div>
           </div>
         </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="sm:bg-[#002942] py-3">
        <div className="max-w-7xl mx-auto sm:px-[5rem] flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <p className="text-white/70 sm:text-white text-sm">
            Copyright © 2024 Hare Krishna Vidya-Aikya Vidya
          </p>
          <div className="hidden sm:flex space-x-4 items-center pr-[4rem]">
            <img  loading="lazy" src="/assets/img_facebook.svg" alt="Facebook" className="w-[0.6rem]" />
            <img  loading="lazy" src="/assets/img_instagram.svg" alt="Instagram" className="w-[1rem]" />
            <img  loading="lazy" src="/assets/img_youtube.svg" alt="YouTube" className="w-[1rem]" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
