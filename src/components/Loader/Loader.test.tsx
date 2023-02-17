import { render } from '@testing-library/react';

import Loader from '.';

describe(Loader, () => {
  test('loader can render correctly', async () => {
    const { getByTestId } = render(<Loader loader />);

    const loaderElement = getByTestId('global-loader');

    expect(loaderElement).toBeTruthy();
  });

  test('loader is null if loader prop is false', async () => {
    const wrapper = render(<Loader loader={false} />);

    expect(wrapper.container.innerHTML).toHaveLength(0);
  });
});
