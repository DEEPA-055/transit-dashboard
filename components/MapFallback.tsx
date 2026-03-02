'use client';

import React from 'react';
import { MapPin, Info } from 'lucide-react';

interface MapFallbackProps {
    message?: string;
    description?: string;
}

const MapFallback: React.FC<MapFallbackProps> = ({
    message = "Map Visualization Unavailable",
    description = "Please configure a valid Google Maps API Key in .env.local to enable route tracing."
}) => {
    return (
        <div style={{
            width: '100%',
            height: '100%',
            minHeight: '250px',
            backgroundColor: '#1a1a1a',
            borderRadius: '12px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px dashed #444',
            padding: '20px',
            textAlign: 'center'
        }}>
            <div style={{
                backgroundColor: 'rgba(251, 192, 45, 0.1)',
                padding: '15px',
                borderRadius: '50%',
                marginBottom: '15px'
            }}>
                <MapPin size={32} color="var(--color-secondary-yellow)" />
            </div>
            <h4 style={{ color: '#fff', marginBottom: '8px', fontSize: '1.1rem' }}>{message}</h4>
            <p style={{ color: '#888', fontSize: '0.9rem', maxWidth: '300px', lineHeight: '1.4' }}>
                {description}
            </p>
            <div style={{
                marginTop: '15px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: 'var(--color-secondary-yellow)',
                fontSize: '0.8rem',
                backgroundColor: 'rgba(251, 192, 45, 0.05)',
                padding: '8px 12px',
                borderRadius: '6px'
            }}>
                <Info size={14} />
                <span>Check .env.local.example for setup guide</span>
            </div>
        </div>
    );
};

export default MapFallback;
