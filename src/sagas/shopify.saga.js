/* eslint-disable no-unused-vars */
import { takeLatest } from 'redux-saga';
import { take, call, put, fork, select } from 'redux-saga/effects';

import {
  getCart,
  getProductById,
} from '../utils/shopify.utils';
import { findClosestPoint } from '../utils/geo.utils';
import planCoordinates from '../data/plan-coordinates';
import {
  MAP_CLICK,
  fetchProductRequest,
  fetchProductSuccess,
  fetchProductFailure,
  selectProduct,
} from '../actions';


// eslint-disable-next-line import/prefer-default-export
export function* initializeShopify() {
  yield call(getCart);

  // TODO: If a previously-persisted cart was retrieved, update the redux
  // store with the cart items.
}

function* findAndFetchProducts({ lat, lng }) {
  const city = yield select(state => state.city);
  const allProductsInCity = planCoordinates[city];

  // Find the closest product.
  // NOTE: While we display several list items, they're all variants of the
  // same product. A single map area may have 3 reprint years and 2 original
  // years, but they're all stored in the same Shopify product.
  const productId = findClosestPoint({
    sourcePoint: [lat, lng],
    pointsById: allProductsInCity,
  });

  // It's possible we've already loaded this product.
  let product = yield select(state => state.products.byId[productId]);

  // If not, we need to fetch it from our shopify shop.
  if (!product) {
    // Dispatch our 'request' action, so we can show a loading indicator.
    yield put(fetchProductRequest());

    try {
      product = yield call(getProductById, productId);

      yield put(fetchProductSuccess({ product }));
    } catch (error) {
      yield put(fetchProductFailure({ error }));
    }
  }

  // If we successfully retrieved the product, set it as selected.
  if (product) {
    yield put(selectProduct({ id: product.product_id }));
  }
}

export function* watchClickMap() {
  yield* takeLatest(MAP_CLICK, findAndFetchProducts);
}

export default function* () {
  yield [
    fork(initializeShopify),
    fork(watchClickMap),
  ];
}
