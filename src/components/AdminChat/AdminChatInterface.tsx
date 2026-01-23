import { ArrowLeft, Smile, Paperclip, Send } from "lucide-react";

const AdminChatPlace = () => {
    return (
        <div className="h-[93vh] w-full relative ml-82 bg-black">
            <div className="flex flex-col h-full bg-white border overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b">
                    <div className="flex items-center gap-3">
                        {/* <button className="p-2 rounded-full hover:bg-gray-100">
                            <ArrowLeft size={18} />
                        </button> */}
                        <h2 className="font-semibold text-lg">Tolu Ajibade</h2>
                    </div>

                    <img
                        src="/avatar.png" // replace with real avatar
                        alt="User avatar"
                        className="w-9 h-9 rounded-full object-cover"
                    />
                </div>

                {/* Chat Body */}
                <div className="flex-1 px-4 py-6 overflow-y-auto bg-gray-50 h-screen">
                    {/* Date Separator */}
                    <div className="flex justify-center mb-6">
                        <span className="text-xs text-gray-500 bg-gray-200 px-3 py-1 rounded-full">
                            Today
                        </span>
                    </div>

                    {/* Admin Message */}
                    <div className="flex justify-end">
                        <div className="max-w-[70%] bg-primary text-white px-4 py-3 rounded-2xl rounded-br-sm shadow">
                            <p className="text-sm leading-relaxed">
                                This is just a sample of how the message would look like when the
                                Admin sends it to the user
                            </p>
                            <span className="block text-[10px] text-blue-200 text-right mt-1">
                                Delivered 11:06pm
                            </span>
                        </div>
                    </div>
                </div>

                {/* Message Input */}
                <div className="flex items-center gap-3 px-4 py-3 border-t bg-white">
                    <button className="text-gray-500 hover:text-gray-700">
                        <Smile size={20} />
                    </button>

                    <input
                        type="text"
                        placeholder="Write a message"
                        className="flex-1 text-sm px-4 py-2 border rounded-full outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <button className="text-gray-500 hover:text-gray-700">
                        <Paperclip size={20} />
                    </button>

                    <button className="bg-primary text-white p-2 rounded-full hover:bg-blue-800">
                        <Send size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminChatPlace;