'use client';

import React from 'react';
import { LayoutDashboard, Map, BarChart2, Bell, Settings, Truck, LogOut } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const Sidebar = () => {
    const pathname = usePathname();
    const { logout } = useAuth();

    const menuItems = [
        { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
        { name: 'Route Analysis', icon: Map, path: '/routes' },
        { name: 'Planning', icon: Truck, path: '/planning' },
        { name: 'Analytics', icon: BarChart2, path: '/analytics' },
    ];

    return (
        <aside style={{
            width: '250px',
            height: '100vh',
            backgroundColor: 'var(--color-sidebar)',
            color: 'var(--color-text-primary)',
            display: 'flex',
            flexDirection: 'column',
            borderRight: '1px solid var(--color-border)',
            position: 'fixed',
            left: 0,
            top: 0,
        }}>
            <div style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '30px', height: '30px', background: 'var(--color-primary-green)', borderRadius: '50%' }}></div>
                <h1 style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                    Transit<span style={{ color: 'var(--color-secondary-yellow)' }}>Flow</span>
                </h1>
            </div>

            <nav style={{ flex: 1, marginTop: '20px' }}>
                <ul style={{ listStyle: 'none' }}>
                    {menuItems.map((item) => (
                        <li key={item.name} style={{ marginBottom: '5px' }}>
                            <Link href={item.path} style={{
                                display: 'flex',
                                alignItems: 'center',
                                padding: '12px 20px',
                                color: pathname === item.path ? 'var(--color-secondary-yellow)' : 'var(--color-text-secondary)',
                                background: pathname === item.path ? 'rgba(46, 125, 50, 0.1)' : 'transparent',
                                borderLeft: pathname === item.path ? '4px solid var(--color-primary-green)' : '4px solid transparent',
                                transition: 'all 0.3s ease',
                            }}>
                                <item.icon size={20} style={{ marginRight: '10px' }} />
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            <div style={{ padding: '20px', borderTop: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div style={{ display: 'flex', gap: '10px', color: 'var(--color-text-secondary)', cursor: 'pointer' }}>
                    <Settings size={20} />
                    <span>Settings</span>
                </div>
                <div
                    onClick={logout}
                    style={{
                        display: 'flex',
                        gap: '10px',
                        color: '#ff5252',
                        cursor: 'pointer',
                        padding: '5px 0',
                        transition: 'opacity 0.2s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.opacity = '0.8'}
                    onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
                >
                    <LogOut size={20} />
                    <span>Logout</span>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
