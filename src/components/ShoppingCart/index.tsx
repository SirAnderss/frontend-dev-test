import CartProduct from '../CartProduct';
import useShoppingCart from './useShoppingCart';

import './styles.css';
import { currencyFormat } from '@src/utils/currencyFormat';

import PaymentButton from '../PaymentButton';

export default function ShoppingCart() {
  const { cart, total } = useShoppingCart();

  return (
    <div className={`cartlist-container ${cart.length ? 'flex' : ''}`}>
      {cart.length ? (
        <>
          {cart.map((product, key) => (
            <CartProduct product={product} key={key} />
          ))}
          <div className='cart-total'>
            <span>Total: </span>
            <strong>{currencyFormat(total ?? 0)}</strong>
          </div>
          <PaymentButton />
        </>
      ) : (
        <h2 className='product-unkown'>
          Please add some products to the shopping cart.
        </h2>
      )}
    </div>
  );
}
