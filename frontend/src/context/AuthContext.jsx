import React, { createContext, useState, useContext, useEffect } from 'react';
import { setAuthToken } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check for saved user on load
        const storedUser = localStorage.getItem('vocalcampus_user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            setAuthToken(parsedUser.token);
        }
        setLoading(false);
    }, []);

    const login = (userData) => {
        setUser(userData);
        setAuthToken(userData.token);
        localStorage.setItem('vocalcampus_user', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        setAuthToken(null);
        localStorage.removeItem('vocalcampus_user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
