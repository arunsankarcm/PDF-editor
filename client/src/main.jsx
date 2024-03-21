import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import PathRoutes from './Routes.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PathRoutes />
  </React.StrictMode>,
)
