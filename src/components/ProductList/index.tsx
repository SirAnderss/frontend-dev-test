import ProductCard from '../ProductCard';
import useProductList from './useProductList';

import './styles.css';

export default function ProductList() {
  const { products } = useProductList();

  return (
    <div className={`products-container ${products.length ? 'grid' : ''}`}>
      {products.length ? (
        products.map((product, key) => (
          <ProductCard product={product} key={key} idx={key + 1} />
        ))
      ) : (
        <h1>We don't have products to offer, please try again later</h1>
      )}
    </div>
  );
}
