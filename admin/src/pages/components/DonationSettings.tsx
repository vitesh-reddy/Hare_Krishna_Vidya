
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle } from '../../TSX-src/components/ui/card';
import { Settings } from 'lucide-react';
import ProfilePage from './ProfilePage';

const DonationSettings = () => {
  const [kits, setKits] = useState([
    {
      id: 'hope-basic',
      name: 'Hope Basic Kit',
      currentPrice: 500,
      newPrice: 500,
      description: 'Essential food items for a family of 4 for one week'
    },
    {
      id: 'hope-premium',
      name: 'Hope Premium Kit',
      currentPrice: 1000,
      newPrice: 1000,
      description: 'Complete nutrition kit with premium items for a family of 4'
    },
    {
      id: 'hope-family',
      name: 'Hope Family Kit',
      currentPrice: 1500,
      newPrice: 1500,
      description: 'Comprehensive kit for larger families with extended support'
    }
  ]);

  const [groceryItems, setGroceryItems] = useState([
    { id: 'rice-10kg', name: 'Rice 10Kg', currentPrice: 400, newPrice: 400 },
    { id: 'desi-ghee-1l', name: 'Desi Ghee 1L', currentPrice: 600, newPrice: 600 },
    { id: 'masoor-dal-5kg', name: 'Masoor Dal 5Kg', currentPrice: 350, newPrice: 350 },
    { id: 'cooking-oil-1l', name: 'Cooking Oil 1L', currentPrice: 180, newPrice: 180 },
    { id: 'spices-essentials', name: 'Spices & Essentials', currentPrice: 250, newPrice: 250 },
    { id: 'wheat-flour-10kg', name: 'Wheat Flour 10Kg', currentPrice: 320, newPrice: 320 }
  ]);

  const handleKitPriceChange = (id: string, newPrice: string) => {
    setKits(kits.map(kit => 
      kit.id === id ? { ...kit, newPrice: parseFloat(newPrice) || 0 } : kit
    ));
  };

  const handleGroceryPriceChange = (id: string, newPrice: string) => {
    setGroceryItems(groceryItems.map(item => 
      item.id === id ? { ...item, newPrice: parseFloat(newPrice) || 0 } : item
    ));
  };

  const handleSaveKitPrices = () => {
    setKits(kits.map(kit => ({ ...kit, currentPrice: kit.newPrice })));
    console.log('Kit prices updated:', kits);
  };

  const handleSaveGroceryPrices = () => {
    setGroceryItems(groceryItems.map(item => ({ ...item, currentPrice: item.newPrice })));
    console.log('Grocery prices updated:', groceryItems);
  };

  const handleResetKitPrices = () => {
    setKits(kits.map(kit => ({ ...kit, newPrice: kit.currentPrice })));
  };

  const handleResetGroceryPrices = () => {
    setGroceryItems(groceryItems.map(item => ({ ...item, newPrice: item.currentPrice })));
  };

  return (
    <div className="space-y-6">
      <Card className="border-orange-200">
        <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50">
          <div className="flex items-center space-x-3">
            <Settings className="w-6 h-6 text-orange-600" />
            <div>
              <CardTitle className="text-orange-800">Profile Management</CardTitle>
              <p className="text-sm text-orange-600 mt-2">Configure Profile Settings </p>
            </div>
          </div>
        </CardHeader>
      </Card>

      <ProfilePage/>
    </div>
  );
};

export default DonationSettings;
