import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'; 
import Child from './components/Child'
import Home from './components/Home'
import OgCt from './components/OgCt'
import Ny from './components/Ny'
import FranWrap from './components/FranWrap'

class App extends Component {
  
  

  render() {
    

    return (
      
      <div >
        some kind of header
        <Router>
          <div>
            <ul>              
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/oc">Oc</Link>
              </li>
              <li>
                <Link to="/ny">NY</Link>
              </li>
              
            </ul>          
            <Route exact path="/" component={Home} />
            <Route exact path="/oc" component={OgCt} />
            <Route exact path="/ny" component={Ny} />
            
          </div>                
        </Router>
      </div>
    
    );
  
  }
}

  
export default App;

      