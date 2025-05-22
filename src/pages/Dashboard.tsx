import React from 'react';
import Cards from '../components/Dashboard/Cards';
import RecentUsers from '../components/Dashboard/RecentUsers';
import TopState from '../components/Dashboard/TopState';
import UsageAnalytics from '../components/Dashboard/UsageAnalytics';
import MonthlyUsers from '../components/Dashboard/MonthlyUsers';

const Dashboard = () => {
  return (
    <div className="space-y-10 mb-10">
      <Cards />

      <div className="grid grid-cols-1 md:grid-cols-2 justify-center gap-6">
        <UsageAnalytics />
        <MonthlyUsers />
        <TopState />
      </div>
      <RecentUsers />
    </div>
  );
}

export default Dashboard

// 