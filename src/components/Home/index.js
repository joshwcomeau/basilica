import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { initializeShopify } from '../../actions';

import Hero from '../Hero';
import HeaderContents from '../HeaderContents';
import HeaderBackdrop from '../HeaderBackdrop';
import './index.scss';

class Home extends Component {
  componentWillMount() {
    // We want to request our list of products from Shopify ASAP.
    this.props.initializeShopify();
  }

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

Home.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  location: PropTypes.object,
  initializeShopify: PropTypes.func,
};

export default connect(null, { initializeShopify })(Home);
