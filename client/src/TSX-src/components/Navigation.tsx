
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CartButton from './CartButton';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Blog', path: '/blog' },
    { label: 'Contact', path: '/contact' },
    { label: 'Admin', path: '/admin' },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const scrollToKits = () => {
    if (window.location.pathname === '/') {
      const kitsSection = document.getElementById('kits-showcase');
      if (kitsSection) {
        kitsSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/donate-items/?scrollTo=kits');
    }
    setIsMenuOpen(false);
  };

  const scrollToGrocery = () => {
    if (window.location.pathname === '/') {
      const grocerySection = document.getElementById('grocery-section');
      if (grocerySection) {
        grocerySection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/donate-items/?scrollTo=grocery');
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            onClick={() => handleNavigation('/')}
            className="text-2xl font-bold text-orange-600 cursor-pointer hover:text-orange-700 transition-colors"
          >
            Hare Krishna Vidya
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className="text-gray-700 hover:text-orange-600 transition-colors font-medium"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={scrollToGrocery}
              className="text-gray-700 hover:text-green-600 transition-colors font-medium"
            >
              Grocery Items
            </button>
            <CartButton />
            <Button 
              onClick={scrollToKits}
              className="bg-orange-600 hover:bg-orange-700 text-white px-6"
            >
              Donate Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-orange-600 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              {menuItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className="text-left text-gray-700 hover:text-orange-600 transition-colors font-medium py-2"
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={scrollToGrocery}
                className="text-left text-gray-700 hover:text-green-600 transition-colors font-medium py-2"
              >
                Grocery Items
              </button>
              <div className="py-2">
                <CartButton />
              </div>
              <Button 
                onClick={scrollToKits}
                className="bg-orange-600 hover:bg-orange-700 text-white w-full mt-4"
              >
                Donate Now
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
