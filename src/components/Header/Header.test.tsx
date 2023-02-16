import { setCartProduct } from '@src/redux/cart';
import { currencyFormat } from '@src/utils/currencyFormat';
import { renderWithProviders } from '@src/utils/test-utils';
import { act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Header from '.';

describe(Header, () => {
  test('header can render correctly', async () => {
    const { getByTestId } = renderWithProviders(<Header />);

    const headerElement = getByTestId('main-header');

    expect(headerElement).toBeTruthy();
  });

  test('header logo link should show white space in screen', async () => {
    const { getByTestId } = renderWithProviders(<Header />);

    const logoLink = getByTestId('logo-link');

    await userEvent.click(logoLink);
    expect(document.URL.includes('/store')).toBeTruthy();
  });

  test('header cart link show shopping cart text in screen', async () => {
    const { getByTestId } = renderWithProviders(<Header />);
    const cartLink = getByTestId('cart-link');

    await userEvent.click(cartLink);
    expect(document.URL.includes('/cart')).toBeTruthy();
  });

  test('header must have cart total price in 0 if user does not have any products in cart', async () => {
    const { getByTestId } = renderWithProviders(<Header />);

    const cartPrice = getByTestId('cart-price');

    const span = cartPrice.innerHTML;

    expect(span).toEqual('$ 0,00');
  });

  test('header must have cart total price of products in cart', async () => {
    const { getByTestId, store } = renderWithProviders(<Header />);

    act(() => {
      store.dispatch(
        setCartProduct({
          product: {
            amount: 1,
            description: '',
            id: '',
            image: '',
            name: '',
            price: '200',
          },
          forAdd: true,
        })
      );
    });

    const total = store.getState().cart.total;

    const cartPrice = getByTestId('cart-price');

    const span = cartPrice.innerHTML;

    expect(span).toEqual(currencyFormat(total));
  });

  test('header has close cart button in cart route', async () => {
    const { getByTestId } = renderWithProviders(<Header />, { route: '/cart' });

    const closeButton = getByTestId('close-cart');

    expect(closeButton).toBeTruthy();
  });

  test('header have not close cart button', async () => {
    const { queryByText } = renderWithProviders(<Header />, {
      route: '/another-route',
    });

    await waitFor(() => {
      expect(queryByText('X')).toBeNull();
    });
  });

  test('header close cart link does not show shopping cart text in screen', async () => {
    const { getByTestId } = renderWithProviders(<Header />, { route: '/cart' });
    const closeButton = getByTestId('close-link');

    await userEvent.click(closeButton);
    expect(document.URL.includes('/store')).toBeTruthy();
  });
});
