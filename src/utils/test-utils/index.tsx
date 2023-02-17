import { render } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';

import { AnyAction, applyMiddleware, createStore, Store } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '@src/redux/reducer';
import sagas from '@src/redux/sagas';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';

export function getStoreWrapper(
  store: Store<any, AnyAction>,
  route?: string
): React.FC {
  return ({ children }: { children?: React.ReactNode }) => (
    <MemoryRouter initialEntries={route ? [route] : undefined}>
      <Provider store={store}>{children}</Provider>
    </MemoryRouter>
  );
}

export function renderWithStore(ui: React.ReactElement) {
  const sagaMiddlare = createSagaMiddleware();
  const middleware = applyMiddleware(sagaMiddlare);

  const store = createStore(rootReducer, middleware);

  sagaMiddlare.run(sagas);

  return {
    user: userEvent.setup(),
    store,
    ...render(<Provider store={store}>{ui}</Provider>),
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
    user: userEvent.setup(),
    ...render(<Provider store={store}>{ui}</Provider>, {
      wrapper: BrowserRouter,
    }),
    store,
  };
}
