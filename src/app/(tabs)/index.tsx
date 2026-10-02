import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { DondeEstoy } from "../../components/DondeEstoy";
import { useComedor } from "../../context/ComedorContext";
import { PALETA_COLORES } from "../../features/comun/colores";

export default function PantallaInicio() {
  const { usuario, pedidosEnCola } = useComedor();
  const tieneSesionActiva = usuario !== null;
  const totalPedidosEnEspera = pedidosEnCola.length;

  const textoPluralPedidos =
    totalPedidosEnEspera === 1 ? "pedido" : "pedidos";

  return (
    <ScrollView
      style={estilos.contenedor}
      contentContainerStyle={estilos.contenido}
    >
      <View style={estilos.tarjetaBanner}>
        <Text style={estilos.subtituloBanner}>Instituto Politécnico Formosa</Text>
        <Text style={estilos.tituloBanner}>Comedor IPF 🍽️</Text>
        <Text style={estilos.descripcionBanner}>
          Pedí tu comida favorita desde tu dispositivo y retirala recién
          preparada en el buffet institucional.
        </Text>

        {totalPedidosEnEspera > 0 && (
          <View style={estilos.alertaCola}>
            <Ionicons
              name="time"
              size={16}
              color={PALETA_COLORES.alertaAmarillo}
            />
            <Text style={estilos.textoAlerta}>
              Hay{" "}
              <Text style={estilos.textoNegrita}>
                {totalPedidosEnEspera}
              </Text>{" "}
              {textoPluralPedidos} preparándose en la cocina.
            </Text>
          </View>
        )}
      </View>

      <Text style={estilos.tituloSeccion}>Accesos Rápidos</Text>

      <View style={estilos.grillaAccesos}>
        <Link href="/menu" asChild>
          <Pressable style={estilos.tarjetaAcceso}>
            <View
              style={[
                estilos.cajaIcono,
                { backgroundColor: PALETA_COLORES.primarioInstitucional },
              ]}
            >
              <Ionicons
                name="restaurant"
                size={24}
                color={PALETA_COLORES.blancoPuro}
              />
            </View>
            <View style={estilos.informacionTarjeta}>
              <Text style={estilos.tituloAcceso}>Ver Menú Completo</Text>
              <Text style={estilos.descripcionAcceso}>
                Explorá platos organizados por categorías
              </Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={PALETA_COLORES.primarioInstitucional}
            />
          </Pressable>
        </Link>

        <Link href="/buscar" asChild>
          <Pressable style={estilos.tarjetaAcceso}>
            <View
              style={[
                estilos.cajaIcono,
                { backgroundColor: PALETA_COLORES.secundarioAccion },
              ]}
            >
              <Ionicons
                name="search"
                size={24}
                color={PALETA_COLORES.blancoPuro}
              />
            </View>
            <View style={estilos.informacionTarjeta}>
              <Text style={estilos.tituloAcceso}>Buscar Platos</Text>
              <Text style={estilos.descripcionAcceso}>
                Filtrado en vivo por nombre y categoría
              </Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={PALETA_COLORES.secundarioAccion}
            />
          </Pressable>
        </Link>

        <Link href="/ayuda" asChild>
          <Pressable style={estilos.tarjetaAcceso}>
            <View
              style={[
                estilos.cajaIcono,
                { backgroundColor: PALETA_COLORES.textoSecundario },
              ]}
            >
              <Ionicons
                name="help-circle"
                size={24}
                color={PALETA_COLORES.blancoPuro}
              />
            </View>
            <View style={estilos.informacionTarjeta}>
              <Text style={estilos.tituloAcceso}>Centro de Ayuda</Text>
              <Text style={estilos.descripcionAcceso}>
                Horarios, formas de pago y preguntas frecuentes
              </Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={PALETA_COLORES.textoSecundario}
            />
          </Pressable>
        </Link>

        {tieneSesionActiva ? (
          <Link href="/cocina" asChild>
            <Pressable
              style={[
                estilos.tarjetaAcceso,
                { borderColor: PALETA_COLORES.secundarioAccion },
              ]}
            >
              <View
                style={[
                  estilos.cajaIcono,
                  { backgroundColor: PALETA_COLORES.secundarioAccion },
                ]}
              >
                <Ionicons
                  name="flame"
                  size={24}
                  color={PALETA_COLORES.blancoPuro}
                />
              </View>
              <View style={estilos.informacionTarjeta}>
                <Text style={estilos.tituloAcceso}>Panel de Cocina (Activo)</Text>
                <Text style={estilos.descripcionAcceso}>
                  Sesión iniciada como personal del comedor
                </Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={PALETA_COLORES.secundarioAccion}
              />
            </Pressable>
          </Link>
        ) : (
          <Link href="/login" asChild>
            <Pressable style={estilos.tarjetaAcceso}>
              <View
                style={[
                  estilos.cajaIcono,
                  { backgroundColor: PALETA_COLORES.peligroError },
                ]}
              >
                <Ionicons
                  name="lock-closed"
                  size={24}
                  color={PALETA_COLORES.blancoPuro}
                />
              </View>
              <View style={estilos.informacionTarjeta}>
                <Text style={estilos.tituloAcceso}>Acceso Cocina</Text>
                <Text style={estilos.descripcionAcceso}>
                  Exclusivo para el personal del comedor
                </Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={PALETA_COLORES.peligroError}
              />
            </Pressable>
          </Link>
        )}
      </View>

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
    paddingTop: 36,
  },
  tarjetaBanner: {
    backgroundColor: PALETA_COLORES.primarioInstitucional,
    borderRadius: 18,
    padding: 22,
    marginBottom: 24,
    shadowColor: PALETA_COLORES.primarioOscuro,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  subtituloBanner: {
    fontSize: 13,
    color: PALETA_COLORES.acentoCrema,
    fontWeight: "600",
  },
  tituloBanner: {
    fontSize: 28,
    fontWeight: "900",
    color: PALETA_COLORES.blancoPuro,
    marginVertical: 4,
  },
  descripcionBanner: {
    fontSize: 13,
    color: PALETA_COLORES.acentoCremaClaro,
    lineHeight: 19,
  },
  alertaCola: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: PALETA_COLORES.superficieTarjeta,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginTop: 14,
    gap: 6,
  },
  textoAlerta: {
    fontSize: 12,
    color: PALETA_COLORES.textoPrincipal,
  },
  textoNegrita: {
    fontWeight: "bold",
    color: PALETA_COLORES.primarioInstitucional,
  },
  tituloSeccion: {
    fontSize: 18,
    fontWeight: "800",
    color: PALETA_COLORES.textoPrincipal,
    marginBottom: 12,
  },
  grillaAccesos: {
    gap: 12,
    marginBottom: 20,
  },
  tarjetaAcceso: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: PALETA_COLORES.bordeSuave,
    backgroundColor: PALETA_COLORES.superficieTarjeta,
  },
  cajaIcono: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  informacionTarjeta: {
    flex: 1,
  },
  tituloAcceso: {
    fontSize: 16,
    fontWeight: "700",
    color: PALETA_COLORES.textoPrincipal,
  },
  descripcionAcceso: {
    fontSize: 12,
    color: PALETA_COLORES.textoSecundario,
    marginTop: 2,
  },
});
