import express from 'express';
import { createGroceryItem, getAllGroceryItems, getActiveGroceryItems, getGroceryItemById, updateGroceryItem, toggleGroceryActiveStatus, deleteGroceryItem, getActiveGroceryItemsCount } from '../services/groceryItemServices.js';
import { deleteFromCloudinary, uploadToCloudinary } from '../config/cloudinaryConfig.js';
import { verifyAdminToken } from '../middlewares/verifyAdminToken.js';

const router = express.Router();
router.use(verifyAdminToken);

router.post('/upload-image', async (req, res) => {
  try {
    if (!req.files || !req.files.image) {
      return res.status(400).json({ error: 'No image file provided' });
    }
    const fileBuffer = req.files.image.data;
    const cloudinaryUrl = await uploadToCloudinary(fileBuffer, 'Grocery Item');
    return res.status(200).json({ url: cloudinaryUrl });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const groceries = await getAllGroceryItems();
    return res.status(200).json(groceries);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch grocery items.' });
  }
});

router.get('/active-count', async (req, res) => {
  console.log('hi')
  try {
    const count = await getActiveGroceryItemsCount();
    console.log(count)
    return res.status(200).json({ count });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Failed to fetch active grocery items count.' });
  }
});

router.post('/', async (req, res) => {
  try {
    const newItem = await createGroceryItem(req.body);
    return res.status(201).json({ message: 'Grocery item created successfully.', item: newItem });
  } catch (error) {
    return res.status(400).json({ message: 'Failed to create grocery item.', error: error.message });
  }
});

router.put('/:groceryId', async (req, res) => {
  try {
    const updatedItem = await updateGroceryItem(req.params.groceryId, req.body);
    if (!updatedItem) return res.status(404).json({ error: 'Item not found' });
    return res.status(200).json({ message: 'Grocery item updated successfully.', item: updatedItem });
  } catch (error) {
    return res.status(400).json({ message: 'Failed to update grocery item.', error: error.message });
  }
});

router.patch('/:groceryId/active', async (req, res) => {
  try {
    const success = await toggleGroceryActiveStatus(req.params.groceryId);
    if (!success) return res.status(404).json({ error: 'Item not found' });
    const updatedItem = await getGroceryItemById(req.params.groceryId);
    return res.status(200).json({ message: 'Grocery item active status updated.', item: updatedItem });
  } catch (error) {
    return res.status(400).json({ message: 'Failed to update grocery item status.', error: error.message });
  }
});

router.delete('/:groceryId', async (req, res) => {
  try {
    const groceryItem = await getGroceryItemById(req.params.groceryId);
    if (!groceryItem) return res.status(404).json({ error: 'Grocery item not found.' });

    const imageUrl = groceryItem.image;
    await deleteGroceryItem(req.params.groceryId);

    try {
      await deleteFromCloudinary(imageUrl);
    } catch (cloudErr) {
      console.error('Cloudinary deletion failed:', cloudErr.message);
    }

    return res.status(200).json({ message: 'Grocery item deleted successfully.' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to delete grocery item.', error: error.message });
  }
});

export default router;
