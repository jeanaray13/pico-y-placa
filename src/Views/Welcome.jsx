import React from "react";
import { Container } from 'react-bootstrap';
import Menu from "../Components/Menu";

function Welcome(){
    return(
        <Container className="mt-5 text-center">
            {/*Título */}
            <div className='text-center encabezado'>
                <h1 className="title">Bienvenido al Sistema de Pico y Placa</h1>
            </div>
            {/*Contenido*/}
            <Menu/>
        </Container>
    );
}

export default Welcome;