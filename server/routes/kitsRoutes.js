import express from 'express';
import {
  createKit,
  getAllKits,
  getActiveKits,
  updateKit,
  deleteKit,
  toggleKitActiveStatus,
  getActiveKitsCount,
} from '../services/kitsServices.js';
import { deleteFromCloudinary, uploadToCloudinary } from '../config/cloudinaryConfig.js';
import Kit from '../models/Kit.js'; // Add this import

const router = express.Router();

// Route to handle image upload and return Cloudinary URL
router.post('/upload-image', async (req, res) => {
  try {
    if (!req.files || !req.files.image) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    const fileBuffer = req.files.image.data;
    const cloudinaryUrl = await uploadToCloudinary(fileBuffer, "Kits");
    return res.status(200).json({ url: cloudinaryUrl });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// GET all kits
router.get('/', async (req, res) => {
  try {
    const kits = await getAllKits();
    return res.status(200).json(kits);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch kits.', error: error.message });
  }
});

// GET active kits
router.get('/active', async (req, res) => {
  try {
    const kits = await getActiveKits();
    return res.status(200).json(kits);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch active kits.', error: error.message });
  }
});

router.get('/active-count', async (req, res) => {
  try { 
    const count = await getActiveKitsCount();
    return res.status(200).json({ count });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch active kits count.', error: error.message });
  }
});

// POST create kit
router.post('/', async (req, res) => {
  try {
    const newKit = await createKit(req.body);
    return res.status(201).json({ message: 'Kit created successfully.', item: newKit });
  } catch (error) {
    return res.status(400).json({ message: 'Failed to create kit.', error: error.message });
  }
});

// PUT update kit
router.put('/:kitId', async (req, res) => {
  try {
    const updatedKit = await updateKit(req.params.kitId, req.body);
    if (!updatedKit) return res.status(404).json({ error: 'Kit not found' });
    return res.status(200).json({ message: 'Kit updated successfully.', item: updatedKit });
  } catch (error) {
    return res.status(400).json({ message: 'Failed to update kit.', error: error.message });
  }
});

// PATCH toggle active status
router.patch('/:kitId/active', async (req, res) => {
  try {
    const updatedKit = await toggleKitActiveStatus(req.params.kitId);
    if (!updatedKit) return res.status(404).json({ error: 'Kit not found' });
    return res.status(200).json({ message: 'Kit active status updated.', item: updatedKit });
  } catch (error) {
    return res.status(400).json({ message: 'Failed to update status.', error: error.message });
  }
});

// DELETE kit
router.delete('/:kitId', async (req, res) => {
  try {
    const kit = await Kit.findById(req.params.kitId);
    if (!kit) return res.status(404).json({ error: 'Kit not found' });

    const imageUrl = kit.image;
    await deleteKit(req.params.kitId);

    // Try deleting the Cloudinary image
    try {
      if (imageUrl) await deleteFromCloudinary(imageUrl);
    } catch (cloudErr) {
      console.error('Cloudinary deletion failed:', cloudErr.message);
    }

    return res.status(200).json({ message: 'Kit deleted successfully.' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to delete kit.', error: error.message });
  }
});

export default router;