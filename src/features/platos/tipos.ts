export type CategoriaPlato = "desayuno" | "almuerzo" | "bebidas" | "kiosco";

export interface Plato {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: CategoriaPlato;
  icono: string;
  tiempoMinutos: number;
}
