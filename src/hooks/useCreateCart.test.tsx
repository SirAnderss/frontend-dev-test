import { getStoreWrapper, renderWithStore } from '@src/utils/test-utils';
import { renderHook } from '@testing-library/react';

import useCreateCart from './useCreateCart';

describe(useCreateCart, () => {
  test('hook can create shopping cart', async () => {
    const { store } = renderWithStore(<></>);

    const wrapper = getStoreWrapper(store);

    renderHook(() => useCreateCart(), { wrapper });

    const cartId = store.getState().cart.cartId;

    expect(cartId).toBeTruthy();
    expect(cartId.length > 0);
  });
});
