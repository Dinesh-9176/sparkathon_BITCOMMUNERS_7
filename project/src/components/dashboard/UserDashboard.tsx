import React from 'react';
import { Calendar, Star, Clock, MapPin, Download } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import EventGrid from '../events/EventGrid';
import { getEventById } from '../../data/mockEvents';
import { Event } from '../../types';
import { generateUserReport, downloadReport } from '../../services/reports';

const UserDashboard: React.FC = () => {
  const { currentUser } = useApp();
  const savedEvents = currentUser?.savedEvents.map(id => getEventById(id)).filter((event): event is Event => !!event) || [];
  const attendedEvents = currentUser?.attendedEvents.map(id => getEventById(id)).filter((event): event is Event => !!event) || [];

  const handleDownloadReport = () => {
    if (currentUser) {
      const allEvents = [...savedEvents, ...attendedEvents];
      const report = generateUserReport(currentUser, allEvents);
      downloadReport(report, `user-activity-report-${new Date().toISOString().split('T')[0]}.txt`);
    }
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 mt-10">
      {/* User Profile Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {currentUser?.photoURL ? (
              <img 
                src={currentUser.photoURL} 
                alt={currentUser.name} 
                className="w-20 h-20 rounded-full"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-2xl font-bold">
                {currentUser?.name.charAt(0)}
              </div>
            )}
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{currentUser?.name}</h1>
              <p className="text-gray-600">{currentUser?.email}</p>
            </div>
          </div>
          
          <button
            onClick={handleDownloadReport}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Download size={18} />
            <span>Download Report</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="text-purple-500" />
            <h3 className="font-semibold text-gray-800">Upcoming Events</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">{savedEvents.length}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-2">
            <Star className="text-yellow-500" />
            <h3 className="font-semibold text-gray-800">Events Attended</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">{attendedEvents.length}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="text-green-500" />
            <h3 className="font-semibold text-gray-800">Hours Enjoyed</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">{attendedEvents.length * 2}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-2">
            <MapPin className="text-red-500" />
            <h3 className="font-semibold text-gray-800">Venues Visited</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">
            {new Set(attendedEvents.map(event => event.venue)).size}
          </p>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="mb-12">
        <EventGrid
          events={savedEvents}
          title="Your Upcoming Events"
          description="Events you've saved to attend"
          emptyMessage="You haven't saved any events yet. Start exploring!"
        />
      </div>

      {/* Past Events */}
      <div>
        <EventGrid
          events={attendedEvents}
          title="Past Events"
          description="Events you've attended"
          emptyMessage="You haven't attended any events yet."
        />
      </div>
    </div>
  );
};

export default UserDashboard;