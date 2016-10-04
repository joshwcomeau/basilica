import { combineReducers } from 'redux';
import { createSelector } from 'reselect';

import {
  CHANGE_PRODUCT_FILTER,
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  SET_PRODUCTS_WITHIN_PROXIMITY,
} from '../actions';
import productFilters from '../data/product-filters';


const initialState = {
  isFetching: false,
  byId: {},
  idsWithinProximity: [],
  filter: productFilters[0],
};


function filterReducer(state = initialState.filter, action) {
  const { type, filter } = action;

  switch (type) {
    case CHANGE_PRODUCT_FILTER: return filter;
    default: return state;
  }
}

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

function idsWithinProximityReducer(state = initialState.idsWithinProximity, action) {
  switch (action.type) {
    case SET_PRODUCTS_WITHIN_PROXIMITY:
      return action.ids;
    default: return state;
  }
}

export default combineReducers({
  isFetching: isFetchingReducer,
  byId: byIdReducer,
  idsWithinProximity: idsWithinProximityReducer,
  filter: filterReducer,
});


// ////////////////////
// Selectors /////////
// //////////////////
const byId = state => state.products.byId;
const idsWithinProximity = state => state.products.idsWithinProximity;
const filter = state => state.products.filter;

export const visibleProductIdsSelector = createSelector(
  [byId, idsWithinProximity, filter],
  (byId, idsWithinProximity, filter) => (
    idsWithinProximity
      .filter((productId) => {
        const product = byId[productId];

        switch (filter) {
          case 'print': return product.product_type === 'Print';
          case 'original': return product.product_type === 'Original';
          default: return true;
        }
      })
  )
);

export const visibleProductsSelector = createSelector(
  [byId, visibleProductIdsSelector],
  (byId, visibleProductIds) => (
    visibleProductIds.map(productId => byId[productId])
  )
);
