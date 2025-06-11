// src/components/common/Header.jsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <header className="fixed top-0 left-0 right-0 bg-neutral-background py-6 px-6 sm:px-16 z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="text-[1.3rem] font-bold font-inter">
            <span className="text-primary-blue">HARE KRISHNA</span>
            <span className="text-black"> </span>
            <span className="text-accent-yellow">VIDYA</span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-[2.25rem]">
          {[
            { path: '/', label: 'Home' },
            { path: '/about-us', label: 'About Us' },
            { path: '/our-initiative', label: 'Our Initiative' },
            { path: '/gallery', label: 'Gallery' }, 
            { path: '/contact', label: 'Contact Us' },
          ].map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`font-medium font-inter text-[0.9rem] transition-colors ${
                isActive(item.path)
                  ? 'text-secondary-orange'
                  : 'text-neutral-dark hover:text-secondary-orange'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Donate */}
        <div className="hidden lg:block">
          <Link to="/donate-amount">
            <div className="font-medium font-inter rounded-[1.125rem] transition-colors duration-200 cursor-pointer inline-flex items-center justify-center bg-primary-blue shadow-custom-donate text-white px-[2.25rem] py-4 text-[0.95rem] hover:bg-primary-dark focus:ring-[#0b3954]">
              <p className="text-shadow-[0_100px_100px_rgba(71,187,255,0.30)]">Donate Now</p>
            </div>
          </Link>
        </div>

        {/* Mobile Menu button (Animated Hamburger) */}
        <button
          onClick={toggleMobileMenu}
          className="lg:hidden relative w-[1.75rem] h-[2rem] p-[0.5rem] mr-3 text-accent-yellow"
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

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 w-full bg-neutral-background z-30 border-t border-border-light overflow-hidden transition-all duration-500 ease-in-out ${
          isMobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="flex flex-col space-y-4 py-4 px-4">
          {[
            { path: '/', label: 'Home' },
            { path: '/about-us', label: 'About Us' },
            { path: '/our-initiative', label: 'Our Initiative' },
            { path: '/gallery', label: 'Gallery' },
            { path: '/contact', label: 'Contact Us' },
          ].map((item, index) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={toggleMobileMenu}
              className={`font-medium font-inter text-[0.9rem] text-center py-2 transform transition-all duration-500 ease-in-out ${
                isActive(item.path)
                  ? 'text-secondary-orange'
                  : 'text-neutral-dark hover:text-secondary-orange'
              } ${
                isMobileMenuOpen
                  ? 'translate-x-0 opacity-100'
                  : 'translate-x-[100%] opacity-0'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {item.label}
            </Link>
          ))}

          <div
            className={`pt-4 px-[4rem] transform transition-all duration-500 ease-in-out ${
              isMobileMenuOpen
                ? 'translate-x-0 opacity-100'
                : 'translate-x-[100%] opacity-0'
            }`}
            style={{ transitionDelay: '500ms' }}
          >
            <Link to="/donate-amount" onClick={toggleMobileMenu}>
              <button
                className="w-full bg-primary-blue text-white py-[0.75rem] rounded-[20px] font-semibold text-[0.9rem] shadow-custom-donate"
              >
                Donate Now
              </button>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
