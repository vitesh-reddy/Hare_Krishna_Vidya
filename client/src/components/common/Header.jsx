import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import CartButton from '../../TSX-src/components/CartButton';
import CreateCampaignButton from './CreateCampaignButton';

const Header = () => {
  const location = useLocation();
  console.log(location);  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <header className=" fixed top-0 left-0 right-0 bg-neutral-background py-6 px-6 lg:px-4 xl:px-6 sm:px-12 z-[1000]">
      <div className="w-full flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="text-[1.3rem] lg:text-[1.125rem] xl:text-[1.3rem] font-bold font-inter">
            <span className="text-primary-blue">HARE KRISHNA</span>
            <span className="text-black"> </span>
            <span className="text-accent-yellow">VIDYA</span>
          </Link>
        </div>

        {/* Right side: Nav + Cart + Donate */}
        <div className="w-full flex items-center justify-end flex-1 space-x-[1rem] lg:space-x-[10vw] xl:space-x-[10rem] 2xl:space-x-[10rem]">
          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center lg:space-x-[1rem] xl:space-x-[1.5rem]">
            {[
              { path: '/', label: 'Home' },
              { path: '/about-us', label: 'About Us' },
              { path: '/our-initiative', label: 'Our Initiative' },
              { path: '/gallery', label: 'Gallery' }, 
              { path: '/blogs', label: 'Blogs' }, 
              { path: '/contact', label: 'Contact Us' },
              // { path: '/advertforcampaign', label: 'Campaign' }
            ].map((item, idx) => (
              <Link
                key={idx}
                to={item.path}
                className={`font-medium font-inter text-[0.8rem] transition-colors ${
                  isActive(item.path)
                    ? 'text-secondary-orange'
                    : 'text-neutral-dark hover:text-secondary-orange'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Cart + Donate */}
          <div className="hidden lg:flex items-center">
            <CartButton />
            {/* <CreateCampaignButton /> */}
            <div className="ml-[0.5rem] mr-[0.25rem] relative group font-medium font-inter rounded-[1.125rem] transition-colors duration-200 cursor-pointer inline-flex items-center justify-center bg-primary-blue shadow-custom-donate text-white px-[2rem] lg:px-[1rem] xl:px-[2rem] py-4 text-[0.8rem] lg:text-[0.75rem] xl:text-[0.8rem] hover:bg-primary-dark focus:ring-[#0b3954]">
              <p className="text-shadow-[0_100px_100px_rgba(71,187,255,0.30)]">Donate Now</p>
              <div className='absolute top-[2.75rem] hidden group-hover:flex flex-col justify-evenly gap-[0.5rem] px-4 py-5 w-fit bg-[#fafcfd] font-inter shadow-custom-light text-[#1a1a1a] transition-all duration-300 rounded-[1rem] text-[0.8rem]'>
                <Link to="/donate-amount" >
                    <p className="w-[10rem] text-center text-shadow-[0_100px_100px_rgba(71,187,255,0.30)] hover:text-secondary-orange">Donate Amount</p>              
                </Link>
                <Link to="/donate-items">
                    <p className="w-[10rem] text-center text-shadow-[0_100px_100px_rgba(71,187,255,0.30)] hover:text-secondary-orange">Donate Items</p>
                </Link> 
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu button (Hamburger) */}
        <div className="flex items-center lg:hidden">
          <CartButton />
          <button 
            onClick={toggleMobileMenu}
            className="relative w-[1.75rem] h-[2rem] p-[0.5rem] ml-2 text-accent-yellow"
            aria-label="Toggle mobile menu"
          >
            <span
              className={`block absolute h-[3px] w-full rounded-[0.5rem] bg-current transform transition duration-500 ${
                isMobileMenuOpen ? 'rotate-45 top-[0.875rem]' : 'top-[0.375rem]'
              }`}
            />
            <span
              className={`block absolute h-[3px] w-full rounded-[0.5rem] bg-current transform transition duration-500 ${
                isMobileMenuOpen ? 'opacity-0' : 'top-[0.875rem]'
              }`}
            />
            <span
              className={`block absolute h-[3px] w-full rounded-[0.5rem] bg-current transform transition duration-500 ${
                isMobileMenuOpen ? '-rotate-45 top-[0.875rem]' : 'top-[1.375rem]'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-transparent"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Menu Panel (with animation on container) */}
          <div
            className="absolute top-[4.5rem] left-0 w-full bg-neutral-background border-t border-border-light z-50 overflow-y-auto transition-all duration-500 ease-in-out"
          >
            <nav className="flex flex-col py-4 px-4">
              {[
                { path: '/', label: 'Home' },
                { path: '/about-us', label: 'About Us' },
                { path: '/our-initiative', label: 'Our Initiative' },
                { path: '/gallery', label: 'Gallery' },
                { path: '/admin', label: 'Admin' },
                { path: '/blogs', label: 'Blogs' },
                { path: '/contact', label: 'Contact Us' },
                { path: '/advertforcampaign', label: 'Campaigns' }
              ].map((item, index) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={toggleMobileMenu}
                  className="font-medium font-inter text-[0.75rem] text-center py-2 transition-all duration-500 ease-in-out transform translate-x-[100%] opacity-0"
                  style={{
                    animation: `slideIn 0.4s ease forwards`,
                    animationDelay: `${index * 75}ms`,
                  }}
                >
                  {item.label}
                </Link>
              ))}

              <div
                className="transition-all duration-500 ease-in-out transform translate-x-[100%] opacity-0"
                style={{
                  animation: `slideIn 0.4s ease forwards`,
                  animationDelay: `${600}ms`,
                }}
              >
                <div className='w-full flex justify-center'>
                  {/* <CreateCampaignButton /> */}
                </div>
              </div>

              {['/donate-amount', '/donate-items'].map((link, i) => (
                <div
                  key={link}
                  className="flex justify-center pt-4 px-[4rem] transition-all duration-500 ease-in-out transform translate-x-[100%] opacity-0"
                  style={{
                    animation: `slideIn 0.4s ease forwards`,
                    animationDelay: `${675 + i * 75}ms`,
                  }}
                >
                  <Link to={link} onClick={toggleMobileMenu}>
                    <button className="w-full max-w-[50rem] bg-primary-blue text-white px-[1.5rem] py-[0.75rem] rounded-[20px] text-[0.75rem] md:text-[0.9rem] shadow-custom-donate">
                      {link === '/donate-amount' ? 'Donate Amount' : 'Donate Items'}
                    </button>
                  </Link>
                </div>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
