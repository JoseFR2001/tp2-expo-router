import { Plato } from "../platos/tipos";

export interface Pedido {
  numeroTurno: number;
  items: Plato[];
  total: number;
  nota?: string;
  hora: string;
}
