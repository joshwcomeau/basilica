import { combineReducers } from 'redux';

import cart from './cart.reducer';
import city from './city.reducer';
import lightbox from './lightbox.reducer';
import map from './map.reducer';
import products from './products.reducer';


export default combineReducers({
  cart,
  city,
  lightbox,
  map,
  products,
});
