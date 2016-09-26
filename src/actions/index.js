export const ADD_TO_CART_REQUEST = 'ADD_TO_CART_REQUEST';
export const ADD_TO_CART_SUCCESS = 'ADD_TO_CART_SUCCESS';
export const ADD_TO_CART_FAILURE = 'ADD_TO_CART_FAILURE';
export const CHANGE_CITY = 'CHANGE_CITY';
export const CLICK_MAP = 'CLICK_MAP';
export const INITIALIZE_SHOPIFY = 'INITIALIZE_SHOPIFY';
export const LOAD_CART = 'LOAD_CART';
export const FETCH_CART_FAILURE = 'FETCH_CART_FAILURE';
export const PRODUCTS_REQUEST = 'PRODUCTS_REQUEST';
export const PRODUCTS_SUCCESS = 'PRODUCTS_SUCCESS';
export const PRODUCTS_FAILURE = 'PRODUCTS_FAILURE';


export const addToCartRequest = ({ product, quantity = 1 }) => ({
  type: ADD_TO_CART_REQUEST,
  product,
  quantity,
});

export const addToCartSuccess = () => ({
  type: ADD_TO_CART_SUCCESS,
});

export const addToCartFailure = ({ error }) => ({
  type: ADD_TO_CART_FAILURE,
  error,
});

export const changeCity = ({ city }) => ({
  type: CHANGE_CITY,
  city,
});

export const clickMap = ({ lat, lng }) => ({
  type: CLICK_MAP,
  lat,
  lng,
});

export const loadCart = () => ({
  type: LOAD_CART,
});

export const fetchCartFailure = ({ error }) => ({
  type: FETCH_CART_FAILURE,
  error,
});

export const productsRequest = ({ city }) => ({
  type: PRODUCTS_REQUEST,
  city,
});

export const productsSuccess = ({ products }) => ({
  type: PRODUCTS_SUCCESS,
  products,
});

export const productsFailure = ({ error }) => ({
  type: PRODUCTS_FAILURE,
  error,
});
