// eslint-disable-next-line no-unused-vars
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import ReactMapboxGl, {
  Layer,
  Feature,
} from 'react-mapbox-gl';
import debounce from 'lodash.debounce';

import { accessToken } from '../../data/mapbox-config.json';
import style from '../../data/mapbox-style-light.json';
import './index.scss';


class Map extends Component {
  constructor(props) {
    super(props);

    this.handleMapMove = this.handleMapMove.bind(this);
  }

  componentWillMount() {
    this.debouncedMapZoom = debounce(this.props.mapZoom, 100);
  }

  handleMapMove(map) {
    // When the component re-renders, Mapbox will try to re-fire its
    // `onMoveEnd` event. We want to avoid these false positives!
    // By checking if the center point has _actually_ moved, we can choose
    // whether or not this mapMove event is valid.
    const { centerCoords } = this.props;
    const { lat, lng } = map.getCenter();

    if (lat !== centerCoords.lat || lng !== centerCoords.lng) {
      this.props.mapMove(map);
    }
  }

  render() {
    const {
      centerCoords,
      markerCoords,
      zoom,
      minZoom,
      maxZoom,
      scrollZoom,
      bearing,
      mapClick,
      mapZoomIncrease,
      mapZoomDecrease,
    } = this.props;

    const classes = classNames(['map']);

    // See note above for explanation as to why we're storing this on the
    // component itself.
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
          onClick={mapClick}
          onMoveEnd={this.handleMapMove}
          onZoom={this.debouncedMapZoom}
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
  }
}

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
  mapClick: PropTypes.func,
  mapMove: PropTypes.func,
  mapZoom: PropTypes.func,
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
  onClick() {},
  onMoveEnd() {},
  onZoom() {},
};

export default Map;
