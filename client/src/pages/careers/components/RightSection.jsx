import React from 'react';
import Vacancies from './Vacancies';
import { X } from 'lucide-react';
import { useCareer } from '../../../contexts/CareerContext';

const RightSection = () => {
  const { searchQuery, setSearchQuery, clearSearch, triggerSearch } = useCareer();

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <section className='h-[90vh] relative flex flex-col font-sans items-center md:items-start w-full md:w-[50%] md:pl-[4rem] lg:pl-[8rem] bg-[#fff7e6] overflow-y-hidden'>
      <img
        className='absolute hidden md:block left-0 w-[2rem] bottom-1/4'
        src="assets/Career Red Ellipse.png"
        alt="Ellipse"
        draggable={false}
      />
      <img
        className='absolute hidden md:block right-0 w-[2rem] bottom-3/4'
        src="assets/Career Orange Ellipse.png"
        alt="Ellipse"
        draggable={false}
      />

      <div className="text-left mt-[5rem] md:mt-[10rem] mb-[1.5rem] w-full flex flex-col items-center md:items-start">
        <h1 className="text-[1.5rem] md:text-[2.2rem] leading-6 text-[#F05722]">
          Design<span className='text-black'>.</span>{' '}
          <span className='text-[#DF293E] font-playfair italic font-semibold'>Develop</span>
          <span className='text-black'>.</span> Inspire<span className='text-black'>.</span>
        </h1>
        <p className="text-[0.75rem] md:text-[1.125rem] font-sans text-[#303030] mt-[0.5rem]">
          Elevate Your Career at <span className='text-[#F05722]'>Hare Krishna Vidya</span>
        </p>
      </div>

      {/* Search and Button Section */}
      <div className="flex items-center justify-start gap-[0.75rem] my-[1rem] md:my-[2rem]">
        <div className="relative">
          <input
            type="text"
            placeholder="Try, Tech Industry"
            value={searchQuery}
            onChange={handleInputChange}
            className="rounded-[2rem] pt-[0.4rem] pb-[0.5rem] pl-[0.75rem] pr-[2rem] text-[0.75rem] focus:outline-none w-[10rem] md:w-[12rem]"
          />
          {searchQuery ? (
            <X
              className='absolute top-1/2 -translate-y-1/2 right-3 w-[1.125rem] cursor-pointer'
              onClick={clearSearch}
            />
          ) : (
            <img
              className='absolute top-1/2 -translate-y-1/2 right-3 w-[1.125rem]'
              src="/assets/search.png"
              alt="🔍"
              draggable={false}
            />
          )}
        </div>
        <button
          className="bg-[#F05722] text-[#F8F0E3] pt-[0.4rem] pb-[0.4rem] px-[1rem] md:px-[1.5rem] rounded-[2rem] text-[0.75rem] hover:bg-[#E64A2F]"
          onClick={() => triggerSearch(searchQuery)}
        >
          Get Vacancy
        </button>
      </div>

      <Vacancies />
    </section>
  );
};

export default RightSection;