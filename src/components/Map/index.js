// eslint-disable-next-line no-unused-vars
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import ReactMapboxGl, {
  Layer,
  Feature,
  ZoomControl,
} from 'react-mapbox-gl';


import { accessToken } from '../../data/mapbox-config.json';
import style from '../../data/mapbox-style-streets.json';
import './index.scss';


const Map = ({
  centerCoord,
  markerCoord,
  zoom,
  minZoom,
  maxZoom,
  scrollZoom,
  bearing,
}) => {
  const classes = classNames(['map']);

  // MapBox uses LngLat coordinates, instead of LatLng.
  // Need to invert the coordinates we pass in.
  const lngLatCenterCoord = centerCoord.slice().reverse();
  const lngLatMarkerCoord = markerCoord && markerCoord.slice().reverse();

  const marker = markerCoord && <Feature coordinates={lngLatMarkerCoord} />;

  return (
    <div className={classes}>
      <ReactMapboxGl
        style={style}
        className={classes}
        containerStyle={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
        center={lngLatCenterCoord}
        zoom={[zoom]}
        minZoom={minZoom}
        maxZoom={maxZoom}
        scrollZoom={scrollZoom}
        bearing={bearing}
        movingMethod="flyTo"
        accessToken={accessToken}
      >
        <ZoomControl />
        <Layer
          type="symbol"
          id="marker"
          layout={{ 'icon-image': 'circle-stroked-15' }}
          paint={{ 'icon-color': '#FF0000' }}
        >
          {markerCoord && marker}
        </Layer>
      </ReactMapboxGl>
    </div>
  );
};

Map.propTypes = {
  centerCoord: PropTypes.arrayOf(PropTypes.number).isRequired,
  markerCoord: PropTypes.arrayOf(PropTypes.number),
  zoom: PropTypes.number.isRequired,
  minZoom: PropTypes.number.isRequired,
  maxZoom: PropTypes.number.isRequired,
  scrollZoom: PropTypes.bool.isRequired,
  bearing: PropTypes.number.isRequired,
};

Map.defaultProps = {
  scrollZoom: false,
  centerCoord: [45.503634, -73.610406],
  markerCoord: [45.501, -73.611],
  bearing: 0,
};

export default Map;
