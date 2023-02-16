export interface ICartState {
  products: CartItem[];
  total: number;
  cartId: string;
  transationStatus?: ITransactionData;
}

export interface CartItem {
  id: string;
  name: string;
  image: string;
  price: string;
  amount: number;
}

export interface ITransactionData {
  id: string;
  created_at: string;
  amount_in_cents: number;
  reference: string;
  currency: string;
  payment_method_type: string;
  payment_method: {
    type: string;
    extra: {
      name: string;
      brand: string;
      last_four: string;
      external_identifier: string;
      processor_response_code: string;
    };
    installments: number;
  };
  redirect_url: string;
  status: 'DECLINED';
  status_message: string;
  merchant: {
    name: string;
    legal_name: string;
    contact_name: string;
    phone_number: string;
    logo_url: string;
    legal_id_type: string;
    email: string;
    legal_id: string;
  };
  taxes: [];
}

export interface TransactionData {
  data: ITransactionData;
  meta: {};
}
