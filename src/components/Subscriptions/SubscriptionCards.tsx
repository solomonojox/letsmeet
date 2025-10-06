import React, { useContext } from 'react';
import { FaCrown } from "react-icons/fa";
import { useGetTotalRevenueQuery, useGetSubscribersQuery, useGetSubscriptionStatQuery } from '../../Services/API/api';
import { AppContext } from '../../Context/AppContext';
import CardSkeletonLoader from '../../ui/CardSkeletonLoader';

const SubscriptionCards = () => {
    const { formatNumberWithCommas } = useContext(AppContext);
    // const {data: totalSubscribers} = useGetTotalSubscribersQuery(0);
    const {data: subscribers} = useGetSubscribersQuery([]);
    const {data: stat, isLoading} = useGetSubscriptionStatQuery({});
    const allSubStat = stat?.data;
    // console.log('stat', allSubStat);

    if (isLoading) {
        return <CardSkeletonLoader num={3} />;
    }

    const filterByDate = (subscribers?.data || []).filter((user: any) => new Date(user.startDate) >= new Date(new Date().setDate(new Date().getDate() - 1)));
    
    
    // % subscribers change since yesterday
    // const totalSubscribersCount = filterByDate.length;
    // const percentageChange = (totalSubscribersCount / totalSubscribers?.data) * 100;
    
    // % revenue change since yesterday
    const totalAmount = filterByDate?.reduce((sum: number, am: any) => sum + am.amount, 0);

    const cardsData = [
        {
            title: "Total Subscriptions Amount",
            value: `NGN ${formatNumberWithCommas(allSubStat?.totalRevenue)}`,
            icon: <FaCrown className="text-primary text-2xl" />,
            change: `${allSubStat?.growthRate > 0 ? "+" : allSubStat?.growthRate < 0 ? "-" : ""}${allSubStat?.growthRate || 0}%`,
            changeText: "since yesterday",
            color: "bg-primary",
            textColor: `${allSubStat?.growthRate > 0 ? "text-green-500" : "text-red-500"}`,
            border: "border-l-3 border-primary",
            iconBg: "bg-[#E6E6F399]",
        },
        {
            title: "Total Subscribers",
            value: formatNumberWithCommas(allSubStat?.totalSubscriptions),
            icon: <FaCrown className="text-[#22C55E] text-2xl" />,
            change: `${allSubStat?.growthRate > 0 ? "+" : allSubStat?.growthRate < 0 ? "-" : ""}${allSubStat?.growthRate || 0}%`,
            changeText: "since yesterday",
            color: "bg-green-100",
            textColor: `${allSubStat?.growthRate > 0 ? "text-green-500" : "text-red-500"}`,
            border: "border-l-3 border-[#22C55E]",
            iconBg: "bg-[#E9F9EF]",
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    {/* <p className={`text-xs mt-1 ${card.textColor}`}>
                        {card.change} <span className="text-gray-500">{card.changeText}</span>
                    </p> */}
                </div>
            ))}
        </div>
    );
};

export default SubscriptionCards;