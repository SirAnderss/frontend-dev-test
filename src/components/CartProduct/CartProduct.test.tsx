import { setCartProduct } from '@src/redux/cart';
import { currencyFormat } from '@src/utils/currencyFormat';
import { renderWithProviders } from '@src/utils/test-utils';
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CartProduct from '.';

const product = {
  id: 'product-id',
  name: 'product-name',
  image: 'product-image.png',
  price: '21000',
  amount: 1,
};

describe(CartProduct, () => {
  test('Product cart render properly', async () => {
    const { getByTestId } = renderWithProviders(
      <CartProduct product={product} />
    );

    const CartProductElement = getByTestId('product-cart');

    expect(CartProductElement).toBeTruthy();
  });

  test('Product cart render product amount in screen', async () => {
    renderWithProviders(<CartProduct product={product} />);

    expect(screen.getByText(String(product.amount))).toBeTruthy();
  });

  test('Product cart render product image in screen', async () => {
    renderWithProviders(<CartProduct product={product} />);

    const displayedImage = document.querySelector('img') as HTMLImageElement;

    expect(displayedImage.src).toContain(product.image);
    expect(displayedImage.alt).toEqual(product.name);
  });

  test('Product cart render add button in screen', async () => {
    renderWithProviders(<CartProduct product={product} />);

    expect(screen.getByText('+')).toBeTruthy();
  });

  test('Product cart render minus button in screen', async () => {
    renderWithProviders(<CartProduct product={product} />);

    expect(screen.getByText('-')).toBeTruthy();
  });

  test('Product cart render total price of product in screen', async () => {
    renderWithProviders(<CartProduct product={product} />);

    expect(
      screen.getByText(currencyFormat(Number(product.price) * product.amount))
    ).toBeTruthy();
  });

  test('Add button can update cart product', async () => {
    const { getByTestId, store } = renderWithProviders(
      <CartProduct product={product} />
    );

    act(() => {
      store.dispatch(
        setCartProduct({
          product,
          forAdd: true,
        })
      );
    });

    const addButton = getByTestId('cart-add');

    await userEvent.click(addButton);

    const updatedProduct = store
      .getState()
      .cart.products.find(p => p.id === product.id);

    expect(updatedProduct?.amount).toEqual(product.amount + 1);
  });

  test('Remove button if amount is major to 1 can update cart product', async () => {
    const productToTest = { ...product, amount: 2 };

    const { getByTestId, store } = renderWithProviders(
      <CartProduct product={productToTest} />
    );

    act(() => {
      store.dispatch(
        setCartProduct({
          product,
          forAdd: true,
        })
      );

      store.dispatch(
        setCartProduct({
          product,
          forAdd: true,
        })
      );
    });

    const removeButton = getByTestId('cart-remove');

    await userEvent.click(removeButton);

    const updatedProduct = store
      .getState()
      .cart.products.find(p => p.id === productToTest.id);

    expect(updatedProduct?.amount).toEqual(productToTest.amount - 1);
  });

  test('Remove button if amount is equal to 1 remove product from cart', async () => {
    const { getByTestId, store } = renderWithProviders(
      <CartProduct product={product} />
    );

    act(() => {
      store.dispatch(
        setCartProduct({
          product,
          forAdd: true,
        })
      );
    });

    const removeButton = getByTestId('cart-remove');

    await userEvent.click(removeButton);

    const updatedProduct = store
      .getState()
      .cart.products.find(p => p.id === product.id);

    expect(updatedProduct).toBeUndefined();
  });
});
