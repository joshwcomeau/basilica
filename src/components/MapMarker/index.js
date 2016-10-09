// eslint-disable-next-line no-unused-vars
import React, { Component, PropTypes } from 'react';
import { Marker } from 'react-mapbox-gl';

import pin from '../../images/map-pin-default.png';
import './index.scss';


const MapMarker = ({ lat, lng, label }) => {
  const container = document.createElement('div');
  container.classList.add('map-marker-wrapper');

  return (
    <Marker
      container={container}
      coordinates={[lng, lat]}
    >
      <div className="map-marker">
        <img src={pin} alt="neighbourhood location" />
        {label}
      </div>
    </Marker>
  );
};

MapMarker.propTypes = {
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
  label: PropTypes.string,
};

MapMarker.defaultProps = {

};

export default MapMarker;
