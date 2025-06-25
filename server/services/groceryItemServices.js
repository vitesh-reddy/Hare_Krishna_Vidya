import GroceryItem from '../models/GroceryItem.js';
import {uploadToCloudinary} from '../config/cloudinaryConfig.js'
import { addRecentActivity } from './updatesServices.js';
// CREATE
export const createGroceryItem = async (data) => {
  const item = new GroceryItem({ ...data, lastUpdated: new Date() });
  const saved = await item.save();
  // Log grocery creation activity
  await addRecentActivity({ action: `Grocery created: ${saved.name}`, type: 'grocery' });
  return saved;
};

// UPDATE
export const updateGroceryItem = async (id, updates) => {
  updates.lastUpdated = new Date();
  const updated = await GroceryItem.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
  // Log grocery update activity
  await addRecentActivity({ action: `Grocery updated: ${updated?.name || id}`, type: 'grocery' });
  return updated;
};

export const toggleGroceryActiveStatus = async (groceryId) => {
  const grocery = await GroceryItem.findById(groceryId);
  if (!grocery) throw new Error('Grocery item not found');

  grocery.active = !grocery.active;
  await grocery.save();
  // Log grocery status toggle activity
  const status = grocery.active ? 'enabled' : 'disabled';
  await addRecentActivity({ action: `Grocery ${status}: ${grocery.name}`, type: 'grocery' });
  return true;
};

// DELETE
export const deleteGroceryItem = async (id) => {
  const deleted = await GroceryItem.findByIdAndDelete(id);
  // Log grocery deletion activity
  await addRecentActivity({ action: `Grocery deleted: ${deleted?.name || id}`, type: 'grocery' });
  return deleted;
};

// READ - Get all grocery items 
export const getAllGroceryItems = async () => {
  return await GroceryItem.find();
};

export const getActiveGroceryItemsCount = async () => {
  return await GroceryItem.countDocuments({ active: true });
}

// READ - Get only active grocery items
export const getActiveGroceryItems = async () => {
  return await GroceryItem.find({ active: true });
};

// READ - Get single item by ID
export const getGroceryItemById = async (id) => {
  return await GroceryItem.findById(id);
};