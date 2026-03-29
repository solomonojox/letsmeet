import React, { useContext } from 'react';
import { ShieldOff, ShieldCheck, TrendingDown, Activity } from 'lucide-react';
import { useGetBlockedCardDataQuery } from '../../Services/API/api';
import { AppContext } from '../../Context/AppContext';
import CardSkeletonLoader from '../../ui/CardSkeletonLoader';

const BlockCards = () => {
    const { formatNumberWithCommas } = useContext(AppContext);
    const { data, isLoading } = useGetBlockedCardDataQuery({});
    const dbData = data?.data;

    if (isLoading) {
        return <CardSkeletonLoader num={4} />;
    }

    const cardsData = [
        {
            title: 'Total Blocked Pairs',
            value: formatNumberWithCommas(dbData?.totalBlockedPairs || 0),
            icon: <ShieldOff className="text-red-500" size={20} />,
            subLabel: 'Block Rate',
            subValue: `${dbData?.blockRatePercent ?? 0}%`,
            subColor: 'text-red-500',
            border: 'border-l-4 border-red-400',
            iconBg: 'bg-red-50',
        },
        {
            title: 'Blocks This Week',
            value: formatNumberWithCommas(dbData?.blocksThisWeek || 0),
            icon: <Activity className="text-orange-500" size={20} />,
            subLabel: 'This Month',
            subValue: `${formatNumberWithCommas(dbData?.blocksThisMonth || 0)} blocks`,
            subColor: 'text-orange-500',
            border: 'border-l-4 border-orange-400',
            iconBg: 'bg-orange-50',
        },
        {
            title: 'Unblocks This Month',
            value: formatNumberWithCommas(dbData?.unblocksThisMonth || 0),
            icon: <ShieldCheck className="text-green-500" size={20} />,
            subLabel: 'vs Blocks',
            subValue: `${formatNumberWithCommas(dbData?.blocksThisMonth || 0)} blocks`,
            subColor: 'text-green-600',
            border: 'border-l-4 border-green-400',
            iconBg: 'bg-green-50',
        },
        {
            title: 'Most Blocked User',
            value: dbData?.mostBlockedUsers?.[0]?.name?.split(' ')[0] ?? '—',
            icon: <TrendingDown className="text-purple-500" size={20} />,
            subLabel: 'Block count',
            subValue: `${dbData?.mostBlockedUsers?.[0]?.blockCount ?? 0} time(s)`,
            subColor: 'text-purple-500',
            border: 'border-l-4 border-purple-400',
            iconBg: 'bg-purple-50',
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {cardsData.map((card, index) => (
                <div
                    key={index}
                    className="p-4 rounded-xl shadow-sm bg-white"
                >
                    <div className={`flex justify-between items-start px-2 ${card.border}`}>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm text-gray-500">{card.title}</p>
                            <h2 className="text-2xl font-bold truncate">{card.value}</h2>
                        </div>
                        <div className={`w-10 h-10 flex items-center justify-center rounded-xl ${card.iconBg} ml-2 shrink-0`}>
                            {card.icon}
                        </div>
                    </div>
                    <p className="text-xs mt-2 px-2">
                        <span className={`font-medium ${card.subColor}`}>{card.subValue}</span>{' '}
                        <span className="text-gray-400">{card.subLabel}</span>
                    </p>
                </div>
            ))}
        </div>
    );
};

export default BlockCards;