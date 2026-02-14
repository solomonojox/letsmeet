import { X } from 'lucide-react';
import React from 'react'

interface Props {
    onClose: () => void;
    onfetch: () => void;
    open: boolean;
    next: (content: string) => void
}
const ConfirmationModal: React.FC<Props> = ({ onClose, next, onfetch }) => {
    
    return (
        <div>
            <div className='fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-fadeIn' onClick={onClose}></div>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                <div className="bg-white rounded-lg shadow-2xl max-w-lg w-full pointer-events-auto p-8 animate-scaleIn relative max-h-[90vh] overflow-y-auto space-y-4">
                    <X className="absolute top-4 right-4 cursor-pointer" onClick={onClose} />
                    <h2 className="text-2xl font-semibold mb-4">Confirmation</h2>
                    <div className='border rounded-lg border-red-500 bg-red-100 p-2 text-red-600'>
                        <p><strong>Warning</strong>: The content is sensitive,the action will be logged, and the content can only be viewed one time.</p>
                    </div>

                    <div>
                        <p className='font-semibold'>Reason</p>

                        <select name="reason" id="reason" className='rounded-lg p-2 border border-gray-300 w-full'>
                            <option value="spam">Spam</option>
                            <option value="fraud">Fraud</option>
                            <option value="violence">Violence</option>
                            <option value="harassment">Harassment</option>
                            <option value="sexual">Sexual</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div className='flex gap-2'>
                        <button className='p-2 w-full border border-primary rounded-lg text-primary' onClick={onClose}>Close</button>

                        <button className='p-2 w-full bg-primary rounded-lg text-white' onClick={() => {next('otpverify'); onfetch()}}>Proceed</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConfirmationModal