// src/pages/about-us/components/OurStorySection.jsx
import React from 'react';
import Card from '../../../components/ui/Card';

const OurStorySection = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-[#2c2c2c] mb-6">
            Our <span className="text-[#f4a261]">Story</span>
          </h2>
          <p className="text-xl text-[#656565] max-w-3xl mx-auto leading-relaxed">
            Born from the timeless wisdom of the Vedas and fueled by compassion for humanity
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Story Content */}
          <div className="order-2 lg:order-1">
            <Card variant="gradient" className="rounded-[30px] p-8 border border-[#cfcfcf]">
              <h3 className="text-3xl font-bold text-[#2c2c2c] mb-6">The Beginning</h3>
              <p className="text-lg text-[#656565] mb-6 leading-relaxed">
                It all started with a simple yet powerful vision: to ensure that no child goes to bed hungry or grows up without access to education. In 2010, a small group of devoted volunteers began distributing meals to underprivileged children in the streets of our community.
              </p>
              <p className="text-lg text-[#656565] mb-6 leading-relaxed">
                What began as a humble initiative has now blossomed into a comprehensive foundation that serves thousands of children across multiple states, providing not just food, but also education, healthcare, and spiritual guidance.
              </p>
              <div className="bg-[#f4a261] bg-opacity-10 rounded-[20px] p-6 border-l-4 border-[#f4a261]">
                <p className="text-lg font-medium text-[#2c2c2c] italic">
                  "The real measure of our success is not in the numbers we serve, but in the smiles we create and the futures we help build."
                </p>
                <p className="text-base text-[#656565] mt-3">- Founder's Vision</p>
              </div>
            </Card>
          </div>

          {/* Story Image */}
          <div className="order-1 lg:order-2">
            <Card className="bg-white rounded-[30px] p-0 shadow-[15px_15px_38px_rgba(209,213,215,0.9)] overflow-hidden">
              <img 
                src="https://assets.pexels.com/photos/8923184/pexels-photo-8923184.jpeg?auto=compress&cs=tinysrgb&w=1200" 
                alt="Our journey from humble beginnings" 
                className="w-full h-[400px] object-cover"
              />
            </Card>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          <h3 className="text-4xl font-bold text-center text-[#2c2c2c] mb-12">
            Our <span className="text-[#e76f51]">Journey</span> Milestones
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Milestone 1 */}
            <Card variant="gradient" className="rounded-[25px] p-8 border border-[#cfcfcf] text-center">
              <div className="bg-[#f4a261] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">2010</span>
              </div>
              <h4 className="text-2xl font-bold text-[#2c2c2c] mb-4">Foundation Established</h4>
              <p className="text-lg text-[#656565] leading-relaxed">
                Started with serving 50 meals daily to street children in our local community.
              </p>
            </Card>

            {/* Milestone 2 */}
            <Card variant="gradient" className="rounded-[25px] p-8 border border-[#cfcfcf] text-center">
              <div className="bg-[#e76f51] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">2015</span>
              </div>
              <h4 className="text-2xl font-bold text-[#2c2c2c] mb-4">Education Program</h4>
              <p className="text-lg text-[#656565] leading-relaxed">
                Launched our first school and began providing formal education to 200+ children.
              </p>
            </Card>

            {/* Milestone 3 */}
            <Card variant="gradient" className="rounded-[25px] p-8 border border-[#cfcfcf] text-center">
              <div className="bg-[#0b3954] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">2024</span>
              </div>
              <h4 className="text-2xl font-bold text-[#2c2c2c] mb-4">National Impact</h4>
              <p className="text-lg text-[#656565] leading-relaxed">
                Now serving 10,000+ children daily across 5 states with comprehensive support.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStorySection;