import { Mood } from '../types';

export const moods: Mood[] = [
  {
    id: 'energetic',
    name: 'Energetic',
    emoji: '💃',
    color: '#EC4899' // Pink
  },
  {
    id: 'chill',
    name: 'Chill',
    emoji: '😌',
    color: '#0D9488' // Teal
  },
  {
    id: 'curious',
    name: 'Curious',
    emoji: '🧐',
    color: '#8B5CF6' // Purple
  },
  {
    id: 'social',
    name: 'Social',
    emoji: '🎭',
    color: '#F59E0B' // Amber
  },
  {
    id: 'adventurous',
    name: 'Adventurous',
    emoji: '🚀',
    color: '#EF4444' // Red
  },
  {
    id: 'creative',
    name: 'Creative',
    emoji: '🎨',
    color: '#3B82F6' // Blue
  },
  {
    id: 'romantic',
    name: 'Romantic',
    emoji: '❤️',
    color: '#DC2626' // Red
  },
  {
    id: 'focused',
    name: 'Focused',
    emoji: '🧠',
    color: '#1D4ED8' // Blue
  }
];

export const getTrendingMoods = (location: string): Mood[] => {
  // This would normally be fetched from an API
  // Returning a subset of moods as "trending" for demo purposes
  return [moods[0], moods[3], moods[4]];
};

export const getMoodById = (id: string): Mood | undefined => {
  return moods.find(mood => mood.id === id);
};