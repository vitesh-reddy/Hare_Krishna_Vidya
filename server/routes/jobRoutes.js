import express from 'express';
import { getActiveJobs, getJobById } from '../services/jobServices.js';


const router = express.Router();

router.get('/active', async (req, res) => {
  try {
    const skip = parseInt(req.query.skip) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';
    const data = await getActiveJobs(skip, limit, search);
    res.status(200).json({ jobs: data });    
  } catch (error) {
    res.status(500).json({ error: 'Failed to get active jobs' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const job = await getJobById(req.params.id);
    res.status(200).json({ job });
  } catch (error) {
    res.status(404).json({ error: 'Job not found' });
  }
});

export default router;
