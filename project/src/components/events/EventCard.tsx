import React from 'react';
import { Event } from '../../types';
import { Calendar, Clock, MapPin, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

interface EventCardProps {
  event: Event;
  size?: 'sm' | 'md' | 'lg';
}

const EventCard: React.FC<EventCardProps> = ({ event, size = 'md' }) => {
  const { currentUser, addSavedEvent, removeSavedEvent } = useApp();
  const isSaved = currentUser?.savedEvents.includes(event.id) || false;
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };
  
  const getCardSize = () => {
    switch (size) {
      case 'sm':
        return 'h-[220px]';
      case 'lg':
        return 'h-[400px]';
      case 'md':
      default:
        return 'h-[320px]';
    }
  };

  const handleSaveToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isSaved) {
      removeSavedEvent(event.id);
    } else {
      addSavedEvent(event.id);
    }
  };

  return (
    <Link 
      to={`/event/${event.id}`}
      className={`group block relative overflow-hidden rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-300 ${getCardSize()}`}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
      
      <div 
        className="absolute top-3 right-3 z-20 bg-white/90 backdrop-blur-sm rounded-full p-1.5 cursor-pointer transform transition-transform hover:scale-110"
        onClick={handleSaveToggle}
      >
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill={isSaved ? "currentColor" : "none"} 
          stroke="currentColor" 
          strokeWidth="2" 
          className={isSaved ? "text-pink-500" : "text-gray-600"}
        >
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
        </svg>
      </div>
      
      <div className="absolute top-3 left-3 z-20 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-sm font-medium flex items-center gap-1.5">
        <span style={{ color: event.mood.color }}>{event.mood.emoji}</span>
        <span className="text-gray-700">{event.mood.name}</span>
      </div>
      
      <img 
        src={event.imageUrl} 
        alt={event.title} 
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      
      <div className="absolute bottom-0 left-0 right-0 p-4 z-20 text-white">
        <div className="flex items-center gap-1 mb-1">
          <span className="capitalize px-2 py-0.5 bg-white/20 backdrop-blur-sm rounded text-xs font-medium">
            {event.category}
          </span>
          {event.rating && (
            <div className="flex items-center gap-0.5 px-2 py-0.5 bg-white/20 backdrop-blur-sm rounded text-xs font-medium">
              <Star size={12} className="fill-yellow-400 text-yellow-400" />
              <span>{event.rating.toFixed(1)}</span>
            </div>
          )}
        </div>
        
        <h3 className="text-xl font-bold leading-tight mb-2 group-hover:underline decoration-2 underline-offset-2">
          {event.title}
        </h3>
        
        <div className="flex flex-col gap-1 text-sm text-white/90">
          <div className="flex items-center gap-1.5">
            <Calendar size={14} />
            <span>{formatDate(event.date)}</span>
          </div>
          
          <div className="flex items-center gap-1.5">
            <Clock size={14} />
            <span>{event.time}</span>
          </div>
          
          <div className="flex items-center gap-1.5">
            <MapPin size={14} />
            <span>{event.venue}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;