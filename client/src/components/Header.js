import React from 'react';
import logo from './images/lisp-logo.png';
import './Header.css';


const Header = (props) => {
  return (
    <nav className="Header">
      <img className="logo" src={logo} alt="Lisp Logo"/>
      <h1>CL: Interpreter</h1>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/programs">Programs</a></li>
        <li><a href="/help">Help</a></li>
      </ul>
    </nav>
  );
}

export default Header;
