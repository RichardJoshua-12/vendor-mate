// src/components/common/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-dark bg-dark px-3">
      <Link className="navbar-brand" to="/">Vendor Sourcing</Link>
      <div>
        <Link className="btn btn-outline-light me-2" to="/">Login</Link>
        <Link className="btn btn-outline-light" to="/register">Register</Link>
      </div>
    </nav>
  );
}

export default Navbar;
