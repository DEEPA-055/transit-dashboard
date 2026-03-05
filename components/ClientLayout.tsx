'use client';

import React, { useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { usePathname, useRouter } from 'next/navigation';

function AuthGuard({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, loading } = useAuth();
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !isAuthenticated && pathname !== '/login' && pathname !== '/signup') {
            router.push('/login');
        }
        if (!loading && isAuthenticated && (pathname === '/login' || pathname === '/signup')) {
            router.push('/');
        }
    }, [isAuthenticated, loading, pathname, router]);

    const isAuthPage = pathname === '/login' || pathname === '/signup';

    if (loading && !isAuthPage) {
        return (
            <div style={{
                height: '100vh',
                width: '100vw',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--color-background-dark)',
                color: 'white'
            }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{
                        width: '40px',
                        height: '40px',
                        border: '3px solid rgba(46, 125, 50, 0.3)',
                        borderTop: '3px solid var(--color-primary-green)',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                        margin: '0 auto 15px'
                    }}></div>
                    <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>Loading TransitFlow...</p>
                </div>
            </div>
        );
    }

    if (isAuthPage) {
        return <>{children}</>;
    }

    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            <Sidebar />
            <div style={{ flex: 1, marginLeft: '250px', display: 'flex', flexDirection: 'column' }}>
                <TopBar />
                <main style={{ flex: 1, padding: '30px', backgroundColor: 'var(--color-background-dark)' }}>
                    {children}
                </main>
            </div>
        </div>
    );
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider>
            <AuthProvider>
                <AuthGuard>{children}</AuthGuard>
            </AuthProvider>
        </ThemeProvider>
    );
}
