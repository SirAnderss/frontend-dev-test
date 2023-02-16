import { combineReducers } from 'redux';

import { appReducer } from './app';
import { cartReducer } from './cart';
import { productsReducer } from './products';

// combine reducers
const rootReducer = combineReducers({
  app: appReducer,
  products: productsReducer,
  cart: cartReducer,
});

// store types for selectors
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
