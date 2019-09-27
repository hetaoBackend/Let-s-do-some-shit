import React, { PureComponent } from 'react';
import { Link } from 'react-router'
import Graph from './components/charts/Graph.js';
import Login from './components/Login';

import './index.css';

export default class App extends PureComponent {
  render() {
    const { params, children } = this.props;
    return (
      <div>
        {/* { children || <Graph /> } */}
      </div>
    );
  }
}