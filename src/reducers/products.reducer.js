import { combineReducers } from 'redux';
import { createSelector } from 'reselect';
import pick from 'lodash.pick';

import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  SET_VISIBLE_PRODUCTS,
} from '../actions';


const initialState = {
  isFetching: false,
  byId: {},
  visibleIds: null,
};

function isFetchingReducer(state = initialState.isFetching, action) {
  switch (action.type) {
    case FETCH_PRODUCTS_REQUEST:
      return true;
    case FETCH_PRODUCTS_SUCCESS:
    case FETCH_PRODUCTS_FAILURE:
      return false;
    default:
      return state;
  }
}

function byIdReducer(state = initialState.byId, action) {
  switch (action.type) {
    case FETCH_PRODUCTS_SUCCESS:
      return action.products.reduce((newState, product) => {
        // eslint-disable-next-line no-param-reassign
        newState[product.product_id] = product;
        return newState;
      }, { ...state });
    default:
      return state;
  }
}

function visibleIdsReducer(state = initialState.visibleIds, action) {
  switch (action.type) {
    case SET_VISIBLE_PRODUCTS:
      return action.ids;
    default: return state;
  }
}

export default combineReducers({
  isFetching: isFetchingReducer,
  byId: byIdReducer,
  visibleIds: visibleIdsReducer,
});


// ////////////////////
// Selectors /////////
// //////////////////
const byId = state => state.products.byId;
const visibleIds = state => state.products.visibleIds;

export const visibleProductsSelector = createSelector(
  [byId, visibleIds],
  (byId, visibleIds) => pick(byId, visibleIds)
);

export const productListSelector = createSelector(
  [byId],
  byId => Object.keys(byId).map(id => byId[id])
);
