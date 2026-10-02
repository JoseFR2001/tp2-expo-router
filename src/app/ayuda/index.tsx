import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { DondeEstoy } from "../../components/DondeEstoy";
import { PALETA_COLORES } from "../../features/comun/colores";

const ARTICULOS_DE_AYUDA = [
  {
    rutaDestino: "/ayuda/pagos/efectivo",
    tituloArticulo: "Pagos en Efectivo en Caja",
    iconoArticulo: "cash-outline",
  },
  {
    rutaDestino: "/ayuda/pagos/transferencia",
    tituloArticulo: "Pagos con QR y Transferencia Bancaria",
    iconoArticulo: "qr-code-outline",
  },
  {
    rutaDestino: "/ayuda/horarios",
    tituloArticulo: "Horarios de Despacho y Cocina",
    iconoArticulo: "time-outline",
  },
  {
    rutaDestino: "/ayuda/pedidos/demoras",
    tituloArticulo: "¿Cómo funciona la Cola de Turnos y demoras?",
    iconoArticulo: "people-outline",
  },
];

export default function PantallaAyudaInicio() {
  return (
    <ScrollView
      style={estilos.contenedor}
      contentContainerStyle={estilos.contenido}
    >
      <Text style={estilos.tituloPrincipal}>ℹ️ Centro de Ayuda</Text>
      <Text style={estilos.subtituloPrincipal}>
        Consultá información sobre el funcionamiento del Comedor IPF.
      </Text>

      <View style={estilos.listaArticulos}>
        {ARTICULOS_DE_AYUDA.map((articulo) => (
          <Link
            key={articulo.rutaDestino}
            href={articulo.rutaDestino as any}
            style={estilos.tarjetaArticulo}
          >
            <View style={estilos.contenedorInterno}>
              <View style={estilos.cajaIcono}>
                <Ionicons
                  name={articulo.iconoArticulo as any}
                  size={22}
                  color={PALETA_COLORES.primarioInstitucional}
                />
              </View>
              <View style={estilos.informacionArticulo}>
                <Text style={estilos.tituloArticulo}>
                  {articulo.tituloArticulo}
                </Text>
                <Text style={estilos.rutaArticulo}>
                  {articulo.rutaDestino}
                </Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={18}
                color={PALETA_COLORES.textoAtenuado}
              />
            </View>
          </Link>
        ))}
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
  },
  listaArticulos: {
    gap: 12,
    marginBottom: 20,
  },
  tarjetaArticulo: {
    backgroundColor: PALETA_COLORES.superficieTarjeta,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: PALETA_COLORES.bordeSuave,
    padding: 14,
  },
  contenedorInterno: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  cajaIcono: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: PALETA_COLORES.acentoCremaClaro,
    borderWidth: 1,
    borderColor: PALETA_COLORES.acentoCrema,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  informacionArticulo: {
    flex: 1,
  },
  tituloArticulo: {
    fontSize: 14,
    fontWeight: "700",
    color: PALETA_COLORES.textoPrincipal,
  },
  rutaArticulo: {
    fontSize: 11,
    color: PALETA_COLORES.textoAtenuado,
    marginTop: 2,
    fontFamily: "monospace",
  },
});
