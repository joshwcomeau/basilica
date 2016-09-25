import React, { Component } from 'react';
import { StickyContainer } from 'react-sticky';

import Hero from '../Hero';
import StickyLogo from '../StickyLogo';

import './index.scss';

class Home extends Component {
  render() {
    return (
      <div className="home">
        <Hero />
        <StickyContainer className="main-content">
          <StickyLogo />
          <div style={{ height: '4000px' }} />
        </StickyContainer>
      </div>
    );
  }
}

export default Home;
