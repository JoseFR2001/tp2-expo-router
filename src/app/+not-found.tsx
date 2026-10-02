import { Link, Stack, usePathname } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { DondeEstoy } from "../components/DondeEstoy";
import { PALETA_COLORES } from "../features/comun/colores";

export default function PantallaNoEncontrada() {
  const rutaActual = usePathname();

  return (
    <View style={estilos.contenedor}>
      <Stack.Screen options={{ title: "Error 404" }} />

      <Text style={estilos.icono}>🔍 404</Text>
      <Text style={estilos.titulo}>Ruta Inexistente</Text>
      <Text style={estilos.subtitulo}>
        La dirección <Text style={estilos.rutaResaltada}>«{rutaActual}»</Text> no
        corresponde a ninguna pantalla del sistema.
      </Text>

      <Link href="/" style={estilos.botonInicio}>
        <Text style={estilos.textoBotonInicio}>🏠 Regresar al Inicio</Text>
      </Link>

      <DondeEstoy />
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: PALETA_COLORES.superficieTarjeta,
  },
  icono: {
    fontSize: 48,
    fontWeight: "900",
    color: PALETA_COLORES.primarioInstitucional,
    marginBottom: 8,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "800",
    color: PALETA_COLORES.textoPrincipal,
  },
  subtitulo: {
    fontSize: 14,
    color: PALETA_COLORES.textoSecundario,
    textAlign: "center",
    marginTop: 6,
    marginBottom: 24,
    lineHeight: 20,
  },
  rutaResaltada: {
    fontWeight: "bold",
    color: PALETA_COLORES.peligroError,
    fontFamily: "monospace",
  },
  botonInicio: {
    backgroundColor: PALETA_COLORES.primarioInstitucional,
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 10,
    marginBottom: 20,
  },
  textoBotonInicio: {
    color: PALETA_COLORES.blancoPuro,
    fontWeight: "800",
    fontSize: 14,
  },
});
