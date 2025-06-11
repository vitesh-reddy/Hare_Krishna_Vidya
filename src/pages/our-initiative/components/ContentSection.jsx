import React from 'react'

const ContentSection = () => {
  const contents = [
    {id: 0, heading: "Spiritual Education", texts: ["Yoga & Meditation", "Prayers", "Philosophy"], imgUrl: "/assets/content1.png"},
    {id: 1, heading: "Arts", texts: ["Singing", "Dancing", "Music Instruments"], imgUrl: "/assets/content2.png"},
    {id: 2, heading: "Leadership", texts: ["Public Speaking", "Event Management", "Financial Management"], imgUrl: "/assets/content3.png"},
    {id: 3, heading: "Health & Hygiene", texts: ["Healthcare", "Basic Hygiene", "Cleanliness"], imgUrl: "/assets/content4.png"},
    {id: 4, heading: "Base", texts: ["Kitchen Gardening", "Promoting Horticulture", "Waste Management"], imgUrl: "/assets/content5.png"}
  ]
  return (
    <section className='flex flex-col items-center gap-[4rem] md:gap-[5rem] my-[6rem] px-[1rem] md:px-0'>
      <div className='w-full flex flex-col space-y-[4rem] md:flex-row md:justify-evenly md:items-center md:space-x-[1.75rem] md:space-y-0'>
        <div className='self-start md:self-auto'> <Card {...contents[0]} /> </div>
        <div className='self-end md:self-auto'> <Card {...contents[1]} /> </div>
      </div>


      <div className='flex justify-evenly items-center md:space-x-[7rem] self-start md:self-auto'>
        <svg className='hidden md:block h-[14rem]' width="11" height="271" viewBox="0 0 11 271" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M7.50525 268.758C13.4831 215.264 7.24589 161.298 6.7869 107.896C6.49444 72.5836 7.53306 37.2217 7.05858 1.94111C7.04183 0.883434 5.67008 0.0611937 3.98279 0.10568C2.29552 0.150804 0.943222 1.04561 0.959952 2.10265C1.43429 37.3794 0.395538 72.7374 0.687872 108.046C1.1435 161.352 7.38729 215.216 1.41626 268.614C1.30078 269.672 2.56294 270.561 4.24314 270.604C5.92312 270.641 7.37938 269.811 7.50525 268.758Z" fill="#2C2C2CAA"/>
        </svg>
        <div> <Card {...contents[2]}/> </div>
        <svg className='hidden md:block h-[14rem]' width="11" height="271" viewBox="0 0 11 271" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M7.50525 268.758C13.4831 215.264 7.24589 161.298 6.7869 107.896C6.49444 72.5836 7.53306 37.2217 7.05858 1.94111C7.04183 0.883434 5.67008 0.0611937 3.98279 0.10568C2.29552 0.150804 0.943222 1.04561 0.959952 2.10265C1.43429 37.3794 0.395538 72.7374 0.687872 108.046C1.1435 161.352 7.38729 215.216 1.41626 268.614C1.30078 269.672 2.56294 270.561 4.24314 270.604C5.92312 270.641 7.37938 269.811 7.50525 268.758Z" fill="#2C2C2CAA"/>
        </svg>
      </div>

      <div className='w-full flex flex-col space-y-[4rem] md:flex-row md:justify-evenly md:items-center md:space-x-[1.75rem] md:space-y-0'>
        <div className='self-end md:self-auto'> <Card {...contents[3]} /> </div>
        <div className='self-start md:self-auto'> <Card {...contents[4]} /> </div>
      </div>
    </section>
  )
}

const Card = ({id, heading, texts, imgUrl}) => {
  return (
    <div key={id} className={'relative w-[14rem] md:w-[22rem] rounded-[2rem] px-[1rem] md:pl-[3rem] md:pr-[4rem] pt-5 md:pt-10 pb-5 bg-[#EDF2F7] border-2 flex flex-col md:items-start space-y-5 shadow-custom-content-card items-' + ((id % 2) ? 'end' : 'start')}>
      <div className='absolute -top-[2rem] md:-top-[3rem] bg-[#F4A261]/60 md:bg-[#F4A261] p-[1rem] md:p-[1.5rem] rounded-full'><img className='w-[1.5rem] md:w-[2.5rem]' src={imgUrl} alt="Emoji" /></div>
      <p className='text-[#233876] text-[1.25rem] sm:text-[1.35rem] md:text-[1.5rem] lg:text-[1.75rem] font-urbanist font-bold'>{heading}</p>
      <div className={'flex flex-col justify-evenly space-y-1'}>
        {texts.map((text, idx) => {
          return (<p className={'font-inter text-[0.85rem] md:text-[0.95rem] lg:text-[1.125rem] text-[#656565] md:text-start font-medium text-' + ((id % 2) ? 'end' : 'start')} key={idx}> {text} </p>);
        })}
      </div>
    </div>
  )
}

export default ContentSection