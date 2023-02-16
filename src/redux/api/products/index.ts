import { fetchToApi } from '@src/api';
import { API_URL } from '@src/config';

export async function getProductsFromApi() {
  const res = await fetchToApi({
    url: `${API_URL}/products`,
  });

  return res;
}
