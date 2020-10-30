import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";

import HeaderSemLogar from './fragment/header/headerSemLogar';
import HeaderLogado from './fragment/header/headerLogado';
import Footer from './fragment/footer';

import Cadastro from './pages/cadastroUser';
import LoginAdmin from './pages/login';
import ServiceLogin from './pages/login/serviceLogin';
import CookieService from './util/CookieService';

import Home from './pages/home';
import DetalheHeroi from './pages/getHeroi';
import InsertHeroi from './pages/insertHeroi';

import Loading from './components/loading';

class Routes extends Component{

  /*state = {
    isAuthenticated: false
  };*/
  state = {
    isAuthenticated: 0
  };

  componentDidMount(){
    let token = CookieService.getCookie("token");
    if(token !== ""){
      ServiceLogin.isAuthenticated(token).then(response => {
        this.setState({isAuthenticated: 1});
      }).catch(erro => {
        this.setState({isAuthenticated: 2});
        console.log(erro);
      });
    } else {
      this.setState({isAuthenticated: 2});
    }
  }

  render(){
    return this.state.isAuthenticated === 0 ? (
      <BrowserRouter>
        <HeaderSemLogar/>
        <Loading/>
        <Footer/>
      </BrowserRouter>
    ) : (
      this.state.isAuthenticated === 1 ? (
        <BrowserRouter>
          <HeaderLogado/>
          <Switch>
            <Route exact path="/home" component={Home}/>
            <Route exact path="/insertHeroi" component={InsertHeroi}/>
            <Route exact path="/heroi/:id" component={DetalheHeroi}/>
            <Route path="*" component={Home}/>
          </Switch>
          <Footer/>
        </BrowserRouter>
      ) : (
        <BrowserRouter>
          <HeaderSemLogar/>
          <Switch>
              <Route exact path="/login" component={LoginAdmin}/>
              <Route exact path="/cadastro" component={Cadastro}/>
              <Route path="*" component={LoginAdmin}/>
          </Switch>
          <Footer/>
        </BrowserRouter>
      )
    );
  }
}

  /*componentDidMount(){
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
    return this.state.isAuthenticated === true ? (
      <BrowserRouter>
        <HeaderLogado/>
        <Switch>
          <Route exact path="/home" component={Home}/>
          <Route exact path="/insertHeroi" component={InsertHeroi}/>
          <Route exact path="/heroi/:id" component={DetalheHeroi}/>
          <Route path="*" component={Home}/>
        </Switch>
        <Footer/>
      </BrowserRouter>
    ) : (
      <BrowserRouter>
        <HeaderSemLogar/>
        <Switch>
            <Route exact path="/login" component={LoginAdmin}/>
            <Route exact path="/cadastro" component={Cadastro}/>
            <Route path="*" component={LoginAdmin}/>
        </Switch>
        <Footer/>
      </BrowserRouter>
    );
  }
}*/

export default Routes;