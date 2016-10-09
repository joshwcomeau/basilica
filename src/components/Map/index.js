// eslint-disable-next-line no-unused-vars
import React, { Component, PropTypes, cloneElement } from 'react';
import classNames from 'classnames';
import ReactMapboxGl, { Feature } from 'react-mapbox-gl';
import debounce from 'lodash.debounce';

import { accessToken } from '../../data/mapbox-config.json';
import style from '../../data/mapbox-style-light.json';

import Button from '../Button';
import InnerWrapper from '../InnerWrapper';
import MapMarkerLabel from '../MapMarkerLabel';
import MapMarkerLayer from '../MapMarkerLayer';
import './index.scss';


class Map extends Component {
  constructor(props) {
    super(props);

    this.handleMapMove = this.handleMapMove.bind(this);
    this.handleMapClick = this.handleMapClick.bind(this);
    this.handleZoomIn = this.handleMapZoomChange.bind(this, 'increment');
    this.handleZoomOut = this.handleMapZoomChange.bind(this, 'decrement');
    this.handleMapHoverStart = this.handleMapHoverStart.bind(this);
    this.handleMapHoverEnd = this.handleMapHoverEnd.bind(this);
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

  handleMapClick(map, coords) {
    this.props.mapClickStart(coords);
    this.debounceMapClickFinish(this.map);
  }

  handleMapHoverStart(id) {
    if (id !== this.props.activeMarkerId) {
      this.props.markerHoverStart({ id });
    }
  }

  handleMapHoverEnd() {
    this.props.markerHoverFinish();
  }

  render() {
    const {
      centerCoords,
      markerCoords,
      activeMarkerId,
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

    let activePin = null;
    const pins = [];
    const labels = [];

    markerCoords.forEach(marker => {
      const { id, lat, lng } = marker;

      const feature = (
        <Feature
          key={id}
          coordinates={[lng, lat]}
          onHover={() => this.handleMapHoverStart(id)}
          onEndHover={this.handleMapHoverEnd}
          onClick={(map) => this.handleMapClick(map, { lat, lng })}
        />
      );

      // If this is the active feature, there are two copies of it;
      // The blue 'hover-state' one, and the underlying black one.
      // We only want to fire the click event once, on the blue one.
      if (id === activeMarkerId) {
        activePin = cloneElement(feature, { onClick: null });
      }

      pins.push(feature);

      labels.push(<MapMarkerLabel key={id} {...marker} />);
    });

    return (
      <div className={classes}>
        <InnerWrapper className="map-controls">
          <div className="zoom-controls">
            <Button icon="plus" onClick={zoom < maxZoom && this.handleZoomIn} />
            <Button icon="minus" onClick={zoom > minZoom && this.handleZoomOut} />
          </div>
        </InnerWrapper>

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
          onMoveEnd={this.handleMapMove}
          attributionPosition="top-right"
          onStyleLoad={map => this.map = map}
        >
          <MapMarkerLayer>{pins}</MapMarkerLayer>
          {
            activePin
              ? <MapMarkerLayer type="active">{activePin}</MapMarkerLayer>
              : null
          }
          {labels}
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
  markerCoords: PropTypes.arrayOf(PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
    label: PropTypes.string,
  })),
  activeMarkerId: PropTypes.string,
  zoom: PropTypes.number.isRequired,
  minZoom: PropTypes.number.isRequired,
  maxZoom: PropTypes.number.isRequired,
  scrollZoom: PropTypes.bool.isRequired,
  bearing: PropTypes.number.isRequired,
  mapMove: PropTypes.func.isRequired,
  mapClickStart: PropTypes.func.isRequired,
  mapClickFinish: PropTypes.func.isRequired,
  mapZoomStart: PropTypes.func.isRequired,
  mapZoomFinish: PropTypes.func.isRequired,
  markerHoverStart: PropTypes.func.isRequired,
  markerHoverFinish: PropTypes.func.isRequired,
};

Map.defaultProps = {
  centerCoords: {
    lat: 45.503634,
    lng: -73.610406,
  },
  scrollZoom: false,
  bearing: 0,
  mapMove() {},
  mapClickStart() {},
  mapClickFinish() {},
  mapZoomStart() {},
  mapZoomFinish() {},
};

export default Map;
