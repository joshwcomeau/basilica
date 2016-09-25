import React, { Component } from 'react';

import Hero from '../Hero';

import './index.scss';

class Home extends Component {
  render() {
    return (
      <div className="home">
        <Hero />
      </div>
    );
  }
}

export default Home;
