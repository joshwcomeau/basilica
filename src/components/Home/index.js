import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import {
  initializeShopify,
  mapMove,
  mapClickStart,
  mapClickFinish,
  mapZoomStart,
  mapZoomFinish,
} from '../../actions';

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
    const {
      city,
      zoom,
      centerCoords,
      markerCoords,
      mapMove,
      mapClickStart,
      mapClickFinish,
      mapZoomStart,
      mapZoomFinish,
    } = this.props;

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
          {...mapboxCitySettings[city]}
          zoom={zoom}
          markerCoords={markerCoords}
          centerCoords={centerCoords}
          mapClickStart={mapClickStart}
          mapClickFinish={mapClickFinish}
          mapMove={mapMove}
          mapZoomStart={mapZoomStart}
          mapZoomFinish={mapZoomFinish}
        />

        <ProductsList />
      </div>
    );
  }
}

Home.propTypes = {
  city: PropTypes.oneOf(['montreal']),
  zoom: PropTypes.number,
  centerCoords: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  }),
  markerCoords: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  }),
  initializeShopify: PropTypes.func,
  mapClickStart: PropTypes.func,
  mapClickFinish: PropTypes.func,
  mapMove: PropTypes.func,
  mapZoomStart: PropTypes.func,
  mapZoomFinish: PropTypes.func,
};

const mapStateToProps = state => ({
  city: state.city,
  zoom: state.map.zoom,
  centerCoords: state.map.center,
  markerCoords: state.map.marker,
});

export { Home };
export default connect(
  mapStateToProps,
  {
    initializeShopify,
    mapClickStart,
    mapClickFinish,
    mapMove,
    mapZoomStart,
    mapZoomFinish,
  }
)(Home);
