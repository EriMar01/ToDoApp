import { useEffect, useState } from 'react';
import axios from 'axios';

// Cambiar la URL base para incluir el userId dinámicamente
const apiUrl = 'http://localhost:8081/api/todos/user/';
const apiUrlAdd ='http://localhost:8081/api/todos';

const useTodos = (userId) => {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Obtener todos los ToDos para un usuario específico
    useEffect(() => {
        const fetchTodos = async () => {
            setLoading(true);
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userId');
            try {
                const response = await axios.get(`${apiUrl}${userId}`,{
                    headers: {
                        'Authorization': token ? `Bearer ${token}` : '',
                    },
                });
                // Validar la estructura de la respuesta
                if (Array.isArray(response.data)) {
                    setTodos(response.data);
                } else {
                    console.error('La respuesta no es un arreglo:', response.data);
                    setTodos([]);  // Establecer un arreglo vacío si la respuesta no es válida
                }
            } catch (err) {
                setError('Error al obtener los ToDos');
            } finally {
                setLoading(false);
            }
        };

        fetchTodos();
    }, [userId]); // Volver a ejecutar la solicitud si el userId cambia

    // Agregar un nuevo ToDo
    const addTodo = async (title, description) => {
        if (!title.trim() && !description.trim()) return;
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        try {
            const response = await axios.post(`${apiUrlAdd}`, {
                title, // Enviar el título
                description, // Enviar la descripción
                userId, // Enviar el userId
            },{
                headers: {
                    'Authorization': token ? `Bearer ${token}` : '',
                },
            });
            setTodos([...todos, response.data]);
        } catch (err) {
            console.log(err)
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
