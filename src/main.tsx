import React from 'react';
import ReactDOM from 'react-dom/client';
import 'leaflet/dist/leaflet.css'; // <-- CSS de Leaflet
import App from './App.tsx';
import './index.css'; // <-- Estilos con Tailwind

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
