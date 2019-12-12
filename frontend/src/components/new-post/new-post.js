import React from 'react';

function NewPost(props) {
  return (
    <div className="card gedf-card">
      <div className="card-header">Nueva Publicacion</div>
      <div className="card-body">
        <form onSubmit={props.handleClickPost}>
          <div className="form-group">
            <label className="sr-only">Publicacion</label>
            <input className="form-control mb-2" type="text" ref={props.setRefTitle} placeholder="Titulo de la publicacion" />
            <textarea className="form-control" ref={props.setRefDescription} rows="3" placeholder="Que hay de nuevo?"></textarea>
          </div>
          <div className="btn-group">
            <button className="btn btn-primary" type="submit">Publicar</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NewPost;
