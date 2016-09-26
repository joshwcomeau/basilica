export const ADD_TO_CART_REQUEST = 'ADD_TO_CART_REQUEST';
export const ADD_TO_CART_SUCCESS = 'ADD_TO_CART_SUCCESS';
export const ADD_TO_CART_FAILURE = 'ADD_TO_CART_FAILURE';
export const CHANGE_CITY = 'CHANGE_CITY';
export const CLICK_MAP = 'CLICK_MAP';
export const COLLECTION_REQUEST = 'COLLECTION_REQUEST';
export const COLLECTION_SUCCESS = 'COLLECTION_SUCCESS';
export const COLLECTION_FAILURE = 'COLLECTION_FAILURE';
export const INITIALIZE_SHOPIFY = 'INITIALIZE_SHOPIFY';
export const LOAD_CART = 'LOAD_CART';


export const changeCity = ({ city }) => ({
  type: CHANGE_CITY,
  city,
});

export const collectionRequest = ({ collectionId }) => ({
  type: COLLECTION_REQUEST,
  collectionId,
});

export const collectionSuccess = ({ collection }) => ({
  type: COLLECTION_SUCCESS,
  collection,
});

export const collectionFailure = ({ error }) => ({
  type: COLLECTION_FAILURE,
  error,
});

export const initializeShopify = () => ({
  type: INITIALIZE_SHOPIFY,
});

export const loadCart = ({ cart }) => ({
  type: LOAD_CART,
  cart,
});
