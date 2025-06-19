import React, { useEffect, useRef } from 'react';
import LeftSection from './components/LeftSection';
import RightSection from './components/RightSection';
import ApplicationForm from './components/ApplicationForm';
import ThankYouDialogBox from './components/ThankYouDialogBox';
import { useCareer } from '../../contexts/CareerContext';

const CareersPage = () => {
  const { status, jobs, fetchJobs, isFetchingRef, searchQuery, debouncedSearch, setCareersPageActive } = useCareer();
  const isInitialRender = useRef(true);

  // Initial fetch and page activation
  useEffect(() => {
    console.log('career page rendered');
    setCareersPageActive(true);
    if (jobs.length === 0 && !isFetchingRef.current) {
      fetchJobs(0, '');
    }
    return () => {
      setCareersPageActive(false);
    };
  }, [setCareersPageActive]);

  // Debounced search for query changes, skip initial render
  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return; // Skip initial debounced search
    }
    debouncedSearch(searchQuery);
  }, [searchQuery, debouncedSearch]);
  console.log('jobs rendered for search query', searchQuery, '\n', jobs);
  return (
    <div className='relative flex bg-[#F8F0E3] overflow-hidden'>
      <LeftSection />
      <RightSection />
      {status === 'applying' && <ApplicationForm />}
      {status === 'applied' && <ThankYouDialogBox />}
    </div>
  );
};

export default CareersPage;