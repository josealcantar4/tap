import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { collection, getDocs, deleteDoc, doc, updateDoc, addDoc } from "firebase/firestore";
import { Modal, Button, Form } from "react-bootstrap";

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [filtro, setFiltro] = useState("Todos");
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(""); // "create" | "edit" | "delete"
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    nombre: "",
    imagenBase64: "",
    estado: "Disponible",
    seccion: "Tendencias",
    precio: "",
  });

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
      setShowModal(false);
    } catch (err) {
      console.error("Error al eliminar el producto:", err);
    }
  };

  const handleOpenModal = (type, product = null) => {
    setModalType(type);
    setSelectedProduct(product);
    if (type === "edit" && product) {
      setFormData({
        nombre: product.nombre,
        imagenBase64: product.imagenBase64 || "",
        estado: product.estado,
        seccion: product.seccion,
        precio: product.precio,
      });
    } else {
      setFormData({
        nombre: "",
        imagenBase64: "",
        estado: "Disponible",
        seccion: "Tendencias",
        precio: "",
      });
    }
    setShowModal(true);
  };

  const handleSubmit = async () => {
    try {
      if (modalType === "edit" && selectedProduct) {
        // Lógica de actualización
        const productRef = doc(db, "productos", selectedProduct.id);
        await updateDoc(productRef, { ...formData });
      } else if (modalType === "create") {
        // Lógica de creación
        await addDoc(collection(db, "productos"), { ...formData });
      }

      // Refrescar la lista de productos después de crear o editar
      const querySnapshot = await getDocs(collection(db, "productos"));
      const productosArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProductos(productosArray);

      setShowModal(false);
    } catch (err) {
      console.error("Error al procesar el formulario:", err);
    }
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
      <button
        className="btn btn-primary mb-3"
        onClick={() => handleOpenModal("create")}
      >
        Crear Producto
      </button>
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
                    src={producto.imagenBase64}
                    alt={producto.nombre}
                    style={{ width: "50px", height: "50px", objectFit: "cover" }}
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
                  className="btn btn-sm btn-primary me-2"
                  onClick={() => handleOpenModal("edit", producto)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleOpenModal("delete", producto)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalType === "create"
              ? "Crear Producto"
              : modalType === "edit"
              ? "Editar Producto"
              : "Eliminar Producto"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalType === "delete" ? (
            <p>¿Estás seguro de que deseas eliminar este producto?</p>
          ) : (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Nombre del producto</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.nombre}
                  onChange={(e) =>
                    setFormData({ ...formData, nombre: e.target.value })
                  }
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Precio</Form.Label>
                <Form.Control
                  type="number"
                  step="0.01"
                  value={formData.precio}
                  onChange={(e) =>
                    setFormData({ ...formData, precio: e.target.value })
                  }
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Sección</Form.Label>
                <Form.Select
                  value={formData.seccion}
                  onChange={(e) =>
                    setFormData({ ...formData, seccion: e.target.value })
                  }
                >
                  <option value="Tendencias">Tendencias</option>
                  <option value="Pastelería">Pastelería</option>
                  <option value="Panadería">Panadería</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Estado</Form.Label>
                <Form.Select
                  value={formData.estado}
                  onChange={(e) =>
                    setFormData({ ...formData, estado: e.target.value })
                  }
                >
                  <option value="Disponible">Disponible</option>
                  <option value="No activo">No activo</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Imagen del producto</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setFormData({
                          ...formData,
                          imagenBase64: reader.result,
                        });
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
                {formData.imagenBase64 && (
                  <div className="mt-2">
                    <img
                      src={formData.imagenBase64}
                      alt="Vista previa"
                      style={{ width: "100px", height: "100px", objectFit: "cover" }}
                    />
                  </div>
                )}
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          {modalType === "delete" ? (
            <Button
              variant="danger"
              onClick={() => handleDelete(selectedProduct.id)}
            >
              Eliminar
            </Button>
          ) : (
            <Button variant="primary" onClick={handleSubmit}>
              {modalType === "create" ? "Crear" : "Guardar"}
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Productos;
