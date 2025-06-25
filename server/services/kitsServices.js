import Kit from '../models/Kit.js';
import {uploadToCloudinary} from '../config/cloudinaryConfig.js'
import { addRecentActivity } from './updatesServices.js';

// Create a new kit
export const createKit = async (kitData) => {
  const newKit = new Kit(kitData);
  const savedKit = await newKit.save();
  // Log kit creation activity
  await addRecentActivity({ action: `Kit created: ${savedKit.name}`, type: 'kit' });
  return savedKit;
};

// Update kit 
export const updateKit = async (kitId, updateData) => {
  const updated = await Kit.findByIdAndUpdate(kitId, updateData, {
    new: true,
    runValidators: true
  });
  // Log kit update activity
  await addRecentActivity({ action: `Kit updated: ${updated?.name || kitId}`, type: 'kit' });
  return updated;
};

// Delete a kit
export const deleteKit = async (kitId) => {
  const deleted = await Kit.findByIdAndDelete(kitId);
  // Log kit deletion activity
  await addRecentActivity({ action: `Kit deleted: ${deleted?.name || kitId}`, type: 'kit' });
  return deleted;
};

// Toggle kit's active status
export const toggleKitActiveStatus = async (kitId) => {
  const kit = await Kit.findById(kitId);
  if (!kit) throw new Error('Kit not found');

  kit.active = !kit.active;
  const updated = await kit.save();
  // Log kit status toggle activity
  const status = kit.active ? 'enabled' : 'disabled';
  await addRecentActivity({ action: `Kit ${status}: ${kit.name}`, type: 'kit' });
  return updated;
};


// Get all kits (including inactive)
export const getAllKits = async () => {
  return await Kit.find();
};

// Get only active kits
export const getActiveKits = async () => {
  return await Kit.find({ active: true });
};

export const getActiveKitsCount = async () => {
  return await Kit.countDocuments({ active: true });
};