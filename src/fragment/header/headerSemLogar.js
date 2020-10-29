import React, {Component} from 'react';
import './header.css';
import {Link} from 'react-router-dom';
import { Button, Segment } from 'semantic-ui-react'

export default class HeaderSemLogar extends Component{

  render(){
    return(
      <header id="main-header">
        <div className="header-content">
        <Link to="/">
          <p>Heróis</p>
        </Link>
        <Link to="/cadastro">
          <Button inverted>
            Cadastrar
          </Button>
        </Link>
        </div>
      </header>
  );
}
}
