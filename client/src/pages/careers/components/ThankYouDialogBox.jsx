import React, { useEffect } from 'react';
import { useCareer } from '../../../contexts/CareerContext';

const ThankYouDialogBox = () => {
  const { setStatus, selectedJob } = useCareer();

  // Handle missing selectedJob
  useEffect(() => {
    if (!selectedJob) 
      setStatus('viewing');    
  }, [selectedJob, setStatus]);

  const handleBack = () => {
    setStatus('applying');
  };

  const handleBackToCareers = () => {
    setStatus('viewing');
  };

  // Render nothing if no selectedJob, as useEffect handles navigation
  if (!selectedJob)
    return null;
  

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 rounded-[0.75rem] -translate-y-[59%] flex justify-center items-center bg-gray-100">
      <div className="bg-white p-[1.75rem] rounded-[0.75rem] shadow-lg w-[20rem] md:w-full max-w-[28rem] border border-gray-200 text-[#EA580C]">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="text-[0.65rem] mb-[0.25rem] flex items-center"
        >
          <span className="mr-[0.5rem] font-bold">←</span> Back
        </button>

        {/* Title */}
        <h2 className="text-[1.25rem] font-bold mb-[0.25rem]">
          {selectedJob.title}
        </h2>

        {/* Description */}
        {/* selectedJob.description */}
        <p className="text-[#374151] text-[0.6rem] mb-[0.5rem]">
          {selectedJob.description}
            {selectedJob.description.length < 50
            ? selectedJob.description + Array(50 - selectedJob.description.length).fill('\u00A0').join('') // Using Unicode for &nbsp;
            : selectedJob.description.slice(0, 130) + (selectedJob.description.length > 130 ? "..." : '')}
        </p>

        {/* Location and Job Type */}
        <p className='text-[#4B5563] text-[0.6rem] mb-[0.125rem]'>
          Location:
          <span className="bg-orange-100 text-[#C2410C] px-[0.5rem] py-[0.125rem] rounded-[0.25rem] mx-[0.25rem]">
            {selectedJob.location}
          </span>
          <span className="bg-orange-100 text-[#C2410C] px-[0.5rem] py-[0.125rem] rounded-[0.25rem]">
            {selectedJob.type}
          </span>
        </p>

        {selectedJob.skills.map((skill, index) => (
          <span
            key={index}
            className="bg-[#FFF7ED] border-[1px] border-[#FED7AA] text-[#EA580C] text-[0.6rem] px-[0.5rem] py-[0.125rem] rounded-[0.25rem] mr-[0.25rem]"
          >
            {skill}
          </span>
        ))}

        {/* Requirements */}
        <p className="text-[0.6rem] text-[#4B5563] font-semibold my-[0.75rem]">
          Requirements: <span className='font-normal'> {selectedJob.requirements} </span>
        </p>

        <div className='flex flex-col items-center justify-evenly mt-[2rem]'>
          <p className='text-[#15803D] font-semibold text-[1rem]'>Thank you for applying!</p>
          <p className='text-[#4B5563] text-[0.6rem]'>We'll get back to you soon if you are shortlisted.</p>

          {/* Back to Careers Button */}
          <button
            onClick={handleBackToCareers}
            className="my-[0.75rem] bg-[#EA580C] text-white text-[0.6rem] px-[0.75rem] py-[0.45rem] rounded-full flex items-center justify-center hover:bg-orange-600"
          >
            Back To Careers
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThankYouDialogBox;