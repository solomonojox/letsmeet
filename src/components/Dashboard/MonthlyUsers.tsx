import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { useGetActiveUsersPerMonthQuery } from "../../Services/API/api";

type MonthlyData = {
  [key: string]: number;
};

const MonthlyUsers: React.FC = () => {
  const { data, isLoading, isError } = useGetActiveUsersPerMonthQuery({});

  // Fallback to empty object if data is undefined or null
  const monthlyData: MonthlyData = data?.data ?? {};

  // Format data for chart
  const formattedData = Object.entries(monthlyData).map(([month, count]) => ({
    month,
    users: count ?? 0,
  }));

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Monthly Users");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "MonthlyUsers.xlsx");
  };

  if (isLoading) {
    return (
      <div className="p-6 bg-white shadow-md rounded-2xl">
        <p className="text-gray-500">Loading monthly user data...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 bg-white shadow-md rounded-2xl">
        <p className="text-red-500">Failed to load monthly user data.</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-2xl p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Monthly Active Users</h2>
        <button
          onClick={exportToExcel}
          className="bg-primary hover:bg-primary/80 text-white text-sm px-4 py-2 rounded-lg transition"
        >
          Export to Excel
        </button>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="users" fill="#01008A" radius={[20, 20, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyUsers;