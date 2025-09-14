import express from 'express';
import { getActiveGroceryItems, getGroceryItemById } from '../services/groceryItemServices.js';

const router = express.Router();

router.get('/active', async (req, res) => {
  try {
    const groceries = await getActiveGroceryItems();
    return res.status(200).json(groceries);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch active grocery items.' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const item = await getGroceryItemById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    return res.status(200).json(item);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default router;