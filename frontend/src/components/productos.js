import React, { useEffect, useState } from 'react';
import API from '../services/api';

function Productos() {
  const [productos, setProductos] = useState([]);
  const [form, setForm] = useState({ nombre: '', precio: 0 });
  const [editId, setEditId] = useState(null);

  const cargarProductos = async () => {
    const res = await API.get('/productos');
    setProductos(res.data);
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editId) {
      await API.put(`/productos/${editId}`, form);
      setEditId(null);
    } else {
      await API.post('/productos', form);
    }

    setForm({ nombre: '', precio: 0 });
    cargarProductos();
  };

  const editarProducto = (p) => {
    setForm({ nombre: p.nombre, precio: p.precio });
    setEditId(p._id);
  };

  const eliminarProducto = async (id) => {
    await API.delete(`/productos/${id}`);
    cargarProductos();
  };

  return (
    <div className="container mt-5">
      <h2>Gestión de Productos</h2>

      <form onSubmit={handleSubmit} className="mb-3">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleChange}
          className="form-control mb-2"
        />

        <input
          type="number"
          name="precio"
          placeholder="Precio"
          value={form.precio}
          onChange={handleChange}
          className="form-control mb-2"
        />

        <button className="btn btn-primary">
          {editId ? "Actualizar Producto" : "Agregar Producto"}
        </button>
      </form>

      <ul className="list-group">
        {productos.map((p) => (
          <li key={p._id} className="list-group-item d-flex justify-content-between">
            {p.nombre} - ${p.precio}

            <div>
              <button
                onClick={() => editarProducto(p)}
                className="btn btn-warning btn-sm me-2"
              >
                Editar
              </button>

              <button
                onClick={() => eliminarProducto(p._id)}
                className="btn btn-danger btn-sm"
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Productos;

