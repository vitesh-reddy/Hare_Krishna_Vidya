
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/table';
import { PlusCircle, Edit3, Trash2, Save, X, Grid2X2 } from 'lucide-react';

const GroceryManagement = () => {
  const [groceryItems, setGroceryItems] = useState([
    { 
      id: 'rice-10kg', 
      name: 'Rice 10Kg', 
      unit: 'kg', 
      pricePerUnit: 40, 
      quantity: 10,
      associatedKit: 'Hope Basic Kit',
      lastUpdated: '2024-05-20'
    },
    { 
      id: 'desi-ghee-1l', 
      name: 'Desi Ghee', 
      unit: 'litre', 
      pricePerUnit: 600, 
      quantity: 1,
      associatedKit: 'Hope Premium Kit',
      lastUpdated: '2024-05-20'
    },
    { 
      id: 'masoor-dal-5kg', 
      name: 'Masoor Dal', 
      unit: 'kg', 
      pricePerUnit: 70, 
      quantity: 5,
      associatedKit: 'Hope Basic Kit',
      lastUpdated: '2024-05-19'
    },
    { 
      id: 'cooking-oil-1l', 
      name: 'Cooking Oil', 
      unit: 'litre', 
      pricePerUnit: 180, 
      quantity: 1,
      associatedKit: 'Hope Family Kit',
      lastUpdated: '2024-05-18'
    }
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    unit: 'kg',
    pricePerUnit: 0,
    quantity: 0,
    associatedKit: ''
  });

  const handleEdit = (item: any) => {
    setFormData({
      name: item.name,
      unit: item.unit,
      pricePerUnit: item.pricePerUnit,
      quantity: item.quantity,
      associatedKit: item.associatedKit
    });
    setEditingId(item.id);
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editingId) {
      setGroceryItems(groceryItems.map(item => 
        item.id === editingId 
          ? { ...item, ...formData, lastUpdated: new Date().toISOString().split('T')[0] }
          : item
      ));
      setEditingId(null);
    } else {
      const newItem = {
        id: `${formData.name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
        ...formData,
        lastUpdated: new Date().toISOString().split('T')[0]
      };
      setGroceryItems([...groceryItems, newItem]);
    }
    setIsEditing(false);
    setFormData({ name: '', unit: 'kg', pricePerUnit: 0, quantity: 0, associatedKit: '' });
  };

  const handleDelete = (id: string) => {
    setGroceryItems(groceryItems.filter(item => item.id !== id));
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingId(null);
    setFormData({ name: '', unit: 'kg', pricePerUnit: 0, quantity: 0, associatedKit: '' });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center space-x-3">
            <Grid2X2 className="w-6 h-6 text-purple-600" />
            <div>
              <CardTitle>Grocery Item Management</CardTitle>
              <p className="text-sm text-gray-600 mt-1">Manage grocery items and their pricing</p>
            </div>
          </div>
          <Button onClick={() => setIsEditing(true)} className="bg-purple-600 hover:bg-purple-700">
            <PlusCircle className="w-4 h-4 mr-2" />
            Add Item
          </Button>
        </CardHeader>
        <CardContent>
          {isEditing && (
            <div className="mb-6 p-6 border rounded-lg bg-purple-50">
              <h3 className="text-lg font-semibold mb-4 text-purple-800">
                {editingId ? 'Edit Grocery Item' : 'Add New Grocery Item'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="itemName">Item Name</Label>
                  <Input
                    id="itemName"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Basmati Rice"
                  />
                </div>
                <div>
                  <Label htmlFor="unit">Unit</Label>
                  <select
                    id="unit"
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="kg">Kilogram (kg)</option>
                    <option value="litre">Litre</option>
                    <option value="piece">Piece</option>
                    <option value="packet">Packet</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="pricePerUnit">Price Per Unit (₹)</Label>
                  <Input
                    id="pricePerUnit"
                    type="number"
                    value={formData.pricePerUnit}
                    onChange={(e) => setFormData({ ...formData, pricePerUnit: parseFloat(e.target.value) || 0 })}
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: parseFloat(e.target.value) || 0 })}
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label htmlFor="associatedKit">Associated Kit</Label>
                  <select
                    id="associatedKit"
                    value={formData.associatedKit}
                    onChange={(e) => setFormData({ ...formData, associatedKit: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">Select Kit</option>
                    <option value="Hope Basic Kit">Hope Basic Kit</option>
                    <option value="Hope Premium Kit">Hope Premium Kit</option>
                    <option value="Hope Family Kit">Hope Family Kit</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </Button>
                <Button onClick={handleCancel} variant="outline">
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </div>
          )}

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item Name</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead>Price/Unit (₹)</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Total Cost (₹)</TableHead>
                <TableHead>Associated Kit</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {groceryItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.unit}</TableCell>
                  <TableCell>₹{item.pricePerUnit}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell className="font-semibold">₹{item.pricePerUnit * item.quantity}</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
                      {item.associatedKit}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm text-gray-500">{item.lastUpdated}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(item)}
                      >
                        <Edit3 className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(item.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Bulk Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Button variant="outline">
              📥 Import CSV
            </Button>
            <Button variant="outline">
              📤 Export Data
            </Button>
            <Button variant="outline">
              🔄 Sync Prices
            </Button>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Last bulk update: May 15, 2024 by Admin User
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default GroceryManagement;
