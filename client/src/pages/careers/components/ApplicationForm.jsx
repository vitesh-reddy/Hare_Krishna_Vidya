import React, { useEffect, useState } from 'react';
import { useCareer } from '../../../contexts/CareerContext';

const ApplicationForm = () => {
  const { setStatus, selectedJob, applyForJob, isLoading } = useCareer();

  // State for form data and errors
  const [formData, setFormData] = useState(() => {
    const storedData = JSON.parse(localStorage.getItem('application')) || {
      fullname: '',
      email: '',
      profileUrl: '',
      coverLetter: ''
    };
    return storedData;
  });
  const [errors, setErrors] = useState({});

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullname.trim()) newErrors.fullname = 'Full Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!selectedJob?._id) newErrors.jobId = 'No job selected';
    return newErrors;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
    // Clear error when user starts typing
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    localStorage.setItem('application', JSON.stringify({...formData, coverLetter: '' }));

    const applicationData = {
      ...formData,
      jobId: selectedJob._id,
      appliedDate: new Date().toISOString()
    };
    applyForJob(applicationData);
  };

  const handleBack = () => {
    setStatus('viewing');
  };

  if (!selectedJob) {
    setStatus('viewing');
    return null;
  }

  useEffect(() => {
    if (!selectedJob) {
      setStatus('viewing');
    }
  }, [selectedJob, setStatus]);


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

        {/* selectedJob.description */}
        <p className="text-[#374151] text-[0.6rem] mb-[0.5rem]">
          {selectedJob.description}
            {selectedJob.description.length < 70
            ? selectedJob.description + Array(70 - selectedJob.description.length).fill('\u00A0').join('') // Using Unicode for &nbsp;
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

        {/* Form Fields */}
        <div className="space-y-[0.5rem] text-[#020817] text-[0.6rem] font-semibold">
          {/* Full Name */}
          <div>
            <label className="block mb-[0.125rem]">
              Full Name
            </label>
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              className={`w-full px-[0.5rem] py-[0.4rem] text-[#020817]/90 rounded-[0.25rem] font-normal border ${errors.fullname ? 'border-red-500' : 'border-[#FED7AA]'} bg-white focus:outline-none focus:border-orange-500`}
              placeholder=""
            />
            {errors.fullname && <p className="text-red-500 text-[0.5rem]">{errors.fullname}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block mb-[0.25rem]">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-[0.5rem] py-[0.4rem] text-[#020817]/90 rounded-[0.25rem] font-normal border ${errors.email ? 'border-red-500' : 'border-[#FED7AA]'} bg-white focus:outline-none focus:border-orange-500`}
              placeholder=""
            />
            {errors.email && <p className="text-red-500 text-[0.5rem]">{errors.email}</p>}
          </div>

          {/* LinkedIn/Portfolio URL */}
          <div>
            <label className="block mb-[0.25rem]">
              LinkedIn/Portfolio/Profile URL
            </label>
            <input
              type="url"
              name="profileUrl"
              value={formData.profileUrl}
              onChange={handleChange}
              className="w-full px-[0.5rem] py-[0.4rem] text-[#020817]/90 rounded-[0.25rem] font-normal border border-[#FED7AA] bg-white focus:outline-none focus:border-orange-500"
              placeholder="https://linkedin.com/in/..."
            />
          </div>

          {/* Cover Letter */}
          <div>
            <label className="block mb-[0.25rem]">
              Cover Letter
            </label>
            <textarea
              name="coverLetter"
              value={formData.coverLetter}
              onChange={handleChange}
              className="w-full px-[0.5rem] py-[0.4rem] text-[#020817]/90 rounded-[0.25rem] font-normal border border-[#FED7AA] bg-white focus:outline-none focus:border-orange-500 h-[4rem]"
              placeholder=""
            ></textarea>
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className={`mt-[1rem] bg-[#EA580C] text-white text-[0.6rem] font-semibold px-[0.75rem] py-[0.45rem] rounded-full flex items-center justify-center hover:bg-orange-600 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isLoading ? 'Submitting...' : 'Submit Application'}
          {!isLoading && (
            <img
              className='ml-[0.125rem] w-[1rem]'
              src="assets/submit application arrow.svg"
              alt="->"
            />
          )}
        </button>
      </div>
    </div>
  );
};

export default ApplicationForm;