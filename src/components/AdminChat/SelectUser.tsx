import React, { useState } from 'react';

interface User {
    id: number;
    name: string;
    email: string;
    avatar: string;
    lastSeen: string;
    isOnline: boolean;
}

interface SelectUserProps {
    onClose: () => void;
    onSelectUser?: (user: User) => void;
    isOpen: boolean;
}

const SelectUser: React.FC<SelectUserProps> = ({ onClose, onSelectUser, isOpen }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

    // Mock user data
    const users: User[] = [
        { id: 1, name: 'Alex Johnson', email: 'alex@example.com', avatar: 'AJ', lastSeen: '2 min ago', isOnline: true },
        { id: 2, name: 'Sam Smith', email: 'sam@example.com', avatar: 'SS', lastSeen: '10 min ago', isOnline: true },
        { id: 3, name: 'Taylor Swift', email: 'taylor@example.com', avatar: 'TS', lastSeen: '1 hour ago', isOnline: false },
        { id: 4, name: 'Jordan Lee', email: 'jordan@example.com', avatar: 'JL', lastSeen: 'Yesterday', isOnline: false },
        { id: 5, name: 'Casey Kim', email: 'casey@example.com', avatar: 'CK', lastSeen: 'Online', isOnline: true },
        { id: 6, name: 'Morgan Chen', email: 'morgan@example.com', avatar: 'MC', lastSeen: '2 days ago', isOnline: false },
        { id: 7, name: 'Riley Davis', email: 'riley@example.com', avatar: 'RD', lastSeen: 'Online', isOnline: true },
        { id: 8, name: 'Jamie Wilson', email: 'jamie@example.com', avatar: 'JW', lastSeen: '1 week ago', isOnline: false },
    ];

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleUserSelect = (user: User) => {
        setSelectedUserId(user.id);
        if (onSelectUser) {
            onSelectUser(user);
        }
    };

    const handleStartChat = () => {
        if (selectedUserId && onSelectUser) {
            const selectedUser = users.find(user => user.id === selectedUserId);
            if (selectedUser) {
                onSelectUser(selectedUser);
            }
        }
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 animate-fadeIn">
            <div className="bg-white rounded-xl w-[90%] max-w-md max-h-[90vh] flex flex-col shadow-2xl animate-slideUp">
                {/* Modal Header */}
                <div className="flex justify-between items-center px-6 py-5 border-b border-gray-200">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900 m-0">Select User to Chat</h2>
                        <p className="text-sm text-gray-500 mt-1">Choose who you want to start a conversation with</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="bg-transparent border-none text-2xl text-gray-500 cursor-pointer p-0 w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 hover:text-gray-700 transition-colors"
                    >
                        ×
                    </button>
                </div>

                {/* Search Bar */}
                <div className="p-6 border-b border-gray-200">
                    <div className="relative">
                        <svg 
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search users by name or email..."
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-sm transition-colors hover:border-gray-400 focus:outline-none focus:border-blue-500 focus:ring-3 focus:ring-blue-500/10"
                        />
                    </div>
                </div>

                {/* Users List */}
                <div className="flex-1 overflow-y-auto p-1">
                    {filteredUsers.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-10">
                            <svg className="w-12 h-12 text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-gray-500 text-sm">No users found</p>
                            <p className="text-gray-400 text-xs mt-1">Try a different search term</p>
                        </div>
                    ) : (
                        <ul className="divide-y divide-gray-100">
                            {filteredUsers.map((user) => (
                                <li 
                                    key={user.id}
                                    onClick={() => handleUserSelect(user)}
                                    className={`flex items-center p-4 cursor-pointer transition-colors hover:bg-gray-50 ${
                                        selectedUserId === user.id ? 'bg-blue-50 hover:bg-blue-50' : ''
                                    }`}
                                >
                                    <div className="relative">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold text-lg">
                                            {user.avatar}
                                        </div>
                                        {user.isOnline && (
                                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                                        )}
                                    </div>
                                    <div className="ml-4 flex-1">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-sm font-semibold text-gray-900">{user.name}</h3>
                                                <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                            </div>
                                            <span className={`text-xs ${user.isOnline ? 'text-green-600' : 'text-gray-400'}`}>
                                                {user.lastSeen}
                                            </span>
                                        </div>
                                        <div className="mt-2">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                user.isOnline 
                                                    ? 'bg-green-100 text-green-800' 
                                                    : 'bg-gray-100 text-gray-800'
                                            }`}>
                                                {user.isOnline ? 'Online' : 'Offline'}
                                            </span>
                                        </div>
                                    </div>
                                    {selectedUserId === user.id && (
                                        <div className="ml-3">
                                            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Modal Footer */}
                <div className="flex justify-end gap-3 px-6 py-5 border-t border-gray-200 bg-gray-50 rounded-b-xl">
                    <button
                        onClick={onClose}
                        className="px-5 py-2.5 rounded-lg text-sm font-medium cursor-pointer transition-colors bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400 active:bg-gray-100 focus:outline-none focus:ring-3 focus:ring-blue-500/30"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleStartChat}
                        disabled={!selectedUserId}
                        className={`px-5 py-2.5 rounded-lg text-sm font-medium cursor-pointer transition-colors ${
                            selectedUserId
                                ? 'bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        } focus:outline-none focus:ring-3 focus:ring-blue-500/30`}
                    >
                        Start Chat
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SelectUser;