import { combineReducers } from 'redux';

import {
  FETCH_PRODUCT_REQUEST,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_FAILURE,
  SELECT_PRODUCT,
} from '../actions';


const initialState = {
  isFetching: false,
  byId: {},
  selectedId: null,
};

function isFetchingReducer(state = initialState.isFetching, action) {
  switch (action.type) {
    case FETCH_PRODUCT_REQUEST:
      return true;
    case FETCH_PRODUCT_SUCCESS:
    case FETCH_PRODUCT_FAILURE:
      return false;
    default:
      return state;
  }
}

function byIdReducer(state = initialState.byId, action) {
  switch (action.type) {
    case FETCH_PRODUCT_SUCCESS:
      return {
        ...state,
        [action.product.product_id]: action.product,
      };
    default:
      return state;
  }
}

function selectedIdReducer(state = initialState.selectedId, action) {
  switch (action.type) {
    case SELECT_PRODUCT:
      return action.id;
    default: return state;
  }
}

export default combineReducers({
  isFetching: isFetchingReducer,
  byId: byIdReducer,
  selectedId: selectedIdReducer,
});
