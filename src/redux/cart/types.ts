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
  finalized_at: string;
  amount_in_cents: number;
  reference: string;
  currency: string;
  customer_email: string;
  payment_method_type: string;
  billing_data: {
    legal_id_type: string;
    legal_id: string;
  };
  payment_method: {
    type: string;
    extra: {
      bin: string;
      exp_year: string;
      exp_month: string;
      card_holder: string;
      name: string;
      brand: string;
      last_four: string;
      external_identifier: string;
      processor_response_code: string;
    };
    installments: number;
  };
  customer_data: {
    full_name: string;
    phone_number: string;
  };
  bill_id: string;
  redirect_url: string;
  payment_link_id: string;
  payment_source_id: string;
  shipping_address: string;
  status: string;
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
