import { produce } from 'immer';
import { createReducer } from 'redux-act';
import { setProduct, setProducts } from './actions';
import { IProductState } from './types';

const initialState: IProductState = {
  product: undefined,
  products: [],
};

export const productsReducer = createReducer<IProductState>({}, initialState);

// set current product for navigation
productsReducer.on(setProduct, (state, payload) => {
  return produce(state, draftState => {
    draftState.product = payload;
  });
});

// set product list of products
productsReducer.on(setProducts, (state, payload) => {
  return produce(state, draftState => {
    draftState.products = payload;
  });
});
