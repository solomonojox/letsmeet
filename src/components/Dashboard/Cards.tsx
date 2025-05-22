import React, { useContext } from 'react';
import { FaUsers, FaUserPlus, FaUserCheck, FaFlag } from 'react-icons/fa';
import { HiUsers } from "react-icons/hi2";
import { useGetAllUsersQuery, useGetAllReportsQuery } from '../../Services/API/api';
import { AppContext } from '../../Context/AppContext';
import CardSkeletonLoader from '../../ui/CardSkeletonLoader';


const Cards = () => {
    const { formatNumberWithCommas } = useContext(AppContext);
    const { data: users, isLoading } = useGetAllUsersQuery([]);
    const { data: reports } = useGetAllReportsQuery([]);

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
    const availableUserCount: number = usersTyped?.filter((user: User) => user.isAvailable === true).length;

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
    console.log('Yesterday User Count:', (yesterdayUserCount/usersTyped.length)*100);
    // console.log('Yesterday User Count:', usersTyped.length);

    const cardsData = [
        {
            title: 'Total users',
            value: formatNumberWithCommas(users?.length || 0),
            icon: <HiUsers className="text-primary" />,
            change: `
                ${(yesterdayUserCount/usersTyped.length)*100 > 0 ? '+' : (yesterdayUserCount/usersTyped.length)*100 > 0 ? '-' : ''} ${(yesterdayUserCount/usersTyped.length)*100}%`,
            changeText: 'since yesterday',
            color: 'bg-primary',
            textColor: `${(yesterdayUserCount/usersTyped.length)*100 > 0 ? 'text-green-500' : 'text-red-500'}`,
            border: 'border-l-3 border-primary',
            iconBg: 'bg-[#E6E6F399]',
        },
        {
            title: 'Active users',
            value: formatNumberWithCommas(availableUserCount || 0),
            icon: <HiUsers className="text-[#22C55E]" />,
            change: '-6.5%',
            changeText: 'since yesterday',
            color: 'bg-green-100',
            textColor: 'text-red-500',
            border: 'border-l-3 border-[#22C55E]',
            iconBg: 'bg-[#E9F9EF]',
        },
        {
            title: 'New users',
            value: formatNumberWithCommas(recentUserCount || 0),
            icon: <HiUsers className="text-[#F4B8DC]" />,
            change: '+6.5%',
            changeText: 'since yesterday',
            color: 'bg-pink-100',
            textColor: 'text-green-500',
            border: 'border-l-3 border-pink-300',
            iconBg: 'bg-[#FEF8FC]',
        },
        {
            title: 'Total Reports',
            value: formatNumberWithCommas(reports?.data?.length || 0),
            icon: <FaFlag className="text-[#EF4444]" />,
            change: '-6.5%',
            changeText: 'since yesterday',
            color: 'bg-red-100',
            textColor: 'text-red-500',
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
                            <h2 className="text-2xl font-bold">{card.value?.toLocaleString()}</h2>
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