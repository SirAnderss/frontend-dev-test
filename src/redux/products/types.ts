export interface IProduct {
  id: string;
  name: string;
  image: string;
  description: string;
  price: string;
}

export interface IProductState {
  products: IProduct[];
  product?: IProduct;
}
