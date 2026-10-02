import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { DondeEstoy } from "../../../components/DondeEstoy";
import { useComedor } from "../../../context/ComedorContext";
import { PALETA_COLORES } from "../../../features/comun/colores";

export default function PantallaCarrito() {
  const {
    carrito,
    totalCarrito,
    deshacerUltimoPlato,
    puedeDeshacer,
    pilaDeshacerTamanio,
    nota,
    vaciarCarrito,
  } = useComedor();

  const cantidadEnCarrito = carrito.length;
  const totalFormateado = totalCarrito.toLocaleString("es-AR");

  if (cantidadEnCarrito === 0) {
    return (
      <View style={estilos.contenedorVacio}>
        <Ionicons
          name="cart-outline"
          size={64}
          color={PALETA_COLORES.bordeActivo}
        />
        <Text style={estilos.tituloVacio}>El carrito está vacío</Text>
        <Text style={estilos.descripcionVacio}>
          Agregá platos desde la pestaña Menú para armar tu pedido.
        </Text>
        <Link href="/menu" asChild>
          <Pressable style={estilos.botonIrAlMenu}>
            <Text style={estilos.textoBotonIrAlMenu}>Explorar Menú 🍲</Text>
          </Pressable>
        </Link>
        <DondeEstoy />
      </View>
    );
  }

  return (
    <ScrollView
      style={estilos.contenedor}
      contentContainerStyle={estilos.contenido}
    >
      <View style={estilos.filaSuperior}>
        <Text style={estilos.tituloPrincipal}>
          Tu Pedido ({cantidadEnCarrito})
        </Text>
        <Pressable onPress={vaciarCarrito}>
          <Text style={estilos.textoVaciar}>Vaciar</Text>
        </Pressable>
      </View>

      <View style={estilos.cajaDeshacer}>
        <View style={estilos.informacionDeshacer}>
          <Text style={estilos.etiquetaDeshacer}>Acción LIFO (Pila):</Text>
          <Text style={estilos.subtituloDeshacer}>
            Platos apilados en historial:{" "}
            <Text style={estilos.textoNegrita}>{pilaDeshacerTamanio}</Text>
          </Text>
        </View>
        <Pressable
          style={[
            estilos.botonDeshacer,
            !puedeDeshacer && estilos.botonDeshacerDeshabilitado,
          ]}
          onPress={deshacerUltimoPlato}
          disabled={!puedeDeshacer}
        >
          <Ionicons
            name="arrow-undo"
            size={16}
            color={
              puedeDeshacer
                ? PALETA_COLORES.blancoPuro
                : PALETA_COLORES.textoAtenuado
            }
          />
          <Text
            style={[
              estilos.textoBotonDeshacer,
              !puedeDeshacer && estilos.textoBotonDeshacerDeshabilitado,
            ]}
          >
            Deshacer último
          </Text>
        </Pressable>
      </View>

      <View style={estilos.tarjetaLista}>
        {carrito.map((platoSeleccionado, indice) => {
          const precioPlatoFormateado =
            platoSeleccionado.precio.toLocaleString("es-AR");
          return (
            <View
              key={`${platoSeleccionado.id}-${indice}`}
              style={estilos.filaElemento}
            >
              <Text style={estilos.iconoElemento}>
                {platoSeleccionado.icono}
              </Text>
              <View style={estilos.detallesElemento}>
                <Text style={estilos.nombreElemento}>
                  {platoSeleccionado.nombre}
                </Text>
                <Text style={estilos.categoriaElemento}>
                  {platoSeleccionado.categoria.toUpperCase()}
                </Text>
              </View>
              <Text style={estilos.precioElemento}>
                ${precioPlatoFormateado}
              </Text>
            </View>
          );
        })}

        <View style={estilos.separador} />

        <Link href="/carrito/nota" asChild>
          <Pressable style={estilos.botonAclaracion}>
            <Ionicons
              name="document-text-outline"
              size={18}
              color={PALETA_COLORES.primarioInstitucional}
            />
            <View style={{ flex: 1 }}>
              <Text style={estilos.tituloAclaracion}>
                Aclaración para la cocina:
              </Text>
              <Text style={estilos.textoAclaracion}>
                {nota
                  ? `«${nota}»`
                  : "Toca para agregar (ej.: sin sal, sin mayonesa)"}
              </Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={18}
              color={PALETA_COLORES.textoAtenuado}
            />
          </Pressable>
        </Link>

        <View style={estilos.separador} />

        <View style={estilos.filaTotal}>
          <Text style={estilos.etiquetaTotal}>Total a abonar:</Text>
          <Text style={estilos.valorTotal}>${totalFormateado}</Text>
        </View>
      </View>

      <Link href="/confirmar" asChild>
        <Pressable style={estilos.botonConfirmar}>
          <Text style={estilos.textoBotonConfirmar}>
            Continuar a Confirmar 📋
          </Text>
        </Pressable>
      </Link>

      <DondeEstoy />
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: PALETA_COLORES.fondoLienzo,
  },
  contenido: {
    padding: 16,
  },
  filaSuperior: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  tituloPrincipal: {
    fontSize: 20,
    fontWeight: "800",
    color: PALETA_COLORES.textoPrincipal,
  },
  textoVaciar: {
    fontSize: 13,
    color: PALETA_COLORES.peligroError,
    fontWeight: "600",
  },
  cajaDeshacer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: PALETA_COLORES.acentoCremaClaro,
    borderWidth: 1,
    borderColor: PALETA_COLORES.acentoCrema,
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  informacionDeshacer: {
    flex: 1,
  },
  etiquetaDeshacer: {
    fontSize: 12,
    fontWeight: "700",
    color: PALETA_COLORES.primarioInstitucional,
  },
  subtituloDeshacer: {
    fontSize: 11,
    color: PALETA_COLORES.textoSecundario,
    marginTop: 1,
  },
  textoNegrita: {
    fontWeight: "bold",
    color: PALETA_COLORES.primarioInstitucional,
  },
  botonDeshacer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: PALETA_COLORES.primarioInstitucional,
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  botonDeshacerDeshabilitado: {
    backgroundColor: PALETA_COLORES.bordeSuave,
  },
  textoBotonDeshacer: {
    fontSize: 12,
    fontWeight: "700",
    color: PALETA_COLORES.blancoPuro,
  },
  textoBotonDeshacerDeshabilitado: {
    color: PALETA_COLORES.textoAtenuado,
  },
  tarjetaLista: {
    backgroundColor: PALETA_COLORES.superficieTarjeta,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: PALETA_COLORES.bordeSuave,
    marginBottom: 16,
  },
  filaElemento: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  iconoElemento: {
    fontSize: 24,
    marginRight: 10,
  },
  detallesElemento: {
    flex: 1,
  },
  nombreElemento: {
    fontSize: 14,
    fontWeight: "600",
    color: PALETA_COLORES.textoPrincipal,
  },
  categoriaElemento: {
    fontSize: 10,
    fontWeight: "700",
    color: PALETA_COLORES.textoAtenuado,
    marginTop: 2,
  },
  precioElemento: {
    fontSize: 15,
    fontWeight: "700",
    color: PALETA_COLORES.secundarioAccion,
  },
  separador: {
    height: 1,
    backgroundColor: PALETA_COLORES.bordeSuave,
    marginVertical: 12,
  },
  botonAclaracion: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: PALETA_COLORES.fondoLienzo,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: PALETA_COLORES.bordeSuave,
  },
  tituloAclaracion: {
    fontSize: 11,
    fontWeight: "700",
    color: PALETA_COLORES.textoSecundario,
  },
  textoAclaracion: {
    fontSize: 12,
    color: PALETA_COLORES.textoPrincipal,
    fontStyle: "italic",
    marginTop: 1,
  },
  filaTotal: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 4,
  },
  etiquetaTotal: {
    fontSize: 16,
    fontWeight: "700",
    color: PALETA_COLORES.textoPrincipal,
  },
  valorTotal: {
    fontSize: 22,
    fontWeight: "900",
    color: PALETA_COLORES.secundarioAccion,
  },
  botonConfirmar: {
    backgroundColor: PALETA_COLORES.secundarioAccion,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 16,
  },
  textoBotonConfirmar: {
    fontSize: 16,
    fontWeight: "800",
    color: PALETA_COLORES.blancoPuro,
  },
  contenedorVacio: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: PALETA_COLORES.superficieTarjeta,
  },
  tituloVacio: {
    fontSize: 20,
    fontWeight: "800",
    color: PALETA_COLORES.textoPrincipal,
    marginTop: 12,
  },
  descripcionVacio: {
    fontSize: 13,
    color: PALETA_COLORES.textoSecundario,
    textAlign: "center",
    marginTop: 4,
    marginBottom: 20,
  },
  botonIrAlMenu: {
    backgroundColor: PALETA_COLORES.primarioInstitucional,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  textoBotonIrAlMenu: {
    color: PALETA_COLORES.blancoPuro,
    fontSize: 14,
    fontWeight: "700",
  },
});
