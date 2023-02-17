import { renderWithProviders } from '@src/utils/test-utils';

import ProductDetails from '.';

const product = {
  id: 'product-id',
  name: 'product-name',
  image: 'product-image.png',
  description: 'product-decription',
  price: '21000',
  amount: 1,
};

describe(ProductDetails, () => {
  test('product card render properly', async () => {
    const { getByTestId } = renderWithProviders(
      <ProductDetails product={product} idx={1} />
    );

    const productCard = getByTestId('product-card');

    expect(productCard).toBeTruthy();
  });

  test('product card show product image', async () => {
    const { getByTestId } = renderWithProviders(
      <ProductDetails product={product} idx={1} />
    );

    const productCard = getByTestId('product-card');

    const img = productCard.querySelector('img');

    expect(img?.src.includes(product.image)).toBeTruthy();
    expect(img?.alt).toEqual(product.name);
  });

  test('product card click redirect to /store/:id', async () => {
    const { getByTestId, user } = renderWithProviders(
      <ProductDetails product={product} idx={1} />
    );

    const productCard = getByTestId('product-card');

    await user.click(productCard);

    expect(document.URL.includes(`/store/${product.id}`)).toBeTruthy();
  });
});
