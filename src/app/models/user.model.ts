import { Cart } from './cart.model';

export interface User {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  role?: string;
  cart?: Cart;
}

export const UserKeys = [
  '_id',
  'firstName',
  'lastName',
  'email',
  'password',
  'role',
];

