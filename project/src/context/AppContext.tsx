import React, { createContext, useState, useContext, ReactNode } from 'react';
import { User, Mood, Location, EventCategory } from '../types';
import { moods } from '../data/moods';

interface AppContextType {
  currentUser: User | null;
  currentLocation: Location | null;
  setCurrentUser: (user: User | null) => void;
  setCurrentLocation: (location: Location | null) => void;
  setUserMood: (mood: Mood) => void;
  addUserInterest: (interest: EventCategory) => void;
  removeUserInterest: (interest: EventCategory) => void;
  addSavedEvent: (eventId: string) => void;
  removeSavedEvent: (eventId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>({
    id: '1',
    name: 'Guest User',
    interests: ['music', 'art', 'tech'],
    savedEvents: [],
    attendedEvents: []
  });
  
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);

  const setUserMood = (mood: Mood) => {
    if (currentUser) {
      setCurrentUser({
        ...currentUser,
        currentMood: mood
      });
    }
  };

  const addUserInterest = (interest: EventCategory) => {
    if (currentUser && !currentUser.interests.includes(interest)) {
      setCurrentUser({
        ...currentUser,
        interests: [...currentUser.interests, interest]
      });
    }
  };

  const removeUserInterest = (interest: EventCategory) => {
    if (currentUser) {
      setCurrentUser({
        ...currentUser,
        interests: currentUser.interests.filter(i => i !== interest)
      });
    }
  };

  const addSavedEvent = (eventId: string) => {
    if (currentUser && !currentUser.savedEvents.includes(eventId)) {
      setCurrentUser({
        ...currentUser,
        savedEvents: [...currentUser.savedEvents, eventId]
      });
    }
  };

  const removeSavedEvent = (eventId: string) => {
    if (currentUser) {
      setCurrentUser({
        ...currentUser,
        savedEvents: currentUser.savedEvents.filter(id => id !== eventId)
      });
    }
  };

  return (
    <AppContext.Provider 
      value={{ 
        currentUser, 
        currentLocation, 
        setCurrentUser, 
        setCurrentLocation,
        setUserMood,
        addUserInterest,
        removeUserInterest,
        addSavedEvent,
        removeSavedEvent
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};