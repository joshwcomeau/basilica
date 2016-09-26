/* eslint-disable no-unused-vars */
import { takeLatest } from 'redux-saga';
import { take, call, put, select } from 'redux-saga/effects';

import shopifyClient, { getCart } from '../utils/shopify.utils';
import { findClosestPoint } from '../utils/geo.utils';
import planCoordinates from '../data/plan-coordinates';
import {
  CLICK_MAP,
} from '../actions';


// eslint-disable-next-line import/prefer-default-export
export function* initializeShopify() {
  yield call(getCart);

  // TODO: If a previously-persisted cart was retrieved, update the redux
  // store with the cart items.
}

function* findAndFetchProducts({ lat, lng }) {
  const city = yield select(state => state.city);
  const coordsInCity = planCoordinates[city];
}

export function* watchClickMap() {
  yield* takeLatest(CLICK_MAP, findAndFetchProducts);
}
