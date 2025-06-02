// src/pages/gallery/components/FilterTabs.jsx
import React from 'react';

const FilterTabs = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-8">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`px-6 py-3 rounded-[25px] font-medium transition-all duration-300 ${
            selectedCategory === category.id
              ? 'bg-accent-yellow text-white shadow-custom-light'
              : 'bg-white text-neutral-dark border border-border-light hover:border-accent-yellow hover:text-accent-yellow'
          }`}
        >
          {category.name}
          <span className="ml-2 text-sm opacity-70">({category.count})</span>
        </button>
      ))}
    </div>
  );
};

export default FilterTabs;