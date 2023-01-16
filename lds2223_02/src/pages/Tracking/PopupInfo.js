import React from 'react';
import { X } from 'react-bootstrap-icons';
import './PopupTracking.css'
import { Row, Container, Col } from 'react-bootstrap';

function Popupinfo(props){
 return(props.trigger) ?(
    <div className='popup'>
        <div className='popup-inner'>
            
        <div className=" local-bootstrap modal-content">
                        <div className=" modal-header">
        <h3 className='modal-title mx-auto'> Phase Info:</h3>
        <X className='btn-close' fontSize={"x-large"} cursor="pointer" color='grey' onClick={()=> props.setTrigger(false)} />
        </div>
        <hr/>
            <Container className='flex'>
                <Row>
                    <Col >Name: {props.phase.name}</Col>
                </Row>
                <Row>
                    <Col >Date: {props.phase.date}</Col>
                </Row>
                <Row>
                    <Col>Type: {props.phase.type}</Col>
                </Row>
                <Row>
                    <Col >Time: {props.phase.time}</Col>
                </Row>
            </Container>
        {props.children}
        </div>
    </div>
    </div>
 ):""
}

export default Popupinfo;