import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ConfigForm from './Views/ConfigForm';
import CheckPlaca from './Views/CheckPlaca';
import Welcome from './Views/Welcome';

function App() {
  //Configuración de Pico y Placa inicial
  const [config, setConfig] = useState({
    days: {
      Lunes: [1, 2],
      Martes: [3, 4],
      Miércoles: [5, 6],
      Jueves: [7, 8],
      Viernes: [9, 0]
    },
    startTime1: '07:00:00',
    endTime1: '11:00:00',
    startTime2: '14:00:00',
    endTime2: '19:00:00'
  });

  return (
    <BrowserRouter>
      {/*Configuración de rutas*/}
      <Routes>
          <Route path="/config" element={<ConfigForm config={config} setConfig={setConfig} />} />
          <Route path="/check" element={<CheckPlaca config={config} />} />
          <Route path="/" element={<Welcome />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;