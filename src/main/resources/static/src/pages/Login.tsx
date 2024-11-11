import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import useAuth from '../hooks/useAuth';
import { Link } from 'react-router-dom'; // Importa Link para la navegación
import styles from '../styles/Login.module.css';

export default function Login() {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Usar useNavigate para la redirección

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const success = await login(email, password);
        if (success) {
            // Si el login es exitoso, redirigir a TodoList
            navigate('/todos'); // Redirige a la página de TodoList
        } else {
            // Si el login falla, puedes mostrar un mensaje o manejar el error
            alert("Login failed. Please check your credentials.");
        }
    };

    return (
        <div className={styles.loginContainer}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className={styles.inputGroup}>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className={styles.loginButton}>Login</button>
            </form>
            <p className={styles.registerLink}>
                Don't have an account?{' '}
                <Link to="/register" className={styles.link}>Register here</Link>
            </p>
        </div>
    );
}
