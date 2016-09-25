import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import Perf from 'react-addons-perf';

import reducer from '../reducers';

import DevTools from '../components/DevTools';


window.Perf = Perf;

export default function configureStore() {
  const middlewares = [thunk];
  const store = createStore(
    reducer,
    compose(
      applyMiddleware(...middlewares),
      DevTools.instrument()
    )
  );

  // Allow direct access to the store, for debugging/testing
  window.store = store;

  return store;
}
