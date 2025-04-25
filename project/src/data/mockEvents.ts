import { Event, EventCategory } from '../types';

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Summer Night Concert',
    description: 'Join us for a magical night of live music under the stars with local bands and artists.',
    category: 'music',
    date: '2025-07-15',
    time: '20:00',
    venue: 'Central Park Amphitheater',
    address: '123 Park Ave, New York, NY',
    imageUrl: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg',
    mood: {
      id: 'energetic',
      name: 'Energetic',
      emoji: '💃',
      color: '#EC4899'
    },
    rating: 4.8
  },
  {
    id: '2',
    title: 'Modern Art Exhibition',
    description: 'Explore contemporary art pieces from emerging artists around the world.',
    category: 'art',
    date: '2025-06-22',
    time: '10:00',
    venue: 'Metropolitan Museum',
    address: '1000 Fifth Avenue, New York, NY',
    imageUrl: 'https://images.pexels.com/photos/20967/pexels-photo.jpg',
    mood: {
      id: 'curious',
      name: 'Curious',
      emoji: '🧐',
      color: '#8B5CF6'
    },
    rating: 4.5
  },
  {
    id: '3',
    title: 'Tech Startup Conference',
    description: 'Network with founders and investors while learning about the latest tech trends.',
    category: 'tech',
    date: '2025-08-10',
    time: '09:00',
    venue: 'Innovation Center',
    address: '555 Tech Blvd, San Francisco, CA',
    imageUrl: 'https://images.pexels.com/photos/2833037/pexels-photo-2833037.jpeg',
    mood: {
      id: 'focused',
      name: 'Focused',
      emoji: '🧠',
      color: '#1D4ED8'
    },
    rating: 4.2
  },
  {
    id: '4',
    title: 'Sunset Yoga Retreat',
    description: 'Relax and rejuvenate with guided meditation and yoga sessions on the beach.',
    category: 'wellness',
    date: '2025-07-05',
    time: '18:30',
    venue: 'Serenity Beach',
    address: '789 Ocean Dr, Miami, FL',
    imageUrl: 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg',
    mood: {
      id: 'chill',
      name: 'Chill',
      emoji: '😌',
      color: '#0D9488'
    },
    rating: 4.9
  },
  {
    id: '5',
    title: 'Food Festival',
    description: 'Sample delicious cuisines from around the world with over 50 food vendors.',
    category: 'food',
    date: '2025-09-18',
    time: '12:00',
    venue: 'Downtown Plaza',
    address: '300 Main St, Chicago, IL',
    imageUrl: 'https://images.pexels.com/photos/5409015/pexels-photo-5409015.jpeg',
    mood: {
      id: 'social',
      name: 'Social',
      emoji: '🎭',
      color: '#F59E0B'
    },
    rating: 4.7
  },
  {
    id: '6',
    title: 'Mountain Hiking Adventure',
    description: 'Guided hiking tour through scenic mountain trails with breathtaking views.',
    category: 'outdoor',
    date: '2025-08-22',
    time: '07:30',
    venue: 'Mountain National Park',
    address: '1200 Mountain Rd, Denver, CO',
    imageUrl: 'https://images.pexels.com/photos/554609/pexels-photo-554609.jpeg',
    mood: {
      id: 'adventurous',
      name: 'Adventurous',
      emoji: '🚀',
      color: '#EF4444'
    },
    rating: 4.6
  },
  {
    id: '7',
    title: 'Creative Writing Workshop',
    description: 'Learn storytelling techniques and get feedback on your writing from published authors.',
    category: 'art',
    date: '2025-07-29',
    time: '14:00',
    venue: 'City Library',
    address: '400 Book St, Seattle, WA',
    imageUrl: 'https://images.pexels.com/photos/3059747/pexels-photo-3059747.jpeg',
    mood: {
      id: 'creative',
      name: 'Creative',
      emoji: '🎨',
      color: '#3B82F6'
    },
    rating: 4.3
  },
  {
    id: '8',
    title: 'Candlelight Dinner Concert',
    description: 'Enjoy a romantic evening with classical music performances during an exquisite dinner.',
    category: 'music',
    date: '2025-08-14',
    time: '19:00',
    venue: 'Grand Ballroom',
    address: '888 Luxury Ave, Los Angeles, CA',
    imageUrl: 'https://images.pexels.com/photos/5779611/pexels-photo-5779611.jpeg',
    mood: {
      id: 'romantic',
      name: 'Romantic',
      emoji: '❤️',
      color: '#DC2626'
    },
    rating: 4.9
  }
];

export const getEventsByCategory = (category: EventCategory): Event[] => {
  return mockEvents.filter(event => event.category === category);
};

export const getEventsByMood = (moodId: string): Event[] => {
  return mockEvents.filter(event => event.mood.id === moodId);
};

export const getEventById = (id: string): Event | undefined => {
  return mockEvents.find(event => event.id === id);
};

export const getRecommendedEvents = (moodId: string, interests: EventCategory[] = []): Event[] => {
  let results = mockEvents.filter(event => event.mood.id === moodId);
  
  // If interests are provided, boost those matching the interests
  if (interests.length > 0) {
    const interestEvents = mockEvents.filter(event => interests.includes(event.category));
    
    // Combine and ensure no duplicates
    results = [...new Set([...results, ...interestEvents])];
  }
  
  // Limit to 4 events for recommendations
  return results.slice(0, 4);
};