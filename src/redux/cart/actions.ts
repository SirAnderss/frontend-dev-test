import { createAction } from 'redux-act';

import { IProduct } from '../products/types';
import { CartItem, ITransactionData } from './types';

const getTransaction = createAction<{ id: string }>('cart/getTransaction');

const setCartProduct = createAction<{
  product: IProduct | CartItem;
  forAdd: boolean;
}>('cart/setCartProduct');

const setCartId = createAction<string>('cart/setCartId');

const setTransactionData = createAction<ITransactionData | undefined>(
  'cart/setTransactionData'
);

const clearShoppingCart = createAction('cart/clearShoppingCart');

export {
  getTransaction,
  setCartProduct,
  setCartId,
  setTransactionData,
  clearShoppingCart,
};
