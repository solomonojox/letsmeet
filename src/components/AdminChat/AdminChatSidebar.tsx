import { File, FileText, Send } from 'lucide-react'
import React, { useState } from 'react'
import imageAsset from '../../assets/imageAsset';
import DraftAdmin from './SelectUser';

const AdminChatSidebar = () => {
    const [activeTab, setActiveTab] = useState('sent');
    const [showDraft, setShowDraft] = useState(false);

    const sidebarItems = [
        {
            user: 'Tolu Ajibade',
            image: imageAsset.lady,
            higlight: 'I am currently at the junction',
            time: "12:30pm"
        },
        {
            user: 'draft',
            image: imageAsset.lady,
            higlight: 'I am currently at the junction',
            time: "12:30pm"
        },
    ]

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    };

    return (
        <>
            <div className='w-80 border-r border-gray-200 h-[calc(100vh-64px)] p-2 fixed bg-white'>
                <p className='text-base font-semibold mb-2'>Actions</p>
                <button className='p-3 text-xs bg-primary text-white rounded-lg w-full' onClick={() => setShowDraft(true)}>Start a new chat</button>
                {/* Search with search icon */}
                <div className='my-2'>
                    <div className='relative'>
                        <span className='absolute top-3 left-3 text-gray-400 z-10'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                            </svg>
                        </span>
                        <input type="text" placeholder="Search" className="w-full p-2 pl-10 border border-gray-300 rounded-lg" />
                    </div>
                </div>
                <div className='mt-4 space-y-2'>
                    {sidebarItems.map((item, index) => (
                        <div key={index} className={`flex gap-6 items-center justify-between cursor-pointer transition-all duration-300 ${activeTab === item.user ? 'bg-primary/10 text-primary' : 'text-gray-500'}`} onClick={() => handleTabClick(item.user)}>
                            <div className="flex gap-2 items-center">
                                <div className="h-12 w-12 rounded-full overflow-hidden shrink-0">
                                    <img src={item.image} alt="" className='h-full w-full object-cover' />
                                </div>
                                <div>
                                    <p className='font-semibold text-xs'>{item.user.charAt(0).toUpperCase() + item.user.slice(1)}</p>
                                    <p className='line-clamp-1 text-xs'>{item.higlight}</p>
                                </div>
                            </div>
                            <p className='text-xs'>{item.time}</p>
                        </div>
                    ))}
                </div>
            </div>

            <DraftAdmin
                isOpen={showDraft}
                onClose={() => setShowDraft(false)}
            />
        </>
    )
}

export default AdminChatSidebar