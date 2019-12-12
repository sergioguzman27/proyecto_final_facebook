import React from 'react';

function NewComment(props) {
  return (
    <form onSubmit={(event) => { props.handleClickComment(props.id) }}>
      <div className="form-group">
        <input ref={props.setRefComment} type="text" className="form-control" id={props.id}
        onChange={props.handleInputsChange} name={`comment${props.id}`}
          placeholder="Ingrese su comentario" />
        {/* <textarea ref={props.setRefComment} className="form-control"
          rows="2" placeholder="Ingrese su comentario"></textarea> */}
        <button className="btn btn-primary mt-2" type="submit">Publicar</button>
      </div>
    </form>

  )
}

export default NewComment;
