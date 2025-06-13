import Kit from '../models/Kit.js';

// ✅ Create a new kit
export const createKit = async (kitData) => {
  const newKit = new Kit(kitData);
  return await newKit.save();
};

// ✅ Get all kits (including inactive)
export const getAllKits = async () => {
  return await Kit.find();
};

// ✅ Get only active kits
export const getActiveKits = async () => {
  return await Kit.find({ active: true });
};

// ✅ Update entire kit info (except items)
export const updateKit = async (kitId, updateData) => {
  return await Kit.findByIdAndUpdate(kitId, updateData, {
    new: true,
    runValidators: true
  });
};

// ✅ Delete a kit by ID
export const deleteKit = async (kitId) => {
  return await Kit.findByIdAndDelete(kitId);
};

// ✅ Add an item to a kit
export const addItemToKit = async (kitId, itemData) => {
  const kit = await Kit.findById(kitId);
  if (!kit) throw new Error('Kit not found');
  kit.items.push(itemData);
  return await kit.save();
};

// services/kitServices.js

export const addItemsToKit = async (kitId, newItems) => {
  const kit = await Kit.findById(kitId);
  if (!kit) throw new Error('Kit not found');

  // Append all items at once
  kit.items.push(...newItems);
  await kit.save();

  return true;
};

// ✅ Update a specific item in a kit by item _id
export const updateItemInKit = async (kitId, itemId, itemData) => {
  const kit = await Kit.findById(kitId);
  if (!kit) throw new Error('Kit not found');

  const item = kit.items.id(itemId);
  if (!item) throw new Error('Item not found in kit');

  item.set(itemData);
  return await kit.save();
};

export const toggleKitActiveStatus = async (kitId, active) => {
  const kit = await Kit.findById(kitId);
  if (!kit) throw new Error('Kit not found');

  kit.active = active;
  await kit.save();

  return true;
};

// ✅ Delete a specific item in a kit by item _id
export const deleteItemFromKit = async (kitId, itemId) => {
  const kit = await Kit.findById(kitId);
  if (!kit) throw new Error('Kit not found');

  kit.items = kit.items.filter(item => item._id.toString() !== itemId);
  return await kit.save();
};
