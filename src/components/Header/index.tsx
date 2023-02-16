import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import BagIcon from '../BagIcon';
import CartIcon from '../CartIcon';

import { currencyFormat } from '@src/utils/currencyFormat';

import { RootState } from '@src/redux/reducer';

import './styles.css';

export default function Header() {
  const total = useSelector((state: RootState) => state.cart.total);

  const { pathname } = useLocation();

  return (
    <header className='header-container' data-testid='main-header'>
      <Link to='/store' className='header-logo' data-testid='logo-link'>
        <BagIcon fill='#fff' width={56} height={56} />
      </Link>
      <div className='header-cart-container'>
        <Link
          to='/cart'
          data-testid='cart-link'
          className={`header-cart ${
            pathname.includes('cart') ? 'cart-active' : 'cart-inactive'
          }`}
        >
          <CartIcon
            fill={`${pathname.includes('cart') ? '#a51bb9' : '#fff'}`}
          />
          <span data-testid='cart-price'>{currencyFormat(total ?? 0)}</span>
        </Link>
        {pathname.includes('cart') ? (
          <Link to='/store' data-testid='close-link'>
            <button data-testid='close-cart'>X</button>
          </Link>
        ) : null}
      </div>
    </header>
  );
}
