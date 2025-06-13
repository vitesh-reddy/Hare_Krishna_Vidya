import GroceryItem from '../models/GroceryItem.js';

// CREATE
export const createGroceryItem = async (data) => {
  const item = new GroceryItem({ ...data, lastUpdated: new Date() });
  return await item.save();
};

// READ - Get all grocery items 
export const getAllGroceryItems = async () => {
  return await GroceryItem.find();
};

// READ - Get only active grocery items
export const getActiveGroceryItems = async () => {
  return await GroceryItem.find({ active: true });
};

// READ - Get single item by ID
export const getGroceryItemById = async (id) => {
  return await GroceryItem.findById(id);
};

// UPDATE
export const updateGroceryItem = async (id, updates) => {
  updates.lastUpdated = new Date();
  return await GroceryItem.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
};

export const toggleGroceryActiveStatus = async (groceryId, active) => {
  const grocery = await GroceryItem.findById(groceryId);
  if (!grocery) throw new Error('Grocery item not found');

  grocery.active = active;
  await grocery.save();

  return true;
};

// DELETE
export const deleteGroceryItem = async (id) => {
  return await GroceryItem.findByIdAndDelete(id);
};
