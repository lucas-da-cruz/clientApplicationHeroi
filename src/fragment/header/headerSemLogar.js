import React, {Component} from 'react';
import './header.css';
import logo from './../../img/logo/logo_3Cs.png';
import {Link} from 'react-router-dom';

export default class HeaderSemLogar extends Component{


  render(){
    return(
      <header id="main-header">
        <div className="header-content">
          <p>Heróis</p>
        </div>
      </header>
  );
}
}
