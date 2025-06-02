// src/pages/gallery/components/ImageModal.jsx
import React, { useEffect } from 'react';
import Button from '../../../components/ui/Button';

const ImageModal = ({ isOpen, image, onClose }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !image) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4">
      <div className="max-w-4xl max-h-[90vh] w-full">
        {/* Close Button */}
        <div className="flex justify-end mb-4">
          <Button
            onClick={onClose}
            variant="outline"
            className="text-white border-white hover:bg-white hover:text-black rounded-full w-10 h-10 p-0"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </Button>
        </div>

        {/* Image */}
        <div className="bg-white rounded-lg overflow-hidden shadow-custom-heavy">
          <img 
            src={image.src} 
            alt={image.title}
            className="w-full h-auto max-h-[60vh] object-contain"
          />
          
          {/* Image Details */}
          <div className="p-6">
            <h3 className="text-2xl font-bold text-neutral-dark mb-2">{image.title}</h3>
            <p className="text-text-muted text-lg leading-relaxed">{image.description}</p>
            
            <div className="flex items-center justify-between mt-6">
              <span className="text-sm font-medium text-accent-yellow bg-accent-yellow bg-opacity-10 px-3 py-1 rounded-full capitalize">
                {image.category}
              </span>
              
              <div className="flex gap-2">
                <Button variant="outline" size="small" className="rounded-[15px]">
                  Share
                </Button>
                <Button variant="primary" size="small" className="rounded-[15px]">
                  Download
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;