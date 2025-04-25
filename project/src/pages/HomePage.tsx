import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import MoodSelector from '../components/mood/MoodSelector';
import LocationPicker from '../components/location/LocationPicker';
import CategoryFilter from '../components/filters/CategoryFilter';
import DateFilter from '../components/filters/DateFilter';
import EventGrid from '../components/events/EventGrid';
import TrendingMoods from '../components/trending/TrendingMoods';
import { mockEvents, getEventsByCategory, getEventsByMood, getRecommendedEvents } from '../data/mockEvents';
import { Mood, EventCategory } from '../types';
import { useApp } from '../context/AppContext';

const HomePage: React.FC = () => {
  const { currentUser } = useApp();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<EventCategory | null>(null);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [filteredEvents, setFilteredEvents] = useState(mockEvents);
  const [recommendedEvents, setRecommendedEvents] = useState<typeof mockEvents>([]);

  // Apply filters when any filter changes
  useEffect(() => {
    let results = [...mockEvents];
    
    // Filter by category if selected
    if (selectedCategory) {
      results = getEventsByCategory(selectedCategory);
    }
    
    // Filter by mood if selected
    if (selectedMood) {
      results = selectedCategory 
        ? results.filter(event => event.mood.id === selectedMood)
        : getEventsByMood(selectedMood);
    }
    
    // Filter by date if selected
    if (selectedDate) {
      results = results.filter(event => event.date === selectedDate);
    }
    
    setFilteredEvents(results);
  }, [selectedCategory, selectedMood, selectedDate]);

  // Update recommended events when mood changes
  useEffect(() => {
    if (selectedMood) {
      const recommended = getRecommendedEvents(
        selectedMood, 
        currentUser?.interests
      );
      setRecommendedEvents(recommended);
    } else {
      setRecommendedEvents([]);
    }
  }, [selectedMood, currentUser?.interests]);

  const handleMoodSelect = (mood: Mood) => {
    setSelectedMood(mood.id);
  };

  const handleTrendingMoodSelect = (moodId: string) => {
    setSelectedMood(moodId);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-purple-600 to-pink-500 text-white py-16 px-4">
          <div 
            className="absolute inset-0 bg-purple-900 opacity-10"
            style={{
              backgroundImage: "url('https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              mixBlendMode: "overlay"
            }}
          ></div>
          
          <div className="container mx-auto max-w-4xl relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Discover Events Based on Your Mood
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Find the perfect events for how you're feeling today
            </p>
            
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20">
              <MoodSelector onMoodSelect={handleMoodSelect} />
            </div>
          </div>
        </section>
        
        {/* Main Content */}
        <section className="container mx-auto max-w-7xl px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="lg:w-1/4">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sticky top-20">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Filters</h2>
                
                <div className="space-y-5">
                  <LocationPicker />
                  <CategoryFilter 
                    onCategoryChange={setSelectedCategory}
                    selectedCategory={selectedCategory}
                  />
                  <DateFilter onDateChange={setSelectedDate} />
                </div>
              </div>
            </div>
            
            {/* Events Section */}
            <div className="lg:w-3/4 space-y-8">
              {/* Trending Moods */}
              <TrendingMoods onMoodSelect={handleTrendingMoodSelect} />
              
              {/* Recommended Events */}
              {recommendedEvents.length > 0 && (
                <EventGrid 
                  events={recommendedEvents}
                  title="Recommended for You"
                  description="Based on your current mood and interests"
                />
              )}
              
              {/* All Events */}
              <EventGrid 
                events={filteredEvents}
                title={selectedMood || selectedCategory || selectedDate ? "Filtered Events" : "Upcoming Events"}
                emptyMessage="No events match your filters. Try changing your selections."
              />
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default HomePage;