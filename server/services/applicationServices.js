import Job from '../models/Job.js';
import Application from '../models/Application.js';


export const getApplicationsByJobId = async (jobId, skip = 0, limit = 10) => {
  try {
    if (!jobId || typeof jobId !== 'string')
      throw new Error('Invalid or missing jobId');
    if (skip < 0 || limit <= 0)
      throw new Error('Invalid skip or limit values');

    const applications = await Application.find({ jobId })
      .sort({ appliedDate: -1 })
      .skip(skip)
      .limit(limit)
      .select('fullname email appliedDate status jobId');

    return {
      data: applications,
      metadata: {
        lastUpdated: new Date().toISOString(),
        page: Math.floor(skip / limit) + 1,
        pageSize: limit
      }
    };
  } catch (error) {
    console.error('Error fetching applications:', error.message);
    throw new Error(`Failed to fetch applications: ${error.message}`);
  }
};
export const getApplicationById = async (id) => {
  const data = await Application.findById(id).populate('jobId', 'title');
  return data ;
};

export const updateApplicationStatus = async (id, status) => {
  return await Application.findByIdAndUpdate(id, { status }, { new: true });
};

export const createApplication = async (data) => {
  const application = await Application.create(data);
  await Job.findByIdAndUpdate(data.jobId, { $inc: { noOfApplications: 1 } });
  return application;
};