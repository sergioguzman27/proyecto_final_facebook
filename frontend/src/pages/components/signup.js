import React from 'react';
import './css/signup.css';

function Signup(props) {
  return (
    <div className="container container-signup">
      <div className="card bg-light my-5">
        <article className="card-body mx-auto card-signup">
          <h4 className="card-title mt-3 text-center">Crear una cuenta</h4>
          <form onSubmit={props.handleSignup}>
            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text"> <i className="fa fa-user"></i> </span>
              </div>
              <input className="form-control" placeholder="Nombre" type="text"
              name="first_name" onChange={props.handleInputsChange}/>
            </div>
            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text"> <i className="fa fa-user"></i> </span>
              </div>
              <input className="form-control" placeholder="Apellido" type="text"
              name="last_name" onChange={props.handleInputsChange}/>
            </div>
            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text"> <i className="fa fa-envelope"></i> </span>
              </div>
              <input className="form-control" placeholder="Email" type="email"
              name="email" onChange={props.handleInputsChange}/>
            </div>
            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text"> <i className="fa fa-vcard"></i> </span>
              </div>
              <input className="form-control" placeholder="Nombre de usuario" type="text"
              name="username" onChange={props.handleInputsChange}/>
            </div>
            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text"> <i className="fa fa-phone"></i> </span>
              </div>
              <input className="form-control" placeholder="Numero de telefono" type="text"
              name="phone_number" onChange={props.handleInputsChange}/>
            </div>
            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text"> <i className="fa fa-lock"></i> </span>
              </div>
              <input className="form-control" placeholder="Password" type="password"
              name="password" onChange={props.handleInputsChange}/>
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary btn-block"> Crear Cuenta </button>
            </div>
            <p className="text-center">Tienes una cuenta? <a href="#" onClick={props.handleClick}>Login</a></p>
          </form>
        </article>
      </div>
    </div>
  )
}

export default Signup;
