import React from 'react';

function EditPost(props) {
  return (
    <div className="card gedf-card">
      <div className="card-header">Editar Publicacion</div>
      <div className="card-body">
        <form onSubmit={(event) => {props.handleSubmitEditPost(props.id)}}>
          <div className="form-group">
            <label className="sr-only">Publicacion</label>
            <input className="form-control" type="text" ref={props.setRefTitle} placeholder="Titulo de la publicacion" />
            <textarea className="form-control" ref={props.setRefDescription} rows="3" placeholder="Que hay de nuevo?"></textarea>
          </div>
          <div className="btn-group">
            <button className="btn btn-primary" type="submit">Editar</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditPost;
