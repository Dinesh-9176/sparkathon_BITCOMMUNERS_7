import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import EventCard from '../components/events/EventCard';
import { useApp } from '../context/AppContext';
import { mockEvents, getEventById } from '../data/mockEvents';
import { Event } from '../types';
import { Calendar, ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';

const CalendarPage: React.FC = () => {
  const { currentUser } = useApp();
  const [savedEvents, setSavedEvents] = useState<Event[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [calendarView, setCalendarView] = useState<'month' | 'list'>('month');
  
  // Get saved events when user changes
  useEffect(() => {
    if (currentUser?.savedEvents) {
      const events = currentUser.savedEvents
        .map(id => getEventById(id))
        .filter((event): event is Event => !!event);
      setSavedEvents(events);
    }
  }, [currentUser?.savedEvents]);
  
  const daysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };
  
  const firstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };
  
  const formatDateHeader = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };
  
  const changeMonth = (increment: number) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() + increment);
    setSelectedDate(newDate);
  };
  
  const getDayEvents = (day: number) => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    
    return savedEvents.filter(event => event.date === dateString);
  };
  
  const renderCalendar = () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const totalDays = daysInMonth(year, month);
    const firstDay = firstDayOfMonth(year, month);
    
    const days = Array.from({ length: totalDays }, (_, i) => i + 1);
    const blanks = Array.from({ length: firstDay }, (_, i) => null);
    const calendarDays = [...blanks, ...days];
    
    return (
      <div className="grid grid-cols-7 gap-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center py-2 text-sm font-medium text-gray-500">
            {day}
          </div>
        ))}
        
        {calendarDays.map((day, i) => (
          <div 
            key={i} 
            className={`h-24 p-1 border rounded-lg ${
              day ? 'hover:border-purple-200 transition-colors' : ''
            }`}
          >
            {day && (
              <>
                <div className="text-sm font-medium mb-1">{day}</div>
                {getDayEvents(day).slice(0, 2).map((event, idx) => (
                  <div 
                    key={event.id} 
                    className="text-xs px-1.5 py-1 rounded mb-1 truncate"
                    style={{ backgroundColor: event.mood.color + '20', color: event.mood.color }}
                  >
                    {event.title}
                  </div>
                ))}
                {getDayEvents(day).length > 2 && (
                  <div className="text-xs text-gray-500 pl-1.5">
                    +{getDayEvents(day).length - 2} more
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderListView = () => {
    if (savedEvents.length === 0) {
      return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
          <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <CalendarIcon size={32} className="text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No saved events</h3>
          <p className="text-gray-600 mb-4">
            Start discovering events and save them to see them in your calendar.
          </p>
        </div>
      );
    }
    
    // Group events by month
    const groupedEvents: Record<string, Event[]> = {};
    
    savedEvents.forEach(event => {
      const eventDate = new Date(event.date);
      const monthYear = eventDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      
      if (!groupedEvents[monthYear]) {
        groupedEvents[monthYear] = [];
      }
      
      groupedEvents[monthYear].push(event);
    });
    
    return (
      <div className="space-y-8">
        {Object.keys(groupedEvents).map(monthYear => (
          <div key={monthYear}>
            <h3 className="text-xl font-bold text-gray-800 mb-4">{monthYear}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {groupedEvents[monthYear].map(event => (
                <EventCard key={event.id} event={event} size="sm" />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  return (
    <Layout>
      <div className="container mx-auto max-w-6xl px-4 py-8 mt-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Event Calendar</h1>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-bold text-gray-800">
                {formatDateHeader(selectedDate)}
              </h2>
              
              <div className="flex items-center gap-1">
                <button
                  className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                  onClick={() => changeMonth(-1)}
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                  onClick={() => changeMonth(1)}
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
            
            <div className="flex items-center p-1 bg-gray-100 rounded-lg">
              <button
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  calendarView === 'month' 
                    ? 'bg-white shadow-sm text-gray-800' 
                    : 'text-gray-600 hover:bg-gray-200'
                }`}
                onClick={() => setCalendarView('month')}
              >
                Month
              </button>
              <button
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  calendarView === 'list' 
                    ? 'bg-white shadow-sm text-gray-800' 
                    : 'text-gray-600 hover:bg-gray-200'
                }`}
                onClick={() => setCalendarView('list')}
              >
                List
              </button>
            </div>
          </div>
          
          {calendarView === 'month' ? renderCalendar() : renderListView()}
        </div>
      </div>
    </Layout>
  );
};

export default CalendarPage;