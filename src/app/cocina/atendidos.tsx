import { ScrollView, StyleSheet, Text, View } from "react-native";
import { DondeEstoy } from "../../components/DondeEstoy";
import { useComedor } from "../../context/ComedorContext";
import { PALETA_COLORES } from "../../features/comun/colores";

export default function PantallaAtendidos() {
  const { pedidosAtendidos } = useComedor();

  return (
    <ScrollView
      style={estilos.contenedor}
      contentContainerStyle={estilos.contenido}
    >
      <View style={estilos.cajaEncabezado}>
        <Text style={estilos.tituloPrincipal}>
          📚 Historial de Comandas Atendidas
        </Text>
        <Text style={estilos.subtituloPrincipal}>
          Estructura: <Text style={estilos.textoNegrita}>Pila (LIFO)</Text> —
          Cada pedido despachado se apila y se presenta desde el{" "}
          <Text style={estilos.textoNegrita}>tope hacia la base</Text> (el más
          recientemente entregado arriba de todo).
        </Text>
      </View>

      {pedidosAtendidos.length === 0 ? (
        <View style={estilos.tarjetaVacia}>
          <Text style={estilos.iconoVacio}>📦</Text>
          <Text style={estilos.tituloVacio}>Sin historial aún</Text>
          <Text style={estilos.descripcionVacio}>
            A medida que despaches turnos desde la cola activa de cocina, se
            apilarán aquí.
          </Text>
        </View>
      ) : (
        pedidosAtendidos.map((pedidoItem, indice) => {
          const totalPedidoFormateado =
            pedidoItem.total.toLocaleString("es-AR");
          const esTopeDePila = indice === 0;
          return (
            <View
              key={pedidoItem.numeroTurno}
              style={estilos.tarjetaPedido}
            >
              <View style={estilos.encabezadoTarjeta}>
                <Text style={estilos.textoTurno}>
                  Turno #{pedidoItem.numeroTurno}
                </Text>
                <View
                  style={[
                    estilos.insigniaPila,
                    esTopeDePila
                      ? estilos.insigniaTope
                      : estilos.insigniaBase,
                  ]}
                >
                  <Text style={estilos.textoInsignia}>
                    {esTopeDePila
                      ? "🔝 TOPE DE LA PILA"
                      : `Nivel de Pila: ${pedidosAtendidos.length - indice}`}
                  </Text>
                </View>
              </View>

              <Text style={estilos.metadatos}>
                Hora de pedido: {pedidoItem.hora}
              </Text>
              <Text style={estilos.metadatos}>
                Total facturado: ${totalPedidoFormateado}
              </Text>

              <Text style={estilos.tituloPlatos}>Platos servidos:</Text>
              <View style={estilos.listaPlatos}>
                {pedidoItem.items.map((platoServido, indicePlato) => (
                  <Text
                    key={`${platoServido.id}-${indicePlato}`}
                    style={estilos.nombrePlato}
                  >
                    • {platoServido.nombre} ({platoServido.categoria})
                  </Text>
                ))}
              </View>

              {pedidoItem.nota ? (
                <Text style={estilos.textoNota}>
                  Aclaración: «{pedidoItem.nota}»
                </Text>
              ) : null}
            </View>
          );
        })
      )}

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
  cajaEncabezado: {
    backgroundColor: PALETA_COLORES.superficieTarjeta,
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: PALETA_COLORES.bordeSuave,
  },
  tituloPrincipal: {
    fontSize: 20,
    fontWeight: "800",
    color: PALETA_COLORES.textoPrincipal,
  },
  subtituloPrincipal: {
    fontSize: 12,
    color: PALETA_COLORES.textoSecundario,
    marginTop: 4,
    lineHeight: 18,
  },
  textoNegrita: {
    fontWeight: "bold",
    color: PALETA_COLORES.primarioInstitucional,
  },
  tarjetaVacia: {
    backgroundColor: PALETA_COLORES.superficieTarjeta,
    borderRadius: 14,
    padding: 28,
    alignItems: "center",
    borderWidth: 1,
    borderColor: PALETA_COLORES.bordeSuave,
  },
  iconoVacio: {
    fontSize: 36,
    marginBottom: 8,
  },
  tituloVacio: {
    fontSize: 16,
    fontWeight: "700",
    color: PALETA_COLORES.textoPrincipal,
  },
  descripcionVacio: {
    fontSize: 13,
    color: PALETA_COLORES.textoSecundario,
    textAlign: "center",
    marginTop: 4,
  },
  tarjetaPedido: {
    backgroundColor: PALETA_COLORES.superficieTarjeta,
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: PALETA_COLORES.bordeSuave,
  },
  encabezadoTarjeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: PALETA_COLORES.bordeSuave,
    paddingBottom: 8,
    marginBottom: 8,
  },
  textoTurno: {
    fontSize: 18,
    fontWeight: "900",
    color: PALETA_COLORES.secundarioAccion,
  },
  insigniaPila: {
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  insigniaTope: {
    backgroundColor: PALETA_COLORES.acentoCremaClaro,
    borderWidth: 1,
    borderColor: PALETA_COLORES.acentoCrema,
  },
  insigniaBase: {
    backgroundColor: PALETA_COLORES.fondoLienzo,
    borderWidth: 1,
    borderColor: PALETA_COLORES.bordeSuave,
  },
  textoInsignia: {
    fontSize: 10,
    fontWeight: "800",
    color: PALETA_COLORES.primarioInstitucional,
  },
  metadatos: {
    fontSize: 12,
    color: PALETA_COLORES.textoSecundario,
    marginTop: 2,
  },
  tituloPlatos: {
    fontSize: 12,
    fontWeight: "700",
    color: PALETA_COLORES.textoPrincipal,
    marginTop: 8,
    marginBottom: 2,
  },
  listaPlatos: {
    marginLeft: 4,
  },
  nombrePlato: {
    fontSize: 13,
    color: PALETA_COLORES.textoPrincipal,
    marginTop: 1,
  },
  textoNota: {
    fontSize: 12,
    fontStyle: "italic",
    color: PALETA_COLORES.primarioInstitucional,
    marginTop: 6,
  },
});
