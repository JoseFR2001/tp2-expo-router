import React, {
  createContext,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { Plato } from "../features/platos/tipos";
import { Cola } from "../features/pedidos/cola";
import { Pila } from "../features/carrito/pila";
import { Pedido } from "../features/pedidos/tipos";

export type { Pedido };

interface TipoContextoComedor {
  usuario: string | null;
  iniciarSesion: (nombreUsuario: string, contrasenia: string) => boolean;
  cerrarSesion: () => void;
  carrito: Plato[];
  nota: string;
  setNota: (texto: string) => void;
  agregarPlato: (plato: Plato) => void;
  deshacerUltimoPlato: () => void;
  pilaDeshacerTamanio: number;
  puedeDeshacer: boolean;
  totalCarrito: number;
  vaciarCarrito: () => void;
  confirmarPedido: () => Pedido | null;
  pedidosEnCola: Pedido[];
  pedidosAtendidos: Pedido[];
  atenderSiguientePedido: () => Pedido | undefined;
  obtenerPosicionTurno: (numeroTurno: number) => number;
}

const ContextoComedor = createContext<TipoContextoComedor | undefined>(
  undefined
);

export const ComedorProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [usuario, setUsuario] = useState<string | null>(null);
  const [carrito, setCarrito] = useState<Plato[]>([]);
  const [nota, setNota] = useState<string>("");

  const referenciaPilaDeshacer = useRef(new Pila<Plato>());
  const referenciaColaPedidos = useRef(new Cola<Pedido>());
  const referenciaHistorialAtendidos = useRef(new Pila<Pedido>());
  const referenciaContadorTurnos = useRef<number>(101);

  const [pilaDeshacerTamanio, setPilaDeshacerTamanio] = useState<number>(0);
  const [pedidosEnCola, setPedidosEnCola] = useState<Pedido[]>([]);
  const [pedidosAtendidos, setPedidosAtendidos] = useState<Pedido[]>([]);

  const iniciarSesion = (
    nombreUsuario: string,
    contrasenia: string
  ): boolean => {
    const usuarioLimpio = nombreUsuario.trim().toLowerCase();
    const claveLimpia = contrasenia.trim();
    if (usuarioLimpio === "cocina" && claveLimpia === "1234") {
      setUsuario("cocina");
      return true;
    }
    return false;
  };

  const cerrarSesion = () => {
    setUsuario(null);
  };

  const agregarPlato = (plato: Plato) => {
    setCarrito((carritoPrevio) => [...carritoPrevio, plato]);
    referenciaPilaDeshacer.current.push(plato);
    setPilaDeshacerTamanio(referenciaPilaDeshacer.current.tamanio);
  };

  const deshacerUltimoPlato = () => {
    if (referenciaPilaDeshacer.current.vacia) {
      return;
    }

    const platoDeshecho = referenciaPilaDeshacer.current.pop();
    setPilaDeshacerTamanio(referenciaPilaDeshacer.current.tamanio);

    if (platoDeshecho) {
      setCarrito((carritoPrevio) => {
        const copiaCarrito = [...carritoPrevio];
        for (
          let indice = copiaCarrito.length - 1;
          indice >= 0;
          indice--
        ) {
          if (copiaCarrito[indice].id === platoDeshecho.id) {
            copiaCarrito.splice(indice, 1);
            break;
          }
        }
        return copiaCarrito;
      });
    }
  };

  const vaciarCarrito = () => {
    setCarrito([]);
    setNota("");
    referenciaPilaDeshacer.current.limpiar();
    setPilaDeshacerTamanio(0);
  };

  const totalCarrito = useMemo(() => {
    return carrito.reduce(
      (acumulador, plato) => acumulador + plato.precio,
      0
    );
  }, [carrito]);

  const confirmarPedido = (): Pedido | null => {
    if (carrito.length === 0) {
      return null;
    }

    const fechaActual = new Date();
    const horaFormateada = fechaActual.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const nuevoPedido: Pedido = {
      numeroTurno: referenciaContadorTurnos.current++,
      items: [...carrito],
      total: totalCarrito,
      nota: nota.trim() ? nota.trim() : undefined,
      hora: horaFormateada,
    };

    referenciaColaPedidos.current.encolar(nuevoPedido);
    setPedidosEnCola(referenciaColaPedidos.current.aArray());
    vaciarCarrito();

    return nuevoPedido;
  };

  const atenderSiguientePedido = (): Pedido | undefined => {
    const pedidoAtendido = referenciaColaPedidos.current.desencolar();
    setPedidosEnCola(referenciaColaPedidos.current.aArray());

    if (pedidoAtendido) {
      referenciaHistorialAtendidos.current.push(pedidoAtendido);
      const atendidosOrdenados = referenciaHistorialAtendidos.current
        .aArray()
        .slice()
        .reverse();
      setPedidosAtendidos(atendidosOrdenados);
    }

    return pedidoAtendido;
  };

  const obtenerPosicionTurno = (numeroTurno: number): number => {
    const listaPedidos = referenciaColaPedidos.current.aArray();
    const indiceEncontrado = listaPedidos.findIndex(
      (pedido) => pedido.numeroTurno === numeroTurno
    );
    return indiceEncontrado !== -1 ? indiceEncontrado : 0;
  };

  const puedeDeshacer = pilaDeshacerTamanio > 0;

  return (
    <ContextoComedor.Provider
      value={{
        usuario,
        iniciarSesion,
        cerrarSesion,
        carrito,
        nota,
        setNota,
        agregarPlato,
        deshacerUltimoPlato,
        pilaDeshacerTamanio,
        puedeDeshacer,
        totalCarrito,
        vaciarCarrito,
        confirmarPedido,
        pedidosEnCola,
        pedidosAtendidos,
        atenderSiguientePedido,
        obtenerPosicionTurno,
      }}
    >
      {children}
    </ContextoComedor.Provider>
  );
};

export const useComedor = (): TipoContextoComedor => {
  const contexto = useContext(ContextoComedor);
  if (!contexto) {
    throw new Error(
      "useComedor debe ser utilizado dentro de un ComedorProvider"
    );
  }
  return contexto;
};
