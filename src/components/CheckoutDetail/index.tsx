import { currencyFormat } from '@src/utils/currencyFormat';
import useCheckoutDetail from './useCheckoutDetail';

import './styles.css';
import { Link } from 'react-router-dom';
import PaymentButton from '../PaymentButton';

export default function CheckoutDetail() {
  const { transaction, clearCart } = useCheckoutDetail();

  if (!transaction) {
    return null;
  }

  return (
    <div className='checkout-container' data-testid='checkout-container'>
      <table data-testid='checkout-table'>
        <thead>
          <tr>
            <th colSpan={2}>
              <h1>{transaction.status}</h1>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Transaction ID:</th>
            <th>{transaction.id}</th>
          </tr>
          <tr>
            <th>Reference:</th>
            <th>{transaction.reference.toUpperCase()}</th>
          </tr>
          <tr>
            <th>Payment method:</th>
            <th>{transaction.payment_method_type}</th>
          </tr>
          <tr>
            <th>Currency:</th>
            <th>{transaction.currency}</th>
          </tr>
          <tr>
            <th>Price:</th>
            <th>{currencyFormat((transaction.amount_in_cents ?? 0) / 100)}</th>
          </tr>
        </tbody>
      </table>
      <div>
        {transaction.status?.toUpperCase() === 'DECLINED' ? (
          <div className='retry' data-testid='checkout-declined'>
            <PaymentButton />
            <p>Reintentar pago</p>

            <Link to='/store' className='back-button btn-checkout'>
              Go Home
            </Link>
          </div>
        ) : (
          <Link
            to='/store'
            className='back-button btn-checkout'
            onClick={clearCart}
            data-testid='checkout-approved'
          >
            Go Home
          </Link>
        )}
      </div>
    </div>
  );
}
