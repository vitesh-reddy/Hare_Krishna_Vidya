import React, { createContext, useContext, useState, useCallback } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const JobAdminContext = createContext();

export const JobAdminProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [jobCount, setJobCount] = useState(0);
  const [isLoadingJobs, setIsLoadingJobs] = useState(false);
  const [hasMoreJobs, setHasMoreJobs] = useState(true);
  const [hasMoreApplications, setHasMoreApplications] = useState(true);
  const [lastSkip, setLastSkip] = useState(-10); // Track last skip to prevent redundant fetches

  const BASE_URL = `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'}/api`;

const fetchJobs = useCallback(async (skip = 0, limit = 10) => {
  console.log('admin fetchjobs called');
  if (isLoadingJobs || skip <= lastSkip) return; // Prevent redundant or overlapping fetches
  setIsLoadingJobs(true);
  try {
    const response = await axios.get(`${BASE_URL}/jobs/all?skip=${skip}&limit=${limit}`);
    const newJobs = response.data.jobs || [];
    setJobs(prev => {
      const existingIds = new Set(prev.map(job => job._id.toString()));
      const uniqueNewJobs = newJobs.filter(job => {
        if (existingIds.has(job._id.toString())) 
          return false;        
        return true;
      });
      const updatedJobs = skip === 0 ? newJobs : [...prev, ...uniqueNewJobs];
      return updatedJobs;
    });
    setHasMoreJobs(newJobs.length === limit);
    setLastSkip(skip);
    const countResponse = await axios.get(`${BASE_URL}/jobs/active-count`);
    setJobCount(countResponse.data.count || 0);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    toast.error('Failed to fetch jobs');
  } finally {
    setIsLoadingJobs(false);
  }
}, []);

  const fetchApplications = useCallback(async (jobId, skip = 0, limit = 10) => {
    try {
      const response = await axios.get(`${BASE_URL}/applications/${jobId}?skip=${skip}&limit=${limit}`);
      const newApplications = response.data.applicants || [];
      setApplications(prev => skip === 0 ? newApplications : [...prev, ...newApplications]);
      setHasMoreApplications(newApplications.length === limit);
    } catch (error) {
      console.error('Error fetching applications:', error);
      toast.error('Failed to fetch applications');
    }
  }, []);

  const createJob = useCallback(async (jobData) => {
    try {
      const response = await axios.post(`${BASE_URL}/jobs`, jobData);
      setJobs(prev => [response.data.job, ...prev]);
      setJobCount(prev => prev + 1);
      toast.success('Job created successfully');
      return response.data;
    } catch (error) {
      console.error('Error creating job:', error);
      toast.error('Failed to create job');
      throw error;
    }
  }, []);

  const updateJob = useCallback(async (id, jobData) => {
    try {
      const response = await axios.patch(`${BASE_URL}/jobs/${id}`, jobData);
      setJobs(prev => prev.map(job => job._id === id ? response.data.job : job));
      toast.success('Job updated successfully');
      return response.data;
    } catch (error) {
      console.error('Error updating job:', error);
      toast.error('Failed to update job');
      throw error;
    }
  }, []);

  const toggleJobStatus = useCallback(async (id, currentStatus) => {
    try {
      const response = await axios.patch(`${BASE_URL}/jobs/${id}/toggle-status`);
      setJobs(prev => prev.map(job => job._id === id ? response.data.job : job));
      setJobCount(prev => response.data.job.status === 'active' ? prev + 1 : prev - 1);
      toast.success('Job status updated');
      return response.data;
    } catch (error) {
      console.error('Error toggling job status:', error);
      toast.error('Failed to toggle job status');
      throw error;
    }
  }, []);

  const deleteJob = useCallback(async (id) => {
    try {
      await axios.delete(`${BASE_URL}/jobs/${id}`);
      setJobs(prev => prev.filter(job => job._id !== id));
      setJobCount(prev => prev - 1);
      toast.success('Job deleted successfully');
    } catch (error) {
      console.error('Error deleting job:', error);
      toast.error('Failed to delete job');
      throw error;
    }
  }, []);

  const updateApplicationStatus = useCallback(async (id, status) => {
    try {
      const response = await axios.patch(`${BASE_URL}/applications/${id}/status`, { status });
      setApplications(prev => prev.map(app => app._id === id ? response.data.applicant : app));
      toast.success('Application status updated');
      return response.data;
    } catch (error) {
      console.error('Error updating application status:', error);
      toast.error('Failed to update application status');
      throw error;
    }
  }, []);

  const getApplicationById = useCallback(async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/applications/view/${id}`);
      return response.data.applicant;
    } catch (error) {
      console.error('Error fetching application:', error);
      toast.error('Failed to fetch application');
      throw error;
    }
  }, []);

  return (
    <JobAdminContext.Provider value={{
      jobs,
      applications,
      jobCount,
      hasMoreJobs,
      hasMoreApplications,
      isLoadingJobs,
      setApplications,
      fetchJobs,
      fetchApplications,
      createJob,
      updateJob,
      toggleJobStatus,
      deleteJob,
      updateApplicationStatus,
      getApplicationById
    }}>
      {children}
    </JobAdminContext.Provider>
  );
};

export const useJobAdminContext = () => {
  const context = useContext(JobAdminContext);
  if (!context) {
    throw new Error('useJobAdminContext must be used within a JobAdminProvider');
  }
  return context;
};