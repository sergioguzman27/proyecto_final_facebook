import React from 'react';

function Users(props) {
  return (
    <div className="container">
      <table className="table table-sm my-4">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre de usuario</th>
            <th scope="col">Nombre</th>
            <th scope="col">Apellido</th>
            <th scope="col">Email</th>
            <th scope="col">Telefono</th>
          </tr>
        </thead>
        <tbody>
          {
            props.results &&
            props.results.map((item) => {
              return (
                <tr key={item.id} >
                  <th scope="row">{item.id}</th>
                  <td>{item.username}</td>
                  <td>{item.first_name}</td>
                  <td>{item.last_name}</td>
                  <td>{item.email}</td>
                  <td>{item.phone_number}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
      {
        props.results &&
        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center">
            {
              props.previous == null ?
                <li className="page-item disabled">
                  <a className="page-link" aria-disabled="true">Anterior</a>
                </li>
                :
                <li className="page-item">
                  <a className="page-link" onClick={props.handlePrevious}>Anterior</a>
                </li>
            }
            {
              props.next == null ?
                <li className="page-item disabled">
                  <a className="page-link" onClick={props.handleNext} aria-disabled="true">Siguiente</a>
                </li>
                :
                <li className="page-item">
                  <a className="page-link" onClick={props.handleNext}>Siguiente</a>
                </li>
            }

          </ul>
        </nav>
      }
    </div>
  )
}

export default Users;
