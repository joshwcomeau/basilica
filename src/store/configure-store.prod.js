import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reducer from '../reducers';


export default function configureStore() {
  const middlewares = [thunk];
  const store = createStore(
    reducer,
    applyMiddleware(...middlewares)
  );

  return store;
}
