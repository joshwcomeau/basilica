import { combineReducers } from 'redux';
import { createSelector } from 'reselect';

import {
  ADD_TO_CART_SUCCESS,
  TOGGLE_CART,
} from '../actions';

const initialState = {
  isOpen: false,
  items: [],
};


function isOpenReducer(state = initialState.isOpen, action) {
  switch (action.type) {
    case TOGGLE_CART: return !state;
    default: return state;
  }
}

function itemsReducer(state = initialState.items, action) {
  const { type, items } = action;

  switch (type) {
    case ADD_TO_CART_SUCCESS: return [...state, ...items];
    default: return state;
  }
}

export default combineReducers({
  isOpen: isOpenReducer,
  items: itemsReducer,
});


// ////////////////////
// Selectors /////////
// //////////////////
const items = state => state.cart.items;

export const isEmptySelector = createSelector(
  items, (items) => items.length === 0
);
