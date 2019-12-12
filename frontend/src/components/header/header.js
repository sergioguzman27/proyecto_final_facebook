import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

function Header(props) {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand light" href="#">Facebook</a>
        <div className="collapse navbar-collapse" itemID="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" exact to="/" activeClassName="is-selected">
                Home
                  </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/profile" activeClassName="is-selected">
                Perfil
                  </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/comments" activeClassName="is-selected">
                Registro de actividad
                  </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/users" activeClassName="is-selected">
                Ver usuarios
                  </NavLink>
            </li>
          </ul>
        </div>
        <button className="btn btn-outline-danger my-2 my-sm-0" onClick={props.handleLogout}>Logout</button>
      </nav>
    </header >
  )

}

export default Header;
