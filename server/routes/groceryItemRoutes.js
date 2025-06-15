import express from 'express';
import {
  createGroceryItem,
  getAllGroceryItems,
  getActiveGroceryItems,
  getGroceryItemById,
  updateGroceryItem,
  toggleGroceryActiveStatus,
  deleteGroceryItem,
} from '../services/groceryItemServices.js';
import { deleteFromCloudinary, uploadToCloudinary } from '../config/cloudinaryConfig.js';

const router = express.Router();

// Route to handle image upload and return Cloudinary URL
router.post('/upload-image', async (req, res) => {
  try {
    if (!req.files || !req.files.image) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    const fileBuffer = req.files.image.data;
    const cloudinaryUrl = await uploadToCloudinary(fileBuffer, "Grocery Item");
    return res.status(200).json({ url: cloudinaryUrl });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// GET all grocery items
router.get('/', async (req, res) => {
  try {
    const groceries = await getAllGroceryItems();
    return res.status(200).json(groceries);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch grocery items.' });
  }
});

// GET active grocery items
router.get('/active', async (req, res) => {
  try {
    const groceries = await getActiveGroceryItems();
    return res.status(200).json(groceries);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch active grocery items.' });
  }
});

// GET a single item by ID
router.get('/:id', async (req, res) => {
  try {
    const item = await getGroceryItemById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    return res.status(200).json(item);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// POST create grocery item
router.post('/', async (req, res) => {
  const groceryData = req.body;
  try {
    const newItem = await createGroceryItem(groceryData);
    return res.status(201).json({ message: 'Grocery item created successfully.', item: newItem });
  } catch (error) {
    return res.status(400).json({ message: 'Failed to create grocery item.', error: error.message });
  }
});

// PUT update grocery item
router.put('/:groceryId', async (req, res) => {
  const { groceryId } = req.params;
  const updateData = req.body;
  try {
    const updatedItem = await updateGroceryItem(groceryId, updateData);
    if (!updatedItem) return res.status(404).json({ error: 'Item not found' });
    return res.status(200).json({ message: 'Grocery item updated successfully.', item: updatedItem });
  } catch (error) {
    return res.status(400).json({ message: 'Failed to update grocery item.', error: error.message });
  }
});

// PATCH toggle active status
router.patch('/:groceryId/active', async (req, res) => {
  const { groceryId } = req.params;
  try {
    const success = await toggleGroceryActiveStatus(groceryId);
    if (!success) return res.status(404).json({ error: 'Item not found' });
    const updatedItem = await getGroceryItemById(groceryId); // Fetch the updated item
    return res.status(200).json({ message: 'Grocery item active status updated.', item: updatedItem });
  } catch (error) {
    return res.status(400).json({ message: 'Failed to update grocery item status.', error: error.message });
  }
});

// DELETE grocery item
router.delete('/:groceryId', async (req, res) => {
  const { groceryId } = req.params;
  try {
    // Step 1: Find item by ID
    const groceryItem = await getGroceryItemById(groceryId);
    if (!groceryItem) 
      return res.status(404).json({ error: 'Grocery item not found.' });  
    const imageUrl = groceryItem.image;

    // Step 2: Delete grocery item from DB
    await deleteGroceryItem(groceryId);
    // Step 3: Try deleting the Cloudinary image
    try {
      await deleteFromCloudinary(imageUrl);
    } catch (cloudErr) {
      console.error('Cloudinary deletion failed:', cloudErr.message);
    }

    return res.status(200).json({ message: 'Grocery item deleted successfully.' });
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to delete grocery item.',
      error: error.message,
    });
  }
});

export default router;