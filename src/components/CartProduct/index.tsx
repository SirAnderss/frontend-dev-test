import { CartItem } from '@src/redux/cart/types';
import { currencyFormat } from '@src/utils/currencyFormat';
import useProductDetail from '../ProductDetail/useProductDetail';

import './styles.css';

interface ICartProductProps {
  product: CartItem;
}

export default function CartProduct({ product }: ICartProductProps) {
  const { handleCartProducts } = useProductDetail();

  return (
    <div className='cart-row' data-testid='product-cart'>
      <div className='cart-detail'>
        <p>{product.amount}</p>
        <img src={product.image} alt={product.name} width={60} height={60} />
      </div>
      <div className='cart-buttons'>
        <button
          onClick={() => handleCartProducts(product, false)}
          data-testid='cart-remove'
        >
          -
        </button>
        <button
          onClick={() => handleCartProducts(product, true)}
          data-testid='cart-add'
        >
          +
        </button>
      </div>
      <p>{currencyFormat(Number(product.price) * product.amount)}</p>
    </div>
  );
}
