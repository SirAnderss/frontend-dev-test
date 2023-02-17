import { renderWithProviders } from '@src/utils/test-utils';

import PaymentButton from '.';

describe(PaymentButton, () => {
  test('Payment button can render correctly', async () => {
    const { getByTestId } = renderWithProviders(<PaymentButton />);

    const paymentButton = getByTestId('payment-button');

    expect(paymentButton).toBeTruthy();
  });
});
