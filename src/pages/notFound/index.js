import React, {Component} from 'react';
import './../../css/css_general.css';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import {Button} from 'primereact/button';
import {Link} from 'react-router-dom';

export default class ErrorUrl extends Component{

  render(){
    return(
        <Container>
            <br/>
            <Row className="justify-content-md-center">
                <Col>
                <center>
                    <h2>Ops, não encontramos esse endereço em nosso sistema!<span role="img" aria-label="sheep">🙁</span></h2>
                    <h4>Verifique a URL e tente novamente</h4>
                    <br/>
                    <Link to="/">
                        <Button 
                        label="Ir para página inicial"
                        size="45"
                        className="p-button-primary"
                        />
                    </Link>
                </center>
                </Col>
            </Row>
        </Container>
        );
  }
}