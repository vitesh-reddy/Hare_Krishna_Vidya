import React from 'react';
import WhiteGlowDiv from './WhiteGlowDiv';

  const galleryImages = [
    { src: '/assets/img_image_15.png', alt: 'Children receiving education' },
    { src: '/assets/img_image_16.png', alt: 'Community gathering' },
    { src: '/assets/img_image_17.png', alt: 'Educational activities' },
    { src: '/assets/img_image_18.png', alt: 'Food distribution' },
    { src: '/assets/img_image_19.png', alt: 'Happy children' },
  ];

const GallerySection = () => {
  return (
    <section className="py-12 px-[1rem] lg:px-[5rem] sm:py-16 lg:py-20 bg-gradient-gallery">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-[3rem] sm:mb-[4rem] md:mb-[4.5rem] lg:mb-28">
          <WhiteGlowDiv text="Gallery" />

          <p className="text-[1.25rem] sm:text-4xl lg:text-[2.20rem] text-[#2C2C2C] font-urbanist font-extrabold text-center sm:mb-4 leading-[1.5rem]">
            A glimpse into the lives you have
          </p>
          <p className="text-[1.25rem] sm:text-4xl lg:text-[2.20rem] text-[#2C2C2C]  font-urbanist font-extrabold text-center mb-8 leading-[1.5rem]">
            touched with your{' '}
            <span className="text-accent-yellow [font-style:oblique_6deg]">kindness.</span>
          </p>
        </div>

        <div className="hidden sm:flex justify-evenly items-start space-x-8">
          {/* Left Column */}
          <div className="space-y-12">
            <div className="overflow-hidden bg-white rounded-[20px] p-0 group shadow-[15px_15px_38px_rgba(209,213,215,0.9)]">
              <img
                src={galleryImages[0].src}
                alt={galleryImages[0].alt}
                className="w-full  object-cover "
              />
            </div>
            <div className="overflow-hidden bg-white rounded-[20px] p-0 group shadow-[15px_15px_38px_rgba(209,213,215,0.9)]">
              <img
                src={galleryImages[3].src}
                alt={galleryImages[3].alt}
                className="w-full object-cover "
              />
            </div>
          </div>

          {/* Center Column */}
          <div className="">
            <div className="overflow-hidden bg-white rounded-[20px] p-0 mb-auto group shadow-[15px_15px_38px_rgba(209,213,215,0.9)]">
              <img
                src={galleryImages[1].src}
                alt={galleryImages[1].alt}
                className="w-full object-cover "
              />
            </div>

            <div className="text-center py-auto flex flex-col justify-evenly md:space-y-3 lg:space-y-4 md:py-8 lg:py-12">
              <p className="text-[1.75rem] sm:text-3xl md:text-[1.75rem] lg:text-[2rem] font-urbanist font-bold text-[#2C2C2C] lg:leading-[1rem]">
                Real change doesn't
              </p>
              <p className="text-[1.75rem] sm:text-3xl md:text-[1.75rem] lg:text-[2rem] font-urbanist font-bold text-[#2C2C2C] lg:leading-[1.5rem]">
                always speak
              </p>
              <p className="text-[1.75rem] sm:text-3xl md:text-[1.75rem] lg:text-[2rem] font-urbanist font-bold text-[#2C2C2C] lg:leading-[1.5rem]">
                it shows. <span className="text-accent-yellow font-extrabold">Just like this.</span>
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-12">
            <div className="overflow-hidden bg-white rounded-[20px] p-0 group shadow-[15px_15px_38px_rgba(209,213,215,0.9)]">
              <img
                src={galleryImages[2].src}
                alt={galleryImages[2].alt}
                className="w-full object-cover "
              />
            </div>
            <div className="overflow-hidden bg-white rounded-[20px] p-0 group shadow-[15px_15px_38px_rgba(209,213,215,0.9)]">
              <img
                src={galleryImages[4].src}
                alt={galleryImages[4].alt}
                className="w-full object-cover "
              />
            </div>
          </div>
        </div>
        {/* Mobile View */}
        <div className='flex sm:hidden flex-col space-y-5 items-center px-[4rem]'>
          <img className='rounded-[2rem]' src={galleryImages[1].src} alt={galleryImages[1].alt}/>
          <img className='rounded-[2rem]' src={galleryImages[4].src} alt={galleryImages[1].alt}/>
          <img className='rounded-[2rem]' src={galleryImages[0].src} alt={galleryImages[0].alt}/>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
