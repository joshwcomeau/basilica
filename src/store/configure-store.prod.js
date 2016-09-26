import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import reducer from '../reducers';
import { fetchCollection } from '../sagas/shopify.saga';


export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware();

  const middlewares = [sagaMiddleware];
  const store = createStore(
    reducer,
    applyMiddleware(...middlewares)
  );

  sagaMiddleware.run(fetchCollection);

  return store;
}
