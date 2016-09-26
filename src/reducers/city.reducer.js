import { CHANGE_CITY } from '../actions';

import { getDefaultCity } from '../utils/geo.utils';

export default function reducer(state = getDefaultCity(), action) {
  switch (action.type) {
    case CHANGE_CITY: return action.city;
    default: return state;
  }
}
