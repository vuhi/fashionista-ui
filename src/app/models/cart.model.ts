import { User } from './user.model';
import { Product } from './product.model';

export interface Cart {
  _id?: string;
  user: User;
  items: { product: Product, quantity: number, originalQuantity?: number, isUpdating?: boolean }[];
}
