import React from 'react';
import './cover-page.css';

function CoverPage(props) {
  return (

    <div className="card border-info my-3">
      <div className="card-header">
        <div className="row">
          <div className="col-md-8">
            <h3>{props.first_name}</h3>
            <h3>{props.last_name}</h3>
            <p><strong>username: </strong>{props.username}</p>
            <p><strong>correo: </strong> {props.email}</p>
            <p><strong>Telefono: </strong> {props.phone_number == '' ? 'No existe': props.phone_number}</p>
          </div>
          <div className="col-md-4">
            <img src="../../../assets/user.png" alt=""
              className="img-thumbnail float-right img-profile" />
          </div>
        </div>
        <div className="row divider text-center">
          <div className="col emphasis">
            <h2><strong>{props.total_posts}</strong></h2>
            <p><small>Total de Posts</small></p>
          </div>
          <div className="col emphasis">
            <h2><strong>{props.total_reactions}</strong></h2>
            <p><small>Promedio de reacciones</small></p>
            <button className="btn btn-info btn-block" onClick={props.handleClickEdit} >
              <span className="fa fa-pencil"></span> Editar perfil 
            </button>
          </div>
          <div className="col emphasis">
            <h2><strong>{props.total_comments}</strong></h2>
            <p><small>Promedio de comentarios</small></p>
            <button className="btn btn-danger btn-block" onClick={props.handleClickDeteleProfile} >
              <span className="fa fa-minus-square-o"></span> Eliminar cuenta 
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CoverPage;
