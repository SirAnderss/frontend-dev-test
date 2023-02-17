import { setCartProduct, setTransactionData } from '@src/redux/cart';
import { ITransactionData } from '@src/redux/cart/types';
import { currencyFormat } from '@src/utils/currencyFormat';
import { renderWithProviders } from '@src/utils/test-utils';
import { act, screen } from '@testing-library/react';

import CheckoutDetail from '.';

const mockTransaction: ITransactionData = {
  id: '132466-1676605355-64706',
  created_at: '2023-02-15T06:44:06.910Z',
  finalized_at: '2023-02-15T06:44:10.072Z',
  amount_in_cents: 16033100,
  reference: 'rbv05t7nry',
  customer_email: 'email@example.com',
  currency: 'COP',
  payment_method_type: 'CARD',
  payment_method: {
    type: 'CARD',
    extra: {
      bin: '424242',
      name: 'VISA-4242',
      brand: 'VISA',
      exp_year: '28',
      exp_month: '01',
      last_four: '4242',
      card_holder: 'mian card',
      external_identifier: 'IT3qWQGbvN',
      processor_response_code: '00',
    },
    installments: 1,
  },
  status: 'APPROVED',
  status_message: '',
  billing_data: {
    legal_id_type: 'CC',
    legal_id: '12345678',
  },
  shipping_address: '',
  redirect_url: '',
  payment_source_id: '',
  payment_link_id: '',
  customer_data: {
    full_name: 'Tes User',
    phone_number: '+572347623234',
  },
  bill_id: '',
  taxes: [],
  merchant: {
    name: '',
    legal_name: '',
    contact_name: '',
    phone_number: '',
    logo_url: '',
    legal_id_type: '',
    email: '',
    legal_id: '',
  },
};

const product = {
  id: 'product-id',
  name: 'product-name',
  image: 'product-image.png',
  price: '21000',
  amount: 1,
};

describe(CheckoutDetail, () => {
  test('Checkout detail render properly', async () => {
    const { getByTestId, store } = renderWithProviders(<CheckoutDetail />);

    act(() => {
      store.dispatch(setTransactionData(mockTransaction));
    });

    const checkoutElement = getByTestId('checkout-container');

    expect(checkoutElement).toBeTruthy();
  });

  test('Checkout detail must be null if does not exist transaction data', async () => {
    const wrapper = renderWithProviders(<CheckoutDetail />);

    expect(wrapper.container.innerHTML).toHaveLength(0);
  });

  test('Checkout detail must redirect if does not have search param', async () => {
    renderWithProviders(<CheckoutDetail />, {
      route: '/checkout',
    });

    expect(document.URL.includes('/store')).toBeTruthy();
  });

  test('Checkout detail with transaction must show transaction data in table', async () => {
    const { getByTestId, store } = renderWithProviders(<CheckoutDetail />, {
      route: '/checkout?id=132466-1676605355-64706&env=test',
    });

    act(() => {
      store.dispatch(setTransactionData(mockTransaction));
    });

    const checkoutTable = getByTestId('checkout-table');

    expect(checkoutTable).toBeTruthy();

    expect(screen.getByText(mockTransaction.id)).toBeTruthy();
    expect(
      screen.getByText(mockTransaction.reference.toUpperCase())
    ).toBeTruthy();
    expect(screen.getByText(mockTransaction.payment_method_type)).toBeTruthy();
    expect(screen.getByText(mockTransaction.currency)).toBeTruthy();
    expect(
      screen.getByText(
        currencyFormat((mockTransaction.amount_in_cents ?? 0) / 100)
      )
    ).toBeTruthy();
  });

  test('Checkout detail with transaction approved clear shopping cart, generate cart ui and redirect to store', async () => {
    const { getByTestId, store, user } = renderWithProviders(
      <CheckoutDetail />,
      {
        route: '/checkout?id=132466-1676605355-64706&env=test',
      }
    );

    act(() => {
      store.dispatch(
        setCartProduct({
          product,
          forAdd: true,
        })
      );
      store.dispatch(setTransactionData(mockTransaction));
    });

    const goHomeButton = getByTestId('checkout-approved');

    await user.click(goHomeButton);

    const updatedCartProducts = store.getState().cart.products;

    expect(updatedCartProducts.length).toEqual(0);
    expect(document.URL.includes('/store')).toBeTruthy();
  });
});
