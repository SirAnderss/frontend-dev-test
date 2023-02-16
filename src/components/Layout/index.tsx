import useCreateCart from '@src/hooks/useCreateCart';
import { RootState } from '@src/redux/reducer';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import Header from '../Header';
import Loader from '../Loader';

import './styles.css';

export default function Layout() {
  useCreateCart();

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const loader = useSelector((state: RootState) => state.app.isLoading);

  useEffect(() => {
    pathname === '/' && navigate('/store');
  }, []);

  return (
    <>
      <Loader loader={loader} />
      <div className='main-container' data-testid='main-container'>
        <Header />
        <Outlet />
      </div>
    </>
  );
}
