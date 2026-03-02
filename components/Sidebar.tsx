'use client';

import React from 'react';
import { LayoutDashboard, Map, BarChart2, Bell, Settings, Truck } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
    const pathname = usePathname();

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
            backgroundColor: '#1a1a1a',
            color: '#fff',
            display: 'flex',
            flexDirection: 'column',
            borderRight: '1px solid #333',
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
                                color: pathname === item.path ? 'var(--color-secondary-yellow)' : '#aaa',
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

            <div style={{ padding: '20px', borderTop: '1px solid #333' }}>
                <div style={{ display: 'flex', gap: '10px', color: '#aaa' }}>
                    <Settings size={20} />
                    <span>Settings</span>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
