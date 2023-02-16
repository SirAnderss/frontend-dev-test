import { createAction } from 'redux-act';

import { IProduct } from './types';

const getProducts = createAction('product/getAllProducts');

const setProducts = createAction<IProduct[]>('product/setProducts');

const setProduct = createAction<IProduct | undefined>('product/setProduct');

export { getProducts, setProduct, setProducts };
