import React, { useState } from "react";
import API from "../services/api";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      alert("✅ Inicio de sesión exitoso");
      window.location.href = "/usuarios"; // redirige a usuarios
    } catch (err) {
      setError("❌ Credenciales incorrectas");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Iniciar sesión</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="form-control mb-2"
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
          className="form-control mb-2"
        />
        <button className="btn btn-primary w-100">Entrar</button>
      </form>
    </div>
  );
}

export default Login;
