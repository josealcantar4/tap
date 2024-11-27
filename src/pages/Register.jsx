import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, addDoc, Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

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
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const navigate = useNavigate();
  const db = getFirestore();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.numeroEmpleado || !formData.nombre || !formData.apellidos || !formData.telefono || !formData.email || !formData.password || !formData.passwordConfirmation) {
      setError("Todos los campos son obligatorios.");
      return;
    }
    if (formData.password !== formData.passwordConfirmation) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    try {
      const auth = getAuth();
      await createUserWithEmailAndPassword(auth, formData.email, formData.password);

      const userRef = collection(db, "usuarios");
      await addDoc(userRef, {
        numeroEmpleado: formData.numeroEmpleado,
        nombre: formData.nombre,
        apellidos: formData.apellidos,
        telefono: formData.telefono,
        email: formData.email,
        fechaCreacion: Timestamp.fromDate(new Date()),
      });

      setModalMessage("Usuario registrado exitosamente.");
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
        navigate("/productos");
      }, 2000);
    } catch (err) {
      let errorMessage = "Error en el registro.";
      if (err.code === "auth/email-already-in-use") {
        errorMessage = "El correo electrónico ya está registrado.";
      } else if (err.code === "auth/weak-password") {
        errorMessage = "La contraseña debe tener al menos 6 caracteres.";
      } else if (err.code === "auth/invalid-email") {
        errorMessage = "El correo electrónico no es válido.";
      } else {
        errorMessage = "Hubo un error desconocido, por favor intenta nuevamente.";
      }
      setModalMessage(errorMessage);
      setShowModal(true);
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

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Registro</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Register;
