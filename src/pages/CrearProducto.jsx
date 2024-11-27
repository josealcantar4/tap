import React, { useState } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const CrearProducto = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    imagen: null,
    imagenBase64: "",
    estado: "Disponible",
    seccion: "Tendencias",
    precio: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          [name]: file,
          imagenBase64: reader.result, // Convertir a base64
        });
      };
      reader.readAsDataURL(file);
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const db = getFirestore();

      await addDoc(collection(db, "productos"), {
        nombre: formData.nombre,
        imagenBase64: formData.imagenBase64,
        estado: formData.estado,
        seccion: formData.seccion,
        precio: parseFloat(formData.precio),
      });

      alert("Producto registrado exitosamente.");
      navigate("/productos");
    } catch (err) {
      console.error("Error al registrar el producto:", err.message);
    }
  };

  return (
    <div className="container">
      <h2>Registrar Producto</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="nombre" className="form-label">
              Nombre del producto
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
          <div className="col-md-6 mb-3">
            <label htmlFor="imagen" className="form-label">
              Imagen del producto
            </label>
            <input
              type="file"
              className="form-control"
              id="imagen"
              name="imagen"
              onChange={handleInputChange}
              accept="image/*"
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="estado" className="form-label">
              Estado
            </label>
            <select
              className="form-control"
              id="estado"
              name="estado"
              value={formData.estado}
              onChange={handleInputChange}
            >
              <option value="Disponible">Disponible</option>
              <option value="No activo">No activo</option>
            </select>
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="seccion" className="form-label">
              Sección
            </label>
            <select
              className="form-control"
              id="seccion"
              name="seccion"
              value={formData.seccion}
              onChange={handleInputChange}
            >
              <option value="Tendencias">Tendencias</option>
              <option value="Pastelería">Pastelería</option>
              <option value="Panadería">Panadería</option>
            </select>
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="precio" className="form-label">
              Precio
            </label>
            <input
              type="number"
              step="0.01"
              className="form-control"
              id="precio"
              name="precio"
              value={formData.precio}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="btn"
          style={{ backgroundColor: "#FE926A", color: "white" }}
        >
          Registrar
        </button>
      </form>
    </div>
  );
};

export default CrearProducto;
