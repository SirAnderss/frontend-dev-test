import { render } from '@testing-library/react';

import BagIcon from '.';

describe(BagIcon, () => {
  test('Icon can be render properly', async () => {
    const { getByTestId } = render(<BagIcon />);

    const BagIconElement = getByTestId('cart-icon');

    expect(BagIconElement).toBeTruthy();
  });
});
