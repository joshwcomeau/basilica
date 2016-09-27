import { combineReducers } from 'redux';
import { CLICK_MAP } from '../actions';


const initialState = {
  marker: null,
};

function markerReducer(state = initialState.marker, action) {
  switch (action.type) {
    case CLICK_MAP:
      return { lat: action.lat, lng: action.lng };
    default: return state;
  }
}

export default combineReducers({ marker: markerReducer });
