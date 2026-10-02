import { router } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { DondeEstoy } from "../components/DondeEstoy";
import { useComedor } from "../context/ComedorContext";
import { PALETA_COLORES } from "../features/comun/colores";

export default function PantallaConfirmar() {
  const { carrito, totalCarrito, nota, confirmarPedido } = useComedor();

  const manejadorConfirmarPedido = () => {
    const pedidoGenerado = confirmarPedido();
    if (pedidoGenerado) {
      router.replace(`/turno/${pedidoGenerado.numeroTurno}`);
    }
  };

  const totalFormateado = totalCarrito.toLocaleString("es-AR");

  if (carrito.length === 0) {
    return (
      <View style={estilos.contenedorVacio}>
        <Text style={estilos.textoVacio}>
          No hay productos para confirmar en el carrito.
        </Text>
        <Pressable
          style={estilos.botonCerrarModal}
          onPress={() => router.back()}
        >
          <Text style={estilos.textoBotonCerrar}>Volver al carrito</Text>
        </Pressable>
        <DondeEstoy />
      </View>
    );
  }

  return (
    <ScrollView
      style={estilos.contenedor}
      contentContainerStyle={estilos.contenido}
    >
      <Text style={estilos.tituloPrincipal}>📋 Resumen del Pedido</Text>
      <Text style={estilos.subtituloPrincipal}>
        Revisá los platos seleccionados antes de enviar tu pedido a la cola de
        la cocina.
      </Text>

      <View style={estilos.tarjetaResumen}>
        <Text style={estilos.tituloSeccion}>Detalle de Platos:</Text>
        {carrito.map((platoSeleccionado, indice) => {
          const precioItemFormateado =
            platoSeleccionado.precio.toLocaleString("es-AR");
          return (
            <View
              key={`${platoSeleccionado.id}-${indice}`}
              style={estilos.filaElemento}
            >
              <Text style={estilos.iconoElemento}>
                {platoSeleccionado.icono}
              </Text>
              <Text style={estilos.nombreElemento}>
                {platoSeleccionado.nombre}
              </Text>
              <Text style={estilos.precioElemento}>
                ${precioItemFormateado}
              </Text>
            </View>
          );
        })}

        {nota ? (
          <View style={estilos.tarjetaAclaracion}>
            <Text style={estilos.etiquetaAclaracion}>
              📌 Aclaración para la cocina:
            </Text>
            <Text style={estilos.textoAclaracion}>«{nota}»</Text>
          </View>
        ) : null}

        <View style={estilos.lineaSeparadora} />

        <View style={estilos.filaTotal}>
          <Text style={estilos.etiquetaTotal}>TOTAL:</Text>
          <Text style={estilos.valorTotal}>${totalFormateado}</Text>
        </View>
      </View>

      <View style={estilos.cuadroInformativo}>
        <Text style={estilos.iconoInformacion}>ℹ️</Text>
        <Text style={estilos.textoInformacion}>
          Al confirmar, se te asignará un{" "}
          <Text style={estilos.textoNegrita}>Número de Turno correlativo</Text>{" "}
          y tu pedido entrará en la{" "}
          <Text style={estilos.textoNegrita}>Cola (FIFO)</Text> de preparación.
        </Text>
      </View>

      <Pressable
        style={estilos.botonConfirmar}
        onPress={manejadorConfirmarPedido}
      >
        <Text style={estilos.textoBotonConfirmar}>
          ✅ Confirmar y Generar Turno
        </Text>
      </Pressable>

      <Pressable
        style={estilos.botonModificar}
        onPress={() => router.back()}
      >
        <Text style={estilos.textoBotonModificar}>
          Modificar Pedido (Volver)
        </Text>
      </Pressable>

      <DondeEstoy />
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: PALETA_COLORES.superficieTarjeta,
  },
  contenido: {
    padding: 20,
  },
  tituloPrincipal: {
    fontSize: 22,
    fontWeight: "800",
    color: PALETA_COLORES.textoPrincipal,
  },
  subtituloPrincipal: {
    fontSize: 13,
    color: PALETA_COLORES.textoSecundario,
    marginTop: 2,
    marginBottom: 20,
    lineHeight: 18,
  },
  tarjetaResumen: {
    backgroundColor: PALETA_COLORES.fondoLienzo,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: PALETA_COLORES.bordeSuave,
    marginBottom: 16,
  },
  tituloSeccion: {
    fontSize: 13,
    fontWeight: "700",
    color: PALETA_COLORES.textoPrincipal,
    marginBottom: 10,
  },
  filaElemento: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
  },
  iconoElemento: {
    fontSize: 18,
    marginRight: 8,
  },
  nombreElemento: {
    flex: 1,
    fontSize: 14,
    color: PALETA_COLORES.textoPrincipal,
  },
  precioElemento: {
    fontSize: 14,
    fontWeight: "700",
    color: PALETA_COLORES.secundarioAccion,
  },
  tarjetaAclaracion: {
    backgroundColor: PALETA_COLORES.acentoCremaClaro,
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: PALETA_COLORES.acentoCrema,
  },
  etiquetaAclaracion: {
    fontSize: 11,
    fontWeight: "700",
    color: PALETA_COLORES.primarioInstitucional,
  },
  textoAclaracion: {
    fontSize: 12,
    color: PALETA_COLORES.textoPrincipal,
    fontStyle: "italic",
    marginTop: 2,
  },
  lineaSeparadora: {
    height: 1,
    backgroundColor: PALETA_COLORES.bordeSuave,
    marginVertical: 14,
  },
  filaTotal: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  etiquetaTotal: {
    fontSize: 16,
    fontWeight: "800",
    color: PALETA_COLORES.textoPrincipal,
  },
  valorTotal: {
    fontSize: 22,
    fontWeight: "900",
    color: PALETA_COLORES.secundarioAccion,
  },
  cuadroInformativo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: PALETA_COLORES.acentoCremaClaro,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: PALETA_COLORES.acentoCrema,
    marginBottom: 20,
  },
  iconoInformacion: {
    fontSize: 18,
  },
  textoInformacion: {
    flex: 1,
    fontSize: 12,
    color: PALETA_COLORES.primarioOscuro,
    lineHeight: 16,
  },
  textoNegrita: {
    fontWeight: "bold",
    color: PALETA_COLORES.primarioInstitucional,
  },
  botonConfirmar: {
    backgroundColor: PALETA_COLORES.secundarioAccion,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 10,
  },
  textoBotonConfirmar: {
    fontSize: 16,
    fontWeight: "800",
    color: PALETA_COLORES.blancoPuro,
  },
  botonModificar: {
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 16,
  },
  textoBotonModificar: {
    fontSize: 14,
    fontWeight: "700",
    color: PALETA_COLORES.textoSecundario,
  },
  contenedorVacio: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: PALETA_COLORES.superficieTarjeta,
  },
  textoVacio: {
    fontSize: 15,
    color: PALETA_COLORES.textoSecundario,
    marginBottom: 16,
  },
  botonCerrarModal: {
    backgroundColor: PALETA_COLORES.primarioInstitucional,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  textoBotonCerrar: {
    color: PALETA_COLORES.blancoPuro,
    fontWeight: "700",
  },
});
