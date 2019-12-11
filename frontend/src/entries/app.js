import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from '../pages/containers/app';

const container = document.getElementById('app')

// hydrate para renderizado en el servidor

render(
  <BrowserRouter basename="/" >
    <App/>
  </BrowserRouter>
  , container);
