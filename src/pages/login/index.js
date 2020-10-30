import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import { Card } from 'primereact/card';
import ServiceLogin from './serviceLogin';
import {Messages} from 'primereact/messages';
import './Login.css';
import './../../css/css_general.css';
import Loading from './../../components/loading';

class LoginAdmin extends Component{

    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            loading: false
        };
      
        this.entrar = this.entrar.bind(this);
        this.login = this.login.bind(this);
    }

    login = async () => {
        const {email, password} = this.state;

        return ServiceLogin.getToken(email, password).then(response => {
            if(response.status === 200){
                response.json().then(data => {
                    document.cookie = `token=${data.token}`;
                    document.location.assign('/heroi');
                }).catch((erro) => {
                    console.log("Erro JSON()" + erro);
                });
            } else {
                this.setState({loading: false});
                console.log(response);
                this.showError("E-mail ou senha incorretos");
            }            
        }).catch(erro => {
            console.log(erro.response);
        });
    }

    entrar(e){
        e.preventDefault();
        this.setState({loading: true});
        this.login();
    }

    showError(messagem) {
        this.messages.show({severity: 'error', summary: messagem });
    }

  render(){

    return this.state.loading === true ? (
        <Loading/>
        ) : (
        <div>
            <Container>
                <Messages ref={(el) => this.messages = el} life={8000}/>
                <section>
                    <br/><br/><br/>
                    <Row className="justify-content-md-center">
                    <Col lg={4} md={12}>
                            <Card>
                                <div>
                                    <center>
                                        <h2>Login</h2>
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
                                                                className="p-button-primary"
                                                                size="109"
                                                                type="submit"/>
                                                            </center>
                                                        </th>
                                                    </tr>
                                                    <tr>
                                                        <th>
                                                            <br/>
                                                            <center>
                                                                <Link to="/cadastro">Ainda não é cadastrado?</Link>
                                                            </center>
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
                    </Row>
                </section>            
            </Container>        
        </div> 
        );
  }
}

export default withRouter(LoginAdmin);