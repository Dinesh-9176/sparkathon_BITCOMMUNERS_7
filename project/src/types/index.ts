export interface Event {
  id: string;
  title: string;
  description: string;
  category: EventCategory;
  date: string;
  time: string;
  venue: string;
  address: string;
  imageUrl: string;
  mood: Mood;
  rating?: number;
  organizerId: string;
}

export type EventCategory = 
  | 'music' 
  | 'art' 
  | 'sports' 
  | 'food' 
  | 'tech' 
  | 'wellness' 
  | 'outdoor' 
  | 'family';

export interface Mood {
  id: string;
  name: string;
  emoji: string;
  color: string;
}

export interface Location {
  city: string;
  state: string;
  country: string;
  latitude?: number;
  longitude?: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  photoURL?: string;
  interests: EventCategory[];
  savedEvents: string[];
  attendedEvents: string[];
  currentMood?: Mood;
  role: 'user' | 'organizer' | 'admin';
  organizationId?: string;
}

export interface Organization {
  id: string;
  name: string;
  description: string;
  logo?: string;
  website?: string;
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
  };
  contactEmail: string;
  phoneNumber?: string;
  address?: string;
  verified: boolean;
  createdAt: string;
  members: string[];
  events: string[];
}

export interface Review {
  id: string;
  eventId: string;
  userId: string;
  rating: number;
  comment?: string;
  moodBefore: Mood;
  moodAfter: Mood;
  date: string;
}

export interface Analytics {
  totalAttendees: number;
  averageRating: number;
  moodImpact: {
    positive: number;
    neutral: number;
    negative: number;
  };
  popularMoods: Array<{
    mood: string;
    count: number;
  }>;
  attendanceByDate: Array<{
    date: string;
    count: number;
  }>;
}