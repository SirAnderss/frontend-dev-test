import { produce } from 'immer';
import { createReducer } from 'redux-act';
import {
  clearShoppingCart,
  setCartId,
  setCartProduct,
  setTransactionData,
} from './actions';

import { ICartState } from './types';

const initialState: ICartState = {
  products: [],
  total: 0,
  cartId: '',
  transationStatus: undefined,
};

export const cartReducer = createReducer<ICartState>({}, initialState);

// handle products in shopping cart
cartReducer.on(setCartProduct, (state, payload) => {
  return produce(state, draftState => {
    const { product, forAdd } = payload;

    let total = 0;

    const productExists = draftState.products.find(
      prod => product.id === prod.id
    );

    // if product exist in shopping cart, add or remove amount of these product
    if (productExists) {
      const indexOf = draftState.products
        .map(prod => prod.id)
        .indexOf(productExists.id);

      if (forAdd) {
        draftState.products[indexOf] = {
          ...draftState.products[indexOf],
          amount: draftState.products[indexOf].amount + 1,
        };
      } else {
        if (draftState.products[indexOf].amount === 1) {
          draftState.products.splice(indexOf, 1);
        } else {
          draftState.products[indexOf] = {
            ...draftState.products[indexOf],
            amount: draftState.products[indexOf].amount - 1,
          };
        }
      }
    } else {
      // Add new products to the shopping cart
      if (forAdd) {
        draftState.products = [
          ...draftState.products,
          {
            id: product.id,
            image: product.image,
            name: product.name,
            price: product.price,
            amount: 1,
          },
        ];
      }
    }

    // calc total price of shopping cart
    const prices = draftState.products.map(product => ({
      amount: product.amount,
      price: product.price,
    }));

    prices.forEach(price => {
      const currPrice = Number(price.price);

      if (!isNaN(currPrice)) {
        total = total + currPrice * price.amount;
      }
    });

    // save data to state
    draftState.products = draftState.products;
    draftState.total = total;
  });
});

// set uid for the shopping cart
cartReducer.on(setCartId, (state, payload) => {
  return produce(state, draftState => {
    draftState.cartId = payload;
  });
});

// set transaction status
cartReducer.on(setTransactionData, (state, payload) => {
  return produce(state, draftState => {
    draftState.transationStatus = payload;
  });
});

// set transaction status
cartReducer.on(clearShoppingCart, state => {
  return produce(state, draftState => {
    draftState.products = [];
    draftState.total = 0;
    draftState.cartId = '';
  });
});
