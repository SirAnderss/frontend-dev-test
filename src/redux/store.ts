import { applyMiddleware, compose, createStore, Store } from 'redux';
import { Persistor, persistReducer, persistStore } from 'redux-persist';

import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './reducer';
import sagas from './sagas';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

function configureStore(): { store: Store; persistor: Persistor } {
  const sagaMiddlare = createSagaMiddleware();

  const rootPersistConfig = {
    key: 'root',
    storage,
  };

  let middleware = applyMiddleware(sagaMiddlare);

  // config devtools
  if (process.env.NODE_ENV !== 'production') {
    const devToolsExtension =
      (typeof window !== 'undefined' &&
        window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__']) ||
      compose;

    if (typeof devToolsExtension === 'function') {
      middleware = compose(middleware, devToolsExtension());
    }
  }

  // config persistent store
  const persistedReducer = persistReducer(rootPersistConfig, rootReducer);
  const store = createStore(persistedReducer, middleware);
  const persistor = persistStore(store);

  sagaMiddlare.run(sagas);

  return {
    store,
    persistor,
  };
}

export default configureStore;
