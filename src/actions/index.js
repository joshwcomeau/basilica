/* eslint-disable no-underscore-dangle */
export const ADD_TO_CART_REQUEST = 'ADD_TO_CART_REQUEST';
export const ADD_TO_CART_SUCCESS = 'ADD_TO_CART_SUCCESS';
export const ADD_TO_CART_FAILURE = 'ADD_TO_CART_FAILURE';
export const CHANGE_CITY = 'CHANGE_CITY';
export const CHANGE_PRODUCT_FILTER = 'CHANGE_PRODUCT_FILTER';
export const CHECKOUT = 'CHECKOUT';
export const FETCH_CART_FAILURE = 'FETCH_CART_FAILURE';
export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';
export const INITIALIZE_SHOPIFY = 'INITIALIZE_SHOPIFY';
export const LIGHTBOX_OPEN = 'LIGHTBOX_OPEN';
export const LIGHTBOX_CLOSE = 'LIGHTBOX_CLOSE';
export const LIGHTBOX_MOVE_NEXT = 'LIGHTBOX_MOVE_NEXT';
export const LIGHTBOX_MOVE_PREVIOUS = 'LIGHTBOX_MOVE_PREVIOUS';
export const LOAD_CART = 'LOAD_CART';
export const MAP_CLICK_START = 'MAP_CLICK_START';
export const MAP_CLICK_FINISH = 'MAP_CLICK_FINISH';
export const MAP_MOVE = 'MAP_MOVE';
export const MAP_ZOOM_START = 'MAP_ZOOM_START';
export const MAP_ZOOM_FINISH = 'MAP_ZOOM_FINISH';
export const MARKER_HOVER_START = 'MARKER_HOVER_START';
export const MARKER_HOVER_FINISH = 'MARKER_HOVER_FINISH';
export const REMOVE_CART_ITEM_REQUEST = 'REMOVE_CART_ITEM_REQUEST';
export const REMOVE_CART_ITEM_SUCCESS = 'REMOVE_CART_ITEM_SUCCESS';
export const REMOVE_CART_ITEM_FAILURE = 'REMOVE_CART_ITEM_FAILURE';
export const SET_PRODUCTS_WITHIN_PROXIMITY = 'SET_PRODUCTS_WITHIN_PROXIMITY';
export const TOGGLE_CART = 'TOGGLE_CART';
export const UPDATE_CART_QUANTITY_REQUEST = 'UPDATE_CART_QUANTITY_REQUEST';
export const UPDATE_CART_QUANTITY_SUCCESS = 'UPDATE_CART_QUANTITY_SUCCESS';
export const UPDATE_CART_QUANTITY_FAILURE = 'UPDATE_CART_QUANTITY_FAILURE';


export const addToCartRequest = ({ product, variantId, quantity = 1 }) => ({
  type: ADD_TO_CART_REQUEST,
  product,
  variantId,
  quantity,
});

export const addToCartSuccess = ({ addition }) => ({
  // `addition` can either be an array of items, or a single item.
  // Each item is of the shape { variantId, productId }
  type: ADD_TO_CART_SUCCESS,
  items: Array.isArray(addition) ? addition : [addition],
});

export const addToCartFailure = ({ error }) => ({
  type: ADD_TO_CART_FAILURE,
  error,
});

export const changeCity = ({ city }) => ({
  type: CHANGE_CITY,
  city,
});

export const changeProductFilter = filter => ({
  type: CHANGE_PRODUCT_FILTER,
  filter,
});

export const checkout = () => ({
  type: CHECKOUT,
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

export const lightboxOpen = ({ urls }) => ({
  type: LIGHTBOX_OPEN,
  urls,
});

export const lightboxClose = () => ({
  type: LIGHTBOX_CLOSE,
});

export const lightboxMoveNext = () => ({
  type: LIGHTBOX_MOVE_NEXT,
});

export const lightboxMovePrevious = () => ({
  type: LIGHTBOX_MOVE_PREVIOUS,
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

export const markerHoverStart = ({ id }) => ({
  type: MARKER_HOVER_START,
  id,
});

export const markerHoverFinish = () => ({
  type: MARKER_HOVER_FINISH,
});

export const removeCartItemRequest = ({ cartLineId }) => ({
  type: REMOVE_CART_ITEM_REQUEST,
  cartLineId,
});

export const removeCartItemSuccess = ({ cartLineId }) => ({
  type: REMOVE_CART_ITEM_SUCCESS,
  cartLineId,
});

export const removeCartItemFailure = ({ error }) => ({
  type: REMOVE_CART_ITEM_FAILURE,
  error,
});

export const setProductsWithinProximity = ({ ids }) => ({
  type: SET_PRODUCTS_WITHIN_PROXIMITY,
  ids,
});

export const toggleCart = () => ({
  type: TOGGLE_CART,
});

export const updateCartQuantityRequest = ({ cartLineId, quantity }) => ({
  type: UPDATE_CART_QUANTITY_REQUEST,
  cartLineId,
  quantity,
});

export const updateCartQuantitySuccess = ({ cartLineId, quantity }) => ({
  type: UPDATE_CART_QUANTITY_SUCCESS,
  cartLineId,
  quantity,
});

export const updateCartQuantityFailure = ({ error }) => ({
  type: UPDATE_CART_QUANTITY_FAILURE,
  error,
});
