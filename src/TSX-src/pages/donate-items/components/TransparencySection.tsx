
import React from 'react';
import { Button } from '../../../components/ui/button';

const TransparencySection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Where Your <span className="text-orange-600">Money Goes</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Complete transparency in how we use your donations
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div className="relative">
            <div className="w-80 h-80 mx-auto relative">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#f3f4f6" strokeWidth="10"/>
                <circle cx="50" cy="50" r="45" fill="none" stroke="#ea580c" strokeWidth="10" 
                        strokeDasharray="226.19" strokeDashoffset="45.24" className="transition-all duration-1000"/>
                <circle cx="50" cy="50" r="45" fill="none" stroke="#fb923c" strokeWidth="10" 
                        strokeDasharray="33.93" strokeDashoffset="-180.95" className="transition-all duration-1000"/>
                <circle cx="50" cy="50" r="45" fill="none" stroke="#fed7aa" strokeWidth="10" 
                        strokeDasharray="11.31" strokeDashoffset="-214.88" className="transition-all duration-1000"/>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-800">100%</div>
                  <div className="text-sm text-gray-600">Transparency</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-6 h-6 bg-orange-600 rounded-full"></div>
              <div>
                <div className="font-semibold text-gray-800">80% - Direct Kit Distribution</div>
                <div className="text-gray-600">Purchasing and assembling kits for beneficiaries</div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-6 h-6 bg-orange-400 rounded-full"></div>
              <div>
                <div className="font-semibold text-gray-800">15% - Logistics & Distribution</div>
                <div className="text-gray-600">Transportation and delivery to remote areas</div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-6 h-6 bg-orange-200 rounded-full"></div>
              <div>
                <div className="font-semibold text-gray-800">5% - Administration</div>
                <div className="text-gray-600">Platform maintenance and operational costs</div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg mt-8">
              <h4 className="font-semibold text-gray-800 mb-4">Our Certifications</h4>
              <div className="flex flex-wrap gap-4">
                <div className="bg-white px-4 py-2 rounded-full text-sm font-medium text-gray-700 border">
                  FCRA Registered
                </div>
                <div className="bg-white px-4 py-2 rounded-full text-sm font-medium text-gray-700 border">
                  NGO Darpan Verified
                </div>
                <div className="bg-white px-4 py-2 rounded-full text-sm font-medium text-gray-700 border">
                  80G Certified
                </div>
              </div>
              
              <Button variant="outline" className="mt-6 border-orange-600 text-orange-600 hover:bg-orange-50">
                Download Financial Reports
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransparencySection;
