'use client';

import React, { useState } from 'react';
import { CITIES } from '@/data/transitData';
import { Bus, Calculator, CheckCircle, ArrowRight, Activity } from 'lucide-react';

export default function PlanningPage() {
    const [selectedCityId, setSelectedCityId] = useState<string>(CITIES[0].id);
    const [vehicleType, setVehicleType] = useState<string>('Bus');
    const [quantity, setQuantity] = useState<number>(10);

    const selectedCity = CITIES.find(c => c.id === selectedCityId) || CITIES[0];

    const simulationResult = React.useMemo(() => {
        // Real-world capacity data 2024-2025
        const capacityPerVehicle = vehicleType === 'Bus' ? 55 : vehicleType === 'Metro' ? 320 : 1200; // Bus / Metro Coach / 8-Car Trainset
        const totalNewCapacity = quantity * capacityPerVehicle * 12; // Assuming 12 efficient turns per day

        // Dynamic cost calculation based on actual 2024 contracts (Alstom, BEML, Tata Motors)
        // Bus: ₹1.2Cr (Blended Electric/Diesel), Metro: ₹10.5Cr per coach, Rail: ₹115Cr per 16-car rake (~₹7.2Cr/coach)
        const baseCostPerUnit = vehicleType === 'Bus' ? 1.2 : vehicleType === 'Metro' ? 10.5 : 7.2;
        const cityMultiplier = selectedCity.metrics.costMultiplier || 1.0;

        // Land acquisition and civil works component (significant for rail/metro)
        const infrastructurePremium = vehicleType === 'Bus' ? 1.05 : 2.4;
        const totalCost = (quantity * baseCostPerUnit * cityMultiplier * infrastructurePremium).toFixed(2);

        // Improvement calc - Non-linear wait time reduction model
        const currentWaitTime = selectedCity.metrics.avgWaitTime;
        const supplyIncrease = (quantity * capacityPerVehicle) / selectedCity.metrics.totalRiders;
        const newWaitTime = Math.max(2.0, currentWaitTime * (1 - (supplyIncrease * 0.85)));

        return {
            addedCapacity: totalNewCapacity,
            cost: totalCost,
            oldWait: currentWaitTime,
            newWait: newWaitTime.toFixed(1),
            pollutionReduction: totalNewCapacity * 0.22 // kg CO2 saved per pax-km
        };
    }, [vehicleType, quantity, selectedCity]);

    return (
        <div>
            <div style={{ marginBottom: '30px' }}>
                <h2 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Resource Planning</h2>
                <p style={{ color: '#a0a0a0' }}>Simulate fleet expansion and estimate impact</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>

                {/* Configuration Panel */}
                <div className="bg-card">
                    <h3 style={{ marginBottom: '20px', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Calculator size={20} /> Scenario Builder
                    </h3>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', color: '#ccc' }}>Select City</label>
                            <select
                                value={selectedCityId}
                                onChange={(e) => setSelectedCityId(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    backgroundColor: '#252525',
                                    color: '#fff',
                                    border: '1px solid #444',
                                    borderRadius: '8px',
                                    outline: 'none'
                                }}
                            >
                                {CITIES.map(city => (
                                    <option key={city.id} value={city.id}>{city.name}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', color: '#ccc' }}>Vehicle Type</label>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                {['Bus', 'Metro', 'Rail'].map(type => (
                                    <button
                                        key={type}
                                        onClick={() => setVehicleType(type)}
                                        style={{
                                            flex: 1,
                                            padding: '10px',
                                            borderRadius: '8px',
                                            border: '1px solid',
                                            borderColor: vehicleType === type ? 'var(--color-primary-green)' : '#444',
                                            background: vehicleType === type ? 'rgba(46, 125, 50, 0.2)' : 'transparent',
                                            color: vehicleType === type ? 'var(--color-primary-green)' : '#888',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', color: '#ccc' }}>Quantity to Add : <span style={{ color: '#fff', fontWeight: 'bold' }}>{quantity}</span></label>
                            <input
                                type="range"
                                min="1"
                                max="100"
                                value={quantity}
                                onChange={(e) => setQuantity(parseInt(e.target.value))}
                                style={{ width: '100%', accentColor: 'var(--color-secondary-yellow)' }}
                            />
                        </div>

                        <div style={{
                            marginTop: '10px',
                            padding: '15px',
                            backgroundColor: 'rgba(46, 125, 50, 0.1)',
                            color: 'var(--color-primary-green)',
                            borderRadius: '8px',
                            fontSize: '0.9rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '10px',
                            border: '1px solid rgba(46, 125, 50, 0.2)'
                        }}>
                            Live Simulation Active <Activity size={16} />
                        </div>
                    </div>
                </div>

                {/* Results Panel */}
                <div className="bg-card" style={{ opacity: simulationResult ? 1 : 0.5, transition: 'opacity 0.3s' }}>
                    <h3 style={{ marginBottom: '20px', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <CheckCircle size={20} color={simulationResult ? 'var(--color-success)' : '#666'} />
                        Projected Impact
                    </h3>

                    {!simulationResult ? (
                        <div style={{ height: '70%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666' }}>
                            Run a simulation to see results
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div style={{ padding: '15px', background: 'rgba(251, 192, 45, 0.1)', borderRadius: '8px', borderLeft: '4px solid var(--color-secondary-yellow)' }}>
                                <div style={{ fontSize: '0.9rem', color: '#ccc' }}>Estimated Investment</div>
                                <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--color-secondary-yellow)' }}>₹ {simulationResult.cost} Cr</div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                                <div style={{ padding: '15px', background: '#252525', borderRadius: '8px' }}>
                                    <div style={{ fontSize: '0.8rem', color: '#888' }}>Daily Capacity Increase</div>
                                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>+{simulationResult.addedCapacity.toLocaleString()} Pax</div>
                                </div>
                                <div style={{ padding: '15px', background: '#252525', borderRadius: '8px' }}>
                                    <div style={{ fontSize: '0.8rem', color: '#888' }}>Wait Time Reduction</div>
                                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--color-success)' }}>
                                        {simulationResult.oldWait} min ➔ {simulationResult.newWait} min
                                    </div>
                                </div>
                            </div>

                            <div style={{ padding: '10px', textAlign: 'center', color: '#666', fontSize: '0.8rem', marginTop: 'auto' }}>
                                *Estimates based on standard transit models. Actual results may vary.
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
