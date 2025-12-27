import GroceryItem from '../models/GroceryItem.js';
import { addRecentActivity } from './updatesServices.js';

export const createGroceryItem = async (data) => {
  const item = new GroceryItem({ ...data, lastUpdated: new Date() });
  const saved = await item.save();
  
  await addRecentActivity({ action: `Grocery created: ${saved.name}`, type: 'grocery' });
  return saved;
};

export const updateGroceryItem = async (id, updates) => {
  updates.lastUpdated = new Date();
  const updated = await GroceryItem.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
  
  await addRecentActivity({ action: `Grocery updated: ${updated?.name || id}`, type: 'grocery' });
  return updated;
};

export const toggleGroceryActiveStatus = async (groceryId) => {
  const grocery = await GroceryItem.findById(groceryId);
  if (!grocery) throw new Error('Grocery item not found');

  grocery.active = !grocery.active;
  await grocery.save();
  
  const status = grocery.active ? 'enabled' : 'disabled';
  await addRecentActivity({ action: `Grocery ${status}: ${grocery.name}`, type: 'grocery' });
  return true;
};

export const deleteGroceryItem = async (id) => {
  const deleted = await GroceryItem.findByIdAndDelete(id);
  
  await addRecentActivity({ action: `Grocery deleted: ${deleted?.name || id}`, type: 'grocery' });
  return deleted;
};

export const getAllGroceryItems = async () => {
  return await GroceryItem.find();
};

export const getActiveGroceryItemsCount = async () => {
  return await GroceryItem.countDocuments({ active: true });
}

export const getActiveGroceryItems = async () => {
  return await GroceryItem.find({ active: true });
};

export const getGroceryItemById = async (id) => {
  return await GroceryItem.findById(id);
};