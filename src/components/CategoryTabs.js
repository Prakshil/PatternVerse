import React from 'react';

const CategoryTabs = ({ categories, activeCategory, onCategoryChange, patternCount }) => {
  return (
    <div className="mb-10">
      <div className="flex justify-center gap-2 mb-4 border-b border-gray-200 pb-0">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`px-6 py-3 font-medium text-gray-500 transition-colors border-b-2 border-transparent relative
              ${activeCategory === category.id ? 'text-violet-500 border-violet-500' : 'hover:text-gray-900'}`}
          >
            {category.name}
          </button>
        ))}
      </div>
      <div className="text-center text-gray-500 text-sm mt-4">
        {patternCount} patterns
      </div>
    </div>
  );
};

export default CategoryTabs;
