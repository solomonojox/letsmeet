import { File, FileText, Send } from 'lucide-react'
import React, { useState } from 'react'

interface Props {
    // notifications: Notification[];
    // setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}
const NotificationSidebar: React.FC<Props> = ({ isOpen, setIsOpen }) => {
    const [activeTab, setActiveTab] = useState('sent');

    const sidebarItems = [
        {
            title: 'sent',
            icon: Send,
            count: 3
        },
        {
            title: 'draft',
            icon: FileText,
            count: 1
        },
    ]

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    };

    return (
        <div className='w-52 border-r border-gray-200 h-[calc(100vh-64px)] p-2 fixed bg-white'>
            <p className='text-base font-semibold mb-2'>Actions</p>
            <button className='p-2 text-xs bg-primary text-white rounded-lg' onClick={() => setIsOpen(true)}>+ Compose new Notification</button>
            <div className='mt-4'>
                {sidebarItems.map((item, index) => (
                    <div key={index} className={`flex gap-6 justify-between py-2 px-6 rounded-tr-full rounded-br-full cursor-pointer font-semibold text-xs transition-all duration-300 ${activeTab === item.title ? 'bg-primary/10 text-primary' : 'text-gray-500'}`} onClick={() => handleTabClick(item.title)}>
                        <div className="flex gap-4 items-center">
                            <item.icon className='w-4 h-4' />
                            {item.title.charAt(0).toUpperCase() + item.title.slice(1)}
                        </div>

                        <p>{item.count}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default NotificationSidebar