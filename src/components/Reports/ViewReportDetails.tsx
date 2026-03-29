import { X } from 'lucide-react'
import React, { useEffect } from 'react'
import { ReportDetailsType } from '../../types/reportDetailsType';

interface Props {
    onClose: () => void;
    formatDate: any;
    open: boolean;
    details: ReportDetailsType;
}

const preventCopy = (e: React.ClipboardEvent) => e.preventDefault();

const ViewReportDetails: React.FC<Props> = ({ onClose, open, details, formatDate }) => {

    useEffect(() => {
        const blockPrint = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
                e.preventDefault();
            }
        };

        document.addEventListener('keydown', blockPrint);
        return () => document.removeEventListener('keydown', blockPrint);
    }, []);

    return (
        <>
            <style>{`
                @media print {
                    body * {
                        display: none !important;
                    }
                    body::after {
                        content: "Printing this content is not permitted.";
                        display: block !important;
                        text-align: center;
                        font-size: 20px;
                        margin-top: 100px;
                        color: #555;
                    }
                }
            `}</style>

            <div>
                <div className='fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-fadeIn' onClick={onClose}></div>
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                    <div
                        className="bg-white rounded-lg shadow-2xl max-w-2xl w-full pointer-events-auto p-8 animate-scaleIn relative max-h-[90vh] overflow-y-auto space-y-4 select-none"
                        onCopy={preventCopy}
                    >
                        <X className="absolute top-4 right-4 cursor-pointer border p-1 rounded-lg" size={30} onClick={onClose} />
                        <h2 className="text-lg font-semibold mb-4 text-center">Report details</h2>

                        <div className="flex gap-6 justify-center">
                            <div className="flex flex-col items-center">
                                <img src={details?.reporterPhotoUrl} alt={details?.reporterName} className="bg-gray-200 rounded-full h-12 w-12" />
                                <p className="font-semibold text-md">{details?.reporterName}</p>
                                <p className="text-gray-500 text-xs">Reporter</p>
                            </div>

                            <div className="flex flex-col items-center">
                                <img src={details?.reportedPhotoUrl} alt={details?.reportedName} className="bg-gray-200 rounded-full h-12 w-12" />
                                <p className="font-semibold text-md">{details?.reportedName}</p>
                                <p className="text-gray-500 text-xs">Reported user</p>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse border border-gray-300">
                                <thead className="bg-gray-2">
                                    <tr>
                                        <th className="font-semibold text-xs border-b py-2 px-3 text-left">Content type</th>
                                        <th className="font-semibold text-xs border-b py-2 px-3 text-left">Date Reported</th>
                                        <th className="font-semibold text-xs border-b py-2 px-3 text-left">Status</th>
                                        <th className="font-semibold text-xs border-b py-2 px-3 text-left">Admin</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="text-gray-500 text-xs border-b p-3 text-left">{details?.reason}</td>
                                        <td className="text-gray-500 text-xs border-b p-3 text-left">{formatDate(details?.createdAt)}</td>
                                        <td className="text-gray-500 text-xs border-b p-3 text-left">{details?.reportStatus}</td>
                                        <td className="text-gray-500 text-xs border-b p-3 text-left">{details?.reviewedByAdminName || '-'}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div>
                            <p className="text-xs font-thin mb-2">Content</p>
                            <div className="rounded-xl border p-4 max-h-[40vh] overflow-y-auto">
                                <p>{details?.details}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ViewReportDetails