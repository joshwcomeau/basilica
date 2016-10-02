import { combineReducers } from 'redux';

import { getDefaultCity } from '../utils/geo.utils';
import mapboxCitySettings from '../data/mapbox-city-settings';
import {
  MAP_CLICK_START,
  MAP_MOVE,
  MAP_ZOOM_START,
} from '../actions';


const defaultCity = getDefaultCity();
const initialState = {
  marker: null,
  center: mapboxCitySettings[defaultCity].centerCoords,
  zoom: mapboxCitySettings[defaultCity].zoom,
};

function markerReducer(state = initialState.marker, action) {
  switch (action.type) {
    case MAP_CLICK_START:
      return { lat: action.lat, lng: action.lng };
    default: return state;
  }
}

function zoomReducer(state = initialState.zoom, action) {
  switch (action.type) {
    case MAP_CLICK_START:
      // If we're super zoomed-out, we want to zoom in a bit.
      return state > 13 ? state : 13;
    case MAP_ZOOM_START: {
      const difference = action.direction === 'increment' ? 0.5 : -0.5;
      return state + difference;
    }
    default: return state;
  }
}

function centerReducer(state = initialState.center, action) {
  const { type, lat, lng } = action;

  switch (type) {
    case MAP_MOVE:
    case MAP_CLICK_START: {
      return { lat, lng };
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
