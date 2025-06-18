import Application from '../models/Application.js';
import Job from '../models/Job.js';
import mongoose from 'mongoose';

export const getApplicationsByJobId = async (jobId, skip = 0, limit = 10) => {
  return await Application.find({ jobId })
    .sort({ appliedDate: -1 })
    .skip(skip)
    .limit(limit)
    .select('fullname email appliedDate status jobId');
};

export const getApplicationById = async (id) => {
  const data = await Application.findById(id).populate('jobId', 'title');
  console.log(data);
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