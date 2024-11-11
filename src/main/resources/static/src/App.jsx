import React from 'react';
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import TodoList from './pages/TodoList';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/todos" element={<TodoList />} />
                {/* Ruta de inicio que redirige al login por defecto */}
                <Route path="/" element={<Login />} />
            </Routes>
        </Router>
    );
}

export default App;
