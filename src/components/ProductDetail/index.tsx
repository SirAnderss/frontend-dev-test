import useProductDetail from './useProductDetail';

import './styles.css';
import { currencyFormat } from '@src/utils/currencyFormat';

export default function ProductDetail() {
  const { product, amount, handleCartProducts } = useProductDetail();

  if (!product) {
    return (
      <h2 className='product-unkown'>Please choose a product on the left.</h2>
    );
  }

  return (
    <div className='product-container' data-testid='product-detail'>
      {amount ? <p className='product-amount'>{amount}</p> : null}
      <img src={product.image} alt={product.name} className='product-image' />
      <div className='product-detail'>
        <div className='product-info'>
          <p>{product.name}</p>
          <p>-</p>
          <p>{currencyFormat(Number(product.price) ?? 0)}</p>
        </div>
        <div className='product-buttons'>
          <button onClick={() => handleCartProducts(product, false)}>-</button>
          <button onClick={() => handleCartProducts(product, true)}>+</button>
        </div>
      </div>
      <p className='product-description'>{product.description}</p>
    </div>
  );
}
