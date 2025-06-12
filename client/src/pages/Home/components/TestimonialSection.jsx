import React from 'react';
import WhiteGlowDiv from '@/components/common/whiteGlowDiv';

const TestimonialSection = () => {
  const testimonials = [
    {
      id: 1,
      text: 'Lorem ipsum dolor sit amet consectetur. Libero convallis proin habitasse sollicitudin. Mi adipiscing sed quis odio duis ipsum eget scelerisque quis.',
      name: 'Lorem ipsum',
      location: 'Lorem ipsum',
      donation: 'Donated ₹1000 in Anadaan',
      image: '/assets/img_ellipse_3.png',
    },
    {
      id: 2,
      text: 'Lorem ipsum dolor sit amet consectetur. Libero convallis proin habitasse sollicitudin. Mi adipiscing sed quis odio duis ipsum eget scelerisque quis.',
      name: 'Lorem ipsum',
      location: 'Lorem ipsum',
      donation: 'Donated ₹1000 in Anadaan',
      image: '/assets/img_ellipse_3.png',
    },
    {
      id: 3,
      text: 'Lorem ipsum dolor sit amet consectetur. Libero convallis proin habitasse sollicitudin. Mi adipiscing sed quis odio duis ipsum eget scelerisque quis.',
      name: 'Lorem ipsum',
      location: 'Lorem ipsum',
      donation: 'Donated ₹1000 in Anadaan',
      image: '/assets/img_ellipse_3.png',
    },
  ];  
  return (
    <section className="py-12 px-16 sm:py-16 lg:py-20 mb-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <WhiteGlowDiv text="Testimonials" />

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-urbanist font-extrabold text-[#2c2c2c] text-center mb-5">
            Your <span className="text-accent-yellow [font-style:oblique_6deg]">Impact </span> in
            Their Words
          </h2>
          <p className="text-[0.75rem] md:text-[1rem] font-inter font-medium text-[#2c2c2c] md:w-[30rem] text-center max-w-2xl mx-auto">
            Real voices. Real change. Hear from those whose lives have been transformed by your
            kindness.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="relative">
              <div className="hover:border-4 border-accent-yellow rounded-[40px] p-0 overflow-hidden transition-all duration-300">
                <div className="overflow-hidden bg-[#e76f51] rounded-[40px] p-6 lg:px-10 lg:py-[4rem] shadow-[15px_15px_38px_rgba(209,213,215,0.9)]">
                  <p className="text-lg lg:text-[1.3rem] text-[#ecece2] font-[400] font-inter text-opacity-90 mb-[2rem] md:mb-14 lg:mb-20 md:leading-relaxed">
                    {testimonial.text}
                  </p>

                  <div className="flex items-center space-x-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 lg:w-[4.75rem]  rounded-full object-cover"
                    />
                    <div className="flex flex-col space-y-3 justify-evenly">
                      <h4 className="text-xl lg:text-[1.75rem] font-urbanist font-bold text-[#ECECE2] ">
                        {testimonial.name}
                      </h4>
                      <p className="text-base lg:text-[1rem] font-inter text-[#ECECE2]/60 font-medium text-opacity-70">
                        {testimonial.location}
                      </p>
                      <p className="text-sm lg:text-[0.9rem] font-inter font-semibold text-[#ECECE2]">
                        {testimonial.donation}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
