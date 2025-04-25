import React from 'react';
import { Navigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import UserDashboard from '../components/dashboard/UserDashboard';
import OrganizerDashboard from '../components/dashboard/OrganizerDashboard';
import { useApp } from '../context/AppContext';

const DashboardPage: React.FC = () => {
  const { currentUser } = useApp();

  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  return (
    <Layout>
      {currentUser.role === 'organizer' ? (
        <OrganizerDashboard />
      ) : (
        <UserDashboard />
      )}
    </Layout>
  );
};

export default DashboardPage;