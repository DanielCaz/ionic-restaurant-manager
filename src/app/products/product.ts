import { Category } from '../categories/category';
import { Provider } from '../providers/provider';

export interface Product {
  _id: string;
  name: string;
  price: number;
  cost: number;
  category: string;
  provider: string;
  description: string;
  image: string;
}
