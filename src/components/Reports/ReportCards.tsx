import React from 'react';
import { FaFlag } from 'react-icons/fa';
import { HiUsers } from "react-icons/hi2";
import { useGetAllReportsQuery } from '../../Services/API/api';
import CardSkeletonLoader from '../../ui/CardSkeletonLoader';


const ReportCards = () => {
  const { data, isLoading } = useGetAllReportsQuery([]);
  const reports = data?.data || [];
  // console.log(reports);

  if (isLoading) {
    return <CardSkeletonLoader num={4} />;
  }

  const cardsData = [
    {
      title: 'Total Reports',
      value: reports.length,
      icon: <FaFlag className="text-[#EF4444] text-xl" />,
      change: '-6.5%',
      changeText: 'since yesterday',
      color: 'bg-red-100',
      textColor: 'text-red-500',
      border: 'border-l-3 border-red-400',
      iconBg: 'bg-[#FDECEC]',
    },
    {
      title: 'Solved Reports',
      value: '5,000',
      icon: <FaFlag className="text-[#22C55E] text-xl" />,
      change: '-6.5%',
      changeText: 'since yesterday',
      color: 'bg-green-100',
      textColor: 'text-red-500',
      border: 'border-l-3 border-[#22C55E]',
      iconBg: 'bg-[#E9F9EF]',
    },
    {
      title: 'Pending Reports',
      value: '10,000',
      icon: <FaFlag className="text-[#DD900D] text-xl" />,
      change: '+6.5%',
      changeText: 'since yesterday',
      color: 'bg-[#DD900D]',
      textColor: 'text-green-500',
      border: 'border-l-3 border-[#DD900D]',
      iconBg: 'bg-[#E6E6F399]',
    },
    {
      title: 'New Reports',
      value: '10',
      icon: <HiUsers className="text-[#F4B8DC] text-xl" />,
      change: '+6.5%',
      changeText: 'since yesterday',
      color: 'bg-pink-300',
      textColor: 'text-green-500',
      border: 'border-l-3 border-pink-300',
      iconBg: 'bg-[#FEF8FC]',
    },
  ];

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