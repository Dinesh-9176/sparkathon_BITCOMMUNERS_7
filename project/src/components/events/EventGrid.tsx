import React from 'react';
import { Event } from '../../types';
import EventCard from './EventCard';

interface EventGridProps {
  events: Event[];
  title?: string;
  description?: string;
  emptyMessage?: string;
  cardSize?: 'sm' | 'md' | 'lg';
}

const EventGrid: React.FC<EventGridProps> = ({
  events,
  title,
  description,
  emptyMessage = "No events found",
  cardSize = 'md'
}) => {
  return (
    <div className="w-full">
      {title && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          {description && <p className="text-gray-600 mt-1">{description}</p>}
        </div>
      )}

      {events.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-xl p-8 text-center">
          <p className="text-gray-500">{emptyMessage}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {events.map(event => (
            <EventCard key={event.id} event={event} size={cardSize} />
          ))}
        </div>
      )}
    </div>
  );
};

export default EventGrid;