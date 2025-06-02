// src/pages/contact/components/LocationMap.jsx
import React from 'react';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';

const LocationMap = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Map Placeholder */}
      <div className="lg:col-span-2">
        <Card variant="default" className="p-0 overflow-hidden h-96 lg:h-[500px]">
          <div className="w-full h-full bg-gradient-to-br from-neutral-light to-border-light flex items-center justify-center relative">
            {/* Map Placeholder */}
            <div className="text-center">
              <div className="text-6xl mb-4">🗺️</div>
              <h3 className="text-xl font-semibold text-neutral-dark mb-2">Interactive Map</h3>
              <p className="text-text-muted">Map integration will be available here</p>
            </div>
            
            {/* Location Pin */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="bg-accent-yellow w-6 h-6 rounded-full border-4 border-white shadow-lg animate-pulse"></div>
            </div>
          </div>
        </Card>
      </div>

      {/* Location Details */}
      <div className="space-y-6">
        <Card variant="default" className="p-8">
          <h3 className="text-xl font-semibold text-neutral-dark mb-6">Our Location</h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-neutral-dark mb-1">Main Center</h4>
              <p className="text-text-muted">
                123 Seva Road, Krishna Nagar<br />
                Mumbai, Maharashtra 400001<br />
                India
              </p>
            </div>
            
            <div className="border-t border-border-light pt-4">
              <h4 className="font-medium text-neutral-dark mb-2">Nearby Landmarks</h4>
              <ul className="text-text-muted space-y-1">
                <li>• Near Central Park (500m)</li>
                <li>• Krishna Temple (200m)</li>
                <li>• Metro Station (1km)</li>
                <li>• Bus Stop (100m)</li>
              </ul>
            </div>
          </div>
        </Card>

        <Card variant="gradient" className="p-8">
          <h3 className="text-xl font-semibold text-neutral-dark mb-6">Visit Us</h3>
          
          <div className="space-y-4">
            <p className="text-text-muted">
              We welcome visitors to see our work firsthand. Schedule a visit to tour our facilities and meet our team.
            </p>
            
            <div className="space-y-3">
              <Button 
                variant="primary" 
                size="medium"
                className="w-full rounded-[20px]"
              >
                Schedule a Visit
              </Button>
              <Button 
                variant="outline" 
                size="medium"
                className="w-full rounded-[20px]"
              >
                Get Directions
              </Button>
            </div>
          </div>
        </Card>

        <Card variant="default" className="p-6">
          <div className="text-center">
            <div className="text-4xl mb-3">🚗</div>
            <h4 className="font-semibold text-neutral-dark mb-2">Free Parking</h4>
            <p className="text-sm text-text-muted">Ample parking space available for visitors</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LocationMap;