import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { setCartProduct } from '@src/redux/cart';

import { IProduct } from '@src/redux/products/types';
import { RootState } from '@src/redux/reducer';
import { CartItem } from '@src/redux/cart/types';

export default function useProductDetail() {
  const { productId } = useParams();

  // get selectec product based on url param
  const product = useSelector((state: RootState) =>
    state.products.products.find(p => p.id === productId)
  );

  // get the amount of current product if exists in shopping cart
  const amount = useSelector(
    (state: RootState) =>
      state.cart.products.find(p => p.id === productId)?.amount
  );

  const appDispatch = useDispatch();

  // handler for the button actions to manage products in the shopping cart
  const handleCartProducts = (
    product: IProduct | CartItem,
    forAdd: boolean
  ) => {
    appDispatch(setCartProduct({ product, forAdd }));
  };

  return { product, amount, handleCartProducts };
}
