import { FetchResponse } from '@src/api';
import { call, fork, put, takeLatest } from 'redux-saga/effects';

import { toast } from 'react-toastify';

import { getTransactionInfo } from '../api/cart';

import { setAppLoading } from '../app';

import { getTransaction, setTransactionData } from './actions';
import { isTransactionData } from '@src/utils/checkTypes';

/**
 * Get transaction
 * @param {ReturnType<typeof getTransaction>}
 */
function* getCheckoutTransactionSaga({
  payload,
}: ReturnType<typeof getTransaction>) {
  yield put(setAppLoading(false));
  yield put(setTransactionData(undefined));

  try {
    // call to api
    const result: FetchResponse = yield call(getTransactionInfo, payload.id);

    /** If dont't have response early return to exit */
    if (!result.ok) {
      toast.error('We have a problems, reload the page to try again', {
        position: toast.POSITION.TOP_CENTER,
      });

      return;
    }

    // Check types and set data to redux store
    if (isTransactionData(result.data)) {
      yield put(setTransactionData(result.data.data));
    }
  } catch (error) {
    // handle error
    console.error(error);

    toast.error('We have a problems, reload the page to try again', {
      position: toast.POSITION.TOP_CENTER,
    });
  } finally {
    yield put(setAppLoading(false));
  }
}

// WATCHERS

// transaction detail watcher
function* watchGetCheckoutTransaction() {
  yield takeLatest(getTransaction, getCheckoutTransactionSaga);
}

const cartSagas = [watchGetCheckoutTransaction].map(fork);

export { cartSagas };
