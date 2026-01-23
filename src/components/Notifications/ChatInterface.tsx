import React, { useState } from 'react';
import { Search, SlidersHorizontal, Settings, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

interface Notification {
    id: number;
    type: string;
    message: string;
    date: string;
    to: string;
    selected: boolean;
}

interface ChatInterfaceProps {
    // notifications: Notification[];
    // setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ isOpen, setIsOpen }) => {
    const [notifications, setNotifications] = useState<Notification[]>([
        { id: 1, type: 'Warning notice', message: 'Your account would be placed on...', date: '4/21/12', to: 'All users', selected: false },
        { id: 2, type: 'Warning notice', message: 'Your account would be placed on...', date: '9/18/16', to: '1 users', selected: false },
        { id: 3, type: 'Warning notice', message: 'Your account would be placed on...', date: '12/4/17', to: '5 users', selected: false },
        { id: 4, type: 'Warning notice', message: 'Your account would be placed on...', date: '8/21/15', to: 'All users', selected: false },
        { id: 5, type: 'Warning notice', message: 'Your account would be placed on...', date: '8/21/15', to: 'All users', selected: false },
        { id: 6, type: 'Warning notice', message: 'Your account would be placed on...', date: '8/21/15', to: 'All users', selected: false },
        { id: 7, type: 'Warning notice', message: 'Your account would be placed on...', date: '8/21/15', to: 'All users', selected: false },
        { id: 8, type: 'Warning notice', message: 'Your account would be placed on...', date: '8/21/15', to: 'All users', selected: false },
        { id: 9, type: 'Warning notice', message: 'Your account would be placed on...', date: '8/21/15', to: 'All users', selected: false },
    ]);

    const [currentPage, setCurrentPage] = useState(1);
    const [selectAll, setSelectAll] = useState(false);

    const handleSelectAll = () => {
        const newSelectAll = !selectAll;
        setSelectAll(newSelectAll);
        setNotifications(notifications.map(n => ({ ...n, selected: newSelectAll })));
    };

    const handleSelectNotification = (id: number) => {
        setNotifications(notifications.map(n =>
            n.id === id ? { ...n, selected: !n.selected } : n
        ));
    };

    return (
        <div className="min-h-screen bg-gray-50 w-full ml-52 text-sm">
            <div className="bg-white">
                {/* Header */}
                <div className="pl-4 py-4 border-b border-gray-200 flex items-center justify-between">
                    <h1 className="text-lg font-normal text-gray-700">Sent Notifications ~ 500</h1>
                    <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50 rounded border border-gray-300">
                        <SlidersHorizontal className="w-4 h-4" />
                        Filter
                    </button>
                </div>

                {/* Search */}
                <div className="pl-4 py-4 border-b border-gray-200">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search for Message or user"
                            className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="w-6 px-4 py-3">
                                    <input
                                        type="checkbox"
                                        checked={selectAll}
                                        onChange={handleSelectAll}
                                        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                </th>
                                <th className="px-2 py-3 text-left text-sm font-medium text-gray-700">Notification</th>
                                <th className="px-2 py-3 text-left text-sm font-medium text-gray-700">Message</th>
                                <th className="px-2 py-3 text-left text-sm font-medium text-gray-700">Date [D/M/Y]</th>
                                <th className="px-2 py-3 text-left text-sm font-medium text-gray-700">To</th>
                                <th className="px-2 py-3 text-left text-sm font-medium text-gray-700 flex items-center gap-1">
                                    Action
                                    <Settings className="w-4 h-4" />
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {notifications.map((notification) => (
                                <tr key={notification.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-4 w-2">
                                        <input
                                            type="checkbox"
                                            checked={notification.selected}
                                            onChange={() => handleSelectNotification(notification.id)}
                                            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                        />
                                    </td>
                                    <td className="px-2 py-4">
                                        <span className="text-sm font-semibold text-gray-900 cursor-pointer" onClick={() => setIsOpen(true)}>{notification.type}</span>
                                    </td>
                                    <td className="px-2 py-4">
                                        <span className="text-sm text-gray-500">{notification.message}</span>
                                    </td>
                                    <td className="px-2 py-4">
                                        <span className="text-sm text-gray-900">{notification.date}</span>
                                    </td>
                                    <td className="px-2 py-4">
                                        <span className="text-sm text-gray-900">{notification.to}</span>
                                    </td>
                                    <td className="px-2 py-4">
                                        <button className="flex items-center gap-1 text-gray-500 hover:text-gray-700">
                                            <Settings className="w-4 h-4" />
                                            <ChevronDown className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                    <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded disabled:opacity-50 disabled:cursor-not-allowed">
                        <ChevronLeft className="w-4 h-4" />
                        Previous
                    </button>

                    <div className="flex items-center gap-1">
                        <button className="w-8 h-8 flex items-center justify-center text-sm rounded bg-blue-100 text-blue-600 font-medium">
                            1
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center text-sm rounded text-gray-600 hover:bg-gray-50">
                            2
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center text-sm rounded text-gray-600 hover:bg-gray-50">
                            3
                        </button>
                        <span className="px-2 text-gray-500">...</span>
                        <button className="w-8 h-8 flex items-center justify-center text-sm rounded text-gray-600 hover:bg-gray-50">
                            8
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center text-sm rounded text-gray-600 hover:bg-gray-50">
                            9
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center text-sm rounded text-gray-600 hover:bg-gray-50">
                            10
                        </button>
                    </div>

                    <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded">
                        Next
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatInterface;