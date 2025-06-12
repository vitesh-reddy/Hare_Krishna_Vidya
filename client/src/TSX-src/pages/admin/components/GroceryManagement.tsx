import React, { useState } from 'react';
import toast from 'react-hot-toast';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Textarea } from '../../../components/ui/textarea';
import { Label } from '../../../components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../../../components/ui/table';
import {
  PlusCircle,
  Edit3,
  Trash2,
  Save,
  X,
  Grid2X2,
  Upload,
  ToggleLeft,
  ToggleRight,
  Eye,
  Users
} from 'lucide-react';

const GroceryManagement = () => {
  const mockGroceryItems = [
  {
    id: 'rice-10kg',
    name: 'Rice 10Kg',
    price: 400,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    description: 'Premium quality basmati rice, ideal for daily meals',
    serve: '4-5 people for 2 weeks',
    active: true,
    lastUpdated: '2024-05-20'
  },
  {
    id: 'desi-ghee-1l',
    name: 'Desi Ghee',
    price: 600,
    image: 'https://images.unsplash.com/photo-1598373182123-374ef12d5e4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    description: 'Pure desi ghee made from cow milk',
    serve: 'Family of 4 for 1 month',
    active: true,
    lastUpdated: '2024-05-20'
  },
  {
    id: 'masoor-dal-5kg',
    name: 'Masoor Dal',
    price: 350,
    image: 'https://images.unsplash.com/photo-1615897649723-5e2ad59e9321?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    description: 'High-protein red lentils for nutritious meals',
    serve: 'Family meals for 3 weeks',
    active: true,
    lastUpdated: '2024-05-19'
  },
  {
    id: 'cooking-oil-1l',
    name: 'Cooking Oil',
    price: 180,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    description: 'Refined sunflower oil for healthy cooking',
    serve: 'Family cooking for 2 weeks',
    active: true,
    lastUpdated: '2024-05-18'
  }
];
  const [groceryItems, setGroceryItems] = useState(mockGroceryItems);

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [previewItem, setPreviewItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    image: '',
    description: '',
    serve: '',
    active: true
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, image: imageUrl });
    }
  };

  const handleEdit = (item) => {
    setFormData({
      name: item.name,
      price: item.price,
      image: item.image,
      description: item.description,
      serve: item.serve,
      active: item.active
    });
    setEditingId(item.id);
    setIsEditing(true);
  };

  const handleSave = () => {
    // Validate required fields
    if (!formData.name.trim()) {
      toast.error('Item name is required');
      return;
    }
    if (!formData.price || formData.price <= 0) {
      toast.error('Valid price is required');
      return;
    }
    if (!formData.image) {
      toast.error('Item image is required');
      return;
    }
    if (!formData.description.trim()) {
      toast.error('Description is required');
      return;
    }
    if (!formData.serve.trim()) {
      toast.error('Serve information is required');
      return;
    }

    if (editingId) {
      setGroceryItems(groceryItems.map(item =>
        item.id === editingId
          ? { ...item, ...formData, lastUpdated: new Date().toISOString().split('T')[0] }
          : item
      ));
      toast.success('Grocery item updated successfully');
      setEditingId(null);
    } else {
      const newItem = {
        id: `${formData.name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
        ...formData,
        lastUpdated: new Date().toISOString().split('T')[0]
      };
      setGroceryItems([...groceryItems, newItem]);
      toast.success('Grocery item added successfully');
    }
    setIsEditing(false);
    setFormData({ name: '', price: 0, image: '', description: '', serve: '', active: true });
  };

  const handleDelete = (id) => {
    setGroceryItems(groceryItems.filter(item => item.id !== id));
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingId(null);
    setPreviewItem(null);
    setFormData({ name: '', price: 0, image: '', description: '', serve: '', active: true });
  };

  const toggleItemStatus = (id) => {
    setGroceryItems(groceryItems.map(item =>
      item.id === id
        ? { ...item, active: !item.active }
        : item
    ));
  };

  const handlePreview = (item) => {
    setPreviewItem(item);
  };

  // Preview View
  if (previewItem) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Grocery Item Preview</h2>
          <Button onClick={() => setPreviewItem(null)} variant="outline">
            <X className="w-4 h-4 mr-2" />
            Close Preview
          </Button>
        </div>

        <Card className="group hover:shadow-2xl transition-all w-[50%] duration-300 transform hover:-translate-y-[0.5rem] bg-[#FFFFFF] border-0 shadow-lg overflow-hidden dark:bg-[#0F172A]">
          <div className="relative overflow-hidden">
            <img
              src={previewItem.image}
              alt={previewItem.name}
              className="w-full h-[25rem] object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-[1rem] right-[1rem] bg-[#16A34A] text-[#F5F7FD] px-[0.75rem] py-[0.25rem] rounded-full text-[0.875rem] font-semibold">
              ₹{previewItem.price.toLocaleString()}
            </div>
          </div>
          <CardContent className="p-[1.5rem]">
            <h3 className="text-[1.25rem] font-bold text-[#1F2937] mb-[0.5rem] dark:text-[#F5F7FD]">{previewItem.name}</h3>
            <p className="text-[#4B5563] mb-[1rem] text-[0.875rem] leading-relaxed dark:text-[#9CA3AF]">{previewItem.description}</p>
            <div className="mb-[1rem] p-[0.75rem] bg-[#ECFDF5] rounded-lg border border-[#BBF7D0] dark:bg-[#1A3C34] dark:border-[#15803D]">
              <div className="flex items-center text-[#15803D] text-[0.875rem] dark:text-[#16A34A]">
                <Users className="w-[1rem] h-[1rem] mr-[0.5rem]" />
                <span className="font-medium">{previewItem.serve}</span>
              </div>
            </div>
            <Button
              onClick={() => setPreviewItem(null)}
              className="w-full bg-[#16A34A] hover:bg-[#15803D] text-[#F5F7FD] py-[0.5rem] rounded-lg font-semibold transition-colors duration-300 text-[0.875rem] dark:bg-[#16A34A] dark:hover:bg-[#15803D] dark:text-[#F5F7FD]"
            >
              Close Preview
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row itemsennes-center justify-between">
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <Label htmlFor="price">Price (₹)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label htmlFor="serve">Serve</Label>
                  <Input
                    id="serve"
                    value={formData.serve}
                    onChange={(e) => setFormData({ ...formData, serve: e.target.value })}
                    placeholder="e.g., 20 people"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Enter item description"
                    rows={3}
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="image">Item Image</Label>
                  <div className="mt-2">
                    {formData.image ? (
                      <div className="relative">
                        <img
                          src={formData.image}
                          alt="Grocery item"
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
                      <label className="border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-purple-400 transition-colors">
                        <div className="text-center">
                          <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                          <p className="text-gray-600">Click to upload item image</p>
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
              </div>
              <div className="flex gap-2 mt-4">
                <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </Button>
                <Button
                  onClick={() => handlePreview({
                    ...formData,
                    id: Date.now(),
                    active: true,
                    lastUpdated: new Date().toISOString().split('T')[0]
                  })}
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
                <TableHead>Item Name</TableHead>
                <TableHead>Price (₹)</TableHead>
                <TableHead>Serve</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {groceryItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>₹{item.price}</TableCell>
                  <TableCell>{item.serve}</TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => toggleItemStatus(item.id)}
                      className="flex items-center gap-2"
                    >
                      {item.active ? (
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
                  <TableCell className="text-sm text-gray-500">{item.lastUpdated}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handlePreview(item)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
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
            <Button variant="outline">📥 Import CSV</Button>
            <Button variant="outline">📤 Export Data</Button>
            <Button variant="outline">🔄 Sync Prices</Button>
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