import Kit from '../models/Kit.js';
import {uploadToCloudinary} from '../config/cloudinaryConfig.js'

// Create a new kit
export const createKit = async (kitData) => {
  const newKit = new Kit(kitData);
  return await newKit.save();
};

// Get all kits (including inactive)
export const getAllKits = async () => {
  return await Kit.find();
};

// Get only active kits
export const getActiveKits = async () => {
  return await Kit.find({ active: true });
};

// Update kit 
export const updateKit = async (kitId, updateData) => {
  return await Kit.findByIdAndUpdate(kitId, updateData, {
    new: true,
    runValidators: true
  });
};

// Delete a kit
export const deleteKit = async (kitId) => {
  return await Kit.findByIdAndDelete(kitId);
};

// Toggle kit's active status
export const toggleKitActiveStatus = async (kitId) => {
  const kit = await Kit.findById(kitId);
  if (!kit) throw new Error('Kit not found');

  kit.active = !kit.active;
  return await kit.save();
};
