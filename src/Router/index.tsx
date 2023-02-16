import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from 'react-router-dom';

import Layout from '@src/components/Layout';
import StorePage from '@src/pages/store';
import ErrorPage from '@src/pages/404';
import Loader from '@src/components/Loader';
import CartPage from '@src/pages/cart';
import CheckoutPage from '@src/pages/checkout';

export const routerList: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    loader: () => <Loader loader={true} />,
    children: [
      {
        path: 'store',
        element: <StorePage />,
      },
      {
        path: 'store/:productId',
        element: <StorePage />,
      },
      {
        path: 'cart',
        element: <CartPage />,
      },
      {
        path: 'checkout',
        element: <CheckoutPage />,
      },
    ],
  },
];

const router = createBrowserRouter(routerList);

export default function Router() {
  return <RouterProvider router={router} />;
}
