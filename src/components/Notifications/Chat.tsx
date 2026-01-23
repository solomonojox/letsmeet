import React, { useContext, useEffect, useState } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight, Star, ChevronDown, Bookmark } from 'lucide-react';
import { BankContext } from '../../Context/BankContext';
import { useBank } from '../../Context/useBank';
import Draft from './Draft';

interface ChatProp {
    setIsOpen: (value: boolean) => void;
    openDraftModal: boolean
    setOpenDraftModal: (value: boolean) => void
}
const Chat: React.FC<ChatProp> = ({ setIsOpen, openDraftModal, setOpenDraftModal }) => {
    const { banks, setBanks } = useBank();
    // const [openDraftModal, setOpenDraftModal] = useState(false);

    useEffect(() => {
        const fetchBanks = async () => {
            try {
                const response = await fetch('https://nigerianbanks.xyz/');
                const data = await response.json();
                setBanks(data);
            } catch (error) {
                console.error('Error fetching banks:', error);
            }
        };

        fetchBanks();
    }, []);

    return (
        <div className="min-h-screen bg-white w-full ml-52">
            {/* Header */}
            <div className="border-b border-gray-200">
                <div className="flex items-center justify-between px-6 py-4">
                    <button className="p-2 hover:bg-gray-100 rounded-full" onClick={() => setIsOpen(false)}>
                        <ArrowLeft className="w-5 h-5 text-gray-700" />
                    </button>
                    <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-gray-100 rounded-full">
                            <ChevronLeft className="w-5 h-5 text-gray-700" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-full">
                            <ChevronRight className="w-5 h-5 text-gray-700" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Message Content */}
            <div className=" mx-auto px-6 py-8">
                {/* Subject Header */}
                <div className="mb-8 flex items-center justify-between">
                    <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-2xl font-normal text-gray-900">Warning Notice</h1>
                        <span className="flex items-center gap-1 text-sm text-gray-500">
                            <Bookmark className="w-4 h-4" />
                        </span>
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded">Sent</span>
                    </div>
                </div>

                {/* Sender Info */}
                <div className="flex items-start justify-between mb-6">
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                            <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="font-medium text-gray-900">All users</span>
                                <span className="text-gray-500 text-sm">&lt;email@domain.com&gt;</span>
                                <button className="text-sm text-blue-600 hover:underline">Unsubscribe</button>
                            </div>
                            <div className="flex items-center gap-1 text-sm text-gray-600">
                                <span>to</span>
                                <span>me, Sidney, Sharon</span>
                                <button className="p-0.5 hover:bg-gray-100 rounded">
                                    <ChevronDown className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-500">9:14 AM (8 hours ago)</span>
                        <button className="p-1 hover:bg-gray-100 rounded">
                            <Star className="w-5 h-5 text-gray-400" />
                        </button>
                    </div>
                </div>

                {/* Message Body */}
                <div className="text-gray-800 leading-relaxed">
                    <p>
                        Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint deserunt ut voluptate aute id deserunt nisi.
                    </p>
                </div>

            </div>

            {/* <div className="grid grid-cols-2 gap-4 p-6">
                {banks.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 bg-blue-50 rounded-lg p-4">
                        <img src={item.logo} className='w-10' alt="" />
                        <div className="text-xs">
                            <p className='font-semibold'>{item.name}</p>
                            <p>Code: {item.code}</p>
                            <p>USSD: {item.ussd}</p>
                            <p>Slug: {item.slug}</p>
                        </div>
                    </div>
                ))}
            </div> */}
        </div>
    );
};

export default Chat;