import React from 'react';
import { FaUsers, FaUserPlus, FaUserCheck, FaFlag } from 'react-icons/fa';
import { HiUsers } from "react-icons/hi2";

const cardsData = [
    {
        title: 'Total users',
        value: '10,000',
        icon: <HiUsers className="text-primary" />,
        change: '+6.5%',
        changeText: 'since yesterday',
        color: 'bg-primary',
        textColor: 'text-green-500',
        border: 'border-l-3 border-primary',
        iconBg: 'bg-[#E6E6F399]',
    },
    {
        title: 'Active users',
        value: '5,000',
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
        value: '100',
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
        value: '10',
        icon: <FaFlag className="text-[#EF4444]" />,
        change: '-6.5%',
        changeText: 'since yesterday',
        color: 'bg-red-100',
        textColor: 'text-red-500',
        border: 'border-l-3 border-red-400',
        iconBg: 'bg-[#FDECEC]',
    },
];

const Cards = () => {
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