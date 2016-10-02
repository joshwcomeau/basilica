// eslint-disable-next-line no-unused-vars
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import ReactMapboxGl, {
  Layer,
  Feature,
} from 'react-mapbox-gl';

import { accessToken } from '../../data/mapbox-config.json';
import style from '../../data/mapbox-style-light.json';
import './index.scss';


const Map = ({
  centerCoords,
  markerCoords,
  zoom,
  minZoom,
  maxZoom,
  scrollZoom,
  bearing,
  onClick,
  onMoveEnd,
  mapZoomIncrease,
  mapZoomDecrease,
}) => {
  const classes = classNames(['map']);

  const centerCoordsArray = [centerCoords.lng, centerCoords.lat];
  const markerCoordsArray = markerCoords && [
    markerCoords.lng,
    markerCoords.lat,
  ];

  const marker = markerCoords && <Feature coordinates={markerCoordsArray} />;

  return (
    <div className={classes}>
      <div className="zoom-control">
        <button onClick={zoom < maxZoom && mapZoomIncrease}>+</button>
        <button onClick={zoom > minZoom && mapZoomDecrease}>-</button>
      </div>
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
        center={centerCoordsArray}
        zoom={[zoom]}
        minZoom={minZoom}
        maxZoom={maxZoom}
        scrollZoom={scrollZoom}
        bearing={bearing}
        movingMethod="easeTo"
        accessToken={accessToken}
        onClick={(map, e) => onClick && onClick(e.lngLat)}
        onMoveEnd={map => onMoveEnd && onMoveEnd(map.getCenter())}
      >
        <Layer
          type="symbol"
          id="marker"
          layout={{ 'icon-image': 'circle-stroked-15' }}
          paint={{ 'icon-color': '#FF0000' }}
        >
          {markerCoords && marker}
        </Layer>
      </ReactMapboxGl>
    </div>
  );
};

// onZoom={map => onZoom && onZoom({ zoom: map.getZoom() })}

Map.propTypes = {
  centerCoords: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  }).isRequired,
  markerCoords: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  }),
  zoom: PropTypes.number.isRequired,
  minZoom: PropTypes.number.isRequired,
  maxZoom: PropTypes.number.isRequired,
  scrollZoom: PropTypes.bool.isRequired,
  bearing: PropTypes.number.isRequired,
  onClick: PropTypes.func,
  onMoveEnd: PropTypes.func,
  mapZoomIncrease: PropTypes.func,
  mapZoomDecrease: PropTypes.func,
};

Map.defaultProps = {
  centerCoords: {
    lat: 45.503634,
    lng: -73.610406,
  },
  zoom: 8,
  minZoom: 8,
  maxZoom: 20,
  scrollZoom: false,
  bearing: 0,
};

export default Map;
