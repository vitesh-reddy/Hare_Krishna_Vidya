import express from 'express';
import {
  createGroceryItem,
  getAllGroceryItems,
  getActiveGroceryItems,
  updateGroceryItem,
  deleteGroceryItem,
  toggleGroceryActiveStatus
} from '../services/groceryItemServices.js';

const router = express.Router();

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
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create grocery item
router.post('/', async (req, res) => {
  const groceryData = req.body;
  try {
    await createGroceryItem(groceryData);
    return res.status(201).json({ message: 'Grocery item created successfully.' });
  } catch (error) {
    return res.status(400).json({ message: 'Failed to create grocery item.', error: error.message });
  }
});

// PUT update grocery item
router.put('/:groceryId', async (req, res) => {
  const { groceryId } = req.params;
  const updateData = req.body;
  try {
    await updateGroceryItem(groceryId, updateData);
    return res.status(200).json({ message: 'Grocery item updated successfully.' });
  } catch (error) {
    return res.status(400).json({ message: 'Failed to update grocery item.', error: error.message });
  }
});

router.patch('/:groceryId/active', async (req, res) => {
  const { groceryId } = req.params;
  const { active } = req.body;

  if (typeof active !== 'boolean') {
    return res.status(400).json({ message: 'Active status must be a boolean.' });
  }

  try {
    await toggleGroceryActiveStatus(groceryId, active);
    return res.status(200).json({ message: 'Grocery item active status updated.' });
  } catch (error) {
    return res.status(400).json({ message: 'Failed to update grocery item.', error: error.message });
  }
});

// DELETE grocery item
router.delete('/:groceryId', async (req, res) => {
  const { groceryId } = req.params;
  try {
    await deleteGroceryItem(groceryId);
    return res.status(200).json({ message: 'Grocery item deleted successfully.' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to delete grocery item.', error: error.message });
  }
});

export default router;

