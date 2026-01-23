import React, { useState } from 'react'
import NotificationSidebar from '../components/Notifications/NotificationSidebar'
import ChatInterface from '../components/Notifications/ChatInterface'
import Chat from '../components/Notifications/Chat';
import Draft from '../components/Notifications/Draft';

const Notifications = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [openDraftModal, setOpenDraftModal] = useState(false);
    return (
        <div className='flex'>
            <NotificationSidebar isOpen={openDraftModal} setIsOpen={setOpenDraftModal} />

            {isOpen ? (
                <Chat setIsOpen={setIsOpen} openDraftModal={openDraftModal} setOpenDraftModal={setOpenDraftModal} />
            ) : (
                <ChatInterface isOpen={isOpen} setIsOpen={setIsOpen} />
            )}

            <Draft
                onClose={() => setOpenDraftModal(false)}
                onSend={() => setIsOpen(false)}
                isOpen={openDraftModal}
            />
        </div>
    )
}

export default Notifications