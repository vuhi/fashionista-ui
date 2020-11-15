export interface Product {
  _id?: string;
  name: string;
  image: string;
  brand: string;
  description: string;
  price: number;
  quantity: number;
  expand?: boolean;
}

export const ProductKeys = [
  '_id',
  'name',
  'image',
  'brand',
  'description',
  'price',
  'quantity'
];
