import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Menu(){
    return(
        <div className="d-flex justify-content-center mt-4">
                {/*Opción 1: Restricción de placas y horarios */}
                <Card style={{ width: '30rem'}} className="m-2">
                    <Card.Img variant="top" src="https://st2.depositphotos.com/5266903/11888/v/450/depositphotos_118887552-stock-illustration-configure-timetable-icon.jpg" />
                    <Card.Body>
                        <Card.Title>Configurar Restricción</Card.Title>
                        <Card.Text>Ajusta los días y horarios en los que se aplica el pico y placa.</Card.Text>
                        <Button as={Link} to="/config" style={{ backgroundColor: '#335BB2', width: '100%' }}>Ir a Configuración</Button>
                    </Card.Body>
                </Card>
                {/*Opción 2: Verificación de circulación */}
                <Card style={{ width: '30rem' }} className="m-2">
                    <Card.Img variant="top" src="https://cdn-icons-png.flaticon.com/512/290/290163.png" />
                    <Card.Body>
                        <Card.Title>Verificar Placa</Card.Title>
                        <Card.Text>Comprueba si una placa puede circular en el horario actual.</Card.Text>
                        <Button as={Link} to="/check" style={{ backgroundColor: '#335BB2', width: '100%' }}>Ir a Verificación</Button>
                        
                    </Card.Body>
                </Card>
            </div>
    );
}

export default Menu;