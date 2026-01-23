import React, { useContext } from 'react';
import { AppContext } from '../../Context/AppContext';
import CardSkeletonLoader from '../../ui/CardSkeletonLoader';
import { PaperclipIcon, Users, TrendingUp, DollarSign, Percent } from 'lucide-react';

interface ViewReferralCardsProps {
    cardData: any;
}

const ViewReferralCards: React.FC<ViewReferralCardsProps> = ({ cardData }) => {
    const { formatNumberWithCommas } = useContext(AppContext);
    
    if (!cardData) {
        return <CardSkeletonLoader num={4} />;
    }

    const cardsData = [
        {
            title: 'Total Referrals',
            value: formatNumberWithCommas(cardData?.totalReferrals || 0),
            icon: <PaperclipIcon className="text-blue-500" />,
            border: 'border-l-3 border-blue-500',
            iconBg: 'bg-blue-50',
        },
        {
            title: 'Converted Referrals',
            value: formatNumberWithCommas(cardData?.convertedReferrals || 0),
            icon: <Users className="text-green-500" />,
            border: 'border-l-3 border-green-500',
            iconBg: 'bg-green-50',
        },
        {
            title: 'Pending Referrals',
            value: formatNumberWithCommas(cardData?.pendingReferrals || 0),
            icon: <PaperclipIcon className="text-yellow-500" />,
            border: 'border-l-3 border-yellow-500',
            iconBg: 'bg-yellow-50',
        },
        {
            title: 'Conversion Rate',
            value: `${cardData?.conversionRate || 0}%`,
            icon: <TrendingUp className="text-purple-500" />,
            border: 'border-l-3 border-purple-500',
            iconBg: 'bg-purple-50',
        },
        {
            title: 'Total Referred Users',
            value: formatNumberWithCommas(cardData?.totalReferredUsers || 0),
            icon: <Users className="text-indigo-500" />,
            border: 'border-l-3 border-indigo-500',
            iconBg: 'bg-indigo-50',
        },
        {
            title: 'Subscribed Users',
            value: formatNumberWithCommas(cardData?.subscribedUsers || 0),
            icon: <Users className="text-pink-500" />,
            border: 'border-l-3 border-pink-500',
            iconBg: 'bg-pink-50',
        },
        {
            title: 'Subscription Rate',
            value: `${cardData?.subscriptionRate || 0}%`,
            icon: <Percent className="text-red-500" />,
            border: 'border-l-3 border-red-500',
            iconBg: 'bg-red-50',
        },
        {
            title: 'Total Revenue',
            value: `$${formatNumberWithCommas(cardData?.totalRevenue || 0)}`,
            icon: <DollarSign className="text-emerald-500" />,
            border: 'border-l-3 border-emerald-500',
            iconBg: 'bg-emerald-50',
        },
        {
            title: 'Revenue Share',
            value: `$${formatNumberWithCommas(cardData?.revenueShare || 0)}`,
            icon: <DollarSign className="text-teal-500" />,
            border: 'border-l-3 border-teal-500',
            iconBg: 'bg-teal-50',
        },
        {
            title: 'Revenue Share %',
            value: `${cardData?.revenueSharePercentage || 0}%`,
            icon: <Percent className="text-cyan-500" />,
            border: 'border-l-3 border-cyan-500',
            iconBg: 'bg-cyan-50',
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            {cardsData.map((card, index) => (
                <div
                    key={index}
                    className="p-4 rounded-xl shadow-sm bg-white hover:shadow-md transition-shadow duration-200"
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
                </div>
            ))}
        </div>
    );
};

export default ViewReferralCards;