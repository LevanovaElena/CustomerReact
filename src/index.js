import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './components/App';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Nav from "./components/Nav";

ReactDOM.render(
  <React.StrictMode>
      <Nav />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


