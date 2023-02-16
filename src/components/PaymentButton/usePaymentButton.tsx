import { WOMPI_KEY, WOMPI_REDRECT } from '@src/config';
import { RootState } from '@src/redux/reducer';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

export default function usePaymentButton() {
  const formRef = useRef<HTMLFormElement>(null);

  // get total price of products in shopping cart
  const total = useSelector((state: RootState) => state.cart.total);

  // get cart uid
  const uid = useSelector((state: RootState) => state.cart.cartId);

  // Effect to mount wompi widget
  useEffect(() => {
    if (total && uid) {
      const scriptForm = document.createElement('script');

      scriptForm.src = 'https://checkout.wompi.co/widget.js';

      scriptForm.setAttribute('data-public-key', WOMPI_KEY ?? '');
      scriptForm.setAttribute('data-render', 'button');
      scriptForm.setAttribute('data-currency', 'COP');
      scriptForm.setAttribute('data-amount-in-cents', `${total}00`);
      scriptForm.setAttribute('data-reference', uid);
      scriptForm.setAttribute('data-redirect-url', WOMPI_REDRECT ?? '');

      formRef?.current?.appendChild(scriptForm);

      return () => {
        formRef?.current?.removeChild(scriptForm);
      };
    }
  }, [total, uid]);

  return { formRef };
}
