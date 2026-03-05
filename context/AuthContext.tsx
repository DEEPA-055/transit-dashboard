'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface User {
    id: string;
    name: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    login: (email: string, password: string, rememberMe: boolean) => Promise<void>;
    signup: (name: string, email: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Check for existing session in localStorage or sessionStorage
        const storedUser = localStorage.getItem('transit_user') || sessionStorage.getItem('transit_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email: string, password: string, rememberMe: boolean) => {
        setLoading(true);
        const normalizedEmail = email.trim().toLowerCase();
        try {
            await new Promise(resolve => setTimeout(resolve, 800));

            const storedUsersStr = localStorage.getItem('registered_users');
            const storedUsers = storedUsersStr ? JSON.parse(storedUsersStr) : [];

            const userExists = storedUsers.find((u: any) => u.email.trim().toLowerCase() === normalizedEmail);

            if (!userExists) {
                throw new Error('user not found please sign up');
            }

            const foundUser = storedUsers.find((u: any) =>
                u.email.trim().toLowerCase() === normalizedEmail && u.password === password
            );

            if (foundUser) {
                const userData = { id: foundUser.id, name: foundUser.name, email: foundUser.email };

                // Save session first
                if (rememberMe) {
                    localStorage.setItem('transit_user', JSON.stringify(userData));
                } else {
                    sessionStorage.setItem('transit_user', JSON.stringify(userData));
                }

                // Then update state
                setUser(userData);
            } else {
                throw new Error('Incorrect password. Please try again.');
            }
        } catch (err: any) {
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const signup = async (name: string, email: string, password: string) => {
        setLoading(true);
        const normalizedEmail = email.trim().toLowerCase();
        try {
            await new Promise(resolve => setTimeout(resolve, 800));

            const storedUsersStr = localStorage.getItem('registered_users');
            const storedUsers = storedUsersStr ? JSON.parse(storedUsersStr) : [];

            if (storedUsers.some((u: any) => u.email.trim().toLowerCase() === normalizedEmail)) {
                throw new Error('Email already registered');
            }

            const newUser = {
                id: Date.now().toString(),
                name: name.trim(),
                email: normalizedEmail,
                password
            };
            storedUsers.push(newUser);
            localStorage.setItem('registered_users', JSON.stringify(storedUsers));

            const userData = { id: newUser.id, name: newUser.name, email: newUser.email };
            sessionStorage.setItem('transit_user', JSON.stringify(userData));
            setUser(userData);
        } catch (err: any) {
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('transit_user');
        sessionStorage.removeItem('transit_user');
        router.push('/login');
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, loading, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
