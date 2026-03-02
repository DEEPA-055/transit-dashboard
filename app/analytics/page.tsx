'use client';

import React from 'react';
import { CITIES } from '@/data/transitData';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';
import { Activity, Wind, TrendingUp } from 'lucide-react';

export default function AnalyticsPage() {
    // Prepare data for Ridership Comparison
    const ridershipData = CITIES.map(city => ({
        name: city.name,
        riders: city.routes.reduce((acc, r) => acc + r.ridership.reduce((sum, val) => sum + val, 0), 0),
        efficiency: city.metrics.efficiencyScore
    }));

    // Prepare data for Carbon efficiency Comparison
    // Assuming average carbon saved per route normalized by city size
    const carbonData = CITIES.map(city => {
        const totalCarbon = city.routes.reduce((acc, r) => acc + r.carbonSaved, 0);
        return {
            name: city.name,
            carbon: totalCarbon
        };
    });

    return (
        <div>
            <div style={{ marginBottom: '30px' }}>
                <h2 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Analytics Hub</h2>
                <p style={{ color: '#a0a0a0' }}>Comparative performance and sustainability reports</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginBottom: '30px' }}>

                {/* Ridership Comparison Chart */}
                <div className="bg-card" style={{ height: '400px' }}>
                    <h3 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <TrendingUp size={20} color="var(--color-secondary-yellow)" />
                        Total Daily Ridership
                    </h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={ridershipData}
                            layout="vertical"
                            margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" stdDeviation={0.1} stroke="#333" />
                            <XAxis type="number" stroke="#666" />
                            <YAxis dataKey="name" type="category" stroke="#fff" width={100} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1e1e1e', borderColor: '#333' }}
                                itemStyle={{ color: '#fff' }}
                                formatter={(value: any) => Number(value).toLocaleString()}
                            />
                            <Bar dataKey="riders" name="Daily Riders" fill="var(--color-primary-green)" radius={[0, 4, 4, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Efficiency Radar Chart */}
                <div className="bg-card" style={{ height: '400px' }}>
                    <h3 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Activity size={20} color="#2196F3" />
                        System Efficiency & Reliability
                    </h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={ridershipData}>
                            <PolarGrid stroke="#444" />
                            <PolarAngleAxis dataKey="name" stroke="#ccc" />
                            <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#666" />
                            <Radar
                                name="Efficiency Score"
                                dataKey="efficiency"
                                stroke="var(--color-secondary-yellow)"
                                fill="var(--color-secondary-yellow)"
                                fillOpacity={0.4}
                            />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1e1e1e', borderColor: '#333' }}
                                itemStyle={{ color: '#fff' }}
                            />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Carbon Impact Section */}
            <div className="bg-card">
                <h3 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Wind size={20} color="#4CAF50" />
                    Daily Carbon Footprint Reduction (kg CO2)
                </h3>
                <p style={{ marginBottom: '20px', color: '#888' }}>
                    Estimated CO2 emissions prevented by public transit usage compared to private vehicle usage.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px' }}>
                    {carbonData.sort((a, b) => b.carbon - a.carbon).map((city, idx) => (
                        <div key={city.name} style={{ background: '#252525', padding: '15px', borderRadius: '8px' }}>
                            <div style={{ color: '#aaa', fontSize: '0.9rem' }}>#{idx + 1} {city.name}</div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#4CAF50', marginTop: '5px' }}>
                                {city.carbon.toLocaleString()} kg
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
