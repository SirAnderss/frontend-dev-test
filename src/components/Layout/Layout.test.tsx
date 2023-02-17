import { renderWithProviders } from '@src/utils/test-utils';

import Layout from '.';

describe(Layout, () => {
  test('Layout can render correctly', async () => {
    const { getByTestId } = renderWithProviders(<Layout />);

    const layoutElement = getByTestId('main-container');

    expect(layoutElement).toBeTruthy();
  });

  test('Layout always must redirect to store', async () => {
    renderWithProviders(<Layout />);

    expect(document.URL.includes('/store')).toBeTruthy();
  });
});
