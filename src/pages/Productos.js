import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [filtro, setFiltro] = useState("Todos");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductos = async () => {
      const querySnapshot = await getDocs(collection(db, "productos"));
      const productosArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProductos(productosArray);
    };

    fetchProductos();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "productos", id));
      setProductos(productos.filter((producto) => producto.id !== id));
      alert("Producto eliminado con éxito");
    } catch (err) {
      console.error("Error al eliminar el producto:", err);
    }
  };

  const handleEdit = (id) => {
    navigate(`/editar-producto/${id}`);
  };

  const productosFiltrados =
    filtro === "Todos"
      ? productos
      : productos.filter((producto) => producto.seccion === filtro);

  return (
    <div className="container my-4">
      <h2 className="text-center">Productos</h2>
      <div className="mb-3">
        <label htmlFor="filtro" className="form-label">
          Filtrar por sección
        </label>
        <select
          id="filtro"
          className="form-control"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        >
          <option value="Todos">Todos los registros</option>
          <option value="Tendencias">Tendencias</option>
          <option value="Pastelería">Pastelería</option>
          <option value="Panadería">Panadería</option>
        </select>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Sección</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productosFiltrados.map((producto) => (
            <tr key={producto.id}>
              <td>
                {producto.imagenBase64 ? (
                  <img
                    src={producto.imagenBase64} // Usar imagenBase64 almacenada en la base de datos
                    alt={producto.nombre}
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                      borderRadius: "4px", // Opcional: bordes redondeados
                    }}
                  />
                ) : (
                  <span>Sin imagen</span>
                )}
              </td>
              <td>{producto.nombre}</td>
              <td>${producto.precio}</td>
              <td>{producto.seccion}</td>
              <td>
                <button
                  className="btn btn-sm me-2"
                  style={{ backgroundColor: "#1E1D39", color: "white" }}
                  onClick={() => handleEdit(producto.id)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-sm"
                  style={{ backgroundColor: "#FFD058", color: "black" }}
                  onClick={() => {
                    if (
                      window.confirm(
                        "¿Estás seguro de que deseas eliminar este producto?"
                      )
                    ) {
                      handleDelete(producto.id);
                    }
                  }}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Productos;
