import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import { environment } from '../config/environment';

const api = axios.create({
    baseURL: environment.apiUrl,
});

// Interceptor para agregar el token en el header de cada solicitud si está presente
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('todo_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Hook personalizado para manejar las tareas (todos)
export const useTodos = (userId) => {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Función para obtener las tareas desde la API
    const fetchTodos = useCallback(async () => {
        try {
            setLoading(true);
            const { data } = await api.get('/api/todos');
            setTodos(data.data.todos);
            setError(null);
        } catch (err) {
            setError('No se pudieron obtener las tareas');
        } finally {
            setLoading(false);
        }
    }, []);

    // Función para crear una nueva tarea
    const createTodo = useCallback(async (todo) => {
        try {
            const { data } = await api.post('/api/todos', todo);
            setTodos((prev) => [...prev, data.data.todo]);
            return data.data.todo;
        } catch (err) {
            throw new Error('No se pudo crear la tarea');
        }
    }, []);

    // Llamada a fetchTodos al cambiar el userId
    useEffect(() => {
        if (userId) {
            fetchTodos();
        }
    }, [userId, fetchTodos]);

    return {
        todos,
        loading,
        error,
        createTodo,
        refreshTodos: fetchTodos,
    };
};
