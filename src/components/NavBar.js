import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Navbar = () => {
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const fetchUserEmail = () => {
      const user = auth.currentUser;

      if (user) {
        setUserEmail(user.email || "Usuario desconocido");
      }
    };

    fetchUserEmail();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      window.location.href = "/login";
    } catch (error) {
      console.error("Error al cerrar sesión: ", error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "#FE926A" }}>
      <div className="container-fluid">
        <div className="navbar-brand">
          <img
            src="/favicon.ico"
            alt="Icono"
            width="50"
            height="50"
            className="d-inline-block align-text-top"
          />
          <span
            className="ms-3 fs-4 fs-sm-5 fs-md-6 fs-lg-7"
            style={{
              fontWeight: "bold",
              color: "#171A4C",
              wordWrap: "break-word",
              whiteSpace: "normal",
            }}
          >
            Bienvenido, {userEmail}
          </span>
        </div>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/productos">
                Listado de Productos
              </Link>
            </li>
            <li className="nav-item">
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleLogout}
                style={{ backgroundColor: "#916B65" }}
              >
                Cerrar sesión
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>

  );
};

export default Navbar;
