import React from 'react';

function CommentLog(props) {
  return (
    <li className="list-group-item" aria-disabled="true">
      <div className="d-flex w-100 justify-content-between">
        <h5 className="mb-1">{props.first_name} {props.last_name}</h5>
        <div className="dropdown">
          <button className="btn btn-link dropdown-toggle" type="button" id="gedf-drop1" data-toggle="dropdown"
            aria-haspopup="true" aria-expanded="false">
            <i className="fa fa-ellipsis-h"></i>
          </button>
          <div className="dropdown-menu dropdown-menu-right" aria-labelledby="gedf-drop1">
            <div className="h6 dropdown-header">Opciones</div>
            <a className="dropdown-item"
              onClick={(event) => { props.handleClickEdit(props.id) }}>Editar</a>
            <a className="dropdown-item"
              onClick={(event) => { props.handleClickDelete(props.id) }}>Eliminar</a>
          </div>
        </div>
      </div>
      {
        props.edit_comment && props.edit_comment_id == props.id ?
          <div>
            <form onSubmit={(event) => { props.handleSubmitEdit(props.id) }}>
              <div className="form-group">
                <textarea onChange={props.handleInputsChange} name={`comment${props.id}`} className="form-control"
                  rows="2" placeholder="Ingrese su comentario"></textarea>
                <button className="btn btn-primary mt-2" type="submit">Editar</button>
              </div>
            </form>
          </div>
          :
          <p className="mb-1">{props.comment}</p>
      }
      <small className="float-left">{props.comments_post}</small>
      <small className="float-right">{props.created}</small>
    </li>
  )
}

export default CommentLog;
