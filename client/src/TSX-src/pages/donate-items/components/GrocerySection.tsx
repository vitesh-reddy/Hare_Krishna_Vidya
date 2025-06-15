
import React from 'react';
import GroceryItemCard from './GroceryItemCard';
import { useData } from '../../../../contexts/DataContext';

const GrocerySection = () => {
  const {groceryItems} = useData();

  return (
    <section id="grocery-section" className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Individual <span className="text-green-600">Grocery Items</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose specific grocery items to donate and help families with their daily nutrition needs
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {groceryItems.map((item) => (
            <GroceryItemCard key={item._id} item={item} />
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">💡 Pro Tip</h3>
            <p className="text-gray-600">
              Add multiple items to your cart for a complete grocery donation package!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GrocerySection;
