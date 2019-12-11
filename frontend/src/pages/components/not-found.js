import React, { PureComponent } from 'react';

class NotFound extends PureComponent {
  render() {
    return (
      <div className="container">
        <h1 className="text-center">404</h1>
        <h3 className="text-center">:(</h3>
        <h2 className="text-center">No hemos encontrado la página que buscabas</h2>
      </div>
    )
  }
}

export default NotFound;
