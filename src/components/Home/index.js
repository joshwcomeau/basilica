import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { productsRequest } from '../../actions';

import Hero from '../Hero';
import HeaderContents from '../HeaderContents';
import HeaderBackdrop from '../HeaderBackdrop';
import './index.scss';

class Home extends Component {
  componentWillMount() {
    const { city } = this.props;
    // We want to request our list of products from Shopify ASAP.
    this.props.productsRequest({ city });
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
  city: PropTypes.oneOf(['montreal']),
  productsRequest: PropTypes.func,
};

const mapStateToProps = state => ({
  city: state.city,
});

export { Home };
export default connect(mapStateToProps, { productsRequest })(Home);
