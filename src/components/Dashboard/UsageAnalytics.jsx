import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Area,
  AreaChart,
} from 'recharts';
import { useGetAllUsersQuery } from '../../Services/API/api';
import * as XLSX from 'xlsx';
import saveAs from 'file-saver';

const UsageAnalytics = () => {
  const { data: users } = useGetAllUsersQuery([]);
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  const monthlyCounts = Array(12).fill(0);

  // Tally users per month
  users?.forEach(user => {
    const month = new Date(user.createdAt).getMonth(); // 0-indexed (0 = Jan)
    monthlyCounts[month]++;
  });

  // Transform to chart data format
  const data = monthNames.map((name, index) => ({
    name,
    value: monthlyCounts[index],
  }));

  // Export to Excel function
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Usage Analytics');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, 'UsageAnalytics.xlsx');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 w-full max-w-3xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-sm font-semibold text-gray-700">Usage analytics</h2>
        <button
          onClick={exportToExcel}
          className="bg-primary hover:bg-primary/80 text-white text-xs px-4 py-2 rounded-md"
        >
          Export to Excel
        </button>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00008B" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#00008B" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="#888888" fontSize={12} />
          <YAxis stroke="#888888" fontSize={12} tickFormatter={(v) => (v >= 1000 ? `${v / 1000}k` : v)} />
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <Tooltip
            contentStyle={{ backgroundColor: '#cecece', borderRadius: '4px', color: '#000' }}
            labelStyle={{ color: '#000' }}
            formatter={(value) => [`${value}`, '']}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#00008B"
            fillOpacity={1}
            fill="url(#colorUsage)"
            activeDot={{ r: 5 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UsageAnalytics;
