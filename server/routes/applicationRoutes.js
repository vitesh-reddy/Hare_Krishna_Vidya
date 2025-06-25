import express from 'express';
import { createApplication } from '../services/applicationServices.js';

const router = express.Router();

router.post('/apply', async (req, res) => {
  try {
    await createApplication(req.body);
    res.status(201).json({ message: 'Application submitted' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to submit application' });
  }
});

export default router;
