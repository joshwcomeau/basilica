// eslint-disable-next-line no-unused-vars
import React, { Component, PropTypes } from 'react';
import { Layer } from 'react-mapbox-gl';


const MapMarkerLayer = ({ type, children }) => (
  <Layer
    type="symbol"
    id={type}
    layout={{
      'icon-image': `map-pin-${type}`,
      'icon-size': 0.65,
      'icon-offset': [0, 44 * -0.65],
    }}
  >
    {children}
  </Layer>
);

MapMarkerLayer.propTypes = {
  type: PropTypes.oneOf(['default', 'active']).isRequired,
  children: PropTypes.node.isRequired,
};

MapMarkerLayer.defaultProps = {
  type: 'default',
};

export default MapMarkerLayer;
