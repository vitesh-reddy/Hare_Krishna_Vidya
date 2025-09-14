import Job from '../models/Job.js';
import Application from '../models/Application.js';
import { addRecentActivity } from './updatesServices.js';

export const createJob = async (data) => {
  const job = await Job.create(data);

  await addRecentActivity({ action: `Job created: ${job.title}`, type: 'job' });
  return job;
};

export const updateJob = async (id, data) => {
  const job = await Job.findByIdAndUpdate(id, data, { new: true });

  await addRecentActivity({ action: `Job updated: ${job?.title || id}`, type: 'job' });
  return job;
};

export const toggleJobStatus = async (id) => {
  const job = await Job.findById(id);
  if (!job) throw new Error('Job not found');
  job.status = job.status === 'active' ? 'inactive' : 'active';
  const updated = await job.save();

  const statusAction = job.status === 'active' ? 'activated' : 'deactivated';
  await addRecentActivity({ action: `Job ${statusAction}: ${job.title}`, type: 'job' });
  return updated;
};

export const deleteJob = async (id) => {
  const job = await Job.findByIdAndDelete(id);
  if (job) {
    await Application.deleteMany({ jobId: id });
    await addRecentActivity({ action: `Job deleted: ${job.title}`, type: 'job' });
  }
  return job;
};

export const getJobById = async (id) => {
  return await Job.findById(id);
};


export const getActiveJobCount = async () => {
  return await Job.countDocuments({ status: 'active' });
};

export const getAllJobs = async (skip = 0, limit = 10) => {
  try {
    if (skip < 0 || limit <= 0) 
      throw new Error('Invalid skip or limit values');

    const [jobs, totalCount] = await Promise.all([
      Job.find()
        .sort({ createdAt: -1, _id: 1 })
        .skip(skip)
        .limit(limit)
        .select('title location type status noOfApplications createdAt description requirements skills'),
      Job.countDocuments()
    ]);

    return {
      data: jobs,
      metadata: {
        totalCount,
        page: Math.floor(skip / limit) + 1,
        pageSize: limit,
        totalPages: Math.ceil(totalCount / limit)
      }
    };
  } catch (error) {
    console.error('Error fetching jobs:', error.message);
    throw new Error(`Failed to fetch jobs: ${error.message}`);
  }
};

export const getApplicantsCountByJobId = async (jobId) => {
  console.log('hi');
  return await Job.findById(jobId).select('noOfApplications');
}

export const getActiveJobs = async (skip = 0, limit = 10, search = '') => {
  const filter = { status: 'active' };
  const trimmedSearch = search.trim().toLowerCase();

  const allJobs = await Job.find(filter).sort({ createdAt: -1, _id: -1 }).select('title description skills location type requirements');

  if (!trimmedSearch)
    return allJobs.slice(skip, skip + limit);

  const scored = allJobs.map(job => {
    let score = 0;

    keywords.forEach(kw => {
      if (job.title?.toLowerCase().includes(kw)) score += 3;
      if (job.location?.toLowerCase().includes(kw)) score += 2;
      if (job.type?.toLowerCase().includes(kw)) score += 2;
      if (job.skills?.some(skill => skill.toLowerCase().includes(kw))) score += 1;
    });

    return { job, score };
  });

  const filtered = scored
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score || b.job.createdAt - a.job.createdAt);

  const data = filtered.slice(skip, skip + limit).map(item => item.job);
  return data;
};