import React from 'react';
import { FaUsers, FaUserPlus, FaUserCheck, FaFlag } from 'react-icons/fa';
import { HiUsers } from "react-icons/hi2";
import { HiOutlineMailOpen } from "react-icons/hi";
import { FaCrown } from "react-icons/fa";

const cardsData = [
  {
    title: "Total Subscriptions Amount",
    value: "NGN 30,000,000",
    icon: <FaCrown className="text-primary text-2xl" />,
    change: "+6.5%",
    changeText: "since yesterday",
    color: "bg-primary",
    textColor: "text-green-500",
    border: "border-l-3 border-primary",
    iconBg: "bg-[#E6E6F399]",
  },
  {
    title: "Total Subscribers",
    value: "5,000",
    icon: <FaCrown className="text-[#22C55E] text-2xl" />,
    change: "-6.5%",
    changeText: "since yesterday",
    color: "bg-green-100",
    textColor: "text-red-500",
    border: "border-l-3 border-[#22C55E]",
    iconBg: "bg-[#E9F9EF]",
  },
];

const SubscriptionCards = () => {
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
                    <p className={`text-xs mt-1 ${card.textColor}`}>
                        {card.change} <span className="text-gray-500">{card.changeText}</span>
                    </p>
                </div>
            ))}
        </div>
    );
};

export default SubscriptionCards;