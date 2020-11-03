import React, {Component} from 'react';
import './header.css';
import {Link} from 'react-router-dom';

export default class HeaderSemLogar extends Component{

  render(){
    return(
      <header id="main-header">
        <div className="header-content">
        <Link to="/">
          <p>Heróis</p>
        </Link>
        </div>
      </header>
  );
}
}
