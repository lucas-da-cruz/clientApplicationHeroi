import React, {useState, useEffect, useRef } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import useForm from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import { MultiSelect } from 'primereact/multiselect';
import { Dropdown } from 'primereact/dropdown';
import {Button} from 'primereact/button';
import {Link} from 'react-router-dom';
import Loading from './../../components/loading';
import ServiceInsertHeroi from './serviceInsertHeroi';
import {Messages} from 'primereact/messages';

export default function InsertHeroi() {
    let messages = useRef(null);
    const { register, handleSubmit, errors } = useForm();
    const [selectedPoder, setSelectedPoder] = useState([]);
    const [selectedUniverso, setSelectedUniverso] = useState(null);
    const [avisoPoder, setAvisoPoder] = useState(false);
    const [avisoUniverso, setAvisoUniverso] = useState(false);
    const [universoOptions, setUniversoOptions] = useState([]);
    const [poderes, setPoderes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        ServiceInsertHeroi.findAllUniverso().then(response => {
            if(response.status === 200){
                response.json().then(data => {
                    setUniversoOptions(data);
                }).catch((erro) => {
                    console.log("Erro: " + erro);
                });
            }
          }).catch(erro => {
            console.log(erro.response);
        });

        ServiceInsertHeroi.findAllPoderes().then(response => {
            if(response.status === 200){
                response.json().then(data => {
                    setPoderes(data);
                }).catch((erro) => {
                    console.log("Erro: " + erro);
                });
            }
          }).catch(erro => {
            console.log(erro.response);
        });

        window.setTimeout(function() {
            setLoading(false);
        }, 1500);
    }, []);

    const onSubmit = data => {
        if(selectedPoder.length === 0){
            setAvisoPoder(true);
            return;
        }
        setAvisoPoder(false);
        if(selectedUniverso === null){
            setAvisoUniverso(true);
            return;
        }
        setAvisoUniverso(false);
        data.universo = selectedUniverso;
        data.poder = selectedPoder;

        setLoading(true);
        return ServiceInsertHeroi.insertHeroi(data).then(response => {
            if(response.status === 201){
                showSuccess();
                window.setTimeout(function() {
                    document.location.assign('/heroi');
                }, 1500);
            } else {
                setLoading(false);
                showError();
            }            
          }).catch(erro => {
            setLoading(false);
            showError();
            console.log(erro.response);
        });
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

    const showSuccess = () => {
        messages.current.show({severity: 'success', summary: 'Herói adicionado com sucesso!'});
    };

    const showError = () => {
        messages.current.show({severity: 'error', summary: 'Ops, algo de inesperado aconteceu'});
    };

    return (
        <div>
        <Container>
        <br/>
            <center>
                <h2>Cadastrar novo herói</h2>
            </center><br/>
            <Messages ref={messages} />
        { loading ? 
        <Loading/> :
            <div>
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
                            label="Cadastrar"
                            size="45"
                            className="p-button-primary"
                            type="submit"/>
                        </center>
                        </Col>
                    </Row>
                </form>
                <br/><br/><br/>
            </div>
            
            }
            </Container>
        </div>
    );
}
