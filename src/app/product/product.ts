import { Departament } from '../departament/departament';

export interface Product {
  name: string;
  _id?: string;
  departaments: Departament[]| string [];
  stock: number;
  price: number;
}
