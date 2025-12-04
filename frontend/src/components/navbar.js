import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">Mi API</Link>
        <div className="navbar-nav">
          <Link className="nav-link" to="/usuarios">Usuarios</Link>
          <Link className="nav-link" to="/productos">Productos</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
