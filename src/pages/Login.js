// src/pages/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase"; // Apuntando correctamente al archivo firebase
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/productos");
    } catch (err) {
      setError("Error al iniciar sesión. Verifique sus credenciales.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh", flexDirection: "column", gap: "20px" }}>
      <p id="no-internet-message" className="text-center" style={{ fontSize: "1.2rem", fontWeight: "500", color: "#333", maxWidth: "600px", padding: "15px", backgroundColor: "#f9f9f9", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
        Es necesario mantener la conexión a internet para realizar las operaciones de administrador. Es recomendable utilizar Chrome como navegador para evitar cualquier tipo de problema.
      </p>

      <div className="w-100" style={{ maxWidth: "400px" }}>
        <h2 className="text-center">Iniciar sesión</h2>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Correo electrónico</label>
            <input 
              type="email" 
              className="form-control form-control-sm w-100" 
              id="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input 
              type="password" 
              className="form-control form-control-sm w-100" 
              id="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="btn" style={{ backgroundColor: "#FE926A", color: "white", width: "100%" }}>
            Iniciar sesión
          </button>
          <a 
            href="/register" 
            className="btn btn-link" 
            style={{ color: "#FE926A", display: "block", textAlign: "center", marginTop: "10px" }}
          >
            Registrarse
          </a>
        </form>
      </div>
    </div>
  );
};

export default Login;
