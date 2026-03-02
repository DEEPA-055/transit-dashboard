import React, { useState } from 'react';
import { ArrowUp, ArrowDown, Info } from 'lucide-react';

export interface StatTag {
    label: string;
    onClick?: () => void;
    color?: string;
}

export interface StatDetail {
    label: string;
    value: string | number;
    icon?: React.ElementType;
    tags?: StatTag[];
}

interface StatCardProps {
    title: string;
    value: string | number;
    change?: number;
    icon?: React.ElementType;
    color?: string;
    details?: StatDetail[];
    calculationBasis?: string;
    pulse?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({
    title,
    value,
    change,
    icon: Icon,
    color = 'var(--color-primary-green)',
    details,
    calculationBasis,
    pulse = false
}) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="bg-card"
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                position: 'relative',
                cursor: details ? 'pointer' : 'default',
                transition: 'all 0.3s ease',
                transform: isHovered && details ? 'translateY(-5px)' : 'none',
                borderColor: isHovered && details ? color : '#333',
                zIndex: isHovered ? 10 : 1
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>{title}</span>
                {Icon && (
                    <div className={pulse ? 'pulse-icon' : ''}>
                        <Icon size={20} color={color} />
                    </div>
                )}
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{value}</div>

            {change !== undefined && (
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '0.8rem',
                    color: change >= 0 ? 'var(--color-success)' : 'var(--color-danger)'
                }}>
                    {change >= 0 ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
                    <span style={{ marginLeft: '4px' }}>{Math.abs(change)}% vs last month</span>
                </div>
            )}

            {/* Details Dropdown/Overlay */}
            {details && isHovered && (
                <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    backgroundColor: 'var(--color-background-card)',
                    border: '1px solid #444',
                    borderRadius: '0 0 12px 12px',
                    padding: '15px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                    marginTop: '-5px',
                    animation: 'fadeIn 0.2s ease-out'
                }}>
                    <div style={{ borderTop: '1px solid #333', paddingTop: '10px', marginBottom: '10px' }}>
                        <h4 style={{ fontSize: '0.8rem', color: '#888', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Breakdown</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {details.map((detail, index) => (
                                <div key={index} style={{ borderBottom: index !== details.length - 1 ? '1px solid #222' : 'none', paddingBottom: index !== details.length - 1 ? '8px' : '0' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: detail.tags ? '6px' : '0' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ccc', fontSize: '0.85rem' }}>
                                            {detail.icon && <detail.icon size={14} />}
                                            {detail.label}
                                        </div>
                                        <span style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>{detail.value}</span>
                                    </div>
                                    {detail.tags && (
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                                            {detail.tags.map((tag, tIndex) => (
                                                <button
                                                    key={tIndex}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        tag.onClick?.();
                                                    }}
                                                    style={{
                                                        padding: '2px 8px',
                                                        borderRadius: '10px',
                                                        fontSize: '0.7rem',
                                                        backgroundColor: 'rgba(255,255,255,0.05)',
                                                        color: tag.color || '#888',
                                                        border: '1px solid #444',
                                                        cursor: tag.onClick ? 'pointer' : 'default',
                                                        transition: 'all 0.2s'
                                                    }}
                                                    onMouseOver={(e) => tag.onClick && (e.currentTarget.style.borderColor = tag.color || '#666')}
                                                    onMouseOut={(e) => tag.onClick && (e.currentTarget.style.borderColor = '#444')}
                                                >
                                                    {tag.label}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                    {calculationBasis && (
                        <div style={{
                            marginTop: '10px',
                            padding: '8px',
                            background: 'rgba(255,255,255,0.05)',
                            borderRadius: '6px',
                            display: 'flex',
                            gap: '8px',
                            alignItems: 'flex-start'
                        }}>
                            <Info size={14} style={{ marginTop: '2px', color: '#666' }} />
                            <p style={{ fontSize: '0.75rem', color: '#888', lineHeight: '1.4' }}>
                                <strong>Logic:</strong> {calculationBasis}
                            </p>
                        </div>
                    )}
                </div>
            )}

            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes pulse {
                    0% { transform: scale(1); opacity: 1; }
                    50% { transform: scale(1.2); opacity: 0.7; }
                    100% { transform: scale(1); opacity: 1; }
                }
                .pulse-icon {
                    animation: pulse 2s infinite ease-in-out;
                }
            `}</style>
        </div>
    );
};

export default StatCard;
