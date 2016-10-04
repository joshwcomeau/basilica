/* eslint-disable no-unused-vars */
import { takeLatest } from 'redux-saga';
import { take, call, put, fork, select } from 'redux-saga/effects';

import {
  getCart,
  getProductsById,
} from '../utils/shopify.utils';
import { findPointsWithinMap } from '../utils/geo.utils';
import planCoordinates from '../data/plan-coordinates';
import {
  MAP_MOVE,
  MAP_CLICK_FINISH,
  MAP_ZOOM_FINISH,
  fetchProductsRequest,
  fetchProductsSuccess,
  fetchProductsFailure,
  setProductsWithinProximity,
} from '../actions';


// eslint-disable-next-line import/prefer-default-export
export function* initializeShopify() {
  yield call(getCart);

  // TODO: If a previously-persisted cart was retrieved, update the redux
  // store with the cart items.
}

function* findAndFetchProducts({ neBound, swBound }) {
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

  const productIdsToLoad = productIds.filter(productId => (
    typeof productsById[productId] === 'undefined'
  ));

  if (productIdsToLoad.length > 0) {
    // Dispatch our 'request' action, so we can show a loading indicator.
    yield put(fetchProductsRequest());

    try {
      const newProducts = yield call(getProductsById, productIdsToLoad);

      yield put(fetchProductsSuccess({ products: newProducts }));
    } catch (error) {
      yield put(fetchProductsFailure({ error }));
      return; // TODO: Can you use returns to short-circuit generators?
    }
  }

  // If we successfully retrieved the product, set it as selected.
  yield put(setProductsWithinProximity({ ids: productIds }));
}

export function* watchMap() {
  yield* takeLatest(
    [MAP_MOVE, MAP_CLICK_FINISH, MAP_ZOOM_FINISH],
    findAndFetchProducts
  );
}

export default function* () {
  yield [
    fork(initializeShopify),
    fork(watchMap),
  ];
}
