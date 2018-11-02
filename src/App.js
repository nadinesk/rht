import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'; 
import Child from './components/Child'
import Home from './components/Home'
import OgCt from './components/OgCt'
import Ny from './components/Ny'
import FranWrap from './components/FranWrap'
import {Navbar, Nav, NavItem} from 'react-bootstrap'

class App extends Component {
  
  

  render() {
    

    return (
      
        <div>
          <FranWrap  moyrsn='' twSn='' selCat='' />                      
        </div>
        
    
    
    );
  
  }
}

  
export default App;

