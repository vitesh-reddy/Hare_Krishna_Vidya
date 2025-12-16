import express from 'express';
import { getApplicationsByJobId, getApplicationById, updateApplicationStatus } from '../services/applicationServices.js';
import { verifyAdminToken } from '../middlewares/verifyAdminToken.js';

const router = express.Router();

router.use(verifyAdminToken);

// View application by ID
router.get('/view/:id', async (req, res) => {
  try {
    const application = await getApplicationById(req.params.id);
    res.status(200).json({ applicant: application });
  } catch (error) {
    res.status(404).json({ error: 'Application not found' });
  }
});

// Update application status
router.patch('/:id/status', async (req, res) => {
  try {
    const updatedApplication = await updateApplicationStatus(req.params.id, req.body.status);
    res.status(200).json({ message: 'Status updated', applicant: updatedApplication });
  } catch (error) {
    res.status(400).json({ error: 'Failed to update application status' });
  }
});

// Get applications by Job ID
router.get('/:jobId', async (req, res) => {
  try {
    const { jobId } = req.params;
    const skip = parseInt(req.query.skip) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const data = await getApplicationsByJobId(jobId, skip, limit);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get applications' });
  }
});

export default router;
