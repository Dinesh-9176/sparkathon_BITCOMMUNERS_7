import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { moods } from '../../data/moods';
import { Mood } from '../../types';

interface MoodSelectorProps {
  onMoodSelect?: (mood: Mood) => void;
  className?: string;
}

const MoodSelector: React.FC<MoodSelectorProps> = ({ onMoodSelect, className = '' }) => {
  const { currentUser, setUserMood } = useApp();
  const [selectedMood, setSelectedMood] = useState<Mood | null>(currentUser?.currentMood || null);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleMoodSelect = (mood: Mood) => {
    setSelectedMood(mood);
    setUserMood(mood);
    
    if (onMoodSelect) {
      onMoodSelect(mood);
    }
    
    setIsExpanded(false);
  };

  return (
    <div className={`relative ${className}`}>
      <div className="mb-3">
        <h2 className="text-xl font-semibold text-gray-800">How are you feeling today?</h2>
        <p className="text-gray-500 text-sm">Select your mood to find matching events</p>
      </div>
      
      <div className="relative">
        <button
          className="w-full md:w-auto flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-5 py-3 shadow-sm hover:shadow-md transition-all duration-300"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {selectedMood ? (
            <>
              <span className="text-2xl">{selectedMood.emoji}</span>
              <span className="font-medium">{selectedMood.name}</span>
            </>
          ) : (
            <>
              <span className="text-2xl">🤔</span>
              <span className="font-medium text-gray-500">Select your mood</span>
            </>
          )}
        </button>
        
        {isExpanded && (
          <div 
            className="absolute z-10 mt-2 p-3 bg-white rounded-xl shadow-xl border border-gray-100 w-full md:w-96 grid grid-cols-2 sm:grid-cols-4 gap-2 animate-fadeIn"
            style={{ 
              animationDuration: '0.2s',
              animationFillMode: 'both',
            }}
          >
            {moods.map((mood) => (
              <button
                key={mood.id}
                className={`flex flex-col items-center justify-center p-3 rounded-lg transition-all duration-200 hover:bg-gray-50 ${
                  selectedMood?.id === mood.id 
                    ? 'bg-gray-100 ring-2 ring-offset-2' 
                    : ''
                }`}
                style={{ 
                  ringColor: mood.color,
                  transform: `scale(${selectedMood?.id === mood.id ? 1.05 : 1})` 
                }}
                onClick={() => handleMoodSelect(mood)}
              >
                <span className="text-3xl mb-1">{mood.emoji}</span>
                <span className="text-sm font-medium">{mood.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MoodSelector;