import express from 'express';
import { getActiveKits } from '../services/kitsServices.js';

const router = express.Router();


router.get('/active', async (req, res) => {
  try {
    const kits = await getActiveKits();
    return res.status(200).json(kits);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch active kits.', error: error.message });
  }
});

export default router;
