import React, { Component } from 'react';

import Hero from '../Hero';
import HeaderContents from '../HeaderContents';
import HeaderBackdrop from '../HeaderBackdrop';
import './index.scss';

class Home extends Component {
  render() {
    return (
      <div className="home">
        <Hero />

        {/*
          Header is split into 2 components because their z-index is different.
          We want the Contents to float above the Hero image, but the backdrop
          should slide under it.
        */}
        <HeaderContents />
        <HeaderBackdrop />

        <div className="main-content" style={{ height: '4000px' }} />
      </div>
    );
  }
}

export default Home;
