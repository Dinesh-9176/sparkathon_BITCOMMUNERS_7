import React, { useState } from 'react';
import { Users, TrendingUp, Calendar, BarChart3, Plus, Download } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import EventGrid from '../events/EventGrid';
import { mockEvents } from '../../data/mockEvents';
import { Event, Analytics, Organization } from '../../types';
import { generateOrganizerReport, downloadReport } from '../../services/reports';

const mockAnalytics: Analytics = {
  totalAttendees: 1250,
  averageRating: 4.7,
  moodImpact: {
    positive: 85,
    neutral: 12,
    negative: 3
  },
  popularMoods: [
    { mood: "Energetic", count: 450 },
    { mood: "Happy", count: 380 },
    { mood: "Relaxed", count: 220 }
  ],
  attendanceByDate: [
    { date: "2025-03-01", count: 120 },
    { date: "2025-03-02", count: 150 },
    { date: "2025-03-03", count: 180 }
  ]
};

const mockOrganization: Organization = {
  id: '1',
  name: 'Event Masters',
  description: 'Professional event management company',
  contactEmail: 'contact@eventmasters.com',
  verified: true,
  createdAt: '2025-01-01',
  members: ['1'],
  events: ['1', '2', '3', '4']
};

const OrganizerDashboard: React.FC = () => {
  const { currentUser } = useApp();
  const [activeTab, setActiveTab] = useState<'overview' | 'events' | 'analytics'>('overview');
  
  // In a real app, filter events by organizerId
  const organizerEvents = mockEvents.slice(0, 4);

  const handleDownloadReport = () => {
    const report = generateOrganizerReport(mockOrganization, organizerEvents, mockAnalytics);
    downloadReport(report, `organization-report-${new Date().toISOString().split('T')[0]}.txt`);
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 mt-10">
      {/* Organization Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-2xl font-bold">
              {currentUser?.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{currentUser?.name}</h1>
              <p className="text-gray-600">Organization Dashboard</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={handleDownloadReport}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Download size={18} />
              <span>Download Report</span>
            </button>
            
            <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              <Plus size={18} />
              <span>Create Event</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-2">
            <Users className="text-purple-500" />
            <h3 className="font-semibold text-gray-800">Total Attendees</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">{mockAnalytics.totalAttendees}</p>
          <p className="text-sm text-gray-600 mt-1">Across all events</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="text-green-500" />
            <h3 className="font-semibold text-gray-800">Average Rating</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">{mockAnalytics.averageRating}</p>
          <p className="text-sm text-gray-600 mt-1">Out of 5.0</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="text-blue-500" />
            <h3 className="font-semibold text-gray-800">Active Events</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">{organizerEvents.length}</p>
          <p className="text-sm text-gray-600 mt-1">Currently running</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-2">
            <BarChart3 className="text-orange-500" />
            <h3 className="font-semibold text-gray-800">Mood Impact</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">{mockAnalytics.moodImpact.positive}%</p>
          <p className="text-sm text-gray-600 mt-1">Positive mood change</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
        <div className="border-b border-gray-100">
          <div className="flex">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'events', label: 'Events' },
              { id: 'analytics', label: 'Analytics' }
            ].map((tab) => (
              <button
                key={tab.id}
                className={`px-6 py-4 font-medium text-sm whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'text-purple-600 border-b-2 border-purple-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div>
              <EventGrid
                events={organizerEvents}
                title="Your Events"
                description="Currently active events"
              />
            </div>
          )}

          {activeTab === 'events' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Event Management</h2>
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  Create New Event
                </button>
              </div>
              <EventGrid events={organizerEvents} />
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-4">Mood Impact Analysis</h2>
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-500">{mockAnalytics.moodImpact.positive}%</p>
                      <p className="text-sm text-gray-600">Positive</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-yellow-500">{mockAnalytics.moodImpact.neutral}%</p>
                      <p className="text-sm text-gray-600">Neutral</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-red-500">{mockAnalytics.moodImpact.negative}%</p>
                      <p className="text-sm text-gray-600">Negative</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-4">Popular Moods</h2>
                <div className="bg-gray-50 rounded-lg p-6">
                  {mockAnalytics.popularMoods.map((mood, index) => (
                    <div key={index} className="mb-4 last:mb-0">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">{mood.mood}</span>
                        <span className="text-sm text-gray-600">{mood.count} attendees</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-purple-600 h-2 rounded-full"
                          style={{
                            width: `${(mood.count / mockAnalytics.totalAttendees) * 100}%`
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrganizerDashboard;