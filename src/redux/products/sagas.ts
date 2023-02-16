import { FetchResponse } from '@src/api';
import { call, fork, put, takeLatest } from 'redux-saga/effects';

import { toast } from 'react-toastify';

import { getProductsFromApi } from '../api/products';

import { setAppLoading } from '../app';

import { getProducts, setProducts } from './actions';
import { isProductList } from '@src/utils/checkTypes';

/**
 * Get products
 * @param {ReturnType<typeof getProducts>}
 */
function* getProductsSagas() {
  yield put(setAppLoading(true));
  yield put(setProducts([]));

  try {
    // call to api
    const result: FetchResponse = yield call(getProductsFromApi);

    /** If dont't have products early return to exit */
    if (!result.ok) {
      toast.error('We have a problems, reload the page to try again', {
        position: toast.POSITION.TOP_CENTER,
      });

      return;
    }

    if (isProductList(result.data)) {
      const { products } = result.data;

      // Aplies a shuffle script just for testing
      yield put(
        setProducts(
          products
            .map(product => ({ ...product, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(product => ({
              id: product.id,
              description: product.description,
              image: product.image,
              name: product.name,
              price: product.price,
            }))
        )
      );
    }
  } catch (error) {
    // handle error
    console.error(error);

    toast.error('We have a problems, reload the page to try again', {
      position: toast.POSITION.TOP_CENTER,
    });

    yield put(setProducts([]));
  } finally {
    yield put(setAppLoading(false));
  }
}

// WATCHERS

// product list watcher
function* watchGetProducts() {
  yield takeLatest(getProducts, getProductsSagas);
}

const productSagas = [watchGetProducts].map(fork);

export { productSagas };
