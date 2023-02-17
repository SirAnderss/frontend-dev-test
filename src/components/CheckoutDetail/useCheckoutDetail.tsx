import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { clearShoppingCart, getTransaction, setCartId } from '@src/redux/cart';
import { RootState } from '@src/redux/reducer';

export default function useCheckoutDetail() {
  const { search } = useLocation();
  const navigate = useNavigate();

  // Get transaction data from store
  const transaction = useSelector(
    (state: RootState) => state.cart.transationStatus
  );

  const appDispatch = useDispatch();

  const clearCart = () => {
    const uid = (Math.random() + 1).toString(36).substring(2);

    appDispatch(clearShoppingCart());
    appDispatch(setCartId(uid));
  };

  // Effect to get transaction data or redirect if param is empty
  useEffect(() => {
    const getTransactionData = async () => {
      if (search.length) {
        if (search.includes('env')) {
          const params = search.split('&');

          const transactionId = params[0].replace('?id=', '');

          appDispatch(getTransaction({ id: transactionId }));
        }
      } else {
        navigate('/store');
      }
    };

    getTransactionData();
  }, [search]);

  // Effect to clear shopping cart if trancaction status is approved
  useEffect(() => {
    if (transaction?.status.toUpperCase() === 'APPROVED') {
      clearCart();
    }
  }, [transaction?.status]);

  return { transaction, clearCart };
}
