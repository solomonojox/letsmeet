import React, { useEffect } from 'react';
import Cards from '../components/Dashboard/Cards';
import RecentUsers from '../components/Dashboard/RecentUsers';
import TopState from '../components/Dashboard/TopState';
import UsageAnalytics from '../components/Dashboard/UsageAnalytics';
import MonthlyUsers from '../components/Dashboard/MonthlyUsers';
import { useDispatch } from 'react-redux';
import { api } from '../Services/API/api';

const Dashboard = () => {
  const dispatch = useDispatch<any>();
  useEffect(() => {
    dispatch(api.endpoints.getAllUsers.initiate([]));
    dispatch(api.endpoints.getAllReports.initiate([]));
    dispatch(api.endpoints.getActiveUsersPerMonth.initiate(undefined));
    dispatch(api.endpoints.getAllFriendRequestsSent.initiate([]));
    dispatch(api.endpoints.getSubscribers.initiate([]));
  })
  return (
    <div className="space-y-10 mb-10 mt-4">
      <Cards />

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 justify-center gap-6">
          <UsageAnalytics />
          <MonthlyUsers />
        </div>
        <TopState />
      </div>
      <RecentUsers />
    </div>
  );
}

export default Dashboard

// 