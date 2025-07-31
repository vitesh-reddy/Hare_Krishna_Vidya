import WhiteGlowDiv from '@/components/common/WhiteGlowDiv';
import React, { useEffect, useState } from 'react';
import PointItem from './PointItem';

const Mission_VisionSection = () => {
  const [status, setStatus] = useState('mission');
  const [fadeIn, setFadeIn] = useState(true);

  const transition = 'transition-all duration-500 ease-in-out';
  const contents = {
    mission: {
      text1Width: '32rem',
      bgColor: '#E76F51',
      imgUrl: '/assets/mission.png',
      text1:
        'At Aikya Vidya, our mission is to empower underprivileged children from rural communities by nurturing not just their minds, but their hearts and hopes too. We believe that every child, regardless of their socio-economic background, deserves the chance to thrive and that education, nourishment, and values are the pillars of true empowerment.',
      text2: 'Here’s how we bring this mission to life:',
      points: [
        'Providing Free Post-School Education',
        'Ensuring Nutritious Meals',
        'Instilling Core Values for Life',
        'Creating a Safe, Nurturing Environment',
      ],
    },
    vision: {
      text1Width: '21.5rem',
      bgColor: '#F4A261',
      imgUrl: '/assets/vision.png',
      text1:
        'We envision a world where every child is given the wings to rise, not just survive. A future where learning is joyful, nourishing is dignified, and values are woven into the heart of education.',
      text2: 'Here’s how we bring this mission to life:',
      points: [
        'Universal Access to Quality Education & Food',
        'Thriving Rural Communities through Value-Based Learning',
        'Redefining Education as a Gateway to Purpose',
        'Nurturing Tomorrow’s Compassionate Leaders',
      ],
    },
  };

  const handleStatusChange = (newStatus) => {
    if (newStatus === status) return;
    setFadeIn(false);
    setTimeout(() => {
      setStatus(newStatus);
      setFadeIn(true);
    }, 300);
  };

  const content = status === 'mission' ? contents.mission : contents.vision;

  return (
    <section className="flex flex-col items-start 2xl:px-[10rem] mb-[4rem]">
      <div className="hidden md:block relative w-[480px] bg-black">
        <div
          onClick={() => handleStatusChange('mission')}
          className={'absolute left-0 cursor-pointer' + transition + (status === 'mission' ? ' z-10' : ' z-0')}
        >
          <img  loading="lazy" src="assets/Rectangle_1.png" alt="Left" className="w-[334px]" draggable={false} />
        </div>
        <div
          onClick={() => handleStatusChange('vision')}
          className={'absolute right-0 cursor-pointer' + transition + (status === 'vision' ? ' z-10' : ' z-0')}
        >
          <img  loading="lazy" src="assets/Rectangle_2.png" alt="Right" className="w-[290px]"  draggable={false} />
        </div>
      </div>

      <div className="hidden md:flex w-[96.5%] max-w-[90rem] mt-[2.6rem] h-[550px]">
        <div
          className={`w-[50%] p-[3rem] rounded-[0px_0px_0px_30px] flex flex-col justify-evenly transition-all duration-500`}
          style={{ backgroundColor: content.bgColor }}
        >
          <p
            key={status + '-text1'}
            className={`font-inter font-semibold text-[0.75rem] md:text-[0.8rem] lg:text-[1rem] text-[#F9F9F9] lg:leading-[1.7rem] transition-[opacity,width] duration-500 ${
              fadeIn ? 'opacity-100' : 'opacity-80'
            }`}
          >
            {content.text1}
          </p>

          <div className="flex flex-col justify-evenly space-y-6">
            <p className="font-inter md:text-[0.8rem] lg:text-[1rem] font-semibold text-[#2C2C2C]">{content.text2}</p>
						{content.points.map((point, index) => (
							<PointItem
								key={status + '-point-' + index}
								point={point}
								fadeIn={fadeIn}
								status={status}
								index={index}
							/>
						))}

          </div>
        </div>

        <div className="rounded-[0px_30px_30px_0px] overflow-hidden relative w-[50%] flex items-center justify-center">
          <img
            loading="lazy"
            key={status + '-image'}
            src={content.imgUrl}
            alt={status}
            className={`rounded-[0px_30px_30px_0px] w-full h-full object-cover transition-opacity ease-out-in duration-500 ${
              fadeIn ? 'opacity-100' : 'opacity-80'
            }`}
          />
        </div>
      </div>
          
      <div className='md:hidden px-[2rem] sm:pr-[10rem]'>
        <p className='font-urbanist [font-style:oblique_6deg] text-[1.5rem] font-bold text-[#2c2c2c]'>Our Mission</p>
        <p className={`font-inter font-semibold text-[0.75rem] sm:text-[0.8rem] mb-[1rem] text-[#404040] }`} > {content.text1} </p>
          <div className="flex flex-col justify-evenly space-y-6">
            <p className="font-inter text-[0.9rem] md:text-[0.8rem] lg:text-[1rem] font-semibold text-[#2C2C2C]">{content.text2}</p>
						{content.points.map((point, index) => (
							<PointItem
								key={status + '-point-' + index}
								point={point}
								fadeIn={fadeIn}
								status={status}
								index={index}
                align='start'
							/>
						))}

          </div>       
      </div>
      <div className='md:hidden px-[2rem] sm:pl-[10rem] sm:pr-[4rem] mt-[2rem] flex flex-col items-end'>
        <p className='font-urbanist [font-style:oblique_6deg] text-end text-[1.5rem] font-bold text-[#2c2c2c]'>Our Vision</p>
        <p className={`font-inter font-semibold text-[0.75rem] text-end sm:text-[0.8rem] mb-[1rem] text-[#404040] }`} > {contents.vision.text1} </p>
          <div className="flex flex-col items-end justify-evenly space-y-6">
            <p className="font-inter text-[0.9rem] md:text-[0.8rem] lg:text-[1rem] font-semibold text-[#2C2C2C]">{contents.vision.text2}</p>
						{content.points.map((point, index) => (
							<PointItem
								key={status + '-point-' + index}
								point={point}
								fadeIn={fadeIn}
								status={status}
								index={index}
                align='end'
							/>
						))}

          </div>       
      </div>

    </section>
  );
};

export default Mission_VisionSection;
