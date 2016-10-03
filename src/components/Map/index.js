// eslint-disable-next-line no-unused-vars
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import ReactMapboxGl, {
  Layer,
  Feature,
} from 'react-mapbox-gl';
import debounce from 'lodash.debounce';

import Button from '../Button';
import { accessToken } from '../../data/mapbox-config.json';
import style from '../../data/mapbox-style-light.json';
import './index.scss';


class Map extends Component {
  constructor(props) {
    super(props);

    this.handleMapMove = this.handleMapMove.bind(this);
    this.handleMapClick = this.handleMapClick.bind(this);
    this.handleZoomIn = this.handleMapZoomChange.bind(this, 'increment');
    this.handleZoomOut = this.handleMapZoomChange.bind(this, 'decrement');
    this.debounceMapZoomFinish = debounce(this.props.mapZoomFinish, 510);
    this.debounceMapClickFinish = debounce(this.props.mapClickFinish, 510);
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

  handleMapZoomChange(direction) {
    // Ok, so this is fairly hideous.
    // When we trigger a zoom change, the map will start its animation. The
    // map's bounding boxes aren't optimistically updated, so we need to wait
    // until the map has finished zooming to re-fetch our items.
    // Dispatch the 'begin' event right away to trigger the animation, and
    // then just wait until it's ready.
    this.props.mapZoomStart(direction);
    this.debounceMapZoomFinish(this.map);
  }

  handleMapClick(map, event) {
    this.props.mapClickStart(event.lngLat);
    this.debounceMapClickFinish(this.map);
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
        <div className="map-controls">
          <div className="zoom-controls">
            <Button icon="plus" onClick={zoom < maxZoom && this.handleZoomIn} />
            <Button icon="minus" onClick={zoom > minZoom && this.handleZoomOut} />
          </div>
        </div>

        <div className="map-overlay" />

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
          onClick={this.handleMapClick}
          onMoveEnd={this.handleMapMove}
          attributionPosition="top-right"
          onStyleLoad={map => this.map = map}
        >
          <Layer
            type="symbol"
            id="marker"
            layout={{ 'icon-image': 'map-pin-default' }}
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
  mapMove: PropTypes.func,
  mapClickStart: PropTypes.func,
  mapClickFinish: PropTypes.func,
  mapZoomStart: PropTypes.func,
  mapZoomFinish: PropTypes.func,
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
  mapMove() {},
  mapClickStart() {},
  mapClickFinish() {},
  mapZoomStart() {},
  mapZoomFinish() {},
};

export default Map;
