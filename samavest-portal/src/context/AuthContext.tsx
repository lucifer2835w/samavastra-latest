import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { User } from '../types';

// TEMPORARY: Auth bypassed — all users are auto-authenticated
const MOCK_USER: User = {
    id: 'demo-user-001',
    email: 'admin@samavest.com',
    firstName: 'Demo',
    lastName: 'User',
    roles: ['ADMIN', 'STAFF'],
    isActive: true,
} as any;

interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user] = useState<User | null>(MOCK_USER);
    const [token] = useState<string | null>('demo-token');
    const [isLoading] = useState(false);

    const login = async (_email: string, _password: string) => {
        // No-op: already authenticated
    };

    const logout = () => {
        // No-op in demo mode
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                login,
                logout,
                isAuthenticated: true,
                isLoading: false,
            }}
        >
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
