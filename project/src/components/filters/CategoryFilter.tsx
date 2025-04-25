import React, { useState } from 'react';
import { Tag } from 'lucide-react';
import { EventCategory } from '../../types';

const categories: { id: EventCategory; label: string; icon: string }[] = [
  { id: 'music', label: 'Music', icon: '🎵' },
  { id: 'art', label: 'Art', icon: '🎨' },
  { id: 'sports', label: 'Sports', icon: '⚽' },
  { id: 'food', label: 'Food', icon: '🍔' },
  { id: 'tech', label: 'Tech', icon: '💻' },
  { id: 'wellness', label: 'Wellness', icon: '🧘' },
  { id: 'outdoor', label: 'Outdoor', icon: '🏞️' },
  { id: 'family', label: 'Family', icon: '👨‍👩‍👧‍👦' },
];

interface CategoryFilterProps {
  onCategoryChange: (category: EventCategory | null) => void;
  selectedCategory: EventCategory | null;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ 
  onCategoryChange,
  selectedCategory
}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSelect = (category: EventCategory | null) => {
    onCategoryChange(category);
    setShowDropdown(false);
  };

  const getSelectedLabel = () => {
    if (!selectedCategory) return 'All Categories';
    const category = categories.find(c => c.id === selectedCategory);
    return category ? `${category.icon} ${category.label}` : 'All Categories';
  };

  return (
    <div className="relative">
      <div className="flex items-center mb-2">
        <Tag size={16} className="text-gray-600 mr-1" />
        <span className="text-sm font-medium text-gray-700">Category</span>
      </div>

      <button
        className="w-full flex items-center justify-between bg-white border border-gray-200 rounded-lg px-4 py-2.5 hover:border-gray-300 transition-colors"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <span className="text-gray-800">{getSelectedLabel()}</span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`text-gray-500 transition-transform duration-200 ${
            showDropdown ? 'rotate-180' : ''
          }`}
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>

      {showDropdown && (
        <div className="absolute z-10 mt-1 w-full bg-white rounded-lg border border-gray-200 shadow-lg py-2 animate-fadeIn">
          <button
            className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm font-medium"
            onClick={() => handleSelect(null)}
          >
            All Categories
          </button>
          
          <div className="border-t border-gray-100 my-1"></div>
          
          {categories.map((category) => (
            <button
              key={category.id}
              className={`w-full text-left px-4 py-2 hover:bg-gray-50 text-sm ${
                selectedCategory === category.id ? 'bg-purple-50 text-purple-700' : ''
              }`}
              onClick={() => handleSelect(category.id)}
            >
              <span className="mr-2">{category.icon}</span>
              {category.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryFilter;