/* eslint-disable no-unused-vars */
import { takeEvery, takeLatest } from 'redux-saga';
import { take, call, put, fork, select } from 'redux-saga/effects';

import {
  getCart,
  getProductsById,
} from '../utils/shopify.utils';
import { findPointsWithinMap } from '../utils/geo.utils';
import planCoordinates from '../data/plan-coordinates';
import {
  ADD_TO_CART_REQUEST,
  INITIALIZE_SHOPIFY,
  MAP_MOVE,
  MAP_CLICK_FINISH,
  MAP_ZOOM_FINISH,
  addToCartSuccess,
  addToCartFailure,
  fetchProductsRequest,
  fetchProductsSuccess,
  fetchProductsFailure,
  setProductsWithinProximity,
} from '../actions';


function* fetchProducts({ productIds }) {
  try {
    const newProducts = yield call(getProductsById, productIds);

    yield put(fetchProductsSuccess({ products: newProducts }));
  } catch (error) {
    yield put(fetchProductsFailure({ error }));
    return; // TODO: Can you use returns to short-circuit generators?
  }
}


function* initializeShopify() {
  const cart = yield call(getCart);

  const items = cart.attrs.line_items.map(item => ({
    variantId: item.variant_id,
    productId: item.image.product_id,
    quantity: item.quantity,
  }));

  if (items.length > 0) {
    // We first need to fetch all the items currently in our cart from
    // Shopify, since we need their info for display purposes.
    const productIds = items.map(item => item.productId);
    yield call(fetchProducts, { productIds });

    yield put(addToCartSuccess({ items }));
  }
}


function* loadProductsWithinMap({ neBound, swBound }) {
  const city = yield select(state => state.city);
  const allProductIdsInCity = planCoordinates[city];

  // TODO: the neBound/swBound provided by mapbox is a square that doesn't
  // take bearing into account. It includes way more maps than it should.
  // This may or may not be an issue. IF it is, we may need to do some maths
  // to make it more accurate.

  // Find all the products that fit within the bounding box of the map's
  // current viewport.
  const productIds = findPointsWithinMap({
    neBound,
    swBound,
    pointsById: allProductIdsInCity,
  });

  // It's possible we've already loaded some or all of these products.
  // Figure out which products we actually have to load.
  const productsById = yield select(state => state.products.byId);

  const productIdsToFetch = productIds.filter(productId => (
    typeof productsById[productId] === 'undefined'
  ));

  if (productIdsToFetch.length > 0) {
    // Dispatch our 'request' action, so we can show a loading indicator.
    yield put(fetchProductsRequest());

    yield call(fetchProducts, { productIds: productIdsToFetch });
  }

  // If we successfully retrieved the product, set it as selected.
  yield put(setProductsWithinProximity({ ids: productIds }));
}

function* addToCart({ product, variantId, quantity }) {
  const variantObject = product.variants.find(variant => (
    variant.id === variantId
  ));

  const cart = yield call(getCart);

  // Shopify's SDK has some warts.
  // One of them is it doesn't seem to preserve the item's title or
  // image by default, so we need to append it.
  variantObject.productTitle = product.title;
  variantObject.image = product.images.find(image => (
    image.variant_ids[0] === variantId
  ));

  try {
    yield call(cart.addVariants, {
      variant: variantObject,
      quantity,
    });

    yield put(addToCartSuccess({
      productId: product.product_id,
      variantId,
    }));
  } catch (error) {
    yield put(addToCartFailure({ error }));
  }
}

function* checkout() {
  const cart = yield call(getCart);
  const { checkoutUrl } = cart;
}

function* watchInitialize() {
  // No need to take multiple, since initialize should only be
  // called once.
  yield take(INITIALIZE_SHOPIFY);
  yield call(initializeShopify);
}

function* watchMap() {
  yield* takeLatest(
    [MAP_MOVE, MAP_CLICK_FINISH, MAP_ZOOM_FINISH],
    loadProductsWithinMap
  );
}

function* watchAddToCart() {
  yield* takeEvery(
    ADD_TO_CART_REQUEST,
    addToCart
  );
}

export default function* () {
  yield [
    fork(watchInitialize),
    fork(watchMap),
    fork(watchAddToCart),
  ];
}
