
import React from 'react';
import { Button } from './ui/button';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';

const CartButton = () => {
  const { getTotalItems } = useCart();
  const navigate = useNavigate();
  const itemCount = getTotalItems();

  return (
    <Button
      variant="ghost"
      onClick={() => navigate('/cart')}
      className="relative"
    >
      <ShoppingCart style={{ width: '1rem', height: '1rem'}} />
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {itemCount}
        </span>
      )}
      <span className="hidden md:inline text-[0.8rem] text-neutral-dark hover:text-orange-400">Cart</span>
    </Button>
  );
};

export default CartButton;
