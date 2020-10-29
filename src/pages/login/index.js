import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import { Card } from 'primereact/card';
import ServiceLogin from './serviceLogin';
import logo from './../../img/logo/logo_3Cs.png';
import {Messages} from 'primereact/messages';

import './Login.css';
import './../../css/css_general.css';

class Logar extends Component{

    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: ''
        };
      
        this.entrar = this.entrar.bind(this);
        this.login = this.login.bind(this);
        
      }

      login = async () => {
        const {email, password} = this.state;
        return ServiceLogin.getToken(email, password).then(response => {
            console.log(response);
        }).catch(erro => {
            console.log(erro.response);
        });
      }

      entrar(e){
        e.preventDefault();
        this.login();
      }


  render(){

    return(
        <div>
            <Container>
                <Messages ref={(el) => this.messages = el} life={8000}/>
                <section>
                    <br/>
                    <Row className="justify-content-md-center">
                        <Col lg={4} md={12}>
                            <Card>
                                <div>
                                    <center>
                                        <h3>Entre com sua conta</h3>
                                    </center>
                                    <br/>
                                    <center>
                                        <form onSubmit={this.entrar} id="login">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>
                                                            <label>Email</label><br/>
                                                            <InputText 
                                                                type="email"
                                                                size="30"
                                                                autoComplete="off"
                                                                placeholder="Insira aqui seu email"
                                                                onChange={(e) => this.setState({email: e.target.value})}/>
                                                        </th>
                                                    </tr>
                                                    <br/>
                                                    <tr>
                                                        <th>
                                                            <label>Senha</label> <br/>
                                                            <InputText
                                                                type="password"
                                                                size="30"
                                                                autoComplete="off"
                                                                placeholder="Insira aqui sua senha"
                                                                onChange={(e) => this.setState({password: e.target.value})}/>
                                                        </th>
                                                    </tr>
                                                    <tr>
                                                        <th>
                                                            <br/>
                                                            <center>
                                                                <Button 
                                                                label="Entrar"
                                                                className="p-button-success"
                                                                size="109"
                                                                type="submit"/>
                                                            </center>
                                                        </th>
                                                    </tr>
                                                    <tr>
                                                        <th>
                                                            <center>
                                                                <Link>Esqueceu sua senha?</Link>
                                                            </center>
                                                            <center>
                                                                <Link to="/cadastro">Ainda não possui uma conta?</Link>
                                                            </center>
                                                            <br/>
                                                        </th>
                                                    </tr>
                                                </thead>
                                            </table>
                                        </form>
                                    </center>
                                </div>
                            </Card>
                            <br/>
                        </Col>
                        <Col lg={8} md={12}>
                            <center>
                                <h2>Quem somos? </h2>
                            </center>
                            <p align="justify">O <b>3Cs(Conexão Cidade e Cidadão)</b> é uma plataforma que possibilita uma fácil e ágil comunicação.
                                Nosso principal intuito é realizar a ligação das problemáticas urbanas, o cidadão e o órgão municipal responsável, 
                                fazendo uma conexão proativa para o melhor uso dos recursos públicos, sanando assim as necessidades dos munícipes.
                            </p>
                            <br/>
                            <center>
                                <img src={logo} alt="Logo da Health and Wellness" style={{width:'40%'}}/>
                            </center>
                        </Col>
                        
                    </Row>
                </section>            
            </Container>        
        </div>
    );
  }
}

export default withRouter(Logar);