import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { useApp } from '../context/AppContext';
import EventGrid from '../components/events/EventGrid';
import { getEventById } from '../data/mockEvents';
import { Event, EventCategory } from '../types';

const ProfilePage: React.FC = () => {
  const { currentUser, addUserInterest, removeUserInterest } = useApp();
  const [savedEvents, setSavedEvents] = useState<Event[]>([]);
  const [activeTab, setActiveTab] = useState<'profile' | 'saved' | 'attended'>('profile');
  
  React.useEffect(() => {
    if (currentUser?.savedEvents) {
      const events = currentUser.savedEvents
        .map(id => getEventById(id))
        .filter((event): event is Event => !!event);
      setSavedEvents(events);
    }
  }, [currentUser?.savedEvents]);
  
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
  
  const toggleInterest = (interest: EventCategory) => {
    if (currentUser?.interests.includes(interest)) {
      removeUserInterest(interest);
    } else {
      addUserInterest(interest);
    }
  };
  
  if (!currentUser) {
    return (
      <Layout>
        <div className="container mx-auto max-w-6xl px-4 py-8 mt-10">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Sign In Required</h2>
            <p className="text-gray-600 mb-6">Please sign in to view your profile.</p>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container mx-auto max-w-6xl px-4 py-8 mt-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xl font-bold">
              {currentUser.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{currentUser.name}</h1>
              <p className="text-gray-600">Member since 2025</p>
            </div>
          </div>
          
          <button className="px-5 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
            Edit Profile
          </button>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
          <div className="border-b border-gray-100">
            <div className="flex overflow-x-auto">
              <button
                className={`px-5 py-4 font-medium text-sm whitespace-nowrap transition-colors ${
                  activeTab === 'profile' 
                    ? 'text-purple-600 border-b-2 border-purple-600' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => setActiveTab('profile')}
              >
                Profile & Interests
              </button>
              <button
                className={`px-5 py-4 font-medium text-sm whitespace-nowrap transition-colors ${
                  activeTab === 'saved' 
                    ? 'text-purple-600 border-b-2 border-purple-600' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => setActiveTab('saved')}
              >
                Saved Events
              </button>
              <button
                className={`px-5 py-4 font-medium text-sm whitespace-nowrap transition-colors ${
                  activeTab === 'attended' 
                    ? 'text-purple-600 border-b-2 border-purple-600' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => setActiveTab('attended')}
              >
                Attended Events
              </button>
            </div>
          </div>
          
          <div className="p-6">
            {activeTab === 'profile' && (
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-4">Your Interests</h2>
                <p className="text-gray-600 mb-6">
                  Select categories you're interested in to get better event recommendations
                </p>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-all duration-200 ${
                        currentUser.interests.includes(category.id) 
                          ? 'bg-purple-50 text-purple-700 border border-purple-200' 
                          : 'bg-gray-50 text-gray-600 border border-gray-100 hover:bg-gray-100'
                      }`}
                      onClick={() => toggleInterest(category.id)}
                    >
                      <span>{category.icon}</span>
                      <span className="font-medium">{category.label}</span>
                    </button>
                  ))}
                </div>
                
                <div className="mt-8">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Current Mood</h2>
                  {currentUser.currentMood ? (
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
                        style={{ backgroundColor: currentUser.currentMood.color + '20' }}
                      >
                        {currentUser.currentMood.emoji}
                      </div>
                      <span className="font-medium">{currentUser.currentMood.name}</span>
                    </div>
                  ) : (
                    <p className="text-gray-600">
                      No mood selected. Select your mood on the home page to get tailored recommendations.
                    </p>
                  )}
                </div>
              </div>
            )}
            
            {activeTab === 'saved' && (
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-6">Your Saved Events</h2>
                <EventGrid 
                  events={savedEvents}
                  emptyMessage="You haven't saved any events yet. Explore events and click the save button to add them here."
                />
              </div>
            )}
            
            {activeTab === 'attended' && (
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-6">Your Attended Events</h2>
                <div className="bg-white border border-gray-200 rounded-xl p-8 text-center">
                  <p className="text-gray-500">
                    You haven't marked any events as attended yet.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;