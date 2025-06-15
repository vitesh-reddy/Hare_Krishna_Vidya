import React, { useState } from 'react';
import { Button } from '../../../components/ui/button';
import { Card, CardContent } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { useCart } from '../../../contexts/CartContext';
import { ShoppingCart, Plus, Minus, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

interface Kit {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  items: string[];
}

interface KitCardProps {
  kit: Kit;
}

const KitCard: React.FC<KitCardProps> = ({ kit }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [showDetails, setShowDetails] = useState(false);

  const handleAddToCart = () => {
      addToCart({
        id: kit._id,
        name: kit.name,
        price: kit.price,
        image: kit.image,
        items: kit.items,
        description: kit.description
      }, quantity);
    console.log(`Added ${quantity} ${kit.name}(s) to cart`);  
  };

  const handleViewDetails = () => {
    navigate(`/donate?kit=${kit._id}`);
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity(prev => Math.max(1, prev - 1));
  };

  return (
    <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-[#FFFFFF] border-0 shadow-lg overflow-hidden dark:bg-[#0F172A]">
      <div className="relative overflow-hidden">
        <img 
          src={kit.image} 
          alt={kit.name}
          className="w-full h-[16rem] object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-[1rem] right-[1rem] bg-[#F97316] text-[#FFFFFF] px-[0.75rem] py-[0.25rem] rounded-full text-[0.875rem] font-semibold dark:bg-[#FDBA74]">
          ₹{kit.price.toLocaleString()}
        </div>
      </div>
      
      <CardContent className="p-[1.5rem]">
        <h3 className="text-[1.5rem] font-bold text-[#1F2937] mb-[0.75rem] dark:text-[#F5F7FD]">{kit.name}</h3>
        <p className="text-[#4B5563] mb-[1rem] leading-relaxed dark:text-[#9CA3AF]">{kit.description}</p>
        
        <div className="mb-[1.5rem]">
          <div className="flex items-center justify-between mb-[0.5rem]">
            <h4 className="font-semibold text-[#374151] dark:text-[#D1D5DB]">What's included:</h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowDetails(!showDetails)}
              className="text-[#F97316] hover:text-[#EA580C] p-0 dark:text-[#FDBA74] dark:hover:text-[#EA580C]"
            >
              <Eye className="w-[1rem] h-[1rem] mr-[0.25rem]" />
              {showDetails ? 'Hide' : 'View All'}
            </Button>
          </div>
          
          <ul className="text-[0.875rem] text-[#4B5563] space-y-[0.25rem] dark:text-[#9CA3AF]">
            {(showDetails ? kit.items : kit.items.slice(0, 3)).map((item, index) => (
              <li key={index} className="flex items-center">
                <div className="w-[0.5rem] h-[0.5rem] bg-[#FBBF24] rounded-full mr-[0.5rem] dark:bg-[#FDBA74]"></div>
                {item}
              </li>
            ))}
            {!showDetails && kit.items.length > 3 && (
              <li className="text-[#F97316] font-medium dark:text-[#FDBA74]">+ {kit.items.length - 3} more items</li>
            )}
          </ul>
        </div>

        {/* Quantity Selector */}
        <div className="mb-[1rem]">
          <label className="block text-[0.875rem] font-medium text-[#374151] mb-[0.5rem] dark:text-[#D1D5DB]">
            Number of kits:
          </label>
          <div className="flex items-center space-x-[0.75rem]">
            <Button
              variant="outline"
              size="sm"
              onClick={decrementQuantity}
              className="h-[2.5rem] w-[2.5rem] p-0 border-[#DCE4F2] text-[#2A3B5B] hover:bg-[#F4F6FB] hover:text-[#2A3B5B] dark:border-[#3F4856] dark:text-[#F5F7FD] dark:hover:bg-[#3F4856] dark:hover:text-[#F5F7FD]"
            >
              <Minus className="w-[1rem] h-[1rem]" />
            </Button>
            <Input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-[5rem] text-center bg-[#FFFFFF] border-[#D1D5DB] focus:border-[#F97316] focus:ring-[#F97316] dark:bg-[#0F172A] dark:border-[#6B7280] dark:focus:border-[#FDBA74] dark:focus:ring-[#FDBA74]"
              min="1"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={incrementQuantity}
              className="h-[2.5rem] w-[2.5rem] p-0 border-[#DCE4F2] text-[#2A3B5B] hover:bg-[#F4F6FB] hover:text-[#2A3B5B] dark:border-[#3F4856] dark:text-[#F5F7FD] dark:hover:bg-[#3F4856] dark:hover:text-[#F5F7FD]"
            >
              <Plus className="w-[1rem] h-[1rem]" />
            </Button>
          </div>
          <p className="text-[0.875rem] text-[#6B7280] mt-[0.25rem] dark:text-[#9CA3AF]">
            Total: ₹{(kit.price * quantity).toLocaleString()}
          </p>
        </div>
        
        {/* Action Buttons */}
        <div className="space-y-[0.75rem]">
          <Button 
            onClick={handleAddToCart}
            className="w-full bg-[#F97316] hover:bg-[#EA580C] text-[#FFFFFF] py-[0.75rem] rounded-[0.5rem] font-semibold transition-colors duration-300 dark:bg-[#FDBA74] dark:hover:bg-[#EA580C]"
          >
            <ShoppingCart className="w-[1rem] h-[1rem] mr-[0.5rem]" />
            Add {quantity} to Cart
          </Button>
          
          <Button 
            onClick={handleViewDetails}
            variant="outline"
            className="w-full border-[#F97316] text-[#F97316] hover:bg-[#FFF7ED] py-[0.75rem] rounded-[0.5rem] font-semibold transition-colors duration-300 dark:border-[#FDBA74] dark:text-[#FDBA74] dark:hover:bg-[#7C2D12]"
          >
            <Eye className="w-[1rem] h-[1rem] mr-[0.5rem]" />
            View Details & Donate
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default KitCard;