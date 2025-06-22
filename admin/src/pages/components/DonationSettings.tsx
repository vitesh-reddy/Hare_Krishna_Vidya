
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../TSX-src/components/ui/card';
import { Button } from '../../TSX-src/components/ui/button';
import { Input } from '../../TSX-src/components/ui/input';
import { Textarea } from '../../TSX-src/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../TSX-src/components/ui/table';
import { Save, RefreshCw, Settings } from 'lucide-react';

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
      {/* Settings Header */}
      <Card className="border-orange-200">
        <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50">
          <div className="flex items-center space-x-3">
            <Settings className="w-6 h-6 text-orange-600" />
            <div>
              <CardTitle className="text-orange-800">Donation Settings</CardTitle>
              <p className="text-sm text-orange-600 mt-1">Configure pricing and donation parameters</p>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Kit Pricing */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Donation Kit Pricing</CardTitle>
          <div className="flex gap-2">
            <Button onClick={handleResetKitPrices} variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Reset
            </Button>
            <Button onClick={handleSaveKitPrices} className="bg-green-600 hover:bg-green-700">
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Kit Name</TableHead>
                <TableHead>Current Price (₹)</TableHead>
                <TableHead>New Price (₹)</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {kits.map((kit) => (
                <TableRow key={kit.id}>
                  <TableCell className="font-medium">{kit.name}</TableCell>
                  <TableCell>₹{kit.currentPrice}</TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={kit.newPrice}
                      onChange={(e) => handleKitPriceChange(kit.id, e.target.value)}
                      className="w-24"
                    />
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <p className="text-sm text-gray-600">{kit.description}</p>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Grocery Item Pricing */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Grocery Item Pricing</CardTitle>
          <div className="flex gap-2">
            <Button onClick={handleResetGroceryPrices} variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Reset
            </Button>
            <Button onClick={handleSaveGroceryPrices} className="bg-green-600 hover:bg-green-700">
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item Name</TableHead>
                <TableHead>Current Price (₹)</TableHead>
                <TableHead>New Price (₹)</TableHead>
                <TableHead>Change (%)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {groceryItems.map((item) => {
                const changePercent = item.currentPrice > 0 
                  ? ((item.newPrice - item.currentPrice) / item.currentPrice * 100)
                  : 0;
                
                return (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>₹{item.currentPrice}</TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={item.newPrice}
                        onChange={(e) => handleGroceryPriceChange(item.id, e.target.value)}
                        className="w-24"
                      />
                    </TableCell>
                    <TableCell>
                      <span className={`text-sm ${
                        changePercent > 0 ? 'text-red-600' : 
                        changePercent < 0 ? 'text-green-600' : 'text-gray-600'
                      }`}>
                        {changePercent > 0 ? '+' : ''}{changePercent.toFixed(1)}%
                      </span>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pricing Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Pricing Guidelines & Audit Trail</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Best Practices</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Review market prices monthly</li>
                <li>• Consider seasonal variations</li>
                <li>• Maintain transparency with donors</li>
                <li>• Factor in distribution costs</li>
              </ul>
              <div className="mt-4 p-3 bg-orange-50 rounded-lg">
                <p className="text-sm text-orange-700">
                  <strong>Last updated:</strong> May 20, 2024 at 2:30 PM by Admin User
                </p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Notes</h4>
              <Textarea
                placeholder="Add notes about recent price changes, market conditions, or other relevant information..."
                rows={4}
                className="resize-none"
              />
              <Button className="mt-2" size="sm">Save Notes</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DonationSettings;
