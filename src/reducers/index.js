import { combineReducers } from 'redux';

import city from './city.reducer';
import map from './map.reducer';


export default combineReducers({
  city,
  map,
});
