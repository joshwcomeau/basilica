import { combineReducers } from 'redux';

import city from './city.reducer';
import map from './map.reducer';
import products from './products.reducer';


export default combineReducers({
  city,
  map,
  products,
});
