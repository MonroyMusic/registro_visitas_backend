import React from 'react'
import mapboxgl from 'mapbox-gl'; 
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

mapboxgl.accessToken = 'pk.eyJ1IjoibW9ucm95bXVzaWM3IiwiYSI6ImNsdnN4ZjU3MTE2M3YybG1nZWF1MXd2aGMifQ.EF6-p5iVvjsepYsneON4kQ';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)


