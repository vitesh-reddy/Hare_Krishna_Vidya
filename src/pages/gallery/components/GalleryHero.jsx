// src/pages/gallery/components/GalleryHero.jsx
import React from 'react';
import Card from '../../../components/ui/Card';

const GalleryHero = () => {
  return (
    <section className="py-16 px-4 lg:py-24 bg-gradient-charity">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="bg-gradient-light rounded-[24px] p-4 shadow-custom-light inline-flex items-center space-x-3 mb-6">
            <img src="/assets/img_shines.png" alt="Gallery" className="w-5 h-5" />
            <span className="text-base font-semibold text-neutral-dark">Gallery</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-dark mb-6 leading-tight">
            Moments of <span className="text-accent-yellow">Compassion</span>
          </h1>
          
          <p className="text-xl text-text-muted max-w-3xl mx-auto mb-12">
            Witness the impact of kindness through these captured moments. Every image tells a story of transformation, hope, and community.
          </p>
        </div>

        {/* Featured Images Preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card variant="default" className="p-0 overflow-hidden group">
              <div className="relative">
                <img 
                  src="/assets/img_image_16.png" 
                  alt="Featured moment"
                  className="w-full h-80 lg:h-96 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black bg-opacity-60 to-transparent">
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">Community Meal Distribution</h3>
                    <p className="text-lg">Serving hope, one meal at a time</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card variant="default" className="p-0 overflow-hidden group">
              <div className="relative">
                <img 
                  src="/assets/img_image_15.png" 
                  alt="Education program"
                  className="w-full h-36 lg:h-44 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black bg-opacity-60 to-transparent">
                  <div className="absolute bottom-3 left-3 text-white">
                    <h4 className="text-lg font-semibold">Education Programs</h4>
                  </div>
                </div>
              </div>
            </Card>
            
            <Card variant="default" className="p-0 overflow-hidden group">
              <div className="relative">
                <img 
                  src="/assets/img_image_19.png" 
                  alt="Happy children"
                  className="w-full h-36 lg:h-44 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black bg-opacity-60 to-transparent">
                  <div className="absolute bottom-3 left-3 text-white">
                    <h4 className="text-lg font-semibold">Joyful Moments</h4>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GalleryHero;