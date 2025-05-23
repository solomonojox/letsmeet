import React from 'react';

const TableSkeletonLoader = ({ rows = 5, headers = [] }) => {
    const skeletonRows = Array.from({ length: rows });

    return (
        <div className="overflow-x-auto animate-pulse">
            <table className="min-w-full">
                <thead>
                    <tr className="border-b border-gray-200">
                        <th className="w-12 py-3">
                            <div className="h-4 w-4 bg-gray-300 rounded" />
                        </th>
                        {headers.map((header, idx) => (
                            <th key={idx} className="text-left py-3 text-sm font-medium text-gray-500">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {skeletonRows.map((_, idx) => (
                        <tr key={idx} className="border-b border-gray-100">
                            <td className="py-4 pl-4">
                                <div className="h-4 w-4 bg-gray-300 rounded" />
                            </td>
                            <td className="py-4">
                                <div className="flex items-center">
                                    <div className="w-8 h-8 bg-gray-300 rounded-full mr-3" />
                                    <div className="w-24 h-4 bg-gray-300 rounded" />
                                </div>
                            </td>
                            <td className="py-4">
                                <div className="w-20 h-4 bg-gray-300 rounded" />
                            </td>
                            <td className="py-4">
                                <div className="w-32 h-4 bg-gray-300 rounded" />
                            </td>
                            <td className="py-4">
                                <div className="w-20 h-6 bg-gray-300 rounded-full" />
                            </td>
                            <td className="py-4">
                                <div className="w-20 h-4 bg-gray-300 rounded" />
                            </td>
                            <td className="py-4 pr-4 text-right">
                                <div className="w-10 h-4 bg-gray-300 rounded ml-auto" />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableSkeletonLoader;