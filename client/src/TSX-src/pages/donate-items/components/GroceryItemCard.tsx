import React, { useState } from 'react';
import { Button } from '../../../components/ui/button';
import { Card, CardContent } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { useCart } from '../../../contexts/CartContext';
import { ShoppingCart, Plus, Minus, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface GroceryItem {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  unit: string;
  serves: string;
}

interface GroceryItemCardProps {
  item: GroceryItem;
}

const GroceryItemCard: React.FC<GroceryItemCardProps> = ({ item }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
      addToCart({
        id: item.id,
        title: item.title,
        price: item.price,
        image: item.image,
        items: [item.serves],
        description: item.description
      }, quantity);
    
    console.log(`Added ${quantity} ${item.title}(s) to cart`);  
  };

  const handleDonateNow = () => {
    // Add to cart first
      addToCart({
        id: item.id,
        title: item.title,
        price: item.price,
        image: item.image,
        items: [item.serves],
        description: item.description
      }, quantity);
        
    // Navigate directly to donation flow
    navigate(`/donate?kit=${item.id}`);
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity(prev => Math.max(1, prev - 1));
  };

  return (
    <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-[0.5rem] bg-[#FFFFFF] border-0 shadow-lg overflow-hidden dark:bg-[#0F172A]">
      <div className="relative overflow-hidden">
        <img 
          src={item.image} 
          alt={item.title}
          className="w-full h-[12rem] object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-[1rem] right-[1rem] bg-[#16A34A] text-[#F5F7FD] px-[0.75rem] py-[0.25rem] rounded-full text-[0.875rem] font-semibold">
          ₹{item.price.toLocaleString()}
        </div>
        <div className="absolute top-[1rem] left-[1rem] bg-[#FFFFFF]/90 text-[#16A34A] px-[0.5rem] py-[0.25rem] rounded-full text-[0.75rem] font-medium dark:bg-[#0F172A]/90 dark:text-[#16A34A]">
          per {item.unit}
        </div>
      </div>
      
      <CardContent className="p-[1.5rem]">
        <h3 className="text-[1.25rem] font-bold text-[#1F2937] mb-[0.5rem] dark:text-[#F5F7FD]">{item.title}</h3>
        <p className="text-[#4B5563] mb-[1rem] text-[0.875rem] leading-relaxed dark:text-[#9CA3AF]">{item.description}</p>
        
        <div className="mb-[1rem] p-[0.75rem] bg-[#ECFDF5] rounded-lg border border-[#BBF7D0] dark:bg-[#1A3C34] dark:border-[#15803D]">
          <div className="flex items-center text-[#15803D] text-[0.875rem] dark:text-[#16A34A]">
            <Users className="w-[1rem] h-[1rem] mr-[0.5rem]" />
            <span className="font-medium">{item.serves}</span>
          </div>
        </div>

        {/* Quantity Selector */}
        <div className="mb-[1rem]">
          <label className="block text-[0.875rem] font-medium text-[#4B5563] mb-[0.5rem] dark:text-[#9CA3AF]">
            Quantity:
          </label>
          <div className="flex items-center space-x-[0.75rem]">
            <Button
              variant="outline"
              size="sm"
              onClick={decrementQuantity}
              className="h-[2rem] w-[2rem] p-0 border-[#DCE4F2] bg-[#FFFFFF] hover:bg-[#F4F6FB] hover:text-[#2A3B5B] dark:border-[#3F4856] dark:bg-[#0F172A] dark:hover:bg-[#3F4856] dark:hover:text-[#F5F7FD]"
            >
              <Minus className="w-[0.75rem] h-[0.75rem]" />
            </Button>
            <Input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-[4rem] text-center h-[2rem] border-[#DCE4F2] bg-[#FFFFFF] text-[#1F2937] dark:border-[#3F4856] dark:bg-[#0F172A] dark:text-[#F5F7FD]"
              min="1"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={incrementQuantity}
              className="h-[2rem] w-[2rem] p-0 border-[#DCE4F2] bg-[#FFFFFF] hover:bg-[#F4F6FB] hover:text-[#2A3B5B] dark:border-[#3F4856] dark:bg-[#0F172A] dark:hover:bg-[#3F4856] dark:hover:text-[#F5F7FD]"
            >
              <Plus className="w-[0.75rem] h-[0.75rem]" />
            </Button>
          </div>
          <p className="text-[0.75rem] text-[#6B7280] mt-[0.25rem] dark:text-[#9CA3AF]">
            Total: ₹{(item.price * quantity).toLocaleString()}
          </p>
        </div>
        
        {/* Action Buttons */}
        <div className="space-y-[0.5rem]">
          <Button 
            onClick={handleAddToCart}
            className="w-full bg-[#16A34A] hover:bg-[#15803D] text-[#F5F7FD] py-[0.5rem] rounded-lg font-semibold transition-colors duration-300 text-[0.875rem] dark:bg-[#16A34A] dark:hover:bg-[#15803D] dark:text-[#F5F7FD]"
          >
            <ShoppingCart className="w-[1rem] h-[1rem] mr-[0.5rem]" />
            Add {quantity} to Cart
          </Button>
          
          <Button 
            onClick={handleDonateNow}
            variant="outline"
            className="w-full border-[#16A34A] text-[#16A34A] hover:bg-[#ECFDF5] py-[0.5rem] rounded-lg font-semibold transition-colors duration-300 text-[0.875rem] dark:border-[#16A34A] dark:text-[#16A34A] dark:hover:bg-[#1A3C34]"
          >
            Donate Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default GroceryItemCard;