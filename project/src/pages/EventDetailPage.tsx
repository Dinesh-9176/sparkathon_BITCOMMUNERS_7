import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import CalendarSync from '../components/calendar/CalendarSync';
import { getEventById } from '../data/mockEvents';
import { Event } from '../types';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Share2, 
  Star, 
  ArrowLeft, 
  Tag 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const EventDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const { currentUser, addSavedEvent, removeSavedEvent } = useApp();
  
  useEffect(() => {
    if (id) {
      // In a real app, this would be an API call
      setIsLoading(true);
      const foundEvent = getEventById(id);
      
      // Simulate loading
      setTimeout(() => {
        setEvent(foundEvent || null);
        setIsLoading(false);
      }, 500);
    }
  }, [id]);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };
  
  const isSaved = currentUser?.savedEvents.includes(id || '') || false;
  
  const handleSaveToggle = () => {
    if (id) {
      if (isSaved) {
        removeSavedEvent(id);
      } else {
        addSavedEvent(id);
      }
    }
  };
  
  const handleShare = () => {
    setShowShareMenu(!showShareMenu);
  };
  
  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto max-w-4xl px-4 py-8 mt-10">
          <div className="animate-pulse">
            <div className="h-80 bg-gray-200 rounded-xl mb-6"></div>
            <div className="h-10 bg-gray-200 rounded mb-4 w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded mb-2 w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded mb-2 w-1/4"></div>
            <div className="h-40 bg-gray-200 rounded mt-6"></div>
          </div>
        </div>
      </Layout>
    );
  }
  
  if (!event) {
    return (
      <Layout>
        <div className="container mx-auto max-w-4xl px-4 py-8 mt-10">
          <div className="bg-white shadow-md rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Event Not Found</h2>
            <p className="text-gray-600 mb-6">The event you're looking for doesn't exist or has been removed.</p>
            <Link
              to="/"
              className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <ArrowLeft size={16} className="mr-2" />
              Back to Events
            </Link>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="min-h-screen">
        {/* Hero Image */}
        <div 
          className="w-full h-80 lg:h-96 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${event.imageUrl})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="container mx-auto max-w-5xl">
              <Link to="/" className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors">
                <ArrowLeft size={16} className="mr-1" />
                Back to Events
              </Link>
              
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span 
                  className="px-3 py-1 rounded-full text-sm font-medium"
                  style={{ backgroundColor: event.mood.color + '30' }}
                >
                  {event.mood.emoji} {event.mood.name}
                </span>
                
                <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium capitalize">
                  <Tag size={14} className="inline mr-1" />
                  {event.category}
                </span>
              </div>
              
              <h1 className="text-3xl lg:text-4xl font-bold mb-2">{event.title}</h1>
              
              {event.rating && (
                <div className="flex items-center gap-1 text-yellow-400 mb-2">
                  <Star size={18} className="fill-yellow-400" />
                  <span className="font-medium">{event.rating.toFixed(1)}</span>
                  <span className="text-white/70 text-sm">({Math.floor(event.rating * 10)} reviews)</span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="container mx-auto max-w-5xl px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Event Details */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">About This Event</h2>
                <p className="text-gray-700 leading-relaxed mb-6">{event.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <Calendar className="text-purple-500 mt-1" size={20} />
                    <div>
                      <h3 className="font-medium text-gray-800">Date</h3>
                      <p className="text-gray-600">{formatDate(event.date)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Clock className="text-purple-500 mt-1" size={20} />
                    <div>
                      <h3 className="font-medium text-gray-800">Time</h3>
                      <p className="text-gray-600">{event.time}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 md:col-span-2">
                    <MapPin className="text-purple-500 mt-1" size={20} />
                    <div>
                      <h3 className="font-medium text-gray-800">Location</h3>
                      <p className="text-gray-600">{event.venue}</p>
                      <p className="text-gray-500 text-sm">{event.address}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Mood Rating & Reviews</h2>
                <div className="border border-gray-100 rounded-lg p-4 text-center">
                  <p className="text-gray-600 mb-3">
                    Attend this event? Rate how it made you feel!
                  </p>
                  <button 
                    className="px-5 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Rate This Event
                  </button>
                </div>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex flex-col gap-4">
                  <button
                    className={`w-full flex justify-center items-center gap-2 px-4 py-3 rounded-lg transition-colors ${
                      isSaved 
                        ? 'bg-pink-50 text-pink-600 border border-pink-200' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    onClick={handleSaveToggle}
                  >
                    <svg 
                      width="20" 
                      height="20" 
                      viewBox="0 0 24 24" 
                      fill={isSaved ? "currentColor" : "none"} 
                      stroke="currentColor" 
                      strokeWidth="2" 
                    >
                      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                    </svg>
                    <span>{isSaved ? 'Saved' : 'Save Event'}</span>
                  </button>
                  
                  <div className="relative">
                    <button
                      className="w-full flex justify-center items-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                      onClick={handleShare}
                    >
                      <Share2 size={18} />
                      <span>Share Event</span>
                    </button>
                    
                    {showShareMenu && (
                      <div className="absolute z-10 mt-2 w-full bg-white rounded-xl shadow-lg border border-gray-100 p-3 animate-fadeIn">
                        <div className="grid grid-cols-2 gap-2">
                          {['Facebook', 'Twitter', 'WhatsApp', 'Email'].map((platform) => (
                            <button
                              key={platform}
                              className="flex items-center justify-center gap-2 p-2 rounded hover:bg-gray-50 text-sm"
                            >
                              {platform}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <CalendarSync event={event} />
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Event Organizer
                </h3>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-600">
                    <span className="text-xl">👤</span>
                  </div>
                  <div>
                    <p className="font-medium">Event Organizer</p>
                    <p className="text-sm text-gray-500">View profile</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EventDetailPage;