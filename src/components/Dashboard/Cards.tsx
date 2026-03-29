import React, { useContext } from 'react';
import { FaUsers, FaUserPlus, FaUserCheck, FaFlag } from 'react-icons/fa';
import { HiUsers } from "react-icons/hi2";
import { useGetAllUsersQuery, useGetAllReportsQuery } from '../../Services/API/api';
import { AppContext } from '../../Context/AppContext';
import CardSkeletonLoader from '../../ui/CardSkeletonLoader';


const Cards = () => {
    const { formatNumberWithCommas } = useContext(AppContext);
    const { data: userData, isLoading } = useGetAllUsersQuery([]);
    const { data: reportsData } = useGetAllReportsQuery([]);
    const reports = reportsData?.data?.items || [];
    const users = userData?.data.items || [];

    if (isLoading) {
        return <CardSkeletonLoader num={4} />;
    }

    interface User {
        isAvailable: boolean;
        [key: string]: any;
    }

    interface CardData {
        title: string;
        value: number | string;
        icon: React.ReactNode;
        change: string;
        changeText: string;
        color: string;
        textColor: string;
        border: string;
        iconBg: string;
    }

    const usersTyped: User[] = users as User[] || [];
    const availableUserCount: number = usersTyped?.filter((user: User) => user.status === "ACTIVE").length;

    // Get current date and date 7 days ago
    const now = new Date();
    const sevenDaysAgo = new Date(now);
    sevenDaysAgo.setDate(now.getDate() - 7);

    const oneDayAgo = new Date(now);
    oneDayAgo.setDate(now.getDate() - 1);

    // Count users created in the last 7 days
    interface RecentUser {
        createdAt: string;
        [key: string]: any;
    }
    const recentUserCount: number = (users as RecentUser[])?.filter((user: RecentUser) => new Date(user.createdAt) >= sevenDaysAgo).length;

    const yesterdayUserCount: number = (users as RecentUser[])?.filter((user: RecentUser) => new Date(user.createdAt) >= oneDayAgo).length;

    const yesterdayReportCount: number = (reports as RecentUser[])?.filter((report: RecentUser) => new Date(report.createdAt) >= oneDayAgo).length;

    const totalUsers = users?.length || 0;
    const totalReports = reports?.length || 0;

    // const usersPerc = totalUsers > 0 ? ((yesterdayUserCount / totalUsers) * 100).toFixed(2) : '0';
    // const usersSign = Number(usersPerc) > 0 ? '+' : '';
    // const usersChangeTextColor = Number(usersPerc) > 0 ? 'text-green-500' : 'text-red-500';

    const reportsPerc = totalReports > 0 ? ((yesterdayReportCount / totalReports) * 100).toFixed(2) : '0';
    const reportsSign = Number(reportsPerc) > 0 ? '+' : '';
    const reportsChangeTextColor = Number(reportsPerc) > 0 ? 'text-green-500' : 'text-red-500';

    const cardsData = [
        {
            title: 'Total users',
            value: formatNumberWithCommas(userData?.data?.totalCount || 0),
            icon: <HiUsers className="text-primary" />,
            // change: `${usersSign} ${usersPerc}%`,
            // changeText: 'since yesterday',
            color: 'bg-primary',
            // textColor: usersChangeTextColor,
            border: 'border-l-3 border-primary',
            iconBg: 'bg-[#E6E6F399]',
        },
        {
            title: 'Active users',
            value: formatNumberWithCommas(availableUserCount || 0),
            icon: <HiUsers className="text-[#22C55E]" />,
            // change: '-6.5%',
            // changeText: 'since yesterday',
            color: 'bg-green-100',
            textColor: 'text-red-500',
            border: 'border-l-3 border-[#22C55E]',
            iconBg: 'bg-[#E9F9EF]',
        },
        {
            title: 'New users',
            value: formatNumberWithCommas(recentUserCount || 0),
            icon: <HiUsers className="text-[#F4B8DC]" />,
            // change: `${usersSign} ${usersPerc}%`,
            // changeText: 'since yesterday',
            color: 'bg-pink-100',
            // textColor: usersChangeTextColor,
            border: 'border-l-3 border-pink-300',
            iconBg: 'bg-[#FEF8FC]',
        },
        {
            title: 'Total Reports',
            value: formatNumberWithCommas(totalReports),
            icon: <FaFlag className="text-[#EF4444]" />,
            change: `${reportsSign} ${reportsPerc}%`,
            changeText: 'since yesterday',
            color: 'bg-red-100',
            textColor: reportsChangeTextColor,
            border: 'border-l-3 border-red-400',
            iconBg: 'bg-[#FDECEC]',
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {cardsData.map((card, index) => (
                <div
                    key={index}
                    className={`p-4 rounded-xl shadow-sm bg-white`}
                >
                    <div className={`flex justify-between items-start px-2 ${card.border}`}>
                        <div>
                            <p className="text-sm text-gray-500">{card.title}</p>
                            <h2 className="text-2xl font-bold">{card.value}</h2>
                        </div>
                        <div className={`w-10 h-10 flex items-center justify-center rounded-xl ${card.iconBg}`}>
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

export default Cards;