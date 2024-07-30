import React from "react";
import { Container, Card } from 'react-bootstrap';
import PlacaContent from "../Components/PlacaContent";

function CheckPlaca({ config }) {
    return (
        <Container className="mt-4">
            {/* Título */}
            <div className='text-center encabezado2'>
                <h2 className="title2">Consulta Pico y Placa</h2>
            </div>
            {/* Imagen */}
            <div className="d-flex justify-content-center mt-4">
                <Card style={{ width: '30rem'}} className="m-2">
                        <Card.Img variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSwVRklKdYjZvi4cMqzhgO5nIJ5irY2374bg&s" />
                </Card>
            </div>
            {/* Contenido */}
            <PlacaContent config={config}/>
        </Container>
    );
}

export default CheckPlaca;
