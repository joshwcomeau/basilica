/* eslint-disable */
import { takeEvery } from 'redux-saga';
import { take, call, put, select } from 'redux-saga/effects';

import shopifyClient, { getCart, fetchProductsInCity } from '../utils/shopify.utils';
import {
  PRODUCTS_REQUEST,
  productsSuccess,
  productsFailure,
} from '../actions';


export function* initializeShopify() {
  while (true) {
    const { city } = yield take(PRODUCTS_REQUEST);


    // Get (or create, if nonexistent) our shopify cart
    const cart = yield call(getCart);

    try {
      const products = yield call(
        fetchProductsInCity,
        city
      );
      console.log(products, cart);

      yield put(productsSuccess({ products }));
    } catch (error) {
      yield put(productsFailure({ error }));
    }
  }
}
