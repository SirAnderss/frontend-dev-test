import ProductList from '@src/components/ProductList';
import ShoppingCart from '@src/components/ShoppingCart';

import './styles.css';

export default function CartPage() {
  return (
    <div className='cart-page-container'>
      <div>
        <h2 className='cart-title'>Store</h2>
        <ProductList />
      </div>
      <div>
        <h2 className='cart-title'>Shopping Cart</h2>
        <ShoppingCart />
      </div>
    </div>
  );
}
