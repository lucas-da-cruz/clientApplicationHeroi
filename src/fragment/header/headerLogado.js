import React, {Component} from 'react';
import './header.css';
import { Button } from 'semantic-ui-react'
import {Link} from 'react-router-dom';

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
      <div className="header-content">
        <Link to="/">
          <p>Heróis</p>
        </Link>
        <Button 
            inverted
            onClick={()=> this.logout()}>
                Sair
        </Button>
        </div>
    </header>
  );
}
}
