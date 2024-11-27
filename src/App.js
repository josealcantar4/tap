// src/App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/NavBar";
import { auth } from "./firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Login from "./pages/Login";
import Productos from "./pages/Productos";
import Register from "./pages/Register";
import CrearProducto from "./pages/CrearProducto";
import EditarProducto from "./pages/EditarProducto";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Revisa el estado de autenticación del usuario
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);  // Usuario autenticado
      } else {
        setIsAuthenticated(false); // Usuario no autenticado
      }
    });

    // Limpia el estado cuando el componente se desmonte
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      {/* Muestra el Navbar solo si el usuario está autenticado */}
      {isAuthenticated && <Navbar />}

      <Routes>
        <Route path="/" element={isAuthenticated ? <Productos /> : <Navigate to="/productos" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/productos" element={isAuthenticated ? <Productos /> : <Navigate to="/login" />} />
        <Route path="/crear-producto" element={isAuthenticated ? <CrearProducto /> : <Navigate to="/login" />} />
        <Route path="/editar-producto/:id" element={isAuthenticated ? <EditarProducto /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
