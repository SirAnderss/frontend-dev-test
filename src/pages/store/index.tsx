import ProductDetail from '@src/components/ProductDetail';
import ProductList from '@src/components/ProductList';
import { useLocation } from 'react-router-dom';

import './styles.css';

export default function StorePage() {
  const { pathname } = useLocation();

  return (
    <div className='store-container'>
      <div>
        <h2 className='cart-title'>Store</h2>
        <ProductList />
      </div>
      <div>
        <h2 className='cart-title'>
          {pathname.includes('/store/') ? 'Product' : <i>&nbsp;</i>}
        </h2>
        <ProductDetail />
      </div>
    </div>
  );
}
