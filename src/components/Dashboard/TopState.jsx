import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useGetAllUsersQuery } from '../../Services/API/api';

const TopState = () => {
  const { data, isLoading, error } = useGetAllUsersQuery([]);
  const users = data?.data?.items || [];

  // Ensure we always work with an array
  const userList = users || [];

  // Step 1: Count users per state
  const stateCountMap = userList.reduce((acc, user) => {
    const state = user?.state?.trim() || 'Unknown';
    acc[state] = (acc[state] || 0) + 1;
    return acc;
  }, {});

  // Step 2: Convert to array and sort by count
  const sortedStates = Object.entries(stateCountMap)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  // Find the highest value for percentage calculation
  const maxValue = sortedStates.length > 0 ? sortedStates[0].value : 1;

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 w-full">
      <h2 className="text-sm font-semibold text-gray-700 mb-4">Top state</h2>

      {isLoading && <p className="text-gray-500 text-sm">Loading...</p>}
      {error && <p className="text-red-500 text-sm">Failed to load data</p>}

      {!isLoading && !error && sortedStates.length === 0 && (
        <p className="text-gray-500 text-sm">No data available</p>
      )}

      <div className="space-y-4">
        {sortedStates.map((item, index) => (
          <div key={index}>
            <div className="flex justify-between text-sm text-gray-700 mb-1">
              <span>{item.name}</span>
              <span>{item.value.toLocaleString()}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-blue-900 h-3 rounded-full"
                style={{ width: `${(item.value / maxValue) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopState;