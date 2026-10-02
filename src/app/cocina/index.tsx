import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { DondeEstoy } from "../../components/DondeEstoy";
import { useComedor } from "../../context/ComedorContext";
import { PALETA_COLORES } from "../../features/comun/colores";

export default function PantallaCocina() {
  const { pedidosEnCola, atenderSiguientePedido } = useComedor();

  const pedidoEnFrente = pedidosEnCola.length > 0 ? pedidosEnCola[0] : null;
  const totalEnCola = pedidosEnCola.length;

  return (
    <ScrollView
      style={estilos.contenedor}
      contentContainerStyle={estilos.contenido}
    >
      <View style={estilos.tarjetaInformativa}>
        <Text style={estilos.tituloPrincipal}>
          🔥 Monitor de Comandas (Cocina)
        </Text>
        <Text style={estilos.subtituloPrincipal}>
          Estructura:{" "}
          <Text style={estilos.textoNegrita}>Cola (FIFO)</Text> — Los pedidos se
          despachan en estricto orden de llegada.
        </Text>
        <Text style={estilos.textoConteo}>
          Pedidos en espera de cocción:{" "}
          <Text style={estilos.numeroConteo}>{totalEnCola}</Text>
        </Text>
      </View>

      {!pedidoEnFrente ? (
        <View style={estilos.tarjetaVacia}>
          <Text style={estilos.iconoVacio}>✨</Text>
          <Text style={estilos.tituloVacio}>¡Sin pedidos pendientes!</Text>
          <Text style={estilos.descripcionVacio}>
            La cola está despejada. Los nuevos pedidos de los estudiantes
            aparecerán aquí automáticamente en tiempo real.
          </Text>
        </View>
      ) : (
        <View style={estilos.tarjetaFrente}>
          <View style={estilos.encabezadoFrente}>
            <View style={estilos.insigniaFrente}>
              <Text style={estilos.textoInsigniaFrente}>
                FRENTE DE LA COLA (Siguiente)
              </Text>
            </View>
            <Text style={estilos.numeroTurnoFrente}>
              Turno #{pedidoEnFrente.numeroTurno}
            </Text>
            <Text style={estilos.horaFrente}>
              Ingresó a las: {pedidoEnFrente.hora}
            </Text>
          </View>

          <Text style={estilos.tituloItems}>Platos a preparar:</Text>
          <View style={estilos.listaItems}>
            {pedidoEnFrente.items.map((platoItem, indicePlato) => (
              <View
                key={`${platoItem.id}-${indicePlato}`}
                style={estilos.filaItem}
              >
                <Text style={estilos.iconoItem}>{platoItem.icono}</Text>
                <Text style={estilos.nombreItem}>{platoItem.nombre}</Text>
                <Text style={estilos.categoriaItem}>
                  {platoItem.categoria.toUpperCase()}
                </Text>
              </View>
            ))}
          </View>

          {pedidoEnFrente.nota ? (
            <View style={estilos.tarjetaNota}>
              <Text style={estilos.etiquetaNota}>
                ⚠️ ACLARACIÓN DEL ALUMNO:
              </Text>
              <Text style={estilos.textoNota}>«{pedidoEnFrente.nota}»</Text>
            </View>
          ) : null}

          <Pressable
            style={estilos.botonDespachar}
            onPress={atenderSiguientePedido}
          >
            <Text style={estilos.textoBotonDespachar}>
              ✅ Despachar (Desencolar)
            </Text>
          </Pressable>
        </View>
      )}

      {totalEnCola > 1 && (
        <View style={estilos.tarjetaProximos}>
          <Text style={estilos.tituloProximos}>
            Siguientes turnos en la cola:
          </Text>
          {pedidosEnCola.slice(1).map((pedidoItem, indiceItem) => (
            <View
              key={pedidoItem.numeroTurno}
              style={estilos.filaProximo}
            >
              <Text style={estilos.textoProximoNumero}>
                {indiceItem + 1}. Turno #{pedidoItem.numeroTurno}
              </Text>
              <Text style={estilos.textoProximoDetalle}>
                {pedidoItem.items.length} platos • {pedidoItem.hora}
              </Text>
            </View>
          ))}
        </View>
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
  tarjetaInformativa: {
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
    marginTop: 2,
  },
  textoNegrita: {
    fontWeight: "bold",
    color: PALETA_COLORES.primarioInstitucional,
  },
  textoConteo: {
    fontSize: 13,
    color: PALETA_COLORES.textoPrincipal,
    marginTop: 8,
  },
  numeroConteo: {
    fontWeight: "800",
    color: PALETA_COLORES.secundarioAccion,
  },
  tarjetaVacia: {
    backgroundColor: PALETA_COLORES.superficieTarjeta,
    borderRadius: 16,
    padding: 32,
    alignItems: "center",
    borderWidth: 1,
    borderColor: PALETA_COLORES.bordeSuave,
  },
  iconoVacio: {
    fontSize: 44,
    marginBottom: 10,
  },
  tituloVacio: {
    fontSize: 18,
    fontWeight: "800",
    color: PALETA_COLORES.textoPrincipal,
  },
  descripcionVacio: {
    fontSize: 13,
    color: PALETA_COLORES.textoSecundario,
    textAlign: "center",
    marginTop: 4,
    lineHeight: 18,
  },
  tarjetaFrente: {
    backgroundColor: PALETA_COLORES.superficieTarjeta,
    borderRadius: 16,
    padding: 18,
    borderWidth: 2,
    borderColor: PALETA_COLORES.primarioInstitucional,
    marginBottom: 16,
  },
  encabezadoFrente: {
    borderBottomWidth: 1,
    borderBottomColor: PALETA_COLORES.bordeSuave,
    paddingBottom: 12,
    marginBottom: 12,
  },
  insigniaFrente: {
    alignSelf: "flex-start",
    backgroundColor: PALETA_COLORES.acentoCremaClaro,
    borderWidth: 1,
    borderColor: PALETA_COLORES.acentoCrema,
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 6,
    marginBottom: 6,
  },
  textoInsigniaFrente: {
    fontSize: 10,
    fontWeight: "800",
    color: PALETA_COLORES.primarioInstitucional,
    letterSpacing: 0.5,
  },
  numeroTurnoFrente: {
    fontSize: 34,
    fontWeight: "900",
    color: PALETA_COLORES.secundarioAccion,
  },
  horaFrente: {
    fontSize: 12,
    color: PALETA_COLORES.textoSecundario,
  },
  tituloItems: {
    fontSize: 13,
    fontWeight: "700",
    color: PALETA_COLORES.textoPrincipal,
    marginBottom: 6,
  },
  listaItems: {
    gap: 6,
    marginBottom: 12,
  },
  filaItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconoItem: {
    fontSize: 16,
    marginRight: 6,
  },
  nombreItem: {
    flex: 1,
    fontSize: 14,
    color: PALETA_COLORES.textoPrincipal,
    fontWeight: "600",
  },
  categoriaItem: {
    fontSize: 10,
    fontWeight: "700",
    color: PALETA_COLORES.textoAtenuado,
  },
  tarjetaNota: {
    backgroundColor: PALETA_COLORES.acentoCremaClaro,
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: PALETA_COLORES.acentoCrema,
    marginBottom: 14,
  },
  etiquetaNota: {
    fontSize: 11,
    fontWeight: "800",
    color: PALETA_COLORES.primarioInstitucional,
  },
  textoNota: {
    fontSize: 13,
    color: PALETA_COLORES.primarioOscuro,
    fontStyle: "italic",
    marginTop: 2,
  },
  botonDespachar: {
    backgroundColor: PALETA_COLORES.secundarioAccion,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  textoBotonDespachar: {
    color: PALETA_COLORES.blancoPuro,
    fontSize: 15,
    fontWeight: "800",
  },
  tarjetaProximos: {
    backgroundColor: PALETA_COLORES.superficieTarjeta,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: PALETA_COLORES.bordeSuave,
    marginBottom: 16,
  },
  tituloProximos: {
    fontSize: 13,
    fontWeight: "700",
    color: PALETA_COLORES.textoPrincipal,
    marginBottom: 8,
  },
  filaProximo: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  textoProximoNumero: {
    fontSize: 13,
    fontWeight: "600",
    color: PALETA_COLORES.textoPrincipal,
  },
  textoProximoDetalle: {
    fontSize: 12,
    color: PALETA_COLORES.textoSecundario,
  },
});
