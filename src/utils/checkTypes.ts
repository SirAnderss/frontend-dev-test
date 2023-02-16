import { TransactionData } from '@src/redux/cart/types';
import { IProduct } from '@src/redux/products/types';

export function isProductList(
  object: unknown
): object is { products: IProduct[] } {
  if (object !== null && typeof object === 'object') {
    return 'products' in object;
  }

  return false;
}

export function isTransactionData(object: unknown): object is TransactionData {
  if (object !== null && typeof object === 'object') {
    return 'data' in object;
  }

  return false;
}
