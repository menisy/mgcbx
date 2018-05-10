import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Web from './components/Web'
import Mobile from './components/Mobile'
import { Route } from 'react-router-dom'





class App extends Component {

  render() {
    return (
      <div>
        <Route path="/web" component={Web}/>
        <Route path="/mob" component={Mobile}/>
      </div>
    );
  }
}

export default App;
