import React, {useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import useForm from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import { MultiSelect } from 'primereact/multiselect';
import { Dropdown } from 'primereact/dropdown';
import {Button} from 'primereact/button';
import Loading from '../../components/loading';
import {Link} from 'react-router-dom';

export default function DetalheHeroi() {
    const { register, handleSubmit, errors } = useForm();
    const [selectedPoder, setSelectedPoder] = useState(null);
    const [selectedUniverso, setSelectedUniverso] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        console.log("Iniciando");
    });

    const onSubmit = data => {

    };

    const onCountryChange = (e) => {
        setSelectedUniverso(e.value);
    }

    const poderes = [
        {nome: 'Fogo', id: '1'},
        {nome: 'Água', id: '2'},
        {nome: 'Terra', id: '3'},
        {nome: 'Voar', id: '4'}
    ];

    const universo = [
        {nome: 'EY Comics', id: 1},
        {nome: 'Trainee Comics', id: 2}
    ];

    const selectedUniversoTemplate = (option, props) => {
        if (option) {
            return (
                <div className="country-item country-item-value">
                    <div>{option.nome}</div>
                </div>
            );
        }
    return (
        <span>
            {props.placeholder}
        </span>
    );
    }

    const universoOptionTemplate = (option) => {
        return (
            <div className="country-item">
                <div>{option.nome}</div>
            </div>
        );
    }

    return (
      <div>
        { loading ? 
        <Loading/> :
            <Container>
                <br/>
                <center>
                    <h2>Detalhes Herói</h2>
                </center><br/>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Row className="justify-content-md-center">
                        <Col lg={6} md={10}>
                            <center>
                                <Form.Label className="required">Nome</Form.Label>
                                    <Form.Control
                                    id="nome"
                                    name="nome"
                                    type="text"
                                    maxLength="50"
                                    ref={register({required:true, maxLength: 50})}
                                    placeholder="Insira aqui nome do herói"/>
                            </center>
                            <br/>
                        </Col>
                        <Col lg={6} md={10}>
                          <center>
                            <Form.Label className="required">Data de cadastro</Form.Label>
                              <Form.Control
                                type="text"
                                maxLength="50"
                                ref={register({required:true, maxLength: 50})}
                                placeholder="dd/mm/aaaa"
                                disabled={true}/>
                          </center>
                          <br/>
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center">
                      <Col lg={6} md={10}>
                        <center>
                          <Form.Label className="required">Poder</Form.Label><br/>
                            <MultiSelect
                              id="poder"
                              name="poder"
                              value={selectedPoder}
                              options={poderes}
                              onChange={(e) => setSelectedPoder(e.value)}
                              optionLabel="nome"
                              placeholder="Selecione um poder"/>
                        </center>
                        <br/>
                      </Col>
                      <Col lg={6} md={10}>
                          <center>
                            <Form.Label className="required">Universo</Form.Label><br/>
                              <Dropdown
                                id="universo"
                                name="universo"
                                value={selectedUniverso}
                                options={universo}
                                onChange={onCountryChange}
                                optionLabel="nome"
                                filter
                                showClear
                                filterBy="nome"
                                placeholder="Selecione um universo"
                                valueTemplate={selectedUniversoTemplate} 
                                itemTemplate={universoOptionTemplate} />
                          </center>
                          <br/>
                      </Col>
                    </Row>
                    <br/><br/>
                    <Row lg={6} className="justify-content-md-center">
                      <Col>
                          <center>
                            <Link to="/heroi">
                              <Button 
                                label="Voltar"
                                size="45"
                                className="p-button-secondary"
                              />
                            </Link>
                            </center>
                        </Col>
                      <Col>
                        <center>
                          <Button 
                            label="Atualizar herói"
                            size="45"
                            className="p-button-primary"
                            type="submit"/> 
                        </center>
                      </Col>
                    </Row>
                </form>
                <br/><br/><br/>
            </Container>
        }
        </div>
    );
}
