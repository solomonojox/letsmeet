import React, { useState } from 'react'
import NotificationSidebar from '../components/Notifications/NotificationSidebar'
import ChatInterface from '../components/Notifications/ChatInterface'
import Chat from '../components/Notifications/Chat';
import AdminChatSidebar from '../components/AdminChat/AdminChatSidebar';
import AdminChatInterface from '../components/AdminChat/AdminChatInterface';
import AdminChatPlace from '../components/AdminChat/AdminChatPlace';

const AdminChat = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className='flex'>
            <AdminChatSidebar />

            {/* {isOpen ? (
                <AdminChatPlace
                    // setIsOpen={setIsOpen}
                    // message="This is just a sample of how the message would look like when the Admin sends it to the user"
                    // senderName="Tolu Ajibade"
                    // timestamp="11:06pm"
                    // dateLabel="Today"
                    // isDelivered={true}
                    // showDate={true}
                />
            ) : (
            )} */}
            <AdminChatInterface 
            // isOpen={isOpen} setIsOpen={setIsOpen}
             />
        </div>
    )
}

export default AdminChat