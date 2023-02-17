import { renderWithProviders } from '@src/utils/test-utils';

import ProductDetail from '.';

describe(ProductDetail, () => {
  test('product card render properly', async () => {
    const { getByText } = renderWithProviders(<ProductDetail />);

    const productDetail = getByText('Please choose a product on the left.');

    expect(productDetail).toBeTruthy();
  });

  test('product does not show any product if route id is unset', async () => {
    const { getByText } = renderWithProviders(<ProductDetail />, {
      route: '/store',
    });

    const productDetail = getByText('Please choose a product on the left.');

    expect(productDetail).toBeTruthy();
  });
});
