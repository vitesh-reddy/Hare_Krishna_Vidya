import express from 'express';
import {   
  createGroceryItem,
  getAllGroceryItems,
  getActiveGroceryItems,
  getGroceryItemById,
  updateGroceryItem,
  deleteGroceryItem, 
} from '../services/groceryItemServices.js';


const router = express.Router();

// CREATE a grocery item
router.post('/', async (req, res) => {
  try {
    const item = await createGroceryItem(req.body);
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET all grocery items
router.get('/', async (req, res) => {
  try {
    const items = await getAllGroceryItems();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET only active grocery items
router.get('/active', async (req, res) => {
  try {
    const items = await getActiveGroceryItems();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
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

// UPDATE a grocery item by ID
router.put('/:id', async (req, res) => {
  try {
    const item = await updateGroceryItem(req.params.id, req.body);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    res.json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE a grocery item by ID
router.delete('/:id', async (req, res) => {
  try {
    const item = await deleteGroceryItem(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    res.json({ message: 'Item deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
