import React from 'react';
import Cards from '../components/Dashboard/Cards';
import RecentUsers from '../components/Dashboard/RecentUsers';
import TopState from '../components/Dashboard/TopState';
import UsageAnalytics from '../components/Dashboard/UsageAnalytics';

const Dashboard = () => {
  return (
    <div className="space-y-10 mb-10">
      <Cards />

      <div className="flex flex-col md:flex-row justify-center gap-6">
        <UsageAnalytics />
        <TopState />
      </div>
      <RecentUsers />
    </div>
  );
}

export default Dashboard

// 