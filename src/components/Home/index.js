import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { initializeShopify, clickMap } from '../../actions';

import Hero from '../Hero';
import HeaderContents from '../HeaderContents';
import HeaderBackdrop from '../HeaderBackdrop';
import Editorial from '../Editorial';
import Map from '../Map';
import ProductsList from '../ProductsList';
import './index.scss';
import mapboxCitySettings from '../../data/mapbox-city-settings';

class Home extends Component {
  componentWillMount() {
    this.props.initializeShopify();
  }

  render() {
    const { city, markerCoords, clickMap } = this.props;

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

        <Editorial />

        <Map
          onClick={clickMap}
          markerCoords={markerCoords}
          {...mapboxCitySettings[city]}
        />

        <ProductsList />
      </div>
    );
  }
}

Home.propTypes = {
  city: PropTypes.oneOf(['montreal']),
  markerCoords: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  }),
  clickMap: PropTypes.func,
  initializeShopify: PropTypes.func,
};

const mapStateToProps = state => ({
  city: state.city,
  markerCoords: state.map.marker,
});

export { Home };
export default connect(
  mapStateToProps,
  { clickMap, initializeShopify }
)(Home);
