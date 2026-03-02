'use client';

import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface RidershipChartProps {
  data?: number[];
  label: string;
  loading?: boolean;
  error?: string | null;
}

const RidershipChart: React.FC<RidershipChartProps> = ({
  data,
  label,
  loading = false,
  error = null,
}) => {
  // 🔹 Loading State
  if (loading) {
    return (
      <div className="flex items-center justify-center h-[300px]">
        <div className="animate-spin h-8 w-8 border-4 border-green-400 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  // 🔹 Error State
  if (error) {
    return (
      <div className="flex items-center justify-center h-[300px] text-red-400">
        ⚠ {error}
      </div>
    );
  }

  // 🔹 No Data State
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-[300px] text-gray-500">
        No ridership data available
      </div>
    );
  }

  const chartData = data.map((val, idx) => ({
    hour: `${idx}:00`,
    riders: val,
  }));

  return (
    <div className="bg-card w-full p-4 rounded-lg">
      <h3 className="mb-4 text-lg font-semibold">
        {label} - 24h Trend
      </h3>

      <ResponsiveContainer width="100%" aspect={2}>
        <AreaChart
          data={chartData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorRiders" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-primary-green)" stopOpacity={0.8} />
              <stop offset="95%" stopColor="var(--color-primary-green)" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis dataKey="hour" stroke="#666" />
          <YAxis stroke="#666" />
          <Tooltip
            contentStyle={{ backgroundColor: '#1e1e1e', borderColor: '#333' }}
            itemStyle={{ color: '#fff' }}
          />
          <Area
            type="monotone"
            dataKey="riders"
            stroke="var(--color-secondary-yellow)"
            fillOpacity={1}
            fill="url(#colorRiders)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RidershipChart;