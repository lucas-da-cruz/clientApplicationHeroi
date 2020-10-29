import React, {useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import useForm from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import { MultiSelect } from 'primereact/multiselect';
import { Dropdown } from 'primereact/dropdown';
import {Button} from 'primereact/button';
import {Link} from 'react-router-dom';

export default function InsertHeroi() {
    const { register, handleSubmit, errors } = useForm();
    const [selectedPoder, setSelectedPoder] = useState([]);
    const [selectedUniverso, setSelectedUniverso] = useState(null);
    const [avisoPoder, setAvisoPoder] = useState(false);
    const [avisoUniverso, setAvisoUniverso] = useState(false);

    const poderes = [
        {nome: 'Fogo', id: '1'},
        {nome: 'Água', id: '2'},
        {nome: 'Terra', id: '3'},
        {nome: 'Voar', id: '4'}
    ];

    const universoOptions = [
        {nome: 'EY Comics', id: 1},
        {nome: 'Trainee Comics', id: 2}
    ];

    useEffect(() => {
        console.log("Iniciando");
    });

    const onSubmit = data => {
        if(selectedPoder.length === 0){
            setAvisoPoder(true);
            console.log("gera mensagem selectedPoder");
            return;
        }
        setAvisoPoder(false);
        if(selectedUniverso === null){
            setAvisoUniverso(true);
            console.log("gera mensagem selectedUniverso");
            return;
        }
        setAvisoUniverso(false);
        data.universo = selectedUniverso;
        data.poder = selectedPoder;
        console.log(data);
    };

    const onCountryChange = (e) => {
        setSelectedUniverso(e.value);
    }

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
            <Container>
                <br/>
                <center>
                    <h2>Cadastrar novo herói</h2>
                </center><br/>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Row className="justify-content-md-center">
                        <Col lg={4} md={10}>
                            <center>
                                <Form.Label className="required">Nome</Form.Label>
                                    <Form.Control
                                    id="nome"
                                    name="nome"
                                    type="text"
                                    maxLength="50"
                                    ref={register({required:true, maxLength: 50})}
                                    placeholder="Insira aqui nome do herói"/>
                                {errors.nome && errors.nome.type === "required" && <span className="alertField">Campo nome é obrigatório</span>}
                                {errors.nome && errors.nome.type === "maxLength" && <span className="alertField">O tamanho máximo é de 50 caracteres</span> }
                            </center>
                            <br/>
                        </Col>
                        <Col lg={4} md={10}>
                            <center>
                                <Form.Label className="required">Poder</Form.Label><br/>
                                <MultiSelect
                                    id="poder"
                                    name="poder"
                                    value={selectedPoder}
                                    options={poderes}
                                    onChange={(e) => setSelectedPoder(e.value)}
                                    optionLabel="nome"
                                    placeholder="Selecione um poder"
                                    ref={register({maxLength: 50})}/>
                                    <br/>
                                    {avisoPoder ?
                                    <span className="alertField">Pelo menos um poder deve ser selecionado</span>
                                    : null}
                            </center>
                            <br/>
                        </Col>
                        <Col lg={4} md={10}>
                            <center>
                                <Form.Label className="required">Universo</Form.Label><br/>
                                <Dropdown
                                    id="universo"
                                    name="universo"
                                    value={selectedUniverso}
                                    options={universoOptions}
                                    onChange={onCountryChange}
                                    optionLabel="nome"
                                    filter
                                    showClear
                                    filterBy="nome"
                                    placeholder="Selecione um universo"
                                    valueTemplate={selectedUniversoTemplate} 
                                    itemTemplate={universoOptionTemplate}
                                    ref={register({required:true, maxLength: 50})}/>
                                    <br/>
                                    {avisoUniverso ?
                                    <span className="alertField">Um universo deve ser selecionado</span>
                                    : null}
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
                            label="Cadastrar herói"
                            size="45"
                            className="p-button-primary"
                            type="submit"/>
                        </center>
                      </Col>
                    </Row>
                </form>
                <br/><br/><br/>
            </Container>
        </div>
    );
}
