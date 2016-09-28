/* eslint-disable no-unused-vars */
import { takeLatest } from 'redux-saga';
import { take, call, put, fork, select } from 'redux-saga/effects';

import shopifyClient, { getCart } from '../utils/shopify.utils';
import { findClosestPoints } from '../utils/geo.utils';
import planCoordinates from '../data/plan-coordinates';
import {
  MAP_CLICK,
} from '../actions';


// eslint-disable-next-line import/prefer-default-export
export function* initializeShopify() {
  yield call(getCart);

  // TODO: If a previously-persisted cart was retrieved, update the redux
  // store with the cart items.
}

function* findAndFetchProducts({ lat, lng }) {
  const city = yield select(state => state.city);
  const plansInCity = planCoordinates[city];
  const planIds = findClosestPoints({
    sourcePoint: [lat, lng],
    pointsById: plansInCity,
  });

  const products = yield call(shopifyClient.fetchQueryProducts, {
    product_ids: planIds,
  });
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
