import React from 'react';

function Login(props) {
  return (
    <div className="container mt-5">
      <div className="card border-primary mb-3 mx-5">
        <div className="card-header">Login</div>
        <div className="card-body text-primary">
          <form onSubmit={props.handleSubmit}>
            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text"> <i className="fa fa-user"></i> </span>
              </div>
              <input ref={props.setRefEmail} type="email" className="form-control" id="email"
              placeholder="Ingrese su email" />
            </div>
            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text"> <i className="fa fa-lock"></i> </span>
              </div>
              <input ref={props.setRefPassword} type="password" className="form-control"
              id="password" placeholder="Password" />
            </div>
            <button type="submit" className="btn btn-primary btn-block">Ingresar</button>
            <p className="text-center">No tienes una cuenta? <a href="#" onClick={props.handleClickSignup}>Signup</a></p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login;
