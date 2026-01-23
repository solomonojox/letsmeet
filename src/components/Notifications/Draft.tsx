import React, { useState } from 'react';

interface DraftProps {
    onClose: () => void;
    onSend?: () => void;
    isOpen: boolean;
}

const Draft: React.FC<DraftProps> = ({ onClose, onSend, isOpen }) => {
    const [subject, setSubject] = useState('POP up culture');
    const [recipients, setRecipients] = useState('All users');
    const [body, setBody] = useState(`Lorem ipsum dolor sit amet consectetur. In sit tristique posuere sed id. Nunc amet molestie libero arcu in mauris. Imperdiet viverra a eu ultrices nec. Porttitor nunc volutpat cursus eleifend a. Iaculis integer pellentesque facilisis elit amet sapien. Urna tristique neque interdum semper. Elementum nulla tortor adipiscing nibh. Purus felis vel quis sapien neque. Eget vestibulum at suspendisse aliquam. Ullamcorper lectus scelerisque dignissim in vestibulum sed semper. Libero mi a faucibus nulla facilisi libero imperdiet velit morbi. Diam quis donec quis ultrices nullam dignissim.

Est mauris massa tempus ipsum. Nec interdum ut eget aliquam dolor egestas. Pellentesque purus lobortis volutpat urna auctor. Nibh elementum eget amet arcu enim. Orci etiam ac nunc sit mauris quis tempor elementum amet.

Sed lectus placerat risus vel pharetra massa adipiscing. Vivamus vestibulum urna pharetra vitae donec. Enim enim id ac eget. Dictumst vitae facilisis neque praesent purus. Massa egestas commodo bibendum dapibus molestie faucibus scelerisque nullam. Diam auctor tellus adipiscing phasellus commodo suscipit aliquam volutpat interdum. Commodo dictum volutpat libero donec scelerisque euismod eget viverra. Aliquam vehicula ornare ipsum turpis varius. Diam commodo varius blandit maecenas mattis. Dolor tortor nibh tincidunt enim velit amet ipsum congue. Lorem non sed augue nulla commodo rhoncus. Facilisis consectetur sit mollis molestie habitasse purus tincidunt. Ut nisl in vitae eu elit tempor malesuada vulputate eu. Turpis nibh lacus duis mauris justo purus semper. Leo.`);

    const handleSend = () => {
        if (onSend) {
            onSend();
        }
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-end pr-10 items-end z-[1000] animate-fadeIn">
            <div className="bg-white w-[90%] max-w-2xl max-h-[90vh] flex flex-col shadow-2xl animate-slideUp">
                {/* Modal Header */}
                <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200 bg-gray-900 text-white">
                    <h2 className="text-xl font-semibold m-0">New Notification</h2>
                    <button
                        onClick={onClose}
                        className="bg-transparent border-none text-2xl text-gray-500 cursor-pointer p-0 w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 hover:text-gray-700 transition-colors"
                    >
                        ×
                    </button>
                </div>

                {/* Form Content */}
                <div className="p-4 flex-1 overflow-y-auto">
                    <div className="mb-2 last:mb-0 flex gap-2 items-center relative">
                        <label htmlFor="recipients" className="block text-sm font-medium text-gray-700 mb-1.5">
                            Recipients:
                        </label>
                        <input
                            id="recipients"
                            value={recipients}
                            onChange={(e) => setRecipients(e.target.value)}
                            placeholder="Enter recipients..."
                            className="w-full px-3 py-1 border-b border-gray-300 text-sm transition-colors hover:border-gray-400 focus:outline-none focus:border-blue-500 focus:ring-3 focus:ring-blue-500/10"
                        />

                        <p className="text-xs text-primary absolute top-0 right-0">Send to all</p>
                    </div>

                    <div className="mb-5 last:mb-0 flex gap-2 items-center">
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1.5">
                            Subject:
                        </label>
                        <input
                            id="subject"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            placeholder="Enter subject..."
                            className="w-full px-3 py-1 border-b border-gray-300 text-sm transition-colors hover:border-gray-400 focus:outline-none focus:border-blue-500 focus:ring-3 focus:ring-blue-500/10"
                        />
                    </div>

                    <div className="mb-2 last:mb-0">
                        <label htmlFor="body" className="block text-sm font-medium text-gray-700 mb-1.5">
                            Message
                        </label>
                        <textarea
                            id="body"
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            placeholder="Type your message here..."
                            rows={8}
                            className="w-full px-3 py-3 border border-gray-100 text-sm font-sans leading-relaxed resize-y transition-colors hover:border-gray-400 focus:outline-none focus:border-blue-500 focus:ring-3 focus:ring-blue-500/10"
                        />
                    </div>
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
                        onClick={handleSend}
                        className="px-5 py-2.5 rounded-lg text-sm font-medium cursor-pointer transition-colors bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring-3 focus:ring-blue-500/30"
                    >
                        Send Notification
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Draft;