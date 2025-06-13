import express from 'express';
import {
  createKit,
  getAllKits,
  getActiveKits,
  updateKit,
  deleteKit,
  addItemToKit,
  updateItemInKit,
  deleteItemFromKit,
  toggleKitActiveStatus
} from '../services/kitsServices.js';

const router = express.Router();

// GET all kits
router.get('/', async (req, res) => {
  try {
    const kits = await getAllKits();
    return res.status(200).json(kits);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch kits.' });
  }
});

// GET active kits
router.get('/active', async (req, res) => {
  try {
    const kits = await getActiveKits();
    return res.status(200).json(kits);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch active kits.' });
  }
});

// POST create new kit
router.post('/', async (req, res) => {
  const kitData = req.body;
  try {
    await createKit(kitData);
    return res.status(201).json({ message: 'Kit created successfully.' });
  } catch (error) {
    return res.status(400).json({ message: 'Failed to create kit.', error: error.message });
  }
});

// PUT update kit info
router.put('/:kitId', async (req, res) => {
  const { kitId } = req.params;
  const updateData = req.body;
  try {
    await updateKit(kitId, updateData);
    return res.status(200).json({ message: 'Kit updated successfully.' });
  } catch (error) {
    return res.status(400).json({ message: 'Failed to update kit.', error: error.message });
  }
});

// Update active status
router.patch('/:kitId/active', async (req, res) => {
  const { kitId } = req.params;
  const { active } = req.body;

  if (typeof active !== 'boolean') {
    return res.status(400).json({ message: 'Active status must be a boolean.' });
  }

  try {
    await toggleKitActiveStatus(kitId, active);
    return res.status(200).json({ message: 'Kit active status updated.' });
  } catch (error) {
    return res.status(400).json({ message: 'Failed to update kit.', error: error.message });
  }
});

// DELETE kit
router.delete('/:kitId', async (req, res) => {
  const { kitId } = req.params;
  try {
    await deleteKit(kitId);
    return res.status(200).json({ message: 'Kit deleted successfully.' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to delete kit.', error: error.message });
  }
});

// POST add item to kit
router.post('/:kitId/items', async (req, res) => {
  const { kitId } = req.params;
  const itemData = req.body;
  try {
    await addItemToKit(kitId, itemData);
    return res.status(200).json({ message: 'Item added to kit successfully.' });
  } catch (error) {
    return res.status(400).json({ message: 'Failed to add item to kit.', error: error.message });
  }
});

// PUT update item in kit
router.put('/:kitId/items/:itemId', async (req, res) => {
  const { kitId, itemId } = req.params;
  const itemData = req.body;
  try {
    await updateItemInKit(kitId, itemId, itemData);
    return res.status(200).json({ message: 'Item updated successfully.' });
  } catch (error) {
    return res.status(400).json({ message: 'Failed to update item in kit.', error: error.message });
  }
});

// Add multiple items to kit
router.post('/:kitId/items/bulk', async (req, res) => {
  const { kitId } = req.params;
  const items = req.body.items; // must be an array

  if (!Array.isArray(items)) {
    return res.status(400).json({ message: 'Items must be an array.' });
  }

  try {
    await addItemsToKit(kitId, items);
    return res.status(200).json({ message: 'Items added to kit successfully.' });
  } catch (error) {
    return res.status(400).json({ message: 'Failed to add items.', error: error.message });
  }
});


// DELETE item from kit
router.delete('/:kitId/items/:itemId', async (req, res) => {
  const { kitId, itemId } = req.params;
  try {
    await deleteItemFromKit(kitId, itemId);
    return res.status(200).json({ message: 'Item removed from kit successfully.' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to delete item from kit.', error: error.message });
  }
});

export default router;
