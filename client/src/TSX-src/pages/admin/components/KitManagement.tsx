import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Textarea } from '../../../components/ui/textarea';
import { Label } from '../../../components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/table';
import { PlusCircle, Edit3, Trash2, Save, X, Upload, Eye, ToggleLeft, ToggleRight, Package } from 'lucide-react';

const KitManagement = () => {
  const [kits, setKits] = useState([
    {
      id: 1,
      name: 'Annadanam Kit',
      description: 'Complete meal kit providing nutritious food for families in need',
      price: 500,
      image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      category: 'Food',
      active: true,
      items: [
        { id: 1, name: 'Rice', quantity: 5, unit: 'kg' },
        { id: 2, name: 'Dal', quantity: 2, unit: 'kg' },
        { id: 3, name: 'Oil', quantity: 1, unit: 'L' },
        { id: 4, name: 'Spices', quantity: 1, unit: 'packet' },
        { id: 5, name: 'Vegetables', quantity: 2, unit: 'kg' }
      ]
    },
    {
      id: 2,
      name: 'Vidya Kit',
      description: 'Educational supplies kit for underprivileged children',
      price: 750,
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      category: 'Education',
      active: true,
      items: [
        { id: 6, name: 'Notebooks', quantity: 10, unit: 'pieces' },
        { id: 7, name: 'Pencils', quantity: 12, unit: 'pieces' },
        { id: 8, name: 'Eraser', quantity: 2, unit: 'pieces' },
        { id: 9, name: 'Scale', quantity: 1, unit: 'piece' },
        { id: 10, name: 'School Bag', quantity: 1, unit: 'piece' }
      ]
    },
    {
      id: 3,
      name: 'Swasthya Kit',
      description: 'Healthcare and hygiene essentials for families',
      price: 350,
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      category: 'Health',
      active: true,
      items: [
        { id: 11, name: 'Soap', quantity: 3, unit: 'pieces' },
        { id: 12, name: 'Toothpaste', quantity: 2, unit: 'tubes' },
        { id: 13, name: 'Toothbrush', quantity: 4, unit: 'pieces' },
        { id: 14, name: 'Sanitizer', quantity: 1, unit: 'bottle' },
        { id: 15, name: 'First Aid', quantity: 1, unit: 'kit' }
      ]
    }
  ]);

  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [previewKit, setPreviewKit] = useState(null);
  const [managingItemsFor, setManagingItemsFor] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: '',
    items: []
  });

  // Item management states
  const [newItem, setNewItem] = useState({
    name: '',
    quantity: 1,
    unit: 'pieces'
  });
  const [editingItemId, setEditingItemId] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, image: imageUrl });
    }
  };

  const handleSave = () => {
    if (editingId) {
      setKits(kits.map(kit => 
        kit.id === editingId 
          ? { ...kit, ...formData, price: parseFloat(formData.price) }
          : kit
      ));
      setEditingId(null);
    } else {
      const newKit = {
        id: Date.now(),
        ...formData,
        price: parseFloat(formData.price),
        active: true,
        items: []
      };
      setKits([...kits, newKit]);
      setIsCreating(false);
    }
    setFormData({ name: '', description: '', price: '', category: '', image: '', items: [] });
  };

  const handleDelete = (id) => {
    setKits(kits.filter(kit => kit.id !== id));
  };

  const handleEdit = (kit) => {
    setFormData({
      name: kit.name,
      description: kit.description,
      price: kit.price.toString(),
      category: kit.category,
      image: kit.image,
      items: kit.items || []
    });
    setEditingId(kit.id);
    setIsCreating(true);
  };

  const handleCancel = () => {
    setIsCreating(false);
    setEditingId(null);
    setPreviewKit(null);
    setManagingItemsFor(null);
    setFormData({ name: '', description: '', price: '', category: '', image: '', items: [] });
  };

  const toggleKitStatus = (id) => {
    setKits(kits.map(kit => 
      kit.id === id 
        ? { ...kit, active: !kit.active }
        : kit
    ));
  };

  const handlePreview = (kit) => {
    setPreviewKit(kit);
  };

  // Item management functions
  const handleManageItems = (kit) => {
    setManagingItemsFor(kit);
  };

  const handleAddItem = () => {
    if (!newItem.name.trim()) return;
    
    const updatedKit = {
      ...managingItemsFor,
      items: [
        ...managingItemsFor.items,
        {
          id: Date.now(),
          name: newItem.name,
          quantity: newItem.quantity,
          unit: newItem.unit
        }
      ]
    };
    
    setKits(kits.map(kit => kit.id === managingItemsFor.id ? updatedKit : kit));
    setManagingItemsFor(updatedKit);
    setNewItem({ name: '', quantity: 1, unit: 'pieces' });
  };

  const handleEditItem = (item) => {
    setEditingItemId(item.id);
    setNewItem({
      name: item.name,
      quantity: item.quantity,
      unit: item.unit
    });
  };

  const handleUpdateItem = () => {
    if (!newItem.name.trim()) return;
    
    const updatedKit = {
      ...managingItemsFor,
      items: managingItemsFor.items.map(item =>
        item.id === editingItemId
          ? { ...item, name: newItem.name, quantity: newItem.quantity, unit: newItem.unit }
          : item
      )
    };
    
    setKits(kits.map(kit => kit.id === managingItemsFor.id ? updatedKit : kit));
    setManagingItemsFor(updatedKit);
    setEditingItemId(null);
    setNewItem({ name: '', quantity: 1, unit: 'pieces' });
  };

  const handleDeleteItem = (itemId) => {
    const updatedKit = {
      ...managingItemsFor,
      items: managingItemsFor.items.filter(item => item.id !== itemId)
    };
    
    setKits(kits.map(kit => kit.id === managingItemsFor.id ? updatedKit : kit));
    setManagingItemsFor(updatedKit);
  };

  // Item Management View
  if (managingItemsFor) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Manage Items - {managingItemsFor.name}</h2>
          <Button onClick={() => setManagingItemsFor(null)} variant="outline">
            <X className="w-4 h-4 mr-2" />
            Back to Kits
          </Button>
        </div>

        {/* Add/Edit Item Form */}
        <Card>
          <CardHeader>
            <CardTitle>{editingItemId ? 'Edit Item' : 'Add New Item'}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="itemName">Item Name</Label>
                <Input
                  id="itemName"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  placeholder="Enter item name"
                />
              </div>
              <div>
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  value={newItem.quantity}
                  onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value) || 1 })}
                  min="1"
                />
              </div>
              <div>
                <Label htmlFor="unit">Unit</Label>
                <select
                  id="unit"
                  value={newItem.unit}
                  onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="pieces">Pieces</option>
                  <option value="kg">Kilogram</option>
                  <option value="L">Liter</option>
                  <option value="packet">Packet</option>
                  <option value="bottle">Bottle</option>
                  <option value="tube">Tube</option>
                  <option value="kit">Kit</option>
                </select>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              {editingItemId ? (
                <>
                  <Button onClick={handleUpdateItem} className="bg-green-600 hover:bg-green-700">
                    <Save className="w-4 h-4 mr-2" />
                    Update Item
                  </Button>
                  <Button 
                    onClick={() => {
                      setEditingItemId(null);
                      setNewItem({ name: '', quantity: 1, unit: 'pieces' });
                    }} 
                    variant="outline"
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <Button onClick={handleAddItem} className="bg-orange-600 hover:bg-orange-700">
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Add Item
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Items List */}
        <Card>
          <CardHeader>
            <CardTitle>Kit Items ({managingItemsFor.items.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {managingItemsFor.items.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Package className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>No items added to this kit yet.</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item Name</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Unit</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {managingItemsFor.items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{item.unit}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEditItem(item)}
                          >
                            <Edit3 className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeleteItem(item.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  // Preview View
  if (previewKit) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Kit Preview</h2>
          <Button onClick={() => setPreviewKit(null)} variant="outline">
            <X className="w-4 h-4 mr-2" />
            Close Preview
          </Button>
        </div>
        
        {/* Kit Preview Card */}
        <Card className="max-w-md mx-auto overflow-hidden hover:shadow-lg transition-shadow">
          <div className="aspect-square overflow-hidden">
            <img
              src={previewKit.image}
              alt={previewKit.name}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          <CardHeader>
            <div className="flex items-center justify-between">
              <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded-full text-xs">
                {previewKit.category}
              </span>
              <span className="text-2xl font-bold text-orange-600">₹{previewKit.price}</span>
            </div>
            <CardTitle className="text-xl">{previewKit.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">{previewKit.description}</p>
            <div className="mb-4">
              <h4 className="font-semibold mb-2">What's included:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                {previewKit.items.map((item, index) => (
                  <li key={index} className="flex items-center">
                    <span className="w-2 h-2 bg-orange-400 rounded-full mr-2"></span>
                    {typeof item === 'string' ? item : `${item.name} - ${item.quantity} ${item.unit}`}
                  </li>
                ))}
              </ul>
            </div>
            <Button className="w-full bg-orange-600 hover:bg-orange-700">
              Donate This Kit
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Main Kit Management View
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Donation Kits Management</CardTitle>
          <Button onClick={() => setIsCreating(true)} className="bg-orange-600 hover:bg-orange-700">
            <PlusCircle className="w-4 h-4 mr-2" />
            New Kit
          </Button>
        </CardHeader>
        <CardContent>
          {/* ... keep existing code (kit creation form) */}
          {isCreating && (
            <div className="mb-6 p-6 border rounded-lg bg-gray-50">
              <h3 className="text-lg font-semibold mb-4">
                {editingId ? 'Edit Kit' : 'Create New Kit'}
              </h3>
              
              {/* Image Upload */}
              <div className="mb-4">
                <Label htmlFor="image">Kit Image</Label>
                <div className="mt-2">
                  {formData.image ? (
                    <div className="relative">
                      <img
                        src={formData.image}
                        alt="Kit"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <Button
                        size="sm"
                        variant="destructive"
                        className="absolute top-2 right-2"
                        onClick={() => setFormData({ ...formData, image: '' })}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <label className="border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-orange-400 transition-colors">
                      <div className="text-center">
                        <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                        <p className="text-gray-600">Click to upload kit image</p>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <Label htmlFor="name">Kit Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Kit name"
                  />
                </div>
                <div>
                  <Label htmlFor="price">Price (₹)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="0"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Select category</option>
                    <option value="Food">Food</option>
                    <option value="Education">Education</option>
                    <option value="Health">Health</option>
                    <option value="Clothing">Clothing</option>
                  </select>
                </div>
              </div>
              
              <div className="mb-4">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Kit description"
                  rows={3}
                />
              </div>
              
              <div className="flex gap-2">
                <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </Button>
                <Button 
                  onClick={() => handlePreview({ ...formData, id: Date.now(), active: true, items: [] })} 
                  variant="outline"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
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
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {kits.map((kit) => (
                <TableRow key={kit.id}>
                  <TableCell>
                    <img 
                      src={kit.image} 
                      alt={kit.name} 
                      className="w-12 h-12 object-cover rounded"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{kit.name}</TableCell>
                  <TableCell>{kit.category}</TableCell>
                  <TableCell>₹{kit.price}</TableCell>
                  <TableCell>
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
                      {kit.items.length} items
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => toggleKitStatus(kit.id)}
                      className="flex items-center gap-2"
                    >
                      {kit.active ? (
                        <>
                          <ToggleRight className="w-4 h-4 text-green-600" />
                          Active
                        </>
                      ) : (
                        <>
                          <ToggleLeft className="w-4 h-4 text-gray-400" />
                          Inactive
                        </>
                      )}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleManageItems(kit)}
                        title="Manage Items"
                      >
                        <Package className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handlePreview(kit)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(kit)}
                      >
                        <Edit3 className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(kit.id)}
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
    </div>
  );
};

export default KitManagement;
