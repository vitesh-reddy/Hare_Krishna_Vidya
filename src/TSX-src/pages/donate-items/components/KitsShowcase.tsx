
import React from 'react';
import KitCard from './KitCard';

const KitsShowcase = () => {
  const kits = [
    {
      id: 'education',
      title: 'Education Kit',
      description: 'Notebooks, pens, pencils, geometry box and more - everything to help a child learn and grow.',
      price: 790,
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      items: ['3-5 Recycled Notebooks', '2 Blue Pens', 'Pencils & Eraser', 'Geometry Box', 'Pencil Pouch', 'Hygiene Kit']
    },
    {
      id: 'grocery',
      title: 'Grocery Kit',
      description: 'Rice, dal, ghee and essential food items to nourish a family for weeks.',
      price: 1200,
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      items: ['Rice 10Kg', 'Desi Ghee 1L', 'Masoor Dal 5Kg', 'Cooking Oil', 'Spices & Essentials']
    },
    {
      id: 'center',
      title: 'Center Kit',
      description: 'Complete setup for community learning centers including teaching materials and infrastructure.',
      price: 35000,
      image: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      items: ['Green Board & Stand', 'Charts & Teaching Materials', 'Steel Plates & Glasses', 'Center Board', 'Books & References']
    }
  ];

  return (
    <section id="kits-showcase" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Choose Your <span className="text-orange-600">Impact</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Each kit is carefully curated to address specific needs in underserved communities
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {kits.map((kit) => (
            <KitCard key={kit.id} kit={kit} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default KitsShowcase;
