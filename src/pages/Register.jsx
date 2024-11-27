import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom"; // Importa useNavigate

const Register = () => {
  const [formData, setFormData] = useState({
    numeroEmpleado: "",
    nombre: "",
    apellidos: "",
    telefono: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Inicializa el hook

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.passwordConfirmation) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    try {
      const auth = getAuth();
      await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      alert("Usuario registrado exitosamente.");
      navigate("/productos"); // Redirige a /productos
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container">
      <h2>Registrar Usuario</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="numeroEmpleado" className="form-label">
              Número de empleado
            </label>
            <input
              type="text"
              className="form-control"
              id="numeroEmpleado"
              name="numeroEmpleado"
              value={formData.numeroEmpleado}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="nombre" className="form-label">
              Nombre
            </label>
            <input
              type="text"
              className="form-control"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="apellidos" className="form-label">
              Apellidos
            </label>
            <input
              type="text"
              className="form-control"
              id="apellidos"
              name="apellidos"
              value={formData.apellidos}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="telefono" className="form-label">
              Teléfono
            </label>
            <input
              type="text"
              className="form-control"
              id="telefono"
              name="telefono"
              value={formData.telefono}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="email" className="form-label">
              Correo electrónico
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="password" className="form-label">
              Contraseña
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="passwordConfirmation" className="form-label">
              Confirmar contraseña
            </label>
            <input
              type="password"
              className="form-control"
              id="passwordConfirmation"
              name="passwordConfirmation"
              value={formData.passwordConfirmation}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <button
            type="submit"
            className="btn"
            style={{ backgroundColor: "#FE926A", color: "white" }}
          >
            Registrar
          </button>
        </div>

        <a
          href="/login"
          className="btn btn-link"
          style={{ color: "#FE926A", display: "block", textAlign: "center", marginTop: "10px" }}
        >
          Iniciar Sesión
        </a>
      </form>
    </div>
  );
};

export default Register;
