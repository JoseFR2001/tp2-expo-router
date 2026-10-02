import { router, useLocalSearchParams } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { DondeEstoy } from "../../components/DondeEstoy";
import { useComedor } from "../../context/ComedorContext";
import { PALETA_COLORES } from "../../features/comun/colores";

export default function PantallaTurno() {
  const { numero } = useLocalSearchParams<{ numero: string }>();
  const { obtenerPosicionTurno, pedidosEnCola } = useComedor();

  const numeroTurnoNumerico = Number(numero);
  const pedidosPorDelante = obtenerPosicionTurno(numeroTurnoNumerico);
  const tiempoEstimadoMinutos = pedidosPorDelante * 3;

  return (
    <ScrollView
      style={estilos.contenedor}
      contentContainerStyle={estilos.contenido}
    >
      <View style={estilos.tarjetaTurno}>
        <Text style={estilos.etiquetaTicket}>TU TICKET DE RETIRO</Text>
        <Text style={estilos.numeroTurno}>#{numeroTurnoNumerico}</Text>
        <View style={estilos.insigniaEstado}>
          <Text style={estilos.textoInsignia}>EN COLA DE PREPARACIÓN</Text>
        </View>
        <Text style={estilos.subtituloTurno}>
          Guardá este número. Te llamaremos por pantalla cuando esté listo.
        </Text>
      </View>

      <View style={estilos.tarjetaMetricas}>
        <Text style={estilos.tituloMetricas}>
          📊 Estado de tu Pedido en Cola:
        </Text>

        <View style={estilos.filaMetrica}>
          <Text style={estilos.iconoMetrica}>👥</Text>
          <View style={estilos.detalleMetrica}>
            <Text style={estilos.etiquetaMetrica}>Pedidos adelante tuyo:</Text>
            <Text style={estilos.valorMetrica}>
              {pedidosPorDelante === 0
                ? "¡Tu pedido es el siguiente!"
                : `${pedidosPorDelante} en espera`}
            </Text>
          </View>
        </View>

        <View style={estilos.filaMetrica}>
          <Text style={estilos.iconoMetrica}>⏳</Text>
          <View style={estilos.detalleMetrica}>
            <Text style={estilos.etiquetaMetrica}>
              Tiempo estimado de espera:
            </Text>
            <Text style={estilos.valorMetrica}>
              {pedidosPorDelante === 0
                ? "Inminente (menos de 2 min)"
                : `Aprox. ${tiempoEstimadoMinutos} minutos (${pedidosPorDelante} x 3 min)`}
            </Text>
          </View>
        </View>

        <View style={estilos.filaMetrica}>
          <Text style={estilos.iconoMetrica}>🍳</Text>
          <View style={estilos.detalleMetrica}>
            <Text style={estilos.etiquetaMetrica}>
              Total de pedidos activos en cocina:
            </Text>
            <Text style={estilos.valorMetrica}>{pedidosEnCola.length}</Text>
          </View>
        </View>
      </View>

      <Pressable
        style={estilos.botonVolverInicio}
        onPress={() => router.replace("/")}
      >
        <Text style={estilos.textoBotonVolverInicio}>
          🏠 Volver al Inicio
        </Text>
      </Pressable>

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
    padding: 20,
    alignItems: "center",
  },
  tarjetaTurno: {
    backgroundColor: PALETA_COLORES.superficieTarjeta,
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    width: "100%",
    borderWidth: 2,
    borderColor: PALETA_COLORES.primarioInstitucional,
    marginBottom: 20,
    shadowColor: PALETA_COLORES.primarioInstitucional,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 4,
  },
  etiquetaTicket: {
    fontSize: 11,
    fontWeight: "800",
    color: PALETA_COLORES.primarioInstitucional,
    letterSpacing: 1.5,
  },
  numeroTurno: {
    fontSize: 60,
    fontWeight: "900",
    color: PALETA_COLORES.secundarioAccion,
    marginVertical: 4,
  },
  insigniaEstado: {
    backgroundColor: PALETA_COLORES.acentoCremaClaro,
    borderWidth: 1,
    borderColor: PALETA_COLORES.acentoCrema,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 10,
  },
  textoInsignia: {
    fontSize: 11,
    fontWeight: "800",
    color: PALETA_COLORES.primarioOscuro,
  },
  subtituloTurno: {
    fontSize: 12,
    color: PALETA_COLORES.textoSecundario,
    textAlign: "center",
    lineHeight: 16,
  },
  tarjetaMetricas: {
    backgroundColor: PALETA_COLORES.superficieTarjeta,
    borderRadius: 16,
    padding: 18,
    width: "100%",
    borderWidth: 1,
    borderColor: PALETA_COLORES.bordeSuave,
    marginBottom: 20,
  },
  tituloMetricas: {
    fontSize: 14,
    fontWeight: "800",
    color: PALETA_COLORES.textoPrincipal,
    marginBottom: 14,
  },
  filaMetrica: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: PALETA_COLORES.bordeSuave,
  },
  iconoMetrica: {
    fontSize: 20,
    marginRight: 12,
  },
  detalleMetrica: {
    flex: 1,
  },
  etiquetaMetrica: {
    fontSize: 12,
    color: PALETA_COLORES.textoSecundario,
  },
  valorMetrica: {
    fontSize: 14,
    fontWeight: "700",
    color: PALETA_COLORES.textoPrincipal,
    marginTop: 2,
  },
  botonVolverInicio: {
    backgroundColor: PALETA_COLORES.primarioInstitucional,
    paddingVertical: 14,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
    marginBottom: 16,
  },
  textoBotonVolverInicio: {
    color: PALETA_COLORES.blancoPuro,
    fontSize: 15,
    fontWeight: "800",
  },
});
