/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { MoreVertical, ChevronRight } from 'lucide-react';
import imageAsset from '../../assets/imageAsset';

const RecentUsers = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Brooklyn Simmons',
      avatar: imageAsset.avatar,
      dateCreated: '4/21/12',
      plan: 'Free',
      location: 'Ikorodu, Lagos, Nigeria',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Kathryn Murphy',
      avatar: imageAsset.avatar,
      dateCreated: '9/18/16',
      plan: 'Free',
      location: 'Ikorodu, Lagos, Nigeria',
      status: 'Deactivated'
    },
    {
      id: 3,
      name: 'Floyd Miles',
      avatar: imageAsset.avatar,
      dateCreated: '12/4/17',
      plan: 'Premium ~ Monthly',
      location: 'Ikorodu, Lagos, Nigeria',
      status: 'Active'
    },
    {
      id: 4,
      name: 'Guy Hawkins',
      avatar: imageAsset.avatar,
      dateCreated: '8/21/15',
      plan: 'Basic ~ Yearly',
      location: 'Ikorodu, Lagos, Nigeria',
      status: 'In Review'
    },
    {
      id: 5,
      name: 'Esther Howard',
      avatar: imageAsset.avatar,
      dateCreated: '1/15/12',
      plan: 'Premium ~ Yearly',
      location: 'Ikorodu, Lagos, Nigeria',
      status: 'Deactivated'
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-600';
      case 'Deactivated':
        return 'bg-red-100 text-red-600';
      case 'In Review':
        return 'bg-yellow-100 text-yellow-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-gray-700">Recent Users</h2>
        <a href="#" className="text-blue-600 text-sm flex items-center">
          View all users <ChevronRight className="w-4 h-4 ml-1" />
        </a>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="w-12 py-3 pl-4">
                <input type="checkbox" className="h-4 w-4" />
              </th>
              <th className="text-left py-3 text-sm font-medium text-gray-500">Name</th>
              <th className="text-left py-3 text-sm font-medium text-gray-500">Date Created(M/D/Y)</th>
              <th className="text-left py-3 text-sm font-medium text-gray-500">Plan</th>
              <th className="text-left py-3 text-sm font-medium text-gray-500">Location</th>
              <th className="text-left py-3 text-sm font-medium text-gray-500">Status</th>
              <th className="text-left py-3 text-sm font-medium text-gray-500 pr-4">
                <div className="flex items-center">
                  Action
                  <MoreVertical className="ml-1 w-4 h-4 text-gray-400" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-4 pl-4">
                  <input type="checkbox" className="h-4 w-4" />
                </td>
                <td className="py-4">
                  <div className="flex items-center">
                    <img 
                      src={user.avatar} 
                      alt={user.name} 
                      className="w-8 h-8 rounded-full mr-3" 
                    />
                    <span className="font-medium">{user.name}</span>
                  </div>
                </td>
                <td className="py-4 text-gray-500">{user.dateCreated}</td>
                <td className="py-4 text-gray-500">{user.plan}</td>
                <td className="py-4 text-gray-500">{user.location}</td>
                <td className="py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                    {user.status}
                  </span>
                </td>
                <td className="py-4 pr-4 text-right">
                  <button className="text-gray-500 hover:text-gray-700">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentUsers;