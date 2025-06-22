import React, { createContext, useContext, useState, useCallback, useRef } from "react";
import axios from 'axios';
import toast from 'react-hot-toast';

const JobAdminContext = createContext();

export const JobAdminProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [jobCount, setJobCount] = useState(0);
  const [applicationCounts, setApplicationCounts] = useState({}); // Store counts per jobId
  const [isLoadingJobs, setIsLoadingJobs] = useState(false);
  const [isLoadingApplications, setIsLoadingApplications] = useState(false);
  const [hasMoreJobs, setHasMoreJobs] = useState(true);
  const [hasMoreApplications, setHasMoreApplications] = useState(true);
  const [lastSkip, setLastSkip] = useState(-10);
  const jobCache = useRef({});
  const applicationCache = useRef({});

  const BASE_URL = `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'}/api`;
  const PAGE_SIZE = 10;

  const fetchJobs = useCallback(async (page = 1) => {
    const skip = (page - 1) * PAGE_SIZE;
    if (isLoadingJobs || skip <= lastSkip) return;

    setIsLoadingJobs(true);
    try {
      if (jobCache.current[page]) {
        setJobs(jobCache.current[page]);
        setIsLoadingJobs(false);
        return;
      }

      console.log('admin fetch jobs called for page', page);
      const response = await axios.get(`${BASE_URL}/jobs/all?skip=${skip}&limit=${PAGE_SIZE}`);
      const { data: newJobs, metadata } = response.data;
      setJobs(newJobs);
      jobCache.current[page] = newJobs;
      setHasMoreJobs(metadata.page < metadata.totalPages);
      setJobCount(metadata.totalCount); // Set initial count from metadata
    } catch (error) {
      console.error('Error fetching jobs:', error);
      toast.error('Failed to fetch jobs');
    } finally {
      setIsLoadingJobs(false);
    }
  }, []);

  const fetchApplications = useCallback(async (jobId, page = 1) => {
    const skip = (page - 1) * PAGE_SIZE;
    setIsLoadingApplications(true);
    try {
      const cacheKey = `${jobId}-page-${page}`;
      if (applicationCache.current[cacheKey]) {
        setApplications(applicationCache.current[cacheKey]);
        setIsLoadingApplications(false);
        return;
      }

      console.log('admin fetch applications called for job', jobId, 'page', page);
      const response = await axios.get(`${BASE_URL}/applications/${jobId}?skip=${skip}&limit=${PAGE_SIZE}`);
      const { data: newApplications, metadata } = response.data;
      setApplications(newApplications);
      applicationCache.current[cacheKey] = newApplications;
      setApplicationCounts(prev => ({
        ...prev,
        [jobId]: newApplications.length > 0 ? newApplications[0].jobId.noOfApplications : prev[jobId] || 0
      }));
      setHasMoreApplications(metadata.page * PAGE_SIZE < (applicationCounts[jobId] || newApplications[0]?.jobId.noOfApplications || 0));
    } catch (error) {
      console.error('Error fetching applications:', error);
      toast.error('Failed to fetch applications');
    } finally {
      setIsLoadingApplications(false);
    }
  }, [applicationCounts]);

  const createJob = useCallback(async (jobData) => {
    try {
      const response = await axios.post(`${BASE_URL}/jobs`, jobData);
      setJobs(prev => [response.data.job, ...prev]);
      setJobCount(prev => prev + 1);
      jobCache.current = {};
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
      jobCache.current = {};
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
      jobCache.current = {};
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
      jobCache.current = {};
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

  const refreshJobs = useCallback(async () => {
    jobCache.current = {};
    setIsLoadingJobs(true);
    try {
      const response = await axios.get(`${BASE_URL}/jobs/all?skip=0&limit=${PAGE_SIZE}`);
      const { data: newJobs, metadata } = response.data;
      setJobs(newJobs);
      jobCache.current[1] = newJobs;
      setHasMoreJobs(metadata.page < metadata.totalPages);
      setJobCount(metadata.totalCount);
    } catch (error) {
      console.error('Error refreshing jobs:', error);
      toast.error('Failed to refresh jobs');
    } finally {
      setIsLoadingJobs(false);
    }
  }, []);

  const getApplicantsCountByJobId = useCallback(async (jobId) => {
    try {
      const response = await axios.get(`${BASE_URL}/jobs/applicants-count/${jobId}`);
      setApplicationCounts(prev => ({
        ...prev,
        [jobId]: response.data.applicantsCount
      }));
      return response.data.applicantsCount;
    } catch (error) {
      toast.error('Error refreshing Applications');
      return prevApplicationCounts[jobId] || 0; // Fallback to previous count
    }
  }, []);

  const updateApplicationCount = useCallback((jobId, count) => {
    setApplicationCounts(prev => ({
      ...prev,
      [jobId]: count
    }));
  }, []);

  const refreshApplications = useCallback((jobId) => {
    applicationCache.current = {};
    fetchApplications(jobId, 1);
  }, [fetchApplications]);

  return (
    <JobAdminContext.Provider value={{
      jobs,
      applications,
      jobCount,
      applicationCounts,
      hasMoreJobs,
      hasMoreApplications,
      isLoadingJobs,
      isLoadingApplications,
      setApplications,
      fetchJobs,
      fetchApplications,
      createJob,
      updateJob,
      toggleJobStatus,
      deleteJob,
      updateApplicationStatus,
      getApplicationById,
      refreshJobs,
      refreshApplications,
      getApplicantsCountByJobId,
      updateApplicationCount,
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