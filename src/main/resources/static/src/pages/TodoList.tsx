import React, { useState } from 'react';
import useTodos from '../hooks/useTodos';
import styles from '../styles/TodoList.module.css';

const TodoList: React.FC = () => {
    const { todos, loading, error, addTodo, deleteTodo, updateTodo } = useTodos();
    const [newTodo, setNewTodo] = useState<string>('');
    const [showInput, setShowInput] = useState<boolean>(false);  // Estado para mostrar el input de creación de nuevo ToDo

    const handleAddTodo = () => {
        if (newTodo.trim()) {
            addTodo(newTodo);
            setNewTodo('');
            setShowInput(false); // Ocultar el input después de agregar el ToDo
        }
    };

    return (
        <div className={styles.container}>
            <h2>{todos.length === 0 ? 'To-Do' : 'Lista de ToDos'}</h2>

            {/* Mostrar mensaje cuando no hay ToDos */}
            {todos.length === 0 ? (
                <>
                    {/* Condicional para ocultar los textos si se ha hecho clic en el botón */}
                    {!showInput && (
                        <>
                            <p>You don't have any todo created at the moment.</p>
                            <p>
                                If you want to create a Todo,{' '}
                                <button
                                    className={styles.createTodoButton}
                                    onClick={() => setShowInput(true)}  // Muestra el input de creación de nuevo todo
                                >
                                    click here
                                </button>
                            </p>
                        </>
                    )}

                    {/* Input para agregar un nuevo ToDo */}
                    {showInput && (
                        <div className={styles.inputContainer}>
                            <input
                                type="text"
                                placeholder="Nuevo ToDo"
                                value={newTodo}
                                onChange={(e) => setNewTodo(e.target.value)}
                            />
                            <button onClick={handleAddTodo}>Agregar</button>
                        </div>
                    )}
                </>
            ) : (
                // Mostrar los ToDos si existen
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

            {/* Mostrar estado de carga o error */}
            {loading && <p>Cargando ToDos...</p>}
            {error && <p>{error}</p>}
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
