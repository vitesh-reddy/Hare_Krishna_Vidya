import express from 'express';
import {
  getActiveJobCount,
  getAllJobs,
  getActiveJobs,
  createJob,
  updateJob,
  deleteJob,
  getJobById,
  toggleJobStatus,
  getApplicantsCountByJobId
} from '../services/JobServices.js';

const router = express.Router();

router.get('/active-count', async (req, res) => {
  try {
    const count = await getActiveJobCount();
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get active job count' });
  }
});

router.get('/applicants-count/:id', async(req, res) => {
  try {
    const { id : jobId} = req.params;
    console.log(jobId);
    const applicants = await getApplicantsCountByJobId(jobId);
    return res.status(200).json( {applicantsCount : applicants.noOfApplications});
  } catch (err) {
    res.status(500).json({ error: 'Failed to Applicants Count' });
  }
})

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

router.delete('/:id', async (req, res) => {
  try {
    await deleteJob(req.params.id);
    res.status(200).json({ message: 'Job and related applications deleted' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete job' });
  }
});

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

router.patch('/:id/toggle-status', async (req, res) => {
  try {
    const updatedJob = await toggleJobStatus(req.params.id);
    res.status(200).json({ message: 'Job status toggled', job: updatedJob });
  } catch (error) {
    res.status(400).json({ error: 'Failed to toggle job status' });
  }
});

export default router;