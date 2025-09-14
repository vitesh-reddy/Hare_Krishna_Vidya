import Kit from '../models/Kit.js';
import { addRecentActivity } from './updatesServices.js';

export const createKit = async (kitData) => {
  const newKit = new Kit(kitData);
  const savedKit = await newKit.save();
  await addRecentActivity({ action: `Kit created: ${savedKit.name}`, type: 'kit' });
  return savedKit;
};

export const updateKit = async (kitId, updateData) => {
  const updated = await Kit.findByIdAndUpdate(kitId, updateData, {
    new: true,
    runValidators: true
  });
  await addRecentActivity({ action: `Kit updated: ${updated?.name || kitId}`, type: 'kit' });
  return updated;
};

export const deleteKit = async (kitId) => {
  const deleted = await Kit.findByIdAndDelete(kitId);
  await addRecentActivity({ action: `Kit deleted: ${deleted?.name || kitId}`, type: 'kit' });
  return deleted;
};

export const toggleKitActiveStatus = async (kitId) => {
  const kit = await Kit.findById(kitId);
  if (!kit) throw new Error('Kit not found');

  kit.active = !kit.active;
  const updated = await kit.save();
  const status = kit.active ? 'enabled' : 'disabled';
  await addRecentActivity({ action: `Kit ${status}: ${kit.name}`, type: 'kit' });
  return updated;
};


export const getAllKits = async () => {
  return await Kit.find();
};

export const getActiveKits = async () => {
  return await Kit.find({ active: true });
};

export const getActiveKitsCount = async () => {
  return await Kit.countDocuments({ active: true });
};