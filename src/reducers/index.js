import { combineReducers } from 'redux';

import city from './city.reducer';
import map from './map.reducer';
import products from './products.reducer';
import lightbox from './lightbox.reducer';


export default combineReducers({
  city,
  map,
  products,
  lightbox,
});
