import React, {useState} from "react";
import { Form, Button, Row, Col } from 'react-bootstrap';
import TimePicker from "react-bootstrap-time-picker";
import { useNavigate } from "react-router-dom";

function ConfigContent({ config, setConfig }){
    //Variables de estado
    const [localConfig, setLocalConfig] = useState(config);
    const [error, setError] = useState("");
    const [estadoDia, setEstadoDia] = useState("");

    //Variable de navegación
    const navigate = useNavigate();
  
    // Manejo del handle para hacer cambios del número de placa por día
    const cambiarNumeroPlaca = (event, day) => {
        const { value } = event.target
        setLocalConfig(prevConfig => ({
        ...prevConfig,
        days: {
            ...prevConfig.days,
            [day]: value // Mantener el valor como cadena de texto mientras se edita
        }
        }));
    };

    // Convierte los valores a números cuando el campo pierde el foco
    const handleBlur = (day) => {
        setLocalConfig(prevConfig => ({
        ...prevConfig,
        days: {
            ...prevConfig.days,
            //Verifica si el valor obtenido se convierte en un array o un valor único
            [day]: typeof prevConfig.days[day] === 'string' 
                ? prevConfig.days[day].split(',').map(Number)
                : prevConfig.days[day]
        }
        }));
    };

    // Manejo del cambio de tiempo
    const handleTimeChange = (name) => (value) => {
        setEstadoDia(name);
        //Transformación del tiempo a valor entero
        const formattedValue = new Date(value * 1000).toISOString().substr(11, 8);
        const startTime1 = localConfig.startTime1 ? parseInt(localConfig.startTime1.replace(/:/g, ''), 10) : 0;
        const endTime1 = localConfig.endTime1 ? parseInt(localConfig.endTime1.replace(/:/g, ''), 10) : 0;
        const startTime2 = localConfig.startTime2 ? parseInt(localConfig.startTime2.replace(/:/g, ''), 10) : 0;
        const endTime2 = localConfig.endTime2 ? parseInt(localConfig.endTime2.replace(/:/g, ''), 10) : 0;
        const newValue = parseInt(formattedValue.replace(/:/g, ''), 10);

        //Verifica si la hora fin es mayor a la hora inicio
        if ((name === 'endTime1' && newValue <= startTime1) || (name === 'endTime2' && newValue <= startTime2)) {
            setError("La hora de fin debe ser mayor que la hora de inicio.");
        }
        //Verifica si la hora inicio es menor a la hora fin
        else if((name === 'startTime1' && endTime1 && newValue >= endTime1) || (name === 'startTime2' && endTime2 && newValue >= endTime2)){
            setError("La hora de inicio debe ser menor que la hora de fin.");
        } 
        else {
            setError(""); // Limpiar el mensaje de error si no hay problemas
            setLocalConfig(prevConfig => ({
                ...prevConfig,
                [name]: formattedValue
            }));
        }
    };
  
    //Manejo del handle al momento de actualizar información
    const updateRestriccion = (event) => {
      event.preventDefault();
      setConfig(localConfig);
      navigate("/");
    };

    return(
        <Row className="justify-content-center mt-2">
                <Col sm={8}>
                    <Form onSubmit={updateRestriccion}>
                        {/*Sección del día */}
                        <h3><Form.Label>Día</Form.Label></h3>
                        <Row className="mb-3" style={{border:'1px solid black',paddingBottom:'1rem', paddingTop:'1rem'}}>
                            {Object.keys(localConfig.days).map(day => (
                                <Form.Group key={day} controlId={`form${day}`}>
                                    <Row>
                                        <Col>
                                            <Form.Label className="label">{day}:</Form.Label>
                                        </Col>
                                        <Col>
                                            <Form.Control className="text-center text_input" type="text" value={Array.isArray(localConfig.days[day]) ? localConfig.days[day].join(', ') : localConfig.days[day]} onChange={(e) => cambiarNumeroPlaca(e, day)} onBlur={() => handleBlur(day)}/>
                                        </Col>
                                    </Row>
                                </Form.Group>    
                            ))}
                        </Row>
                        
                        {/*Sección de la hora de la mañana */}
                        <h3><Form.Label>Mañana</Form.Label></h3>
                        <Row className="mb-3" style={{border:'1px solid black', paddingBottom:'1rem', paddingTop:'1rem'}}>
                            <Col>
                                <Form.Group controlId="formStartTime1">
                                    <Form.Label className="label">Hora de inicio:</Form.Label>
                                    <TimePicker className="text-center text_input" start="05:00" end="12:00" step={30} format={24} value={localConfig.startTime1} onChange={handleTimeChange('startTime1')}/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="formEndTime1">
                                    <Form.Label className="label">Hora de fin:</Form.Label>
                                    <TimePicker className="text-center text_input" start="05:00" end="12:00" step={30} format={24} value={localConfig.endTime1} onChange={handleTimeChange('endTime1')}/>
                                </Form.Group>
                            </Col>
                        </Row>

                        {error && (estadoDia === 'startTime1' || estadoDia === 'endTime1') && <p style={{ color: 'red' }}>{error}</p>}
                        
                        {/*Sección de la hora de la tarde */}
                        <h3><Form.Label>Tarde</Form.Label></h3>
                        <Row className="mb-3" style={{border:'1px solid black',paddingBottom:'1rem', paddingTop:'1rem'}}>
                            <Col>
                                <Form.Group controlId="formStartTime2">
                                    <Form.Label className="label">Hora de inicio:</Form.Label>
                                    <TimePicker className="text-center text_input" start="12:00" end="24:00" step={30} format={24} value={localConfig.startTime2} onChange={handleTimeChange('startTime2')}/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="formEndTime2">
                                    <Form.Label className="label">Hora de fin:</Form.Label>
                                    <TimePicker className="text-center text_input" start="12:00" end="24:00" step={30} format={24} value={localConfig.endTime2} onChange={handleTimeChange('endTime2')}/>
                                </Form.Group>
                            </Col>
                        </Row>
                        {error && (estadoDia === 'startTime2' || estadoDia === 'endTime2') && <p style={{ color: 'red' }}>{error}</p>}
                        <Button type="submit" style={{ backgroundColor: '#335BB2', width: '100%' }}>Guardar Configuración</Button>
                    </Form>
                </Col>
            </Row>
    );
}

export default ConfigContent;