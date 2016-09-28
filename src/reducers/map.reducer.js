import { combineReducers } from 'redux';
import isEqual from 'lodash.isequal';

import { getDefaultCity } from '../utils/geo.utils';
import mapboxCitySettings from '../data/mapbox-city-settings';
import {
  MAP_CLICK,
  MAP_MOVE,
  MAP_ZOOM_DECREASE,
  MAP_ZOOM_INCREASE,
} from '../actions';


const defaultCity = getDefaultCity();
const initialState = {
  marker: null,
  center: mapboxCitySettings[defaultCity].centerCoords,
  zoom: mapboxCitySettings[defaultCity].zoom,
};

function markerReducer(state = initialState.marker, action) {
  switch (action.type) {
    case MAP_CLICK:
      return { lat: action.lat, lng: action.lng };
    default: return state;
  }
}

function zoomReducer(state = initialState.zoom, action) {
  switch (action.type) {
    case MAP_CLICK:
      // If we're super zoomed-out, we want to zoom in a bit.
      return state > 12 ? state : 12;
    case MAP_ZOOM_INCREASE: return state + 0.5;
    case MAP_ZOOM_DECREASE: return state - 0.5;
    default: return state;
  }
}

function centerReducer(state = initialState.center, action) {
  const { type, ...coords } = action;

  switch (type) {
    case MAP_MOVE:
    case MAP_CLICK: {
      // Ignore actions that don't actually change the center.
      // This is an annoying quirk caused by the fact that re-rendering Mapbox
      // causes the `onMoveEnd` to re-fire, which means we get stuck in an
      // endless loop.
      // A nicer solution would be to handle this in the component, where the
      // action is dispatched; sadly, though, there is a closure issue that
      // makes it even messier than this :(
      const isUpdated = !isEqual(state, coords);
      return isUpdated ? { lat: action.lat, lng: action.lng } : state;
    }
    default:
      return state;
  }
}

export default combineReducers({
  marker: markerReducer,
  zoom: zoomReducer,
  center: centerReducer,
});
