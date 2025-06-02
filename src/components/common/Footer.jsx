import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#0b3954] text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div className="space-y-6">
            <img 
              src="/images/img_hkmi_1.png" 
              alt="HKMI Logo" 
              className="w-[159px] h-[101px]"
            />
            <div>
              <h3 className="text-2xl font-bold text-[#f4a261] mb-4">About Us</h3>
              <p className="text-[#888787] text-lg leading-7">
                "Hare Krishna Vidya (AlkYA viDYA)" an initiative of HARE
                <br />
                KRISHNA MOvEMENT INDIA is designed for students of classes
                <br />
                1st to 10th, especially in rural areas.
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-[#f4a261]">Quick Links</h3>
            <div className="space-y-4">
              <a href="#" className="block text-lg text-[#f9f9f9] hover:text-[#f4a261] transition-colors">
                Our Initiative
              </a>
              <a href="#" className="block text-lg text-[#f9f9f9] hover:text-[#f4a261] transition-colors">
                Gallery
              </a>
              <a href="#" className="block text-lg text-[#f9f9f9] hover:text-[#f4a261] transition-colors">
                Term & Conditions
              </a>
              <a href="#" className="block text-lg text-[#f9f9f9] hover:text-[#f4a261] transition-colors">
                Refund Policy
              </a>
              <a href="#" className="block text-lg text-[#f9f9f9] hover:text-[#f4a261] transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="block text-lg text-[#f9f9f9] hover:text-[#f4a261] transition-colors">
                Certificates
              </a>
            </div>
          </div>

          {/* Contact Us */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-[#f4a261]">Contact Us</h3>
            <div className="space-y-4">
              <p className="text-lg text-[#f9f9f9] leading-7">
                Hare Krishna Vidya (Aikya Vidya)
                <br />
                an initiative of
                <br />
                HARE KRISHNA MOVEMENT INDIA.
              </p>
              
              <div className="flex items-center space-x-3">
                <img src="/images/img_phone.svg" alt="Phone" className="w-6 h-6" />
                <span className="text-lg text-[#f9f9f9]">+91 81217.95663</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <img src="/images/img_phone.svg" alt="Phone" className="w-6 h-6" />
                <span className="text-lg text-[#f9f9f9]">+91 83283 89862</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <img src="/images/img_mail.svg" alt="Email" className="w-6 h-6" />
                <span className="text-lg text-[#f9f9f9]">connect2aikyavidya@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#002942] py-3">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <p className="text-white text-sm">
            Copyright © 2024 Hare Krishna Vidya-Aikya Vidya
          </p>
          <div className="flex space-x-4">
            <img src="/images/img_facebook.svg" alt="Facebook" className="w-5 h-3" />
            <img src="/images/img_instagram.svg" alt="Instagram" className="w-5 h-5" />
            <img src="/images/img_youtube.svg" alt="YouTube" className="w-4 h-5" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;