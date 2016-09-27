// eslint-disable-next-line no-unused-vars
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import ReactMapboxGl, {
  Layer,
  Feature,
  ScaleControl,
  ZoomControl,
} from 'react-mapbox-gl';


import { accessToken } from '../../data/mapbox-config.json';
import style from '../../data/mapbox-style-streets.json';
import './index.scss';


const Map = ({ center, zoom, minZoom, maxZoom, scrollZoom, bearing }) => {
  const classes = classNames(['map']);

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
        center={center.slice().reverse()}
        zoom={[zoom]}
        minZoom={minZoom}
        maxZoom={maxZoom}
        scrollZoom={scrollZoom}
        bearing={bearing}
        movingMethod="flyTo"
        accessToken={accessToken}
      >
        <ScaleControl />
        <ZoomControl />
        <Layer
          type="symbol"
          id="marker"
          layout={{ 'icon-image': 'marker-15' }}
        >
          <Feature
            key="clicked-point"
            coordinates={[45.4998913, -73.5605561]}
          />
        </Layer>
      </ReactMapboxGl>
    </div>
  );
};

Map.propTypes = {
  center: PropTypes.arrayOf(PropTypes.number),
  zoom: PropTypes.number,
  minZoom: PropTypes.number,
  maxZoom: PropTypes.number,
  scrollZoom: PropTypes.bool,
  bearing: PropTypes.number,
};

Map.defaultProps = {
  center: [45.503634, -73.610406],
  zoom: 11,
  minZoom: 10,
  maxZoom: 20,
  scrollZoom: false,
  bearing: -40,
};

export default Map;
