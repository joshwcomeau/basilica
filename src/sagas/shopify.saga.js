import { takeEvery } from 'redux-saga';
import { take, call, put, select } from 'redux-saga/effects';
import ShopifyBuy from 'shopify-buy';

import {
  COLLECTION_REQUEST,
  collectionSuccess,
  collectionFailure,
} from '../actions';


let shopifyCart = null;
const savedCartIdKey = 'basilica-saved-cart-id';

const client = ShopifyBuy.buildClient({
  apiKey: 'dac0c691a19ce7408bfb4f866e813ea5',
  myShopifyDomain: 'basilica-plans',
  appId: '6',
});

export function* fetchCollection() {
  while (true) {
    yield take(COLLECTION_REQUEST);

    // If the Shopify cart hasn't been initialized, we need to do that first
    if (!shopifyCart) {
      const savedCartId = localStorage.getItem(savedCartIdKey);

      if (savedCartId) {
        shopifyCart = call(client.fetchCart, savedCartId);
      } else {
        shopifyCart = call(client.createCart);
        localStorage.setItem(savedCartIdKey, shopifyCart.id);
      }
    }

    console.log('GOt cart!', shopifyCart);
  }
}
