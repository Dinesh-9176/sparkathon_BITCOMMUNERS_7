import React, { useState } from 'react';
import { Calendar } from 'lucide-react';

interface DateFilterProps {
  onDateChange: (date: string | null) => void;
}

const DateFilter: React.FC<DateFilterProps> = ({ onDateChange }) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const thisWeekend = new Date(today);
  thisWeekend.setDate(today.getDate() + (6 - today.getDay())); // Next Saturday

  const quickDates = [
    { label: 'Today', date: today.toISOString().split('T')[0] },
    { label: 'Tomorrow', date: tomorrow.toISOString().split('T')[0] },
    { label: 'This Weekend', date: thisWeekend.toISOString().split('T')[0] },
  ];

  const handleDateSelect = (date: string | null) => {
    setSelectedDate(date);
    onDateChange(date);
    setShowCalendar(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="relative">
      <div className="flex items-center mb-2">
        <Calendar size={16} className="text-gray-600 mr-1" />
        <span className="text-sm font-medium text-gray-700">Date</span>
      </div>

      <button
        className="w-full flex items-center justify-between bg-white border border-gray-200 rounded-lg px-4 py-2.5 hover:border-gray-300 transition-colors"
        onClick={() => setShowCalendar(!showCalendar)}
      >
        <span className="text-gray-800">
          {selectedDate ? formatDate(selectedDate) : 'Any date'}
        </span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`text-gray-500 transition-transform duration-200 ${
            showCalendar ? 'rotate-180' : ''
          }`}
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>

      {showCalendar && (
        <div className="absolute z-10 mt-1 w-full bg-white rounded-lg border border-gray-200 shadow-lg py-2 animate-fadeIn">
          <button
            className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm"
            onClick={() => handleDateSelect(null)}
          >
            Any date
          </button>
          
          <div className="border-t border-gray-100 my-1"></div>
          
          {quickDates.map((item, index) => (
            <button
              key={index}
              className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm"
              onClick={() => handleDateSelect(item.date)}
            >
              {item.label} <span className="text-gray-400 text-xs ml-1">{formatDate(item.date)}</span>
            </button>
          ))}
          
          <div className="border-t border-gray-100 my-1"></div>
          
          <div className="px-4 py-2">
            <label className="block text-sm text-gray-600 mb-1">Or select a specific date:</label>
            <input
              type="date"
              className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              onChange={(e) => handleDateSelect(e.target.value)}
              min={today.toISOString().split('T')[0]}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DateFilter;