import React, { useState } from "react";
import { Form, Button, Alert, Row, Col } from 'react-bootstrap';

function PlacaContent({ config }){
    // Variables de estado
    const [placa, setPlaca] = useState('');
    const [hora, setHora] = useState(new Date().toLocaleTimeString('en-GB').slice(0, 5));
    const [mensaje, setMensaje] = useState('');

    // Manejo del cambio de placa haciendo que esté con mayúsqulas
    const handlePlacaChange = (event) => {
        const value = event.target.value.toUpperCase();
        const subvalue = value.substring(0, 8); //Limita a 8 caracteres
        
        //Elimina caracteres no permitidos y agrega un guión
        const formattedValue = subvalue.replace(/[^A-Z0-9]/g, '').replace(/(.{3})/, '$1-'); 
        setPlaca(formattedValue);
    };

    // Función para capitalizar la primera letra
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    // Validar placa
    const validarPlaca = () => {
        const regex = /^[A-Z]{3}-\d{4}$/;
        if (!regex.test(placa)) {
            setMensaje('Número de placa no válido.');
            return;
        }

        //Obtención de la fecha y hora configurada y en tiempo real
        const diaActual = capitalizeFirstLetter(new Date().toLocaleDateString('es-ES', { weekday: 'long' }));
        const digito = parseInt(placa.split('-')[1].slice(-1), 10);
        const { days, startTime1, startTime2, endTime1, endTime2 } = config;

        //Si la consulta es en un día laboral
        if (days[diaActual] && days[diaActual].includes(digito)) {
            //Si la hora se encuentra entre el intervalo configurado previamente
            if ((hora >= startTime1.slice(0, 5) && hora <= endTime1) || (hora >= startTime2.slice(0, 5) && hora <= endTime2)) {
                setMensaje('No puede circular.');
            } else {
                setMensaje('Puede circular.');
            }
        }
        else {
            setMensaje('Puede circular.');
        }
    };

    return(
        <Row className="justify-content-center mt-4">
            <Col sm={8}>
                <Form>
                    {/*Placa */}
                    <Form.Group controlId="formPlaca">
                        <Form.Label className="label">Ingrese la placa de su vehículo:</Form.Label>
                        <Form.Control className="text-center text_input" type="text" value={placa} onChange={handlePlacaChange} placeholder="MMM-0000" />
                    </Form.Group>
                    {/*Hora Actual*/}
                    <Form.Group controlId="formHora">
                        <Form.Label className="label">Hora:</Form.Label>
                        <br></br>
                        <div className="text-center">
                            <Form.Control className="text-center text_horainput" type="time" value={hora} onChange={(e) => setHora(e.target.value)} />
                        </div> 
                    </Form.Group>

                    {mensaje && <Alert style={{textAlign:'center'}} variant={mensaje === 'Puede circular.' ? 'success' : 'danger'} className="mt-3">{mensaje}</Alert>}
                    <Button style={{ backgroundColor: '#335BB2', width: '100%' }} onClick={validarPlaca}>Verificar</Button>
                </Form>
            </Col>
        </Row>
    );
}

export default PlacaContent;