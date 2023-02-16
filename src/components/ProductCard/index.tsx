import { Link } from 'react-router-dom';

import { IProduct } from '@src/redux/products/types';

import './styles.css';
import useProductDetail from '../ProductDetail/useProductDetail';

interface IProductDetailProps {
  product: IProduct;
  idx: number;
}

export default function ProductDetails({ product, idx }: IProductDetailProps) {
  const { product: currentProduct } = useProductDetail();

  return (
    <Link to={`/store/${product.id}`} className={`card-image-${idx}`}>
      <img
        src={product.image}
        alt={product.name}
        width={150}
        height={150}
        className={`card-image ${
          currentProduct?.id === product.id ? 'card-selected' : ''
        }`}
      />
    </Link>
  );
}
