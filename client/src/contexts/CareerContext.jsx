import { createContext, useContext, useState, useCallback, useMemo, useRef } from "react";
import axios from 'axios';
import toast from 'react-hot-toast';
import debounce from 'lodash.debounce';

const CareerContext = createContext();
export const useCareer = () => useContext(CareerContext);

export const CareerProvider = ({ children }) => {
  const [status, setStatus] = useState('viewing');
  const [selectedJob, setSelectedJob] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [hasMoreJobs, setHasMoreJobs] = useState(true);
  const [skip, setSkip] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [appliedJobs, setAppliedJobs] = useState(() => {
    const saved = localStorage.getItem('appliedJobs');
    return saved ? JSON.parse(saved) : [];
  });
  const lastFetchedSkipRef = useRef(-10);
  const isFetchingRef = useRef(false);
  const isCareersPageActiveRef = useRef(false);

  const BASE_URL = `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'}/api`;
  const LIMIT = 10;

 const fetchJobs = useCallback(async (newSkip = 0, query = '') => {
    if (!isCareersPageActiveRef.current || isFetchingRef.current || newSkip < lastFetchedSkipRef.current + LIMIT) return;
    console.log('client fetch jobs', query);
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/jobs/active`, {
        params: { skip: newSkip, limit: LIMIT, search: query }
      });
      const newJobs = response.data.jobs || [];
      setJobs(prev => {
        if (newSkip === 0) {
          return newJobs;
        }
        const existingIds = new Set(prev.map(job => job._id.toString()));
        const uniqueNewJobs = newJobs.filter(job => !existingIds.has(job._id.toString()));
        return [...prev, ...uniqueNewJobs];
      });
      setHasMoreJobs(newJobs.length === LIMIT);
      setSkip(newSkip + LIMIT);
      lastFetchedSkipRef.current = newSkip;
    } catch (error) {
      console.error('Error fetching jobs:', error);
      toast.error('Failed to load jobs');
    } finally {
      setLoading(false);
      isFetchingRef.current = false;
    }
  }, []);

  const handleSearch = useCallback((query) => {
    console.log('Searching for:', query);
    setSkip(0);
    lastFetchedSkipRef.current = -10;
    fetchJobs(0, query);
  }, [fetchJobs]);

  const debouncedSearch = useMemo(
    () => debounce((query) => {
      handleSearch(query);
      return () => debouncedSearch.cancel();
    }, 500),
    [handleSearch]
  );

  const triggerSearch = useCallback((query) => {
    setSearchQuery(query);
    handleSearch(query);
  }, [handleSearch]);

  const clearSearch = useCallback(() => {
    setSearchQuery('');
    setSkip(0);
    lastFetchedSkipRef.current = -10;
    fetchJobs(0, '');
  }, [fetchJobs]);

  const loadMoreJobs = useCallback(() => {
    if (!isFetchingRef.current && hasMoreJobs) {
      fetchJobs(skip, searchQuery);
    }
  }, [hasMoreJobs, fetchJobs, skip, searchQuery]);

  const applyForJob = async (applicationData) => {
    setLoading(true);
    try {
      await axios.post(`${BASE_URL}/applications/apply`, applicationData);
      setAppliedJobs(prev => {
        const updated = [...prev, applicationData.jobId];
        localStorage.setItem('appliedJobs', JSON.stringify(updated));
        return updated;
      });
      setStatus('applied');
    } catch (error) {
      console.error('Error submitting application:', error);
      toast.error(error.response?.data?.error || 'Failed to submit application');
    } finally {
      setLoading(false);
    }
  };

  const isJobApplied = (jobId) => appliedJobs.includes(jobId);

  const resetSelectedJob = () => {
    setSelectedJob(null);
  };

  const setCareersPageActive = useCallback((isActive) => {
    isCareersPageActiveRef.current = isActive;
  }, []);

  return (
    <CareerContext.Provider value={{
      status,
      setStatus,
      selectedJob,
      setSelectedJob,
      isLoading,
      jobs,
      fetchJobs,
      isFetchingRef,
      hasMoreJobs,
      searchQuery,
      setSearchQuery,
      handleSearch,
      clearSearch,
      loadMoreJobs,
      applyForJob,
      isJobApplied,
      resetSelectedJob,
      triggerSearch,
      debouncedSearch,
      setCareersPageActive
    }}>
      {children}
    </CareerContext.Provider>
  );
};