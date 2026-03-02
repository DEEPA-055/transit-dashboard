'use client';

import React from 'react';
import { Bell, Search, User } from 'lucide-react';

const TopBar = () => {
    return (
        <header style={{
            height: '70px',
            borderBottom: '1px solid #333',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 30px',
            backgroundColor: 'var(--color-background-dark)'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', background: '#1e1e1e', borderRadius: '20px', padding: '8px 16px', border: '1px solid #333' }}>
                <Search size={18} color="#666" />
                <input
                    type="text"
                    placeholder="Search routes, cities..."
                    style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#fff',
                        marginLeft: '10px',
                        outline: 'none',
                        fontSize: '0.9rem'
                    }}
                />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ position: 'relative' }}>
                    <Bell size={20} color="#a0a0a0" />
                    <span style={{
                        position: 'absolute',
                        top: -2,
                        right: -2,
                        width: '8px',
                        height: '8px',
                        backgroundColor: 'var(--color-secondary-yellow)',
                        borderRadius: '50%'
                    }}></span>
                </div>
                <div style={{ width: '35px', height: '35px', borderRadius: '50%', background: '#333', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <User size={20} color="#fff" />
                </div>
            </div>
        </header>
    );
};

export default TopBar;
