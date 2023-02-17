import usePaymentButton from './usePaymentButton';

export default function PaymentButton() {
  const { formRef } = usePaymentButton();

  return <form ref={formRef} data-testid='payment-button'></form>;
}
