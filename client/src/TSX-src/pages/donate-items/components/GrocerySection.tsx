
import React from 'react';
import GroceryItemCard from './GroceryItemCard';

const GrocerySection = () => {
  const groceryItems = [
    {
      id: 'rice-10kg',
      title: 'Rice 10Kg',
      description: 'Premium quality rice to feed a family of 4-5 for 2 weeks',
      price: 400,
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      category: 'grocery',
      unit: 'bag',
      serves: '4-5 people for 2 weeks'
    },
    {
      id: 'desi-ghee-1l',
      title: 'Desi Ghee 1L',
      description: 'Pure cow ghee for healthy cooking and nutrition',
      price: 600,
      image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      category: 'grocery',
      unit: 'bottle',
      serves: 'Family of 4 for 1 month'
    },
    {
      id: 'masoor-dal-5kg',
      title: 'Masoor Dal 5Kg',
      description: 'High protein lentils for nutritious meals',
      price: 350,
      image: 'https://images.jdmagicbox.com/quickquotes/images_main/fresh-masoor-dal-80-kg-bag-2216949466-dx3crq2s.jpg',
      category: 'grocery',
      unit: 'bag',
      serves: 'Family meals for 3 weeks'
    },
    {
      id: 'cooking-oil-1l',
      title: 'Cooking Oil 1L',
      description: 'Healthy cooking oil for daily meal preparation',
      price: 180,
      image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      category: 'grocery',
      unit: 'bottle',
      serves: 'Family cooking for 2 weeks'
    },
    {
      id: 'spices-essentials',
      title: 'Spices & Essentials',
      description: 'Complete spice kit with salt, turmeric, chili powder, and more',
      price: 250,
      image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      category: 'grocery',
      unit: 'kit',
      serves: 'Complete seasoning for 1 month'
    },
    {
      id: 'wheat-flour-10kg',
      title: 'Wheat Flour 10Kg',
      description: 'Fresh whole wheat flour for daily bread and meals',
      price: 320,
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      category: 'grocery',
      unit: 'bag',
      serves: 'Family of 4 for 3 weeks'
    }
  ];

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
            <GroceryItemCard key={item.id} item={item} />
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
