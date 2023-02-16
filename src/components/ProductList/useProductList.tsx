import { getProducts } from '@src/redux/products';
import { RootState } from '@src/redux/reducer';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function useProductList() {
  const appDispatch = useDispatch();

  // get products list from store
  const products = useSelector((state: RootState) => state.products.products);

  // Effect to load products from api if don't have products in  redux-store
  useEffect(() => {
    const getProductsList = async () => {
      !products.length && appDispatch(getProducts());
    };

    getProductsList();
  }, []);

  return { products };
}
