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
            console.log(data.jwt)
            if (data.jwt) {
                localStorage.setItem('token', data.jwt);
                localStorage.setItem('userId', data.userId);
                return true;
            }
        } catch (error) {
            console.error("Login failed:", error);
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return { user, login, logout };
}
