import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Register.module.css';

export default function Register() {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState<string>('');  // Estado para manejar el error
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8081/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                // Si el registro es exitoso, redirigir a TodoList
                navigate('/todos'); // Cambiar a la ruta de tu TodoList
            } else {
                // Si la respuesta indica un error, comprobar el contenido del error
                const data = await response.json();
                if (data.message === 'Account already exists') {
                    setError('The account cannot be created because an account associated with that email already exists');
                } else {
                    setError('Registration failed. Please try again.');
                }
            }
        } catch (error) {
            console.error("Registration failed:", error);
            setError('An error occurred. Please try again.');
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleGoToLogin = () => {
        navigate('/login'); // Redirige al login
    };

    return (
        <div className={styles.registerContainer}>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div className={styles.inputGroup}>
                    <label>First Name</label>
                    <input
                        type="text"
                        name="firstname"
                        value={formData.firstname}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label>Last Name</label>
                    <input
                        type="text"
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className={styles.registerButton}>Register</button>
            </form>

            {error && <p className={styles.errorMessage}>{error}</p>}  {/* Mostrar el mensaje de error */}

            <button onClick={handleGoToLogin} className={styles.goToLoginButton}>
                Go to Login
            </button>
        </div>
    );
}
