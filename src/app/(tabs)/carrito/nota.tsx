import { router } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { DondeEstoy } from "../../../components/DondeEstoy";
import { useComedor } from "../../../context/ComedorContext";
import { PALETA_COLORES } from "../../../features/comun/colores";

export default function PantallaNotaCarrito() {
  const { nota, setNota } = useComedor();
  const [textoNota, setTextoNota] = useState(nota);

  const manejadorGuardar = () => {
    setNota(textoNota);
    router.back();
  };

  return (
    <View style={estilos.contenedor}>
      <Text style={estilos.titulo}>📝 Nota para la Cocina</Text>
      <Text style={estilos.subtitulo}>
        Indicá requerimientos especiales como «sin sal», «aderezos aparte» o
        «bien cocido».
      </Text>

      <TextInput
        style={estilos.campoTexto}
        placeholder="Escribí aquí tu mensaje para los cocineros..."
        placeholderTextColor={PALETA_COLORES.textoAtenuado}
        value={textoNota}
        onChangeText={setTextoNota}
        multiline
        numberOfLines={3}
      />

      <View style={estilos.filaBotones}>
        <Pressable
          style={estilos.botonCancelar}
          onPress={() => router.back()}
        >
          <Text style={estilos.textoBotonCancelar}>Descartar</Text>
        </Pressable>

        <Pressable
          style={estilos.botonGuardar}
          onPress={manejadorGuardar}
        >
          <Text style={estilos.textoBotonGuardar}>Guardar Nota ✨</Text>
        </Pressable>
      </View>

      <DondeEstoy />
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    padding: 20,
    backgroundColor: PALETA_COLORES.superficieTarjeta,
  },
  titulo: {
    fontSize: 18,
    fontWeight: "800",
    color: PALETA_COLORES.textoPrincipal,
    marginBottom: 4,
  },
  subtitulo: {
    fontSize: 13,
    color: PALETA_COLORES.textoSecundario,
    lineHeight: 18,
    marginBottom: 16,
  },
  campoTexto: {
    backgroundColor: PALETA_COLORES.fondoLienzo,
    borderWidth: 1,
    borderColor: PALETA_COLORES.bordeSuave,
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
    color: PALETA_COLORES.textoPrincipal,
    textAlignVertical: "top",
    height: 90,
    marginBottom: 16,
  },
  filaBotones: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
    marginBottom: 16,
  },
  botonCancelar: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: PALETA_COLORES.fondoLienzo,
    borderWidth: 1,
    borderColor: PALETA_COLORES.bordeSuave,
  },
  textoBotonCancelar: {
    fontSize: 13,
    fontWeight: "600",
    color: PALETA_COLORES.textoSecundario,
  },
  botonGuardar: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
    backgroundColor: PALETA_COLORES.primarioInstitucional,
  },
  textoBotonGuardar: {
    fontSize: 13,
    fontWeight: "700",
    color: PALETA_COLORES.blancoPuro,
  },
});
