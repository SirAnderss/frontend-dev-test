import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer, { RootState } from '@src/redux/reducer';
import sagas from '@src/redux/sagas';
import { Provider } from 'react-redux';

export const initialMockState: RootState = {
  app: {
    isLoading: false,
  },
  products: {
    product: undefined,
    products: [],
  },
  cart: {
    products: [],
    total: 0,
    cartId: '',
    transationStatus: undefined,
  },
};

export function renderWithStore(ui: React.ReactElement) {
  const sagaMiddlare = createSagaMiddleware();
  const middleware = applyMiddleware(sagaMiddlare);

  const store = createStore(rootReducer, middleware);

  sagaMiddlare.run(sagas);

  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store,
  };
}

export function renderWithProviders(
  ui: React.ReactElement,
  { route = '/' } = {}
) {
  const sagaMiddlare = createSagaMiddleware();
  const middleware = applyMiddleware(sagaMiddlare);

  const store = createStore(rootReducer, middleware);

  window.history.pushState({}, 'Test page', route);

  sagaMiddlare.run(sagas);

  return {
    ...render(<Provider store={store}>{ui}</Provider>, {
      wrapper: BrowserRouter,
    }),
    store,
  };
}
