import { renderWithProviders } from '@src/utils/test-utils';

import NotFound from '.';

describe(NotFound, () => {
  test('Not found can render correctly', async () => {
    const { getByTestId } = renderWithProviders(<NotFound />);

    const notFoundElement = getByTestId('404-container');

    expect(notFoundElement).toBeTruthy();
  });

  test('Not found must have go home button', async () => {
    const { getByTestId } = renderWithProviders(<NotFound />);

    const backButtonElement = getByTestId('404-back');

    expect(backButtonElement).toBeTruthy();
  });

  test('Not found home button can redirect to root dir', async () => {
    const { getByTestId, user } = renderWithProviders(<NotFound />);

    const backButtonElement = getByTestId('404-back');

    await user.click(backButtonElement);

    expect(document.URL.includes('/')).toBeTruthy();
  });
});
