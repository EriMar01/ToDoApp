import { useState } from 'react';

export default function useAuth() {
    const [user, setUser] = useState(null);

    const login = async (email, password) => {
        try {
            const response = await fetch('http://localhost:8081/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (data.token) {
                localStorage.setItem('token', data.token);
                setUser(data.user);
            }
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return { user, login, logout };
}
