// src/components/common/Header.jsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from '../ui/Button';

const Header = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const isActive = (path) => {
    return location.pathname === path;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-neutral-background py-6 px-6 sm:px-16 top-0 z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="text-[1.3rem] font-bold font-inter">
            <span className="text-primary-blue">HARE KRISHNA</span>
            <span className="text-black"> </span>
            <span className="text-accent-yellow">VIDYA</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-[2.25rem]">
          <Link to="/" className={`font-medium font-inter text-[0.9rem] transition-colors ${
              isActive('/') 
                ? 'text-secondary-orange' :'text-neutral-dark hover:text-secondary-orange'
            }`}
          >
            Home
          </Link>
          <Link 
            to="/about-us" 
            className={`font-medium font-inter text-[0.9rem] transition-colors ${
              isActive('/about-us') 
                ? 'text-secondary-orange' :'text-neutral-dark hover:text-secondary-orange'
            }`}
          >
            About Us
          </Link>
          <Link 
            to="/our-initiative" 
            className={`font-medium font-inter text-[0.9rem] transition-colors ${
              isActive('/our-initiative') 
                ? 'text-secondary-orange' :'text-neutral-dark hover:text-secondary-orange'
            }`}
          >
            Our Initiative
          </Link>
          <Link 
            to="/gallery" 
            className={`font-medium font-inter text-[0.9rem] transition-colors ${
              isActive('/gallery') 
                ? 'text-secondary-orange' :'text-neutral-dark hover:text-secondary-orange'
            }`}
          >
            Gallery
          </Link>
          <Link 
            to="/contact" 
            className={`font-medium font-inter text-[0.9rem] transition-colors ${
              isActive('/contact') 
                ? 'text-secondary-orange' :'text-neutral-dark hover:text-secondary-orange'
            }`}
          >
            Contact Us
          </Link>
        </nav>

        {/* Desktop Donate Button */}
        <div className="hidden lg:block">
          <Link to="/donate">
            <div className="font-medium font-inter rounded-[1.125rem] transition-colors duration-200 cursor-pointer inline-flex items-center justify-center bg-primary-blue shadow-custom-donate text-white px-[2.25rem] py-4 text-[0.95rem] hover:bg-primary-dark focus:ring-[#0b3954]">
              <p className="text-shadow-[0_100px_100px_rgba(71,187,255,0.30)]">Donate Now</p>
            </div>
            
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="lg:hidden p-2 rounded-md text-neutral-dark hover:text-secondary-orange transition-colors"
          aria-label="Toggle mobile menu"
        >
          <svg className="w-[2rem]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden mt-4 py-4 border-t border-border-light">
          <nav className="flex flex-col space-y-4">
            <Link 
              to="/" 
              onClick={toggleMobileMenu}
              className={`font-medium font-inter text-[0.9rem] text-center px-4 py-2 transition-colors ${
                isActive('/') 
                  ? 'text-secondary-orange ' :'text-neutral-dark hover:text-secondary-orange'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/about-us" 
              onClick={toggleMobileMenu}
              className={`font-medium font-inter text-[0.9rem] text-center px-4 py-2 transition-colors ${
                isActive('/about-us') 
                  ? 'text-secondary-orange ' :'text-neutral-dark hover:text-secondary-orange'
              }`}
            >
              About Us
            </Link>
            <Link 
              to="/our-initiative" 
              onClick={toggleMobileMenu}
              className={`font-medium font-inter text-[0.9rem] text-center px-4 py-2 transition-colors ${
                isActive('/our-initiative') 
                  ? 'text-secondary-orange 0' :'text-neutral-dark hover:text-secondary-orange'
              }`}
            >
              Our Initiative
            </Link>
            <Link 
              to="/gallery" 
              onClick={toggleMobileMenu}
              className={`font-medium font-inter text-[0.9rem] text-center px-4 py-2 transition-colors ${
                isActive('/gallery') 
                  ? 'text-secondary-orange ' :'text-neutral-dark hover:text-secondary-orange'
              }`}
            >
              Gallery
            </Link>
            <Link 
              to="/contact" 
              onClick={toggleMobileMenu}
              className={`font-medium font-inter text-[0.9rem] text-center px-4 py-2 transition-colors ${
                isActive('/contact') 
                  ? 'text-secondary-orange ' :'text-neutral-dark hover:text-secondary-orange'
              }`}
            >
              Contact Us
            </Link>
            
            <div className="px-[4rem] pt-4">
              <Link to="/donate" onClick={toggleMobileMenu}>
                <Button 
                  variant="primary"
                  className="w-full bg-primary-blue text-white py-[0.75rem] rounded-[20px] font-semibold text-[0.9rem] shadow-custom-donate"
                >
                  Donate Now
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;