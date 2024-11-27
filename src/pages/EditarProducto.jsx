import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";

const EditarProducto = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: "",
    imagenBase64: "",
    estado: "Disponible",
    seccion: "Tendencias",
    precio: "",
  });

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const db = getFirestore();
        const productoRef = doc(db, "productos", id);
        const productoDoc = await getDoc(productoRef);

        if (productoDoc.exists()) {
          setFormData(productoDoc.data());
        } else {
          console.log("No se encontró el producto.");
        }
      } catch (err) {
        console.error("Error al obtener el producto:", err.message);
      }
    };

    fetchProducto();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const db = getFirestore();
      const productoRef = doc(db, "productos", id);
      await updateDoc(productoRef, {
        nombre: formData.nombre,
        estado: formData.estado,
        seccion: formData.seccion,
        precio: parseFloat(formData.precio),
      });
      alert("Producto actualizado exitosamente.");
      navigate("/productos");
    } catch (err) {
      console.error("Error al actualizar el producto:", err.message);
    }
  };

  return (
    <div className="container">
      <h2>Editar Producto</h2>
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
            <label htmlFor="imagenNueva" className="form-label mt-3">
              Seleccionar nueva imagen
            </label>
            <input
              type="file"
              className="form-control"
              id="imagenNueva"
              name="imagenNueva"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setFormData({
                      ...formData,
                      imagen: file,
                      imagenBase64: reader.result, // Actualizar con la nueva imagen en base64
                    });
                  };
                  reader.readAsDataURL(file);
                }
              }}
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
          <div className="col-md-6 mb-3">
          <label htmlFor="imagen" className="form-label">
              Imagen actual
            </label>
            {formData.imagenBase64 && (
              <img
                src={formData.imagenBase64}
                alt="Producto"
                style={{
                  width: "20%",
                  marginBottom: "10px",
                  display: "block",
                }}
              />
            )}
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <button
            type="submit"
            className="btn"
            style={{ backgroundColor: "#FE926A", color: "white" }}
          >
            Actualizar
          </button>
        </div>

      </form>
    </div>
  );
};

export default EditarProducto;
