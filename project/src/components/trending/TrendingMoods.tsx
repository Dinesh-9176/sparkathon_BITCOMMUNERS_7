import React from 'react';
import { getTrendingMoods } from '../../data/moods';
import { useApp } from '../../context/AppContext';
import { TrendingUp } from 'lucide-react';

interface TrendingMoodsProps {
  onMoodSelect: (moodId: string) => void;
}

const TrendingMoods: React.FC<TrendingMoodsProps> = ({ onMoodSelect }) => {
  const { currentLocation } = useApp();
  const location = currentLocation ? currentLocation.city : 'your area';
  const trendingMoods = getTrendingMoods(location);

  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-4 animate-fadeIn">
      <div className="flex items-center gap-2 mb-3">
        <TrendingUp size={18} className="text-purple-500" />
        <h3 className="font-semibold text-lg text-gray-800">
          Trending moods in {location}
        </h3>
      </div>
      
      <p className="text-gray-600 text-sm mb-4">
        Most people around you are feeling these moods today!
      </p>
      
      <div className="flex flex-wrap gap-2">
        {trendingMoods.map((mood) => (
          <button
            key={mood.id}
            className="flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 hover:shadow-md"
            style={{ 
              backgroundColor: `${mood.color}10`,
              border: `1px solid ${mood.color}30` 
            }}
            onClick={() => onMoodSelect(mood.id)}
          >
            <span className="text-xl">{mood.emoji}</span>
            <span className="font-medium" style={{ color: mood.color }}>
              {mood.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TrendingMoods;