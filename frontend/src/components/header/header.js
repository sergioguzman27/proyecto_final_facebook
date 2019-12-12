import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

function Header(props) {
  let token = localStorage.getItem('token');
  console.log('token', localStorage.getItem('token'))
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand light" href="#">Facebook</a>
        <div className="collapse navbar-collapse" itemID="navbarNavDropdown">
          {
            token != null || token != 'null' ?
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
              :
              <ul className="navbar-nav">
                <li className="nav-item">
                  <NavLink className="nav-link" exact to="/login" activeClassName="is-selected">
                    Login
                  </NavLink>
                </li>
              </ul>

          }
        </div>
        {
          token != null ?
            <button className="btn btn-outline-danger my-2 my-sm-0" onClick={props.handleLogout}>Logout</button>
            :
            <p>dfdfdf</p>
        }
      </nav>
    </header >
  )
}

export default Header;
