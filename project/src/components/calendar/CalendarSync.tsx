import React, { useState } from 'react';
import { CalendarDays, Check } from 'lucide-react';
import { Event } from '../../types';

interface CalendarSyncProps {
  event: Event;
}

const CalendarSync: React.FC<CalendarSyncProps> = ({ event }) => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncSuccess, setSyncSuccess] = useState(false);
  
  const handleSync = (type: 'google' | 'ical') => {
    setIsSyncing(true);
    
    // Simulate syncing
    setTimeout(() => {
      setIsSyncing(false);
      setSyncSuccess(true);
      
      // Reset success message after a few seconds
      setTimeout(() => {
        setSyncSuccess(false);
      }, 3000);
    }, 1500);
  };
  
  const generateGoogleCalendarUrl = (event: Event) => {
    const eventDate = new Date(event.date + 'T' + event.time);
    const endDate = new Date(eventDate.getTime() + (2 * 60 * 60 * 1000)); // Assume 2 hour event
    
    const startTime = eventDate.toISOString().replace(/-|:|\.\d+/g, '');
    const endTime = endDate.toISOString().replace(/-|:|\.\d+/g, '');
    
    const url = new URL('https://calendar.google.com/calendar/render');
    url.searchParams.append('action', 'TEMPLATE');
    url.searchParams.append('text', event.title);
    url.searchParams.append('details', event.description);
    url.searchParams.append('location', `${event.venue}, ${event.address}`);
    url.searchParams.append('dates', `${startTime}/${endTime}`);
    
    return url.toString();
  };
  
  return (
    <div className="relative">
      <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
        <CalendarDays size={18} className="text-purple-500" />
        Add to Calendar
      </h3>
      
      <div className="flex flex-wrap gap-2">
        <a
          href={generateGoogleCalendarUrl(event)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          onClick={(e) => {
            e.preventDefault();
            handleSync('google');
          }}
        >
          <svg viewBox="0 0 24 24" width="20" height="20" className="text-[#4285F4]">
            <path 
              fill="currentColor" 
              d="M21.56 10.738c-.145-1.136-.506-2.216-1.036-3.044-.82-1.27-2.293-2.036-3.88-2.036H7.36c-1.587 0-3.06.767-3.88 2.036-.53.828-.89 1.908-1.036 3.044-.95.738-.094 1.544-.094 1.262s0 .524.094 1.262c.145 1.136.506 2.216 1.036 3.044.82 1.27 2.293 2.036 3.88 2.036h9.28c1.587 0 3.06-.767 3.88-2.036.53-.828.89-1.908 1.036-3.044.095-.738.094-1.544.094-1.262s0-.524-.094-1.262zM9.5 13.5v-6l5 3-5 3z"
            />
          </svg>
          <span>Google Calendar</span>
        </a>
        
        <button
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          onClick={() => handleSync('ical')}
        >
          <svg viewBox="0 0 24 24" width="20" height="20" className="text-gray-600">
            <path 
              fill="currentColor" 
              d="M19 4h-1V3c0-.55-.45-1-1-1s-1 .45-1 1v1H8V3c0-.55-.45-1-1-1s-1 .45-1 1v1H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM9 14H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm-8 4H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z"
            />
          </svg>
          <span>iCal</span>
        </button>
      </div>
      
      {isSyncing && (
        <div className="mt-3 text-sm text-gray-600 flex items-center animate-pulse">
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-purple-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Adding to calendar...
        </div>
      )}
      
      {syncSuccess && (
        <div className="mt-3 text-sm text-green-600 flex items-center">
          <Check size={16} className="mr-1" />
          Event added to calendar successfully!
        </div>
      )}
    </div>
  );
};

export default CalendarSync;