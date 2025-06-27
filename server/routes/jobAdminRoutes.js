import express from 'express';
import { getActiveJobCount, getAllJobs, createJob, updateJob, deleteJob, getJobById, toggleJobStatus, getApplicantsCountByJobId } from '../services/jobServices.js';
import { verifyAdminToken } from '../middleware/verifyAdminToken.js';

const router = express.Router();
router.use(verifyAdminToken);

router.get('/active-count', async (req, res) => {
  try {
    const count = await getActiveJobCount();
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get active job count' });
  }
});

router.get('/applicants-count/:id', async (req, res) => {
  try {
    const { id: jobId } = req.params;
    const applicants = await getApplicantsCountByJobId(jobId);
    return res.status(200).json({ applicantsCount: applicants.noOfApplications });
  } catch (err) {
    res.status(500).json({ error: 'Failed to get Applicants Count' });
  }
});

router.get('/all', async (req, res) => {
  try {
    const skip = parseInt(req.query.skip) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const data = await getAllJobs(skip, limit);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get jobs' });
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

router.post('/', async (req, res) => {
  try {
    const newJob = await createJob(req.body);
    res.status(201).json({ message: 'Job created', job: newJob });
  } catch (error) {
    res.status(400).json({ error: 'Failed to create job' });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const updatedJob = await updateJob(req.params.id, req.body);
    res.status(200).json({ message: 'Job updated', job: updatedJob });
  } catch (error) {
    res.status(400).json({ error: 'Failed to update job' });
  }
});

router.patch('/:id/toggle-status', async (req, res) => {
  try {
    const updatedJob = await toggleJobStatus(req.params.id);
    res.status(200).json({ message: 'Job status toggled', job: updatedJob });
  } catch (error) {
    res.status(400).json({ error: 'Failed to toggle job status' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await deleteJob(req.params.id);
    res.status(200).json({ message: 'Job and related applications deleted' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete job' });
  }
});

export default router;
