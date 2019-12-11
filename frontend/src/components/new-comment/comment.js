import React from 'react';

function NewComment(props) {
  return (
    <div className="form-group">
      <textarea className="form-control" rows="2" placeholder="Ingrese su comentario"></textarea>
      <button className="btn btn-primary mt-2">Publicar</button>
    </div>
  )
}

export default NewComment;
