import React, { useEffect, useState } from 'react';
import API from '../services/api';

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [form, setForm] = useState({ nombre: '', email: '' });
  const [editId, setEditId] = useState(null);

  const cargarUsuarios = async () => {
    const res = await API.get('/usuarios');
    setUsuarios(res.data);
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editId) {
      // Modo editar
      await API.put(`/usuarios/${editId}`, form);
      setEditId(null);
    } else {
      // Modo crear
      await API.post('/usuarios', form);
    }

    setForm({ nombre: '', email: '' });
    cargarUsuarios();
  };

  const editarUsuario = (usuario) => {
    setForm({ nombre: usuario.nombre, email: usuario.email });
    setEditId(usuario._id);
  };

  const eliminarUsuario = async (id) => {
    await API.delete(`/usuarios/${id}`);
    cargarUsuarios();
  };

  return (
    <div className="container mt-5">
      <h2>Gestión de Usuarios</h2>

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
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="form-control mb-2"
        />

        <button className="btn btn-primary">
          {editId ? "Actualizar Usuario" : "Agregar Usuario"}
        </button>
      </form>

      <ul className="list-group">
        {usuarios.map((u) => (
          <li key={u._id} className="list-group-item d-flex justify-content-between">
            {u.nombre} - {u.email}

            <div>
              <button
                onClick={() => editarUsuario(u)}
                className="btn btn-warning btn-sm me-2"
              >
                Editar
              </button>

              <button
                onClick={() => eliminarUsuario(u._id)}
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

export default Usuarios;


