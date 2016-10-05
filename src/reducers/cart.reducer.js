import { combineReducers } from 'redux';
import { createSelector } from 'reselect';

import {
  ADD_TO_CART_SUCCESS,
  UPDATE_CART_QUANTITY_SUCCESS,
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
  switch (action.type) {
    case ADD_TO_CART_SUCCESS: return [...state, ...action.items];

    case UPDATE_CART_QUANTITY_SUCCESS: {
      const itemIndex = state.findIndex(item => (
        item.cartLineId === action.cartLineId
      ));

      const newItem = {
        ...state[itemIndex],
        quantity: action.quantity,
      };

      return [
        ...state.slice(0, itemIndex),
        newItem,
        ...state.slice(itemIndex + 1),
      ];
    }

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
