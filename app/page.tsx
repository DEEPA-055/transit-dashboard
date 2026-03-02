'use client';

import React, { useState } from 'react';
import { CITIES, TransitMetric } from '@/data/transitData';
import StatCard from '@/components/StatCard';
import RidershipChart from '@/components/RidershipChart';
import { Activity, Users, Clock, Leaf, AlertTriangle, AlertCircle } from 'lucide-react';

export default function Home() {
  const [selectedCityId, setSelectedCityId] = useState<string>(CITIES[0].id);

  const selectedCity = CITIES.find(c => c.id === selectedCityId) || CITIES[0];

  // Calculate specific metrics
  // Calculate specific metrics from route data for true scaling
  const totalDailyRiders = CITIES.reduce((acc, city) =>
    acc + city.routes.reduce((routeAcc, route) =>
      routeAcc + route.ridership.reduce((a, b) => a + b, 0), 0
    ), 0
  );

  const totalCarbonSavedKg = CITIES.reduce((acc, city) =>
    acc + city.routes.reduce((routeAcc, route) => routeAcc + (route.carbonSaved || 0), 0), 0
  );

  const avgEfficiency = Math.round(CITIES.reduce((acc, city) => acc + city.metrics.efficiencyScore, 0) / CITIES.length);

  // Advanced Dynamic Alert Calculation (Phase 2)
  interface AlertGroup {
    count: number;
    cities: { id: string, name: string }[];
  }

  const alertGroups = CITIES.reduce((acc, city) => {
    city.routes.forEach(route => {
      if (route.status === 'Disrupted') {
        acc.disruptions.count++;
        if (!acc.disruptions.cities.find(c => c.id === city.id)) acc.disruptions.cities.push({ id: city.id, name: city.name });
      }
      if (route.avgDelay > 15) {
        acc.delays.count++;
        if (!acc.delays.cities.find(c => c.id === city.id)) acc.delays.cities.push({ id: city.id, name: city.name });
      }
      if (route.congestionLevel === 'Severe') {
        acc.congestion.count++;
        if (!acc.congestion.cities.find(c => c.id === city.id)) acc.congestion.cities.push({ id: city.id, name: city.name });
      }
    });
    return acc;
  }, {
    disruptions: { count: 0, cities: [] } as AlertGroup,
    delays: { count: 0, cities: [] } as AlertGroup,
    congestion: { count: 0, cities: [] } as AlertGroup
  });

  const totalAlerts = alertGroups.disruptions.count + alertGroups.delays.count + alertGroups.congestion.count;

  const getCityTags = (cities: { id: string, name: string }[], color: string) =>
    cities.map(city => ({
      label: city.name,
      color: color,
      onClick: () => setSelectedCityId(city.id)
    }));

  // Find busiest route in selected city
  const busiestRoute = selectedCity.routes.reduce((prev, current) => {
    const prevTotal = prev.ridership.reduce((a, b) => a + b, 0);
    const currTotal = current.ridership.reduce((a, b) => a + b, 0);
    return (currTotal > prevTotal) ? current : prev;
  });

  return (
    <div>
      <div style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '5px' }}>Overview</h2>
          <p style={{ color: '#a0a0a0' }}>Real-time analytics for Urban Transit Systems</p>
        </div>

        <select
          value={selectedCityId}
          onChange={(e) => setSelectedCityId(e.target.value)}
          style={{
            padding: '10px 20px',
            backgroundColor: '#1e1e1e',
            color: '#fff',
            border: '1px solid #333',
            borderRadius: '8px',
            outline: 'none',
            fontSize: '1rem',
            cursor: 'pointer'
          }}
        >
          {CITIES.map(city => (
            <option key={city.id} value={city.id}>{city.name}</option>
          ))}
        </select>
      </div>

      {/* Global Stats Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '30px' }}>
        <StatCard
          title="Total Daily Riders (All Cities)"
          value={totalDailyRiders.toLocaleString()}
          change={12}
          icon={Users}
        />
        <StatCard
          title="Avg Efficiency Score"
          value={`${avgEfficiency}/100`}
          change={5}
          icon={Activity}
          color="var(--color-secondary-yellow)"
        />
        <StatCard
          title="Carbon Saved (Today)"
          value={`${(totalCarbonSavedKg / 1000).toFixed(1)} Tons`}
          change={8}
          icon={Leaf}
          color="#4CAF50"
        />
        <StatCard
          title="Active Alerts"
          value={totalAlerts}
          change={-2}
          icon={AlertTriangle}
          color="#D32F2F"
          pulse={totalAlerts > 0}
          details={[
            {
              label: 'Critical Disruptions',
              value: alertGroups.disruptions.count,
              icon: AlertCircle,
              tags: getCityTags(alertGroups.disruptions.cities, '#FF5252')
            },
            {
              label: 'Major Delays (>15m)',
              value: alertGroups.delays.count,
              icon: Clock,
              tags: getCityTags(alertGroups.delays.cities, 'var(--color-secondary-yellow)')
            },
            {
              label: 'Severe Congestion',
              value: alertGroups.congestion.count,
              icon: Activity,
              tags: getCityTags(alertGroups.congestion.cities, '#FF9800')
            }
          ]}
          calculationBasis="Aggregated count of routes requiring immediate attention. Click a city tag in the breakdown to view its specific metrics."
        />
      </div>

      {/* City Specific Details */}
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>{selectedCity.name} Insights</h3>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
          {/* Main Chart */}
          <RidershipChart
            data={busiestRoute.ridership}
            label={`Ridership Trend: ${busiestRoute.routeName} (${busiestRoute.type})`}
          />

          {/* City Stats List */}
          <div className="bg-card">
            <h4 style={{ marginBottom: '20px', color: '#a0a0a0' }}>Key Metrics</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Clock size={18} color="var(--color-secondary-yellow)" />
                  <span>Avg Wait Time</span>
                </div>
                <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{selectedCity.metrics.avgWaitTime} min</span>
              </div>
              <div style={{ width: '100%', height: '1px', background: '#333' }}></div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Activity size={18} color="var(--color-primary-green)" />
                  <span>Efficiency Score</span>
                </div>
                <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{selectedCity.metrics.efficiencyScore}</span>
              </div>
              <div style={{ width: '100%', height: '1px', background: '#333' }}></div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Users size={18} color="#2196F3" />
                  <span>Total Riders</span>
                </div>
                <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{selectedCity.metrics.totalRiders.toLocaleString()}</span>
              </div>
            </div>

            <div style={{ marginTop: '30px' }}>
              <h4 style={{ marginBottom: '15px', color: '#a0a0a0', fontSize: '0.9rem' }}>ROUTE STATUS</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {selectedCity.routes.map(route => (
                  <div key={route.routeId} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', background: '#252525', borderRadius: '8px' }}>
                    <div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>{route.routeId}</div>
                      <div style={{ fontSize: '0.75rem', color: '#888' }}>{route.type}</div>
                    </div>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '0.75rem',
                      backgroundColor: route.status === 'On Time' ? 'rgba(67, 160, 71, 0.2)' : 'rgba(211, 47, 47, 0.2)',
                      color: route.status === 'On Time' ? '#4CAF50' : '#FF5252'
                    }}>
                      {route.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
