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
                <Link to="/cities">Cities</Link>
              </li>
              
            </ul>          
            <Route exact path="/" component={Home} />
            <Route exact path="/cities" render={(props) => <FranWrap {...props} moyrsn='' twSn='' selCat='' />}  />
            
          </div>                
        </Router>
      </div>
    
    );
  
  }
}

  
export default App;

      