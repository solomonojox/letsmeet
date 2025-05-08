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
  
  const data = [
    { name: 'Jan', value: 20 },
    { name: 'Feb', value: 100 },
    { name: 'Mar', value: 100 },
    { name: 'Apr', value: 50 },
    { name: 'May', value: 455 },
    { name: 'Jun', value: 800 },
    { name: 'July', value: 500 },
    { name: 'Aug', value: 900 },
    { name: 'Sept', value: 900 },
    { name: 'Oct', value: 1000 },
    { name: 'Nov', value: 100 },
    { name: 'Dec', value: 950 },
  ];
  
  const UsageAnalytics = () => {
    return (
      <div className="bg-white rounded-xl shadow-sm p-4 w-full max-w-3xl">
        <h2 className="text-sm font-semibold text-gray-700 mb-4">Usage analytics</h2>
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
              contentStyle={{ backgroundColor: '#000', borderRadius: '4px', color: '#fff' }}
              labelStyle={{ color: '#fff' }}
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