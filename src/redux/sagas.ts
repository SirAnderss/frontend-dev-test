import { all } from 'redux-saga/effects';

import { productSagas } from './products';
import { cartSagas } from './cart';

// combine sagas
function* sagas() {
  yield all([...productSagas, ...cartSagas]);
}

export default sagas;
