import React from 'react';
import { useCareer } from '../../../contexts/CareerContext';

const Vacancies = () => {
  const { jobs, setStatus, setSelectedJob, isJobApplied, isLoading, hasMoreJobs, loadMoreJobs} = useCareer();
  return (
    <div className="flex flex-col items-center md:items-start ml-[1rem] w-[90%] md:w-fit h-full">
      <div className="w-full max-w-[28rem]">
        <h2 className="text-[1rem] md:text-[1.125rem] mb-[1rem] text-[#303030]">
        </h2>

        {/* Scrollable vacancy list */}
        <div className="overflow-y-auto md:pr-[0.5rem] custom-scrollbar h-[60vh] md:h-[40vh]">
          {jobs.length === 0 ? (
            <p className="text-[0.75rem] text-center text-[#303030]">No vacancies found</p>
          ) : (
            jobs.map((vacancy) => (
              <VacancyCard key={vacancy._id} vacancy={vacancy} />
            ))
          )}
        {hasMoreJobs && (
          <div className="w-full flex justify-center pb-[2rem]">
            <button
              onClick={loadMoreJobs}
              disabled={isLoading}
              className={`text-[0.65rem] bg-gradient-to-b hover:bg-gradient-to-t from-[#DF293E] to-[#F05722] text-white py-[0.5rem] px-[0.75rem] rounded-[2rem] mt-[1rem] flex items-center gap-[0.5rem] ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isLoading ? 'Loading...' : 'Load More Jobs'}
            </button>
          </div>
        )}          
        </div>
      </div>
    </div>
  );
};

const VacancyCard = ({ vacancy }) => {
  const { title, description, skills, location, type, _id } = vacancy;
  const { setStatus, setSelectedJob, isJobApplied } = useCareer();

  const handleApply = () => {
    setSelectedJob(vacancy);
    setStatus('applying');
  };  

  return (
    <div className="bg-white rounded-[1rem] flex flex-col md:flex-row justify-between w-[95%] px-[0.75rem] pt-[0.5rem] pb-[0.75rem] mb-[0.75rem]">
      <div className='md:w-[63%]'>
        <div className="flex flex-row justify-between items-center">
          <h3 className="text-[1.125rem]">{title}</h3>
        </div>
        <p className="text-[0.7rem] font-normal text-wrap text-black/60 mt-[0.5rem] leading-[0.7rem]">
          {description.slice(0, 130) + (description.length > 130 ? "..." : '')}
        </p>
        <p className=' text-[0.6rem] lg:text-[1rem] leading-[1rem]'>{Array(80).fill('\u00A0').join('') }</p>
        <div className="mt-[0rem]">
          <p className="text-[0.75rem] leading-[0.125rem]">Skills Required:</p>
          {skills.map((skill, idx) => (
            <span className='text-black/60 text-[0.6rem] mr-[0.5rem]' key={idx}>
              {skill}
            </span>
          ))}
        </div>
      </div>
      <div className='flex flex-row md:flex-col justify-between items-center md:items-end md:pt-[0.25rem] pr-[0.25rem]'>
        <div className='flex flex-col items-end justify-evenly'>
          <div className="flex md:items-end text-[#303030]">
            <img
              className='w-[0.75rem] mr-[0.25rem]'
              src="/assets/map-pin.svg"
              alt="📍"
              draggable={false}
            />
            <span className="text-[0.65rem]">{location}</span>
          </div>
          <p className="text-[0.65rem]">{type}</p>
        </div>
        {isJobApplied(_id) ? (
          <button
            className="bg-gray-300 text-[#303030] py-[0.5rem] px-[0.75rem] rounded-[2rem] mt-[1rem] flex items-center gap-[0.5rem] cursor-not-allowed"
            disabled
          >
            <span className="text-[0.65rem]">Applied</span>
          </button>
        ) : (
          <button
            onClick={handleApply}
            className="bg-gradient-to-b hover:bg-gradient-to-t from-[#DF293E] to-[#F05722] text-white py-[0.5rem] px-[0.75rem] rounded-[2rem] mt-[1rem] flex items-center gap-[0.5rem]"
          >
            <span className="text-[0.65rem] text-[#F8F0E3]">Apply</span>
            <img
              className='w-[1rem]'
              src="/assets/arrow-up-right.svg"
              alt="↗️"
              draggable={false}
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default Vacancies;