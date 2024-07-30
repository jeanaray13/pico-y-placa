import React from "react";
import { Container } from 'react-bootstrap';
import ConfigContent from "../Components/ConfigContent";

function ConfigForm({ config, setConfig }) {
  
    return (
        <Container className="mt-4">
            {/*Título */}
            <div className='text-center encabezado2'>
                <h2 className="title2">Configurar Pico y Placa</h2>
            </div>
            {/*Contenido */}
            <ConfigContent config={config} setConfig={setConfig}/>
        </Container>
    );
}

export default ConfigForm;