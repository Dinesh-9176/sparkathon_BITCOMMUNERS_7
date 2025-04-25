import { Event, Analytics, User, Organization } from '../types';

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const generateUserReport = (user: User, events: Event[]) => {
  const savedEvents = events.filter(event => user.savedEvents.includes(event.id));
  const attendedEvents = events.filter(event => user.attendedEvents.includes(event.id));

  const report = `
User Activity Report
Generated on: ${new Date().toLocaleString()}

User Profile
------------
Name: ${user.name}
Email: ${user.email}
Member Since: 2025
Total Events Saved: ${savedEvents.length}
Total Events Attended: ${attendedEvents.length}

Upcoming Events
--------------
${savedEvents.map(event => `
• ${event.title}
  Date: ${formatDate(event.date)}
  Time: ${event.time}
  Venue: ${event.venue}
  Category: ${event.category}
`).join('\n')}

Past Events
----------
${attendedEvents.map(event => `
• ${event.title}
  Date: ${formatDate(event.date)}
  Venue: ${event.venue}
  Rating: ${event.rating || 'Not rated'}
`).join('\n')}

Interests
---------
${user.interests.join(', ')}
`;

  return report;
};

export const generateOrganizerReport = (
  organization: Organization, 
  events: Event[], 
  analytics: Analytics
) => {
  const report = `
Organization Performance Report
Generated on: ${new Date().toLocaleString()}

Organization Details
------------------
Name: ${organization.name}
Email: ${organization.contactEmail}
Total Events: ${events.length}
Verified Status: ${organization.verified ? 'Verified' : 'Pending'}

Event Analytics
-------------
Total Attendees: ${analytics.totalAttendees}
Average Event Rating: ${analytics.averageRating.toFixed(1)}/5.0

Mood Impact
----------
Positive Impact: ${analytics.moodImpact.positive}%
Neutral Impact: ${analytics.moodImpact.neutral}%
Negative Impact: ${analytics.moodImpact.negative}%

Popular Moods
------------
${analytics.popularMoods.map(mood => 
  `${mood.mood}: ${mood.count} attendees (${((mood.count / analytics.totalAttendees) * 100).toFixed(1)}%)`
).join('\n')}

Event Details
------------
${events.map(event => `
• ${event.title}
  Date: ${formatDate(event.date)}
  Time: ${event.time}
  Venue: ${event.venue}
  Category: ${event.category}
  Rating: ${event.rating || 'Not rated'}
  Mood: ${event.mood.name}
`).join('\n')}
`;

  return report;
};

export const downloadReport = (content: string, filename: string) => {
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};