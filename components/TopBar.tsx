import React, { useState } from 'react';
import { Bell, Search, User, LogOut, ChevronDown, Sun, Moon } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';

const TopBar = () => {
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

    const notifications = [
        { id: 1, title: 'Route 401 Delay', message: 'Delayed by 15 mins due to heavy traffic at Connaught Place.', time: '5m ago', type: 'warning' },
        { id: 2, title: 'Efficiency Milestone', message: 'Delhi Metro achieved 98% efficiency today.', time: '1h ago', type: 'success' },
        { id: 3, title: 'System Update', message: 'Main server maintenance scheduled for tonight at 2 AM.', time: '3h ago', type: 'info' },
    ];

    const getUserInitials = (name: string) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
    };

    return (
        <header style={{
            height: '70px',
            borderBottom: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 30px',
            backgroundColor: 'var(--color-background-dark)',
            zIndex: 10
        }}>
            <div style={{ display: 'flex', alignItems: 'center', background: 'var(--color-input)', borderRadius: '20px', padding: '8px 16px', border: '1px solid var(--color-border)' }}>
                <Search size={18} color="var(--color-text-secondary)" />
                <input
                    type="text"
                    placeholder="Search routes, cities..."
                    style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--color-text-primary)',
                        marginLeft: '10px',
                        outline: 'none',
                        fontSize: '0.9rem'
                    }}
                />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <button
                    onClick={toggleTheme}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        color: 'var(--color-text-secondary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '8px',
                        borderRadius: '50%',
                        transition: 'background 0.2s',
                        outline: 'none'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(128, 128, 128, 0.1)'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                    {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                </button>

                <div style={{ position: 'relative' }}>
                    <div
                        onClick={() => {
                            setIsNotificationsOpen(!isNotificationsOpen);
                            setIsProfileOpen(false);
                        }}
                        style={{
                            cursor: 'pointer',
                            padding: '8px',
                            borderRadius: '50%',
                            backgroundColor: isNotificationsOpen ? 'rgba(128, 128, 128, 0.1)' : 'transparent',
                            transition: 'background 0.2s'
                        }}
                    >
                        <Bell size={20} color="var(--color-text-secondary)" />
                        <span style={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            width: '8px',
                            height: '8px',
                            backgroundColor: 'var(--color-secondary-yellow)',
                            borderRadius: '50%',
                            border: '2px solid var(--color-background-dark)'
                        }}></span>
                    </div>

                    {isNotificationsOpen && (
                        <div style={{
                            position: 'absolute',
                            top: '120%',
                            right: 0,
                            width: '320px',
                            backgroundColor: 'var(--color-background-card)',
                            border: '1px solid var(--color-border)',
                            borderRadius: '12px',
                            boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
                            padding: '15px 0',
                            zIndex: 20
                        }}>
                            <div style={{ padding: '0 20px 10px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontWeight: 'bold' }}>Notifications</span>
                                <span style={{ fontSize: '0.75rem', color: 'var(--color-primary-green)', cursor: 'pointer' }}>Mark all as read</span>
                            </div>
                            <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                                {notifications.map(notif => (
                                    <div key={notif.id} style={{
                                        padding: '15px 20px',
                                        borderBottom: '1px solid var(--color-border)',
                                        cursor: 'pointer',
                                        transition: 'background 0.2s'
                                    }}
                                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(128, 128, 128, 0.05)'}
                                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                                            <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>{notif.title}</span>
                                            <span style={{ fontSize: '0.7rem', color: 'var(--color-text-secondary)' }}>{notif.time}</span>
                                        </div>
                                        <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', margin: 0, lineHeight: '1.4' }}>{notif.message}</p>
                                    </div>
                                ))}
                            </div>
                            <div style={{ padding: '10px 20px 0', textAlign: 'center' }}>
                                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', cursor: 'pointer' }}>View all notifications</span>
                            </div>
                        </div>
                    )}
                </div>

                <div style={{ position: 'relative' }}>
                    <div
                        onClick={() => {
                            setIsProfileOpen(!isProfileOpen);
                            setIsNotificationsOpen(false);
                        }}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            cursor: 'pointer',
                            padding: '5px 10px',
                            borderRadius: '8px',
                            transition: 'background 0.2s',
                            background: isProfileOpen ? 'rgba(128, 128, 128, 0.1)' : 'transparent'
                        }}
                    >
                        <div style={{
                            width: '35px',
                            height: '35px',
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, var(--color-primary-green), #43A047)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.8rem',
                            fontWeight: 'bold',
                            color: '#fff',
                            boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                        }}>
                            {user ? getUserInitials(user.name) : <User size={20} color="#fff" />}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>{user?.name || 'Guest'}</span>
                            <span style={{ fontSize: '0.7rem', color: 'var(--color-text-secondary)' }}>Administrator</span>
                        </div>
                        <ChevronDown size={14} color="var(--color-text-secondary)" style={{ transform: isProfileOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
                    </div>

                    {isProfileOpen && (
                        <div style={{
                            position: 'absolute',
                            top: '120%',
                            right: 0,
                            width: '200px',
                            backgroundColor: 'var(--color-background-card)',
                            border: '1px solid var(--color-border)',
                            borderRadius: '12px',
                            boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
                            padding: '8px',
                            zIndex: 20
                        }}>
                            <div style={{ padding: '10px', borderBottom: '1px solid var(--color-border)', marginBottom: '5px' }}>
                                <div style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>{user?.name}</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>{user?.email}</div>
                            </div>
                            <button
                                onClick={logout}
                                style={{
                                    width: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    padding: '10px',
                                    backgroundColor: 'transparent',
                                    border: 'none',
                                    color: 'var(--color-danger)',
                                    fontSize: '0.9rem',
                                    cursor: 'pointer',
                                    borderRadius: '6px',
                                    transition: 'background 0.2s'
                                }}
                                onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(211, 47, 47, 0.1)'}
                                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                            >
                                <LogOut size={18} />
                                Sign Out
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default TopBar;
