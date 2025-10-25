import React, { useContext } from "react";
import { HiOutlineMailOpen } from "react-icons/hi";
import {
    useGetFriendRequestStatQuery,
    useGetAllFriendRequestsSentQuery,
    useGetAllFriendRequestsReceivedQuery,
    useGetFriendRequestFullStatQuery,
    useGetFriendRequestMothlyRateQuery
} from '../../Services/API/api';
import { AppContext } from '../../Context/AppContext';
import CardSkeletonLoader from "../../ui/CardSkeletonLoader";



const RequestCards = () => {
    const { formatNumberWithCommas } = useContext(AppContext);
    const { data: requestStats, isLoading } = useGetFriendRequestStatQuery([]);
    const { data: requestReceived, isLoading: isLoadingReceived } = useGetAllFriendRequestsReceivedQuery([]);
    const { data: allRequests } = useGetAllFriendRequestsSentQuery([]);
    const { data: fullStatData } = useGetFriendRequestFullStatQuery({});
    const { data: rateData } = useGetFriendRequestMothlyRateQuery([]);
    const fullStat = fullStatData?.data
    const rate = rateData?.data[0]
    // console.log(rate)

    const totalRequests = allRequests?.data?.length || 0;
    const totalRequestsReceived = requestReceived?.data?.length || 0;

    // Total Requests since yesterday
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const totalRequestSinceYesterday = (allRequests?.data || []).filter((user: any) => new Date(user.createdAt) >= yesterday);
    const percentageChange = totalRequests > 0 ? ((totalRequestSinceYesterday.length / totalRequests) * 100) : 0;

    // Total Requests accepted since yesterday
    const totalRequestAcceptedSinceYesterday = (requestReceived?.data || []).filter((user: any) => (new Date(user.createdAt) >= yesterday && user.status === 1));
    const percentageChangeAcceptedSinceYesterday = requestReceived > 0 ? ((totalRequestAcceptedSinceYesterday.length / requestReceived) * 100) : 0;

    // Total Requests rejected since yesterday
    const totalRequestRejectedSinceYesterday = (allRequests?.data || []).filter((user: any) => (new Date(user.createdAt) >= yesterday && user.status === "REJECTED"));
    const totalRejected = requestStats?.data?.rejected || 0;
    const percentageChangeRejectedSinceYesterday = totalRequests > 0 ? ((totalRequestRejectedSinceYesterday.length / totalRequests) * 100) : 0;


    if (isLoading) {
        return <CardSkeletonLoader num={2} />;
    }

    const getChangeDisplay = (percentage: number) => {
        const sign = percentage > 0 ? "+" : percentage < 0 ? "-" : "";
        return `${sign}${Math.abs(percentage).toFixed(2)}%`;
    };

    const cardsData = [
        {
            title: "Total Requests Sent",
            value: formatNumberWithCommas(fullStat?.totalRequestsSent || 0),
            icon: <HiOutlineMailOpen className="text-primary text-2xl" />,
            // change: getChangeDisplay(percentageChange),
            // changeText: "since yesterday",
            color: "bg-primary",
            textColor: percentageChange > 0 ? "text-green-500" : "text-red-500",
            border: "border-l-3 border-primary",
            iconBg: "bg-[#E6E6F399]",
        },
        {
            title: "Total Requests Pending",
            value: formatNumberWithCommas(fullStat?.totalRequestsPending || 0),
            icon: <HiOutlineMailOpen className="text-yellow-500 text-2xl" />,
            // change: getChangeDisplay(percentageChangeRejectedSinceYesterday),
            // changeText: "since yesterday",
            color: "bg-yellow-50",
            textColor: percentageChangeRejectedSinceYesterday > 0 ? "text-green-500" : "text-red-500",
            border: "border-l-3 border-yellow-500",
            iconBg: "bg-[#FDECEC]",
        },

        {
            title: "Total Requests Accepted",
            value: formatNumberWithCommas(fullStat?.totalRequestsAccepted || 0),
            icon: <HiOutlineMailOpen className="text-[#22C55E] text-2xl" />,
            change: getChangeDisplay(rate?.acceptanceRate),
            changeText: "since this month",
            color: "bg-green-100",
            textColor: rate?.acceptanceRate > 0 ? "text-green-500" : "text-red-500",
            border: "border-l-3 border-[#22C55E]",
            iconBg: "bg-[#E9F9EF]",
        },
        {
            title: "Total Requests Rejected",
            value: formatNumberWithCommas(fullStat?.totalRequestsDeclined || 0),
            icon: <HiOutlineMailOpen className="text-[#EF4444] text-2xl" />,
            // change: getChangeDisplay(100 - rate?.acceptanceRate),
            // changeText: "since this month",
            color: "bg-red-100",
            textColor: (100 - rate?.acceptanceRate) > 0 ? "text-green-500" : "text-red-500",
            border: "border-l-3 border-red-400",
            iconBg: "bg-[#FDECEC]",
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

export default RequestCards;