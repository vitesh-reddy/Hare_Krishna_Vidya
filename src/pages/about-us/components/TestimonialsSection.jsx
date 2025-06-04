// src/pages/about-us/components/TestimonialsSection.jsx
import React, { useState, useEffect } from 'react';
import Card from '../../../components/ui/Card';

const TestimonialCard = ({ testimonial, isActive }) => {
  return (
    <div 
      className={`transition-all duration-500 transform ${
        isActive ? 'opacity-100 scale-100' : 'opacity-50 scale-95'
      }`}
    >
      <Card 
        variant="gradient" 
        className="rounded-[30px] p-8 border border-[#cfcfcf] text-center min-h-[400px] flex flex-col justify-between"
      >
        <div>
          <div className="w-20 h-20 mx-auto mb-6 rounded-full overflow-hidden border-4 border-[#f4a261]">
            <img 
              src={testimonial.image} 
              alt={testimonial.name}
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-xl text-[#2c2c2c] mb-6 leading-relaxed italic">
            "{testimonial.quote}"
          </p>
        </div>
        <div>
          <h4 className="text-2xl font-bold text-[#2c2c2c] mb-2">{testimonial.name}</h4>
          <p className="text-lg text-[#e76f51] font-semibold mb-2">{testimonial.role}</p>
          <p className="text-base text-[#656565]">{testimonial.organization}</p>
        </div>
      </Card>
    </div>
  );
};

const TestimonialsSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const testimonials = [
    {
      name: "Dr. Meera Joshi",
      role: "Child Psychologist",
      organization: "Mumbai Children\'s Hospital",
      quote: "The holistic approach of Hare Krishna Vidya towards child development is remarkable. They don\'t just feed bodies, they nourish souls and minds. I\'ve seen children transform from withdrawn and malnourished to confident, healthy learners.",
      image: "https://assets.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      name: "Rajesh Kumar",
      role: "Parent",
      organization: "Father of Sponsored Child",
      quote: "My daughter Priya was struggling in school and often went hungry. Since joining Hare Krishna Vidya\'s program, she\'s not only well-fed but has become one of the top students in her class. The foundation saved our family\'s future.",
      image: "https://assets.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      name: "Sister Mary Thomas",
      role: "Social Worker",
      organization: "St. Joseph\'s Community Center",
      quote: "In my 25 years of social work, I\'ve rarely seen an organization that combines efficiency with such genuine compassion. Their transparency and dedication to the children is truly inspiring.",
      image: "https://assets.pexels.com/photos/3768894/pexels-photo-3768894.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
      name: "Anita Sharma",
      role: "Former Student, Now Teacher",
      organization: "Hare Krishna Vidya Graduate",
      quote: "I was once a beneficiary of this foundation\'s programs. Today, I\'m a teacher giving back to new students. This organization doesn\'t just change lives—it creates cycles of positive change that last generations.",
      image: "https://assets.pixabay.com/photo/2017/05/31/04/59/beautiful-2359121_640.jpg"
    },
    {
      name: "Vikram Patil",
      role: "Local Government Official",
      organization: "District Education Officer",
      quote: "Hare Krishna Vidya has become an integral part of our community\'s educational ecosystem. Their innovative approaches and consistent results have earned them the trust and respect of families and officials alike.",
      image: "https://assets.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentSlide + i) % testimonials.length;
      visible.push({
        ...testimonials[index],
        isActive: i === 1, // Middle testimonial is active
        slideIndex: index
      });
    }
    return visible;
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="bg-gradient-to-r from-[#e8e8e8] to-white rounded-[24px] p-4 shadow-[6px_6px_15px_rgba(185,185,185,0.9)] inline-flex items-center space-x-3 mb-6">
            <img src="/assets/img_shines.png" alt="Shine icon" className="w-5 h-5" />
            <span className="text-base font-semibold text-black">Testimonials</span>
          </div>
          
          <h2 className="text-5xl font-bold text-[#2c2c2c] mb-6">
            Voices of <span className="text-[#f4a261]">Change</span> and <span className="text-[#e76f51]">Hope</span>
          </h2>
          <p className="text-xl text-[#656565] max-w-3xl mx-auto leading-relaxed">
            Hear from the people whose lives we've touched and the professionals who witness our impact every day
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative">
          {/* Desktop View - 3 Cards */}
          <div className="hidden md:grid md:grid-cols-3 gap-8 mb-8">
            {getVisibleTestimonials().map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.slideIndex}
                testimonial={testimonial}
                isActive={testimonial.isActive}
              />
            ))}
          </div>

          {/* Mobile View - 1 Card */}
          <div className="md:hidden mb-8">
            <TestimonialCard
              testimonial={testimonials[currentSlide]}
              isActive={true}
            />
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={prevSlide}
              className="bg-[#f4a261] text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-[#e89a5c] transition-colors shadow-soft"
              aria-label="Previous testimonial"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Dots Indicator */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentSlide ? 'bg-[#f4a261]' : 'bg-[#cfcfcf]'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="bg-[#f4a261] text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-[#e89a5c] transition-colors shadow-soft"
              aria-label="Next testimonial"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Statistics */}
        <div className="mt-16">
          <Card variant="secondary" className="rounded-[30px] p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-white mb-2">98%</div>
                <p className="text-lg text-[rgba(255,255,255,0.8)]">Satisfaction Rate</p>
                <p className="text-sm text-[rgba(255,255,255,0.6)] mt-2">From families we serve</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-white mb-2">1000+</div>
                <p className="text-lg text-[rgba(255,255,255,0.8)]">Success Stories</p>
                <p className="text-sm text-[rgba(255,255,255,0.6)] mt-2">Lives transformed completely</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-white mb-2">15+</div>
                <p className="text-lg text-[rgba(255,255,255,0.8)]">Partner Organizations</p>
                <p className="text-sm text-[rgba(255,255,255,0.6)] mt-2">Collaborating for greater impact</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;