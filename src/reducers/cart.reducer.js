import { combineReducers } from 'redux';
import { createSelector } from 'reselect';

import {
  ADD_TO_CART_SUCCESS,
  REMOVE_CART_ITEM_SUCCESS,
  UPDATE_CART_QUANTITY_SUCCESS,
  UPDATE_CART_QUANTITY_FAILURE,
  TOGGLE_CART,
} from '../actions';

const initialState = {
  isOpen: false,
  items: [],
  error: null,
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

    case REMOVE_CART_ITEM_SUCCESS: {
      const itemIndex = state.findIndex(item => (
        item.cartLineId === action.cartLineId
      ));

      return [
        ...state.slice(0, itemIndex),
        ...state.slice(itemIndex + 1),
      ];
    }

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

function errorReducer(state = initialState.error, action) {
  switch (action.type) {
    case UPDATE_CART_QUANTITY_SUCCESS: return null;
    case UPDATE_CART_QUANTITY_FAILURE: return action.error;
    default: return state;
  }
}

export default combineReducers({
  isOpen: isOpenReducer,
  items: itemsReducer,
  error: errorReducer,
});


// ////////////////////
// Selectors /////////
// //////////////////
const items = state => state.cart.items;

export const isEmptySelector = createSelector(
  items,
  items => items.length === 0
);

// Create an object that lets us know quickly whether a given product variant
// is in the cart. The keys are all productIds, and the values are the variant(s)
// that are in the cart.
export const includedVariantsSelector = createSelector(
  items,
  items => items.reduce((products, item) => {
    if (typeof products[item.productId] === 'undefined') {
      // eslint-disable-next-line no-param-reassign
      products[item.productId] = [];
    }

    products[item.productId].push(item.variantId);
    return products;
  }, {})
);
