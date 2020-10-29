import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";

import HeaderSemLogar from './fragment/header/headerSemLogar';
import HeaderLogado from './fragment/header/headerLogado';
import Footer from './fragment/footer';

import Cadastro from './pages/cadastro';
import LoginAdmin from './pages/loginAdmin';
import Login from './pages/login';
import ServiceLogin from './pages/login/serviceLogin';
import CookieService from './util/CookieService';

import Home from './pages/home';

class Routes extends Component{

  state = {
    isAuthenticated: false
  };

  componentDidMount(){
    let token = CookieService.getCookie("token");
    if(token !== ""){
      ServiceLogin.isAuthenticated(token).then(response => {
        this.setState({isAuthenticated: true});
      }).catch(erro => {
        this.setState({isAuthenticated: false});
        console.log(erro);
      });
    } else {
      this.setState({isAuthenticated: false});
    }
  }

  render(){
    return  this.state.isAuthenticated === true ? (
      <BrowserRouter>
        <HeaderLogado/>
        <Switch>
          <Route exact path="/home" component={Home}/>
          <Route path="*" component={Home}/>
        </Switch>
        <Footer/>
      </BrowserRouter>
    ) : (
      <BrowserRouter>
        <HeaderSemLogar/>
        <Switch>
            <Route exact path="/login" component={LoginAdmin}/>
            <Route path="*" component={LoginAdmin}/>
        </Switch>
        <Footer/>
      </BrowserRouter>
    );
  }
}

export default Routes;