import { fetchToApi } from '@src/api';
import { API_URL, ENVIROIMENT } from '@src/config';

export async function getProductsFromApi() {
  if (ENVIROIMENT === 'test') {
    return {
      ok: true,
      data: {},
    };
  }

  const res = await fetchToApi({
    url: `${API_URL}/products`,
  });

  return res;
}
