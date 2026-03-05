'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { LogIn, Mail, Lock, Loader2 } from 'lucide-react';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const { login, loading } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            await login(email, password, rememberMe);
        } catch (err: any) {
            if (err.message === 'user not found please sign up') {
                setShowAlert(true);
            } else {
                setError(err.message || 'Failed to login');
            }
        } finally {
            setPassword('');
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'var(--color-background-dark)',
            padding: '20px',
            position: 'relative'
        }}>
            {/* Custom Alert Modal */}
            {showAlert && (
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 100,
                    backdropFilter: 'blur(4px)'
                }}>
                    <div style={{
                        width: '90%',
                        maxWidth: '400px',
                        backgroundColor: 'var(--color-background-card)',
                        borderRadius: '20px',
                        padding: '30px',
                        border: '1px solid var(--color-danger)',
                        boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                        textAlign: 'center',
                        animation: 'modalFadeIn 0.3s ease-out'
                    }}>
                        <div style={{
                            width: '60px',
                            height: '60px',
                            backgroundColor: 'rgba(211, 47, 47, 0.1)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 20px',
                            color: 'var(--color-danger)'
                        }}>
                            <Mail size={30} />
                        </div>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '10px', color: 'var(--color-text-primary)' }}>Account Not Found</h2>
                        <p style={{ color: 'var(--color-text-secondary)', marginBottom: '25px', lineHeight: '1.5' }}>
                            We couldn't find an account with that email address. Would you like to create one now?
                        </p>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button
                                onClick={() => setShowAlert(false)}
                                style={{
                                    flex: 1,
                                    padding: '12px',
                                    borderRadius: '10px',
                                    border: '1px solid var(--color-border)',
                                    backgroundColor: 'transparent',
                                    color: 'var(--color-text-primary)',
                                    fontWeight: 'bold',
                                    cursor: 'pointer'
                                }}
                            >
                                Try Again
                            </button>
                            <Link href="/signup" style={{ flex: 1 }}>
                                <button
                                    style={{
                                        width: '100%',
                                        padding: '12px',
                                        borderRadius: '10px',
                                        border: 'none',
                                        backgroundColor: 'var(--color-primary-green)',
                                        color: 'white',
                                        fontWeight: 'bold',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Sign Up
                                </button>
                            </Link>
                        </div>
                    </div>
                    <style>{`
                        @keyframes modalFadeIn {
                            from { transform: scale(0.9); opacity: 0; }
                            to { transform: scale(1); opacity: 1; }
                        }
                    `}</style>
                </div>
            )}

            <div style={{
                width: '100%',
                maxWidth: '450px',
                padding: '2.5rem',
                backgroundColor: 'var(--color-background-card)',
                borderRadius: '16px',
                border: '1px solid var(--color-border)',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
                zIndex: 10
            }}>
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '12px',
                        marginBottom: '1rem'
                    }}>
                        <div style={{ width: '40px', height: '40px', background: 'var(--color-primary-green)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <LogIn color="white" size={24} />
                        </div>
                        <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>
                            Transit<span style={{ color: 'var(--color-secondary-yellow)' }}>Flow</span>
                        </h1>
                    </div>
                    <p style={{ color: 'var(--color-text-secondary)' }}>Welcome back. Please login to your account.</p>
                </div>

                {error && (
                    <div style={{
                        padding: '12px',
                        backgroundColor: 'rgba(211, 47, 47, 0.1)',
                        color: 'var(--color-danger)',
                        borderRadius: '8px',
                        marginBottom: '1.5rem',
                        border: '1px solid var(--color-danger)',
                        fontSize: '0.9rem',
                        textAlign: 'center'
                    }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>Email Address</label>
                        <div style={{ position: 'relative' }}>
                            <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#666' }} />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@example.com"
                                style={{
                                    width: '100%',
                                    padding: '12px 12px 12px 40px',
                                    backgroundColor: '#161616',
                                    border: '1px solid #333',
                                    borderRadius: '10px',
                                    color: 'white',
                                    outline: 'none',
                                    fontSize: '1rem'
                                }}
                            />
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>Password</label>
                        <div style={{ position: 'relative' }}>
                            <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#666' }} />
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                style={{
                                    width: '100%',
                                    padding: '12px 12px 12px 40px',
                                    backgroundColor: '#161616',
                                    border: '1px solid #333',
                                    borderRadius: '10px',
                                    color: 'white',
                                    outline: 'none',
                                    fontSize: '1rem'
                                }}
                            />
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '-0.5rem' }}>
                        <input
                            type="checkbox"
                            id="rememberMe"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            style={{
                                width: '16px',
                                height: '16px',
                                accentColor: 'var(--color-primary-green)',
                                cursor: 'pointer'
                            }}
                        />
                        <label htmlFor="rememberMe" style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', cursor: 'pointer' }}>
                            Remember me for 30 days
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            padding: '12px',
                            backgroundColor: 'var(--color-primary-green)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '10px',
                            fontSize: '1rem',
                            fontWeight: 'bold',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '10px',
                            marginTop: '0.5rem',
                            transition: 'background-color 0.2s'
                        }}
                    >
                        {loading ? <Loader2 className="animate-spin" size={20} /> : 'Sign In'}
                    </button>
                </form>

                <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
                    Don't have an account?{' '}
                    <Link href="/signup" style={{ color: 'var(--color-secondary-yellow)', fontWeight: 'bold' }}>
                        Create one
                    </Link>
                </div>
            </div>
        </div>
    );
}
