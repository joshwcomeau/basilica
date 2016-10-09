import { combineReducers } from 'redux';

import { getDefaultCity } from '../utils/geo.utils';
import mapboxCitySettings from '../data/mapbox-city-settings';
import neighbourhoodMarkers from '../data/neighbourhood-markers';

import {
  CHANGE_CITY,
  MAP_CLICK_START,
  MAP_CLICK_FINISH,
  MAP_MOVE,
  MAP_ZOOM_START,
  MARKER_HOVER_START,
  MARKER_HOVER_FINISH,
} from '../actions';


const defaultCity = getDefaultCity();
const initialState = {
  markers: neighbourhoodMarkers[defaultCity],
  activeMarkerId: null,
  center: mapboxCitySettings[defaultCity].centerCoords,
  zoom: mapboxCitySettings[defaultCity].zoom,
};

function markersReducer(state = initialState.markers, action) {
  switch (action.type) {
    case CHANGE_CITY:
      return neighbourhoodMarkers[action.city];
    default: return state;
  }
}

function activeMarkerIdReducer(state = initialState.activeMarkerId, action) {
  switch (action.type) {
    case MARKER_HOVER_START: return action.id;
    case MAP_CLICK_FINISH:
    case MARKER_HOVER_FINISH: return null;
    default: return state;
  }
}

function zoomReducer(state = initialState.zoom, action) {
  switch (action.type) {
    case MAP_CLICK_START:
      // If we're super zoomed-out, we want to zoom in a bit.
      return state > 14.5 ? state : 14.5;
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
      console.log('Going to ', lat, lng);
      return { lat, lng };
    }
    default:
      return state;
  }
}

export default combineReducers({
  markers: markersReducer,
  activeMarkerId: activeMarkerIdReducer,
  zoom: zoomReducer,
  center: centerReducer,
});
