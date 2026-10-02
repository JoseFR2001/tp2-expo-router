import { useLocalSearchParams, usePathname, useSegments } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { PALETA_COLORES } from "./colores";

export const ACTIVAR_DEPURACION = true;

export const DondeEstoy: React.FC = () => {
  const rutaActual = usePathname();
  const segmentosRuta = useSegments();
  const parametrosLocales = useLocalSearchParams();

  if (!ACTIVAR_DEPURACION) {
    return null;
  }

  return (
    <View style={estilos.contenedorPrincipal}>
      <View style={estilos.filaEncabezado}>
        <Text style={estilos.iconoEncabezado}>🧭</Text>
        <Text style={estilos.textoEncabezado}>Inspector de Ruta (DEBUG)</Text>
      </View>
      <View style={estilos.filaDato}>
        <Text style={estilos.etiquetaDato}>usePathname():</Text>
        <Text style={estilos.valorDato}>{rutaActual}</Text>
      </View>
      <View style={estilos.filaDato}>
        <Text style={estilos.etiquetaDato}>useSegments():</Text>
        <Text style={estilos.valorDato}>{JSON.stringify(segmentosRuta)}</Text>
      </View>
      <View style={estilos.filaDato}>
        <Text style={estilos.etiquetaDato}>useLocalSearchParams():</Text>
        <Text style={estilos.valorDato}>{JSON.stringify(parametrosLocales)}</Text>
      </View>
    </View>
  );
};

const estilos = StyleSheet.create({
  contenedorPrincipal: {
    marginVertical: 16,
    marginHorizontal: 4,
    padding: 12,
    backgroundColor: PALETA_COLORES.primarioOscuro,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: PALETA_COLORES.primarioInstitucional,
  },
  filaEncabezado: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: PALETA_COLORES.primarioInstitucional,
    paddingBottom: 4,
  },
  iconoEncabezado: {
    marginRight: 6,
    fontSize: 14,
  },
  textoEncabezado: {
    fontSize: 12,
    fontWeight: "bold",
    color: PALETA_COLORES.acentoCrema,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  filaDato: {
    marginVertical: 2,
  },
  etiquetaDato: {
    fontSize: 11,
    fontWeight: "600",
    color: PALETA_COLORES.acentoCrema,
  },
  valorDato: {
    fontSize: 12,
    color: PALETA_COLORES.blancoPuro,
    fontFamily: "monospace",
    marginLeft: 4,
  },
});
