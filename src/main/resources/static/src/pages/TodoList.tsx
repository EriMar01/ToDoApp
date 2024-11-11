// pages/TodoList.tsx

import React, { useState } from 'react';
import useTodos from '../hooks/useTodos';
import styles from '../styles/TodoList.module.css';

const TodoList: React.FC = () => {
    const { todos, loading, error, addTodo, deleteTodo, updateTodo } = useTodos();
    const [newTodo, setNewTodo] = useState<string>('');

    const handleAddTodo = () => {
        if (newTodo.trim()) {
            addTodo(newTodo);
            setNewTodo('');
        }
    };

    return (
        <div className={styles.container}>
            <h2>Lista de ToDos</h2>

            <div className={styles.inputContainer}>
                <input
                    type="text"
                    placeholder="Nuevo ToDo"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                />
                <button onClick={handleAddTodo}>Agregar</button>
            </div>

            {loading ? (
                <p>Cargando ToDos...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <ul className={styles.todoList}>
                    {todos.map(todo => (
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            onDelete={deleteTodo}
                            onUpdate={updateTodo}
                        />
                    ))}
                </ul>
            )}
        </div>
    );
};

interface TodoItemProps {
    todo: { id: string; title: string };
    onDelete: (id: string) => void;
    onUpdate: (id: string, updatedTitle: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onDelete, onUpdate }) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [updatedTitle, setUpdatedTitle] = useState<string>(todo.title);

    return (
        <li className={styles.todoItem}>
            {isEditing ? (
                <input
                    type="text"
                    value={updatedTitle}
                    onChange={(e) => setUpdatedTitle(e.target.value)}
                />
            ) : (
                <span>{todo.title}</span>
            )}

            <button onClick={() => setIsEditing(!isEditing)}>
                {isEditing ? 'Guardar' : 'Editar'}
            </button>

            <button onClick={() => onDelete(todo.id)}>Eliminar</button>

            {isEditing && (
                <button
                    onClick={() => {
                        onUpdate(todo.id, updatedTitle);
                        setIsEditing(false);
                    }}
                >
                    Actualizar
                </button>
            )}
        </li>
    );
};

export default TodoList;
