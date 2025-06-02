// src/pages/gallery/index.jsx
import React, { useState } from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import GalleryHero from './components/GalleryHero';
import ImageModal from './components/ImageModal';
import FilterTabs from './components/FilterTabs';

const GalleryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = [
    { id: 'all', name: 'All', count: 24 },
    { id: 'annadaan', name: 'Annadaan', count: 8 },
    { id: 'education', name: 'Education', count: 7 },
    { id: 'children', name: 'Children', count: 6 },
    { id: 'events', name: 'Events', count: 3 }
  ];

  const galleryImages = [
    {
      id: 1,
      src: '/images/img_image_15.png',
      title: 'Children receiving education',
      category: 'education',
      description: 'Young minds engaged in learning activities at our education center'
    },
    {
      id: 2,
      src: '/images/img_image_16.png',
      title: 'Community meal distribution',
      category: 'annadaan',
      description: 'Daily meal service reaching hundreds of families in need'
    },
    {
      id: 3,
      src: '/images/img_image_17.png',
      title: 'Educational activities',
      category: 'education',
      description: 'Interactive learning sessions fostering creativity and growth'
    },
    {
      id: 4,
      src: '/images/img_image_18.png',
      title: 'Food distribution program',
      category: 'annadaan',
      description: 'Volunteers serving fresh, nutritious meals to the community'
    },
    {
      id: 5,
      src: '/images/img_image_19.png',
      title: 'Happy children',
      category: 'children',
      description: 'Joyful moments captured during our child development programs'
    },
    {
      id: 6,
      src: '/images/img_frame_12.png',
      title: 'Community gathering',
      category: 'events',
      description: 'Bringing communities together through shared values and service'
    },
    {
      id: 7,
      src: '/images/img_image_13.png',
      title: 'Educational workshop',
      category: 'education',
      description: 'Skill development workshops empowering youth with practical knowledge'
    },
    {
      id: 8,
      src: '/images/img_image_14.png',
      title: 'Meal preparation',
      category: 'annadaan',
      description: 'Behind the scenes - preparing fresh, sanctified meals daily'
    }
  ];

  const filteredImages = selectedCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <div className="min-h-screen bg-neutral-background">
      <Header />
      
      <main>
        <GalleryHero />
        
        {/* Filter Section */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <FilterTabs 
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="pb-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredImages.map((image) => (
                <Card 
                  key={image.id} 
                  variant="default" 
                  className="p-0 overflow-hidden group cursor-pointer hover:shadow-custom-medium transition-all duration-300"
                  onClick={() => openModal(image)}
                >
                  <div className="relative overflow-hidden">
                    <img 
                      src={image.src} 
                      alt={image.title}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                      <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-neutral-dark mb-2 group-hover:text-accent-yellow transition-colors">
                      {image.title}
                    </h3>
                    <p className="text-text-muted text-sm">{image.description}</p>
                  </div>
                </Card>
              ))}
            </div>

            {/* Load More Button */}
            <div className="text-center mt-12">
              <Button 
                variant="outline" 
                size="large"
                className="px-8 py-4 rounded-[25px]"
              >
                Load More Images
              </Button>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 px-4 bg-gradient-gallery">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-dark mb-6">
              Want to Be Part of <span className="text-accent-yellow">Our Story?</span>
            </h2>
            <p className="text-xl text-text-muted mb-8">
              Join us in creating more moments like these. Your contribution can help us reach more lives.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="primary" 
                size="large"
                className="px-8 py-4 text-lg rounded-[25px] shadow-custom-blue"
              >
                Donate Now
              </Button>
              <Button 
                variant="outline" 
                size="large"
                className="px-8 py-4 text-lg rounded-[25px]"
              >
                Volunteer With Us
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      
      {/* Image Modal */}
      <ImageModal 
        isOpen={isModalOpen}
        image={selectedImage}
        onClose={closeModal}
      />
    </div>
  );
};

export default GalleryPage;