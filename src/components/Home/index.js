import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import {
  initializeShopify,
  mapMove,
  mapClickStart,
  mapClickFinish,
  mapZoomStart,
  mapZoomFinish,
  toggleCart,
} from '../../actions';

import Cart from '../Cart';
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
      showCart,
      numOfCartItems,
      mapMove,
      mapClickStart,
      mapClickFinish,
      mapZoomStart,
      mapZoomFinish,
      toggleCart,
    } = this.props;

    return (
      <div className="home">
        <Cart
          isVisible={showCart}
          onClickClose={toggleCart}
        />
        <Hero />

        {/*
          Header is split into 2 components because their z-index is different.
          We want the Contents to float above the Hero image, but the backdrop
          should slide under it.
        */}
        <HeaderContents
          numOfCartItems={numOfCartItems}
          toggleCart={toggleCart}
        />
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
  showCart: PropTypes.bool,
  numOfCartItems: PropTypes.number,
  initializeShopify: PropTypes.func,
  mapClickStart: PropTypes.func,
  mapClickFinish: PropTypes.func,
  mapMove: PropTypes.func,
  mapZoomStart: PropTypes.func,
  mapZoomFinish: PropTypes.func,
  toggleCart: PropTypes.func,
};

const mapStateToProps = state => ({
  city: state.city,
  zoom: state.map.zoom,
  centerCoords: state.map.center,
  markerCoords: state.map.marker,
  showCart: state.cart.isOpen,
  numOfCartItems: state.cart.items.length,
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
    toggleCart,
  }
)(Home);
