import React, {Component} from 'react';
import './header.css';
import logo from './../../img/logo/logo_3Cs.png';
//import { Button } from 'semantic-ui-react';
//import { Button } from 'primereact/button';
import { Button, Segment } from 'semantic-ui-react'

export default class HeaderLogado extends Component{

  constructor(props){
    super(props);

    this.logout = this.logout.bind(this);
  }

 logout = async () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    document.location.assign('/');
  }

  render(){

    return(
        <header id="main-header">
            <p>Heróis</p>
            <Button 
                inverted
                onClick={()=> this.logout()}>
                    Sair
            </Button>
        </header>
  );
}
}
