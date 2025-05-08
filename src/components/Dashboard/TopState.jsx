import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const data = [
  { name: 'Lagos', value: 1300 },
  { name: 'Abuja', value: 500 },
  { name: 'Port-Harcourt', value: 300 },
  { name: 'Oyo', value: 200 },
  { name: 'Kano', value: 100 },
];

const TopState = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 w-full ">
      <h2 className="text-sm font-semibold text-gray-700 mb-4">Top state</h2>
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index}>
            <div className="flex justify-between text-sm text-gray-700 mb-1">
              <span>{item.name}</span>
              <span>{item.value.toLocaleString()}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-blue-900 h-3 rounded-full"
                style={{ width: `${(item.value / data[0].value) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopState;