/* eslint-disable no-underscore-dangle */
export const ADD_TO_CART_REQUEST = 'ADD_TO_CART_REQUEST';
export const ADD_TO_CART_SUCCESS = 'ADD_TO_CART_SUCCESS';
export const ADD_TO_CART_FAILURE = 'ADD_TO_CART_FAILURE';
export const CHANGE_CITY = 'CHANGE_CITY';
export const CHANGE_PRODUCT_FILTER = 'CHANGE_PRODUCT_FILTER';
export const FETCH_CART_FAILURE = 'FETCH_CART_FAILURE';
export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';
export const INITIALIZE_SHOPIFY = 'INITIALIZE_SHOPIFY';
export const LOAD_CART = 'LOAD_CART';
export const MAP_CLICK_START = 'MAP_CLICK_START';
export const MAP_CLICK_FINISH = 'MAP_CLICK_FINISH';
export const MAP_MOVE = 'MAP_MOVE';
export const MAP_ZOOM_START = 'MAP_ZOOM_START';
export const MAP_ZOOM_FINISH = 'MAP_ZOOM_FINISH';
export const SET_VISIBLE_PRODUCTS = 'SET_VISIBLE_PRODUCTS';


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

export const changeProductFilter = ({ filter }) => ({
  type: CHANGE_PRODUCT_FILTER,
  filter,
});

export const fetchCartFailure = ({ error }) => ({
  type: FETCH_CART_FAILURE,
  error,
});

export const fetchProductsRequest = () => ({
  type: FETCH_PRODUCTS_REQUEST,
});

export const fetchProductsSuccess = ({ products }) => ({
  type: FETCH_PRODUCTS_SUCCESS,
  products,
});

export const fetchProductsFailure = ({ error }) => ({
  type: FETCH_PRODUCTS_FAILURE,
  error,
});

export const initializeShopify = () => ({
  type: INITIALIZE_SHOPIFY,
});

export const loadCart = () => ({
  type: LOAD_CART,
});

export const mapClickStart = ({ lat, lng }) => ({
  type: MAP_CLICK_START,
  lat,
  lng,
});

export const mapClickFinish = map => ({
  type: MAP_CLICK_FINISH,
  neBound: map.getBounds()._ne,
  swBound: map.getBounds()._sw,
});

export const mapMove = map => ({
  type: MAP_MOVE,
  lat: map.getCenter().lat,
  lng: map.getCenter().lng,
  neBound: map.getBounds()._ne,
  swBound: map.getBounds()._sw,
});

export const mapZoomStart = direction => ({
  type: MAP_ZOOM_START,
  direction,
});

export const mapZoomFinish = map => ({
  type: MAP_ZOOM_FINISH,
  zoom: map.getZoom(),
  neBound: map.getBounds()._ne,
  swBound: map.getBounds()._sw,
});

export const setVisibleProducts = ({ ids }) => ({
  type: SET_VISIBLE_PRODUCTS,
  ids,
});
