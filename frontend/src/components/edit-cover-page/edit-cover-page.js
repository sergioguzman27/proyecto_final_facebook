import React from 'react';

function EditCoverPage(props) {
  return (
    <div className="card border-info my-3">
      <div className="card-header">
        <div className="row">
          <div className="col-md-12">
            <form onSubmit={props.handleSubmitEdit}>
              <div className="form-group input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text"> <i className="fa fa-user"></i> </span>
                </div>
                <input className="form-control" placeholder="Nombre" type="text"
                  ref={props.setRefFirstName} />
              </div>
              <div className="form-group input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text"> <i className="fa fa-user"></i> </span>
                </div>
                <input className="form-control" placeholder="Apellido" type="text"
                  ref={props.setRefLastName} onChange={props.handleInputsChange} />
              </div>
              <div className="form-group input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text"> <i className="fa fa-vcard"></i> </span>
                </div>
                <input className="form-control" placeholder="Nombre de usuario" type="text"
                  ref={props.setRefUsername} onChange={props.handleInputsChange} />
              </div>
              <div className="form-group input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text"> <i className="fa fa-phone"></i> </span>
                </div>
                <input className="form-control" placeholder="Numero de telefono" type="text"
                  ref={props.setRefPhoneNumber} onChange={props.handleInputsChange} />
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-primary btn-block">Editar Perfil</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditCoverPage;
