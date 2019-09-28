import React, { PureComponent } from 'react';
import Graph from './components/charts/Graph.js';
import Login from './components/Login';
import Bg from './bg.jpg';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


import './index.css';
// import Dashboard from './components/Register.js/index.js';
import Register from './components/Register.js';
import Dashboard from './components/Dashboard.js';

export default class App extends PureComponent {

  render() {

    const { params, children } = this.props;
    return (
    <div>
        <img style={{zIndex:"-10", position:"fixed", width:"100vw", height:"100vh"}} src={Bg} alt="backGround"/> 
        <Dashboard/>
    </div>
    );
  }
}