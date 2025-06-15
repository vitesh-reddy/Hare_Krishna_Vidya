import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Textarea } from '../../../components/ui/textarea';
import { Label } from '../../../components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/table';
import { PlusCircle, Edit3, Trash2, Save, X, Upload, Eye, ToggleLeft, ToggleRight } from 'lucide-react';
import { useKitsAdmin } from '../../../../contexts/KitAdminContext';
import Loader from '../../../../components/common/Loader';

const KitManagement = () => {
  const {
    kits,
    fetchKits,
    createKit,
    updateKit,
    deleteKit,
    toggleKitActiveStatus,
    loading,
  } = useKitsAdmin();

  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [previewKit, setPreviewKit] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [kitToDelete, setKitToDelete] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: '',
    items: [],
  });
  const [imageFile, setImageFile] = useState(null);
  const [newItem, setNewItem] = useState('');
  const [editingItemIndex, setEditingItemIndex] = useState(null);

  useEffect(() => {
    fetchKits();
  }, [fetchKits]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, image: imageUrl });
      setImageFile(file);
    }
  };

  const handleSave = async () => {
    if (!formData.name.trim()) {
      toast.error('Kit name is required');
      return;
    }
    if (!formData.price || parseFloat(formData.price) <= 0) {
      toast.error('Valid price is required');
      return;
    }
    if (!formData.category) {
      toast.error('Category is required');
      return;
    }
    if (!formData.image) {
      toast.error('Kit image is required');
      return;
    }
    if (!formData.description.trim()) {
      toast.error('Description is required');
      return;
    }
    if (formData.items.length === 0) {
      toast.error('At least one item is required');
      return;
    }

    try {
      const kitData = {
        ...formData,
        price: parseFloat(formData.price),
        items: formData.items.filter((item) => item.trim()),
      };

      if (editingId) {
        await updateKit(editingId, kitData, imageFile);
        setEditingId(null);
      } else {
        await createKit(kitData, imageFile);
      }

      setIsCreating(false);
      setFormData({ name: '', description: '', price: '', category: '', image: '', items: [] });
      setImageFile(null);
      setNewItem('');
      setEditingItemIndex(null);
    } catch (error) {
      // Error is already handled in context
    }
  };

  const handleDeleteClick = (id) => {
    setKitToDelete(id);
    setShowDeleteDialog(true);
  };

  const confirmDelete = async () => {
    if (kitToDelete) {
      await deleteKit(kitToDelete);
      setShowDeleteDialog(false);
      setKitToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteDialog(false);
    setKitToDelete(null);
  };

  const handleEdit = (kit) => {
    setFormData({
      name: kit.name,
      description: kit.description,
      price: kit.price.toString(),
      category: kit.category,
      image: kit.image,
      items: [...kit.items],
    });
    setEditingId(kit._id);
    setIsCreating(true);
    setImageFile(null);
  };

  const handleCancel = () => {
    setIsCreating(false);
    setEditingId(null);
    setPreviewKit(null);
    setFormData({ name: '', description: '', price: '', category: '', image: '', items: [] });
    setImageFile(null);
    setNewItem('');
    setEditingItemIndex(null);
  };

  const toggleKitStatus = async (id) => {
    await toggleKitActiveStatus(id);
  };

  const handlePreview = (kit) => {
    setPreviewKit(kit);
  };

  const handleAddItem = () => {
    if (!newItem.trim()) return;
    setFormData({
      ...formData,
      items: [...formData.items, newItem.trim()],
    });
    setNewItem('');
  };

  const handleEditItem = (index) => {
    setEditingItemIndex(index);
    setNewItem(formData.items[index]);
  };

  const handleUpdateItem = () => {
    if (!newItem.trim()) return;
    const updatedItems = [...formData.items];
    updatedItems[editingItemIndex] = newItem.trim();
    setFormData({ ...formData, items: updatedItems });
    setNewItem('');
    setEditingItemIndex(null);
  };

  const handleDeleteItem = (index) => {
    setFormData({
      ...formData,
      items: formData.items.filter((_, i) => i !== index),
    });
  };

  if (loading) {
    return <Loader/>
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
                    {item}
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

  return (
    <div className="space-y-6">
      {/* Delete Confirmation Dialog */}
      {showDeleteDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Confirm Deletion
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Are you sure you want to delete this kit? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={cancelDelete}
                className="text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                No
              </Button>
              <Button
                variant="destructive"
                onClick={confirmDelete}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Yes
              </Button>
            </div>
          </div>
        </div>
      )}

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Donation Kits Management</CardTitle>
          <Button onClick={() => setIsCreating(true)} className="bg-orange-600 hover:bg-orange-700">
            <PlusCircle className="w-4 h-4 mr-2" />
            New Kit
          </Button>
        </CardHeader>
        <CardContent>
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
                        className="w-[20rem] h-fit mx-auto object-cover rounded-lg"
                      />
                      <Button
                        size="sm"
                        variant="destructive"
                        className="absolute top-2 right-2"
                        onClick={() => {
                          setFormData({ ...formData, image: '' });
                          setImageFile(null);
                        }}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <label className="border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-orange-400 transition-colors">
                      <div className="text-center">
                        <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                        <p className="text-gray-600">Click to upload kit image</p>
                        <p className="text-gray-600 text-[0.75rem]">Upload less than 5MB</p>
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

              {/* Items Management */}
              <div className="mb-4">
                <Label htmlFor="item">Add Item</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    id="item"
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    placeholder="Enter item (e.g., Rice - 5kg)"
                  />
                  {editingItemIndex !== null ? (
                    <>
                      <Button onClick={handleUpdateItem} className="bg-green-600 hover:bg-green-700">
                        <Save className="w-4 h-4 mr-2" />
                        Update
                      </Button>
                      <Button
                        onClick={() => {
                          setEditingItemIndex(null);
                          setNewItem('');
                        }}
                        variant="outline"
                      >
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Button onClick={handleAddItem} className="bg-orange-600 hover:bg-orange-700">
                      <PlusCircle className="w-4 h-4 mr-2" />
                      Add
                    </Button>
                  )}
                </div>
                {formData.items.length > 0 && (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Item</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {formData.items.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>{item}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleEditItem(index)}
                              >
                                <Edit3 className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleDeleteItem(index)}
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
              </div>

              <div className="flex gap-2">
                <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </Button>
                <Button
                  onClick={() =>
                    handlePreview({
                      ...formData,
                      _id: editingId || Date.now(),
                      active: true,
                      price: parseFloat(formData.price) || 0,
                    })
                  }
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
                <TableRow key={kit._id}>
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
                      onClick={() => toggleKitStatus(kit._id)}
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
                        onClick={() => handleDeleteClick(kit._id)}
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