'use client';

import React, { useState } from 'react';
import { CITIES, TransitMetric } from '@/data/transitData';
import { AlertTriangle, Clock, TrendingUp, Filter, MapPin } from 'lucide-react';
import RidershipChart from '@/components/RidershipChart';
import RouteMap from '@/components/RouteMap';
import { LoadScript } from '@react-google-maps/api';
import MapFallback from '@/components/MapFallback';

export default function RouteAnalysis() {
    const [selectedCityId, setSelectedCityId] = useState<string>(CITIES[0].id);
    const [filterType, setFilterType] = useState<string>('All');

    const selectedCity = CITIES.find(c => c.id === selectedCityId) || CITIES[0];

    const filteredRoutes = filterType === 'All'
        ? selectedCity.routes
        : selectedCity.routes.filter(r => r.type === filterType);

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    const isApiKeyValid = apiKey && apiKey !== 'your_api_key_here' && apiKey.trim() !== '';

    return (
        <div>
            <div style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h2 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Route Analysis</h2>
                    <p style={{ color: '#a0a0a0' }}>Deep dive into route performance and efficiency</p>
                </div>

                <div style={{ display: 'flex', gap: '15px' }}>
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
                            cursor: 'pointer'
                        }}
                    >
                        {CITIES.map(city => (
                            <option key={city.id} value={city.id}>{city.name}</option>
                        ))}
                    </select>

                    <div style={{ position: 'relative' }}>
                        <Filter size={16} style={{ position: 'absolute', left: '12px', top: '12px', color: '#aaa' }} />
                        <select
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                            style={{
                                padding: '10px 20px 10px 35px',
                                backgroundColor: '#1e1e1e',
                                color: '#fff',
                                border: '1px solid #333',
                                borderRadius: '8px',
                                outline: 'none',
                                cursor: 'pointer'
                            }}
                        >
                            <option value="All">All Types</option>
                            <option value="Metro">Metro</option>
                            <option value="Bus">Bus</option>
                            <option value="Rail">Rail</option>
                        </select>
                    </div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
                {filteredRoutes.map((route) => (
                    <div key={route.routeId} className="bg-card" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                                <div>
                                    <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        {route.routeName}
                                        <span style={{ fontSize: '0.8rem', padding: '2px 8px', borderRadius: '4px', background: '#333', color: '#ccc' }}>{route.type}</span>
                                    </h3>
                                    <p style={{ color: '#888', fontSize: '0.9rem' }}>ID: {route.routeId}</p>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{
                                        color: route.status === 'On Time' ? 'var(--color-success)' : 'var(--color-danger)',
                                        fontWeight: 'bold'
                                    }}>
                                        {route.status}
                                    </div>
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginTop: '10px', marginBottom: '20px' }}>
                                <div style={{ background: '#252525', padding: '10px', borderRadius: '8px' }}>
                                    <div style={{ color: '#888', fontSize: '0.8rem', marginBottom: '5px' }}>Avg Delay</div>
                                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <Clock size={16} color="var(--color-warning)" />
                                        {route.avgDelay} min
                                    </div>
                                </div>
                                <div style={{ background: '#252525', padding: '10px', borderRadius: '8px' }}>
                                    <div style={{ color: '#888', fontSize: '0.8rem', marginBottom: '5px' }}>Congestion</div>
                                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <AlertTriangle size={16} color={route.congestionLevel === 'Severe' ? 'red' : 'orange'} />
                                        {route.congestionLevel}
                                    </div>
                                </div>
                                <div style={{ background: '#252525', padding: '10px', borderRadius: '8px' }}>
                                    <div style={{ color: '#888', fontSize: '0.8rem', marginBottom: '5px' }}>Carbon Saved</div>
                                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <TrendingUp size={16} color="var(--color-success)" />
                                        {route.carbonSaved.toLocaleString()} kg
                                    </div>
                                </div>
                            </div>

                            {/* Render Map if path exists and API Key is valid */}
                            {route.path ? (
                                <div style={{ flex: 1, minHeight: '250px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #333' }}>
                                    {isApiKeyValid ? (
                                        <LoadScript googleMapsApiKey={apiKey}>
                                            <RouteMap path={route.path} />
                                        </LoadScript>
                                    ) : (
                                        <MapFallback />
                                    )}
                                </div>
                            ) : (
                                <div style={{ flex: 1, minHeight: '200px', borderRadius: '8px', background: '#252525', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666' }}>
                                    <div style={{ textAlign: 'center' }}>
                                        <MapPin size={32} style={{ marginBottom: '10px', opacity: 0.5 }} />
                                        <p>Route tracing not available</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                            <RidershipChart data={route.ridership} label="24h Load" />
                            <div style={{ marginTop: '20px', padding: '15px', background: '#252525', borderRadius: '12px', flex: 1 }}>
                                <h4 style={{ color: '#aaa', marginBottom: '10px' }}>Route Insights & Predictions</h4>
                                <p style={{ fontSize: '0.9rem', color: '#ccc', lineHeight: '1.5' }}>
                                    Peak ridership typically occurs during morning (8-10 AM) and evening (5-8 PM).
                                    {route.prediction && (
                                        <span style={{ display: 'block', marginTop: '8px', color: 'var(--color-primary-green)' }}>
                                            <strong>AI Prediction:</strong> Next hour load approx. {route.prediction.nextHour.toLocaleString()} ({route.prediction.trend} trend, {route.prediction.confidence}% confidence).
                                        </span>
                                    )}
                                    {route.congestionLevel === 'Severe' && <span style={{ color: '#FF5252' }}> High congestion detected, suggesting need for frequency increase.</span>}
                                    {route.status === 'On Time' && <span style={{ color: '#4CAF50' }}> Current service levels are optimal.</span>}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}

                {filteredRoutes.length === 0 && (
                    <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>
                        No routes found for this filter.
                    </div>
                )}
            </div>
        </div>
    );
}
