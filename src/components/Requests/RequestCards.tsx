import React, { useContext } from "react";
import { HiOutlineMailOpen } from "react-icons/hi";
import { useGetFriendRequestStatQuery, useGetAllFriendRequestsQuery } from '../../Services/API/api';
import { AppContext } from '../../Context/AppContext';
import CardSkeletonLoader from "../../ui/CardSkeletonLoader";



const RequestCards = () => {
    const { formatNumberWithCommas } = useContext(AppContext);
    const { data: requestStats, isLoading } = useGetFriendRequestStatQuery([]);
    const { data: allRequests } = useGetAllFriendRequestsQuery([]);

    // Total Requests since yesterday
    const totalRequestSinceYesterday = (allRequests?.data || []).filter((user: any) => new Date(user.createdAt) >= new Date(new Date().setDate(new Date().getDate() - 1)));
    const percentageChange = (totalRequestSinceYesterday.length / allRequests?.data?.length) * 100;

    // Total Requests since yesterday
    const totalRequestAcceptedSinceYesterday = (allRequests?.data || []).filter((user: any) => (new Date(user.createdAt) >= new Date(new Date().setDate(new Date().getDate() - 1)) && user.status === 1));
    const percentageChangeAcceptedSinceYesterday = (totalRequestAcceptedSinceYesterday.length / allRequests?.data?.length) * 100;

    // Total Requests since yesterday
    const totalRequestRejectedSinceYesterday = (allRequests?.data || []).filter((user: any) => (new Date(user.createdAt) >= new Date(new Date().setDate(new Date().getDate() - 1)) && user.status === 2));
    const percentageChangeRejectedSinceYesterday = (totalRequestRejectedSinceYesterday.length / allRequests?.data?.length) * 100;


    if (isLoading) {
        return <CardSkeletonLoader num={3} />;
    }

    const cardsData = [
        {
            title: "Total Requests Sent",
            value: formatNumberWithCommas(allRequests?.data?.length || "0"),
            icon: <HiOutlineMailOpen className="text-primary text-2xl" />,
            change: `${percentageChange > 0 ? "+" : percentageChange < 0 ? "-" : ""}${percentageChange.toFixed(2)}%`,
            changeText: "since yesterday",
            color: "bg-primary",
            textColor: `${percentageChange > 0 ? "text-green-500" : "text-red-500"}`,
            border: "border-l-3 border-primary",
            iconBg: "bg-[#E6E6F399]",
        },
        {
            title: "Total Requests Accepted",
            value: formatNumberWithCommas(requestStats?.data?.accepted || "0"),
            icon: <HiOutlineMailOpen className="text-[#22C55E] text-2xl" />,
            change: `${percentageChangeAcceptedSinceYesterday > 0 ? "+" : percentageChangeAcceptedSinceYesterday < 0 ? "-" : ""}${percentageChangeAcceptedSinceYesterday.toFixed(2)}%`,
            changeText: "since yesterday",
            color: "bg-green-100",
            textColor: `${percentageChangeAcceptedSinceYesterday > 0 ? "text-green-500" : "text-red-500"}`,
            border: "border-l-3 border-[#22C55E]",
            iconBg: "bg-[#E9F9EF]",
        },
        {
            title: "Total Requests Rejected",
            value: formatNumberWithCommas(requestStats?.data?.rejected || "0"),
            icon: <HiOutlineMailOpen className="text-[#EF4444] text-2xl" />,
            change: `${percentageChangeRejectedSinceYesterday > 0 ? "+" : percentageChangeRejectedSinceYesterday < 0 ? "-" : ""}${percentageChangeRejectedSinceYesterday.toFixed(2)}%`,
            changeText: "since yesterday",
            color: "bg-red-100",
            textColor: `${percentageChangeRejectedSinceYesterday > 0 ? "text-green-500" : "text-red-500"}`,
            border: "border-l-3 border-red-400",
            iconBg: "bg-[#FDECEC]",
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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