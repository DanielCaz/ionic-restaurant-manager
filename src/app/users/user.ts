import { Table } from '../tables/table';

export interface User {
  _id: string;
  name: string;
  surname: string;
  password: string;
  role: string;
  tables: Table[];
}
