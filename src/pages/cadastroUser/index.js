import React, { useState, useRef } from 'react';
import useForm from "react-hook-form";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import {Button} from 'primereact/button';
import {Password} from 'primereact/password';
import Loading from '../../components/loading';
import {Link} from 'react-router-dom';
import ServiceCadastro from './serviceCadastro';
import {Messages} from 'primereact/messages';

export default function Cadastrar (){
    
    let messages = useRef(null);
    const { register, handleSubmit, errors } = useForm();
    const [ loading, setLoading ] = useState(false);
    const [senha, setSenha] = useState();
    const [senhaConfirma, setSenhaConfirma] = useState();
    const [confirmaSenha, setConfirmaSenha] = useState(true);

    const onSubmit = data => {
        setLoading(true);
        data.senha = senha;
        return ServiceCadastro.insertUser(data).then(response => {
            if(response.status === 201){
                response.json().then(data => {
                    showSuccess();
                    setInterval(function(){ document.location.assign('/') }, 3000);
                }).catch((erro) => {
                    setLoading(false);
                    showError();
                    console.log("Erro JSON()" + erro);
                });
            } else {
                setLoading(false);
                showError();
                console.log(response);
            }
            }).catch(erro => {
                setLoading(false);
                showError();
                console.log(erro.response);
            });
    }

    const setPassword = (e) => {
        if(e.target.name === "senha") {
        setSenha(e.target.value);
        if(e.target.value.length >= 6 && e.target.value === senhaConfirma){
            setConfirmaSenha(false);
        } else {
            setConfirmaSenha(true);
        }
        } else {
        if(e.target.name === "senhaConfirma"){
            setSenhaConfirma(e.target.value);
            if(e.target.value.length >= 6 && e.target.value === senha){
            setConfirmaSenha(false);
            } else {
            setConfirmaSenha(true);
            }
        }
        }
    };

    const showSuccess = () => {
        messages.current.show({severity: 'success', summary: 'Cadastrado com sucesso!'});
    };

    const showError = () => {
        messages.current.show({severity: 'error', summary: 'Ops, algo de inesperado aconteceu'});
    };

    return (
            <div>
                <Container>
                <Messages ref={messages} />
                {loading ?
                <Loading/> :
                    <div>
                        <br/>
                        <center>
                            <h2>Criar uma nova conta</h2>
                        </center>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Row className="justify-content-md-center">
                                <Col lg={4} md={10}>
                                    <br/>
                                    <Form.Label className="required">Nome</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="nome"
                                        id="nome"
                                        maxLength="50"
                                        ref={register({required:true, maxLength: 50})}
                                        placeholder="Insira aqui seu nome completo"/>
                                    {errors.nome && errors.nome.type === "required" && <span className="alertField">Campo nome é obrigatório</span>}
                                    {errors.nome && errors.nome.type === "maxLength" && <span className="alertField">O tamanho máximo é de 50 caracteres</span> }
                                </Col>
                                <Col lg={4} md={10}>
                                    <br/>
                                    <Form.Label className="required">Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        maxLength="50"
                                        ref={register({required:true, maxLength: 50})}
                                        placeholder="Insira aqui seu email"/>
                                    {errors.email && errors.email.type === "required" && <span className="alertField">Campo email é obrigatório</span>}
                                    {errors.email && errors.email.type === "maxLength" && <span className="alertField">O tamanho máximo é de 50 caracteres</span> }
                                </Col>
                            </Row>
                            <Row className="justify-content-md-center">
                                <Col lg={4} md={10}>
                                    <br/>
                                    <Form.Label className="required">Senha (mínimo de 6 catacteres)</Form.Label><br/>
                                    <Password
                                        size="30"
                                        autoComplete="off"
                                        name="senha"
                                        weakLabel="Senha fraca"
                                        mediumLabel="Senha média"
                                        strongLabel="Senha forte"
                                        placeholder="Insira aqui sua senha"
                                        onChange={(e) => setPassword(e)}/>
                                </Col>
                                <Col lg={4} md={10}>
                                    <br/>
                                    <Form.Label className="required">Confirmação de senha</Form.Label><br/>
                                    <Password
                                        size="30"
                                        autoComplete="off"
                                        name="senhaConfirma"
                                        weakLabel="Senha fraca"
                                        mediumLabel="Senha média"
                                        strongLabel="Senha forte"
                                        placeholder="Confirme sua senha"
                                        onChange={(e) => setPassword(e)}/>
                                        <br/>
                                    {confirmaSenha?
                                        <span className="alertField">As senhas devem coincidir</span> 
                                        : null
                                    }
                                </Col>
                            </Row>
                            <Row lg={6} className="justify-content-md-center">
                                <Col>
                                    <br/><br/><br/>
                                    <center>
                                        <Link to="/">
                                            <Button label="Voltar" className="p-button-secondary"/>
                                        </Link>
                                    </center>
                                </Col>
                                <Col>
                                    <br/><br/><br/>
                                    <center>
                                    <Button
                                        disabled={confirmaSenha}
                                        label="Cadastrar-se"
                                        size="45"
                                        className="p-button-primary"
                                        type="submit"/>
                                    </center>
                                </Col>
                            </Row>
                        </form>
                    </div>
                }
                </Container>
            </div>
            )
}