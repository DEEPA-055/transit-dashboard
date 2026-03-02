'use client';

import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface RidershipChartProps {
    data: number[];
    label: string;
}

const RidershipChart: React.FC<RidershipChartProps> = ({ data, label }) => {
    const chartData = data.map((val, idx) => ({
        hour: `${idx}:00`,
        riders: val,
    }));

    return (
        <div className="bg-card" style={{ height: '350px' }}>
            <h3 style={{ marginBottom: '20px', fontSize: '1.2rem' }}>{label} - 24h Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
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
