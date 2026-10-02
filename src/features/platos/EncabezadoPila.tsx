import { useNavigation } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { PALETA_COLORES } from "../comun/colores";

interface PropiedadesEncabezadoPila {
  titulo: string;
}

export const EncabezadoPilaTitulo: React.FC<PropiedadesEncabezadoPila> = ({
  titulo,
}) => {
  const navegacion = useNavigation();
  const estadoNavegacion = navegacion.getState();
  const cantidadEnPila = estadoNavegacion?.routes?.length ?? 1;

  const sufijoPantalla = cantidadEnPila === 1 ? "pantalla" : "pantallas";

  return (
    <View style={estilos.contenedor}>
      <Text style={estilos.textoTitulo}>{titulo}</Text>
      <View style={estilos.insigniaPila}>
        <Text style={estilos.textoInsignia}>
          Pila: {cantidadEnPila} {sufijoPantalla}
        </Text>
      </View>
    </View>
  );
};

const estilos = StyleSheet.create({
  contenedor: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  textoTitulo: {
    fontSize: 17,
    fontWeight: "bold",
    color: PALETA_COLORES.blancoPuro,
  },
  insigniaPila: {
    backgroundColor: PALETA_COLORES.primarioOscuro,
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: PALETA_COLORES.acentoCrema,
  },
  textoInsignia: {
    fontSize: 11,
    color: PALETA_COLORES.acentoCrema,
    fontWeight: "600",
  },
});
