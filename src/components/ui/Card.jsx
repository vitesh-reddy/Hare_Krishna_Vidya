import React from 'react';

const Card = ({ 
  children, 
  className = '', 
  variant = 'default',
  padding = 'default',
  shadow = 'default',
  ...props 
}) => {
  const baseClasses = 'rounded-lg overflow-hidden';
  
  const variants = {
    default: 'bg-white border border-[#cfcfcf]',
    gradient: 'bg-gradient-to-br from-[#e1e6e8] to-[#f9feff]',
    primary: 'bg-[#f4a261]',
    secondary: 'bg-[#e76f51]',
    dark: 'bg-[#0b3954] text-white',
  };
  
  const paddings = {
    none: '',
    small: 'p-4',
    default: 'p-6',
    large: 'p-8',
  };
  
  const shadows = {
    none: '',
    small: 'shadow-sm',
    default: 'shadow-[15px_15px_38px_rgba(209,213,215,0.9)]',
    large: 'shadow-[0px_4px_12px_rgba(136,136,136,1)]',
  };
  
  const cardClasses = `${baseClasses} ${variants[variant]} ${paddings[padding]} ${shadows[shadow]} ${className}`;
  
  return (
    <div className={cardClasses} {...props}>
      {children}
    </div>
  );
};

export default Card;