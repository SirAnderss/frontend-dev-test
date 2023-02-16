import { setCartId } from '@src/redux/cart';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

// This hook create an unique id for the shopping cart
export default function useCreateCart() {
  const appDispatch = useDispatch();

  useEffect(() => {
    // generate random string for te cart id
    const uid = (Math.random() + 1).toString(36).substring(2);

    appDispatch(setCartId(uid));

    return () => {
      appDispatch(setCartId(''));
    };
  }, []);

  return null;
}
