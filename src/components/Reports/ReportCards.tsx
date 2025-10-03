import React, { useContext } from 'react';
import { FaFlag } from 'react-icons/fa';
import { HiUsers } from "react-icons/hi2";
import { useGetAllReportsQuery } from '../../Services/API/api';
import CardSkeletonLoader from '../../ui/CardSkeletonLoader';
import { AppContext } from '../../Context/AppContext';


const ReportCards = () => {
  const { formatNumberWithCommas } = useContext(AppContext);
  const { data, isLoading } = useGetAllReportsQuery([]);
  const reports = data?.data || [];
  // console.log(reports);

  const now = new Date();
  const sevenDaysAgo = new Date(now);
  sevenDaysAgo.setDate(now.getDate() - 7);

  const oneDayAgo = new Date(now);
  oneDayAgo.setDate(now.getDate() - 1);

  interface RecentUser {
    createdAt: string;
    reportStatus: number;
    [key: string]: any;
  }

  // Counts for total, solved, and pending reports
  const totalReports: number = reports.length;
  const totalSolved: number = (reports as RecentUser[])?.filter((user: RecentUser) => user.reportStatus === 1).length;
  const totalPending: number = (reports as RecentUser[])?.filter((user: RecentUser) => user.reportStatus === 0).length;

  // Recent reports (created since yesterday)
  const yesterdayStr = new Date(Date.now() - 86400000).toDateString(); // Yesterday's date string
  const recentTotal: number = (reports as RecentUser[])?.filter((user: RecentUser) => new Date(user.createdAt).toDateString() === yesterdayStr).length;
  const recentSolved: number = (reports as RecentUser[])?.filter((user: RecentUser) => user.reportStatus === 1 && new Date(user.createdAt).toDateString() === yesterdayStr).length;
  const recentPending: number = (reports as RecentUser[])?.filter((user: RecentUser) => user.reportStatus === 0 && new Date(user.createdAt).toDateString() === yesterdayStr).length;

  // Count reports created in the last 7 days
  const recentReportCount: number = (reports as RecentUser[])?.filter((user: RecentUser) => new Date(user.createdAt) >= sevenDaysAgo).length;

  // Calculate percentages (proportion of recent to total, avoid NaN)
  const getPercentage = (recent: number, total: number): number => total > 0 ? (recent / total) * 100 : 0;

  const percentageChangeTotal = getPercentage(recentTotal, totalReports);
  const percentageChangeSolved = getPercentage(recentSolved, totalSolved);
  const percentageChangePending = getPercentage(recentPending, totalPending);
  const percentageChangeNew = getPercentage(recentReportCount, totalReports);

  const getChangeDisplay = (percentage: number) => {
    return `${percentage > 0 ? '+' : ''}${percentage.toFixed(2)}%`;
  };

  const cardsData = [
    {
      title: 'Total Reports',
      value: formatNumberWithCommas(totalReports),
      icon: <FaFlag className="text-[#EF4444] text-xl" />,
      change: getChangeDisplay(percentageChangeTotal),
      changeText: 'since yesterday',
      color: 'bg-red-100',
      textColor: percentageChangeTotal > 0 ? 'text-green-500' : 'text-red-500',
      border: 'border-l-3 border-red-400',
      iconBg: 'bg-[#FDECEC]',
    },
    {
      title: 'Solved Reports',
      value: formatNumberWithCommas(totalSolved),
      icon: <FaFlag className="text-[#22C55E] text-xl" />,
      change: getChangeDisplay(percentageChangeSolved),
      changeText: 'since yesterday',
      color: 'bg-green-100',
      textColor: percentageChangeSolved > 0 ? 'text-green-500' : 'text-red-500',
      border: 'border-l-3 border-[#22C55E]',
      iconBg: 'bg-[#E9F9EF]',
    },
    {
      title: 'Pending Reports',
      value: formatNumberWithCommas(totalPending),
      icon: <FaFlag className="text-[#DD900D] text-xl" />,
      change: getChangeDisplay(percentageChangePending),
      changeText: 'since yesterday',
      color: 'bg-[#DD900D]',
      textColor: percentageChangePending > 0 ? 'text-green-500' : 'text-red-500',
      border: 'border-l-3 border-[#DD900D]',
      iconBg: 'bg-[#E6E6F399]',
    },
    {
      title: 'New Reports',
      value: formatNumberWithCommas(recentReportCount),
      icon: <HiUsers className="text-[#F4B8DC] text-xl" />,
      change: getChangeDisplay(percentageChangeNew),
      changeText: 'since yesterday',
      color: 'bg-pink-300',
      textColor: percentageChangeNew > 0 ? 'text-green-500' : 'text-red-500',
      border: 'border-l-3 border-pink-300',
      iconBg: 'bg-[#FEF8FC]',
    },
  ];

  if (isLoading) {
    return <CardSkeletonLoader num={4} />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {cardsData.map((card, index) => (
        <div key={index} className={`p-4 rounded-xl shadow-sm bg-white`}>
          <div className={`flex justify-between items-start px-2 ${card.border}`}>
            <div>
              <p className="text-sm text-gray-500">{card.title}</p>
              <h2 className="text-2xl font-bold">{card.value}</h2>
            </div>
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-xl ${card.iconBg}`}
            >
              {card.icon}
            </div>
          </div>
          <p className={`text-xs mt-1 ${card.textColor}`}>
            {card.change} <span className="text-gray-500">{card.changeText}</span>
          </p>
        </div>
      ))}
    </div>
  );
};

export default ReportCards;