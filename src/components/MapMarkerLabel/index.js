// eslint-disable-next-line no-unused-vars
import React, { Component, PropTypes } from 'react';
import { Marker } from 'react-mapbox-gl';

import './index.scss';


const MapMarkerLabel = ({ lat, lng, label }) => {
  const container = document.createElement('div');
  container.classList.add('map-marker-label-wrapper');

  return (
    <Marker
      container={container}
      coordinates={[lng, lat]}
    >
      <h4 className="map-marker-label">
        {label}
      </h4>
    </Marker>
  );
};

MapMarkerLabel.propTypes = {
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
  label: PropTypes.string,
};

MapMarkerLabel.defaultProps = {

};

export default MapMarkerLabel;
