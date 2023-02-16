import { RootState } from '@src/redux/reducer';
import { useEffect, useRef } from 'react';

import { useSelector } from 'react-redux';

export default function useShoppingCart() {
  // get shopping cart list of products
  const cart = useSelector((state: RootState) => state.cart.products);

  // get total price of products in shopping cart
  const total = useSelector((state: RootState) => state.cart.total);

  return { cart, total };
}
