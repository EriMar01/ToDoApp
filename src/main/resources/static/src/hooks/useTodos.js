import { useEffect, useState } from 'react';
import axios from 'axios';

// Cambiar la URL base para incluir el userId dinámicamente
const apiUrl = 'http://localhost:8081/api/todos/user/';

const useTodos = (userId) => {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Obtener todos los ToDos para un usuario específico
    useEffect(() => {
        if (!userId) return;  // No hacer la petición si no hay userId

        const fetchTodos = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${apiUrl}1`);
                setTodos(response.data);  // Asumimos que la respuesta es una lista de ToDos
            } catch (err) {
                setError('Error al obtener los ToDos');
            } finally {
                setLoading(false);
            }
        };

        fetchTodos();
    }, [userId]); // Volver a ejecutar la solicitud si el userId cambia

    // Agregar un nuevo ToDo
    const addTodo = async (title) => {
        if (!title.trim()) return;
        try {
            const response = await axios.post(`${apiUrl}${userId}`, { title });
            setTodos([...todos, response.data]);
        } catch (err) {
            setError('Error al agregar el ToDo');
        }
    };

    // Eliminar un ToDo
    const deleteTodo = async (id) => {
        try {
            await axios.delete(`${apiUrl}${userId}/${id}`);
            setTodos(todos.filter(todo => todo.id !== id));
        } catch (err) {
            setError('Error al eliminar el ToDo');
        }
    };

    // Actualizar un ToDo
    const updateTodo = async (id, updatedTitle) => {
        if (!updatedTitle.trim()) return;
        try {
            const response = await axios.put(`${apiUrl}${userId}/${id}`, { title: updatedTitle });
            setTodos(todos.map(todo => (todo.id === id ? response.data : todo)));
        } catch (err) {
            setError('Error al actualizar el ToDo');
        }
    };

    return { todos, loading, error, addTodo, deleteTodo, updateTodo };
};

export default useTodos;
