import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import {
  initializeShopify,
  mapMove,
  mapClickStart,
  mapClickFinish,
  mapZoomStart,
  mapZoomFinish,
  markerHoverStart,
  markerHoverFinish,
  toggleCart,
} from '../../actions';
import mapboxCitySettings from '../../data/mapbox-city-settings';

import Cart from '../Cart';
import Hero from '../Hero';
import HeaderContents from '../HeaderContents';
import HeaderBackdrop from '../HeaderBackdrop';
import Editorial from '../Editorial';
import Map from '../Map';
import ProductsList from '../ProductsList';
import './index.scss';

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
      activeMarkerId,
      showCart,
      numOfCartItems,
      mapMove,
      mapClickStart,
      mapClickFinish,
      mapZoomStart,
      mapZoomFinish,
      markerHoverStart,
      markerHoverFinish,
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
          activeMarkerId={activeMarkerId}
          mapClickStart={mapClickStart}
          mapClickFinish={mapClickFinish}
          mapMove={mapMove}
          mapZoomStart={mapZoomStart}
          mapZoomFinish={mapZoomFinish}
          markerHoverStart={markerHoverStart}
          markerHoverFinish={markerHoverFinish}
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
  markerCoords: PropTypes.arrayOf(PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
    label: PropTypes.string,
  })),
  activeMarkerId: PropTypes.string,
  showCart: PropTypes.bool,
  numOfCartItems: PropTypes.number,
  initializeShopify: PropTypes.func.isRequired,
  mapClickStart: PropTypes.func.isRequired,
  mapClickFinish: PropTypes.func.isRequired,
  mapMove: PropTypes.func.isRequired,
  mapZoomStart: PropTypes.func.isRequired,
  mapZoomFinish: PropTypes.func.isRequired,
  markerHoverStart: PropTypes.func.isRequired,
  markerHoverFinish: PropTypes.func.isRequired,
  toggleCart: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  city: state.city,
  zoom: state.map.zoom,
  centerCoords: state.map.center,
  markerCoords: state.map.markers,
  activeMarkerId: state.map.activeMarkerId,
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
    markerHoverStart,
    markerHoverFinish,
    toggleCart,
  }
)(Home);
