import React from 'react';

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'medium', 
  disabled = false, 
  type = 'button',
  className = '',
  ...props 
}) => {
  const baseClasses = 'font-medium rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer inline-flex items-center justify-center';
  
  const variants = {
    primary: 'bg-[#0b3954] text-white hover:bg-[#0a3248] focus:ring-[#0b3954]',
    secondary: 'bg-[#e76f51] text-white hover:bg-[#d65a3f] focus:ring-[#e76f51]',
    outline: 'border border-[#2c2c2c] text-[#2c2c2c] hover:bg-gray-50 focus:ring-[#2c2c2c]',
    accent: 'bg-[#f4a261] text-white hover:bg-[#e89a5c] focus:ring-[#f4a261]',
  };
  
  const sizes = {
    small: 'px-3 py-1 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg',
  };
  
  const buttonClasses = `${baseClasses} ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`;
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;