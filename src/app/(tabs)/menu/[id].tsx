import { Stack, router, useLocalSearchParams } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { DondeEstoy } from "../../../components/DondeEstoy";
import { HeaderPilaTitulo } from "../../../components/HeaderPila";
import { useComedor } from "../../../context/ComedorContext";
import { PLATOS } from "../../../data/platos";
import { PALETA_COLORES } from "../../../features/comun/colores";

export default function PantallaDetallePlato() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { agregarPlato } = useComedor();

  const idNumerico = Number(id);
  const platoEncontrado = PLATOS.find(
    (plato) => plato.id === idNumerico
  );

  if (!id || isNaN(idNumerico) || !platoEncontrado) {
    return (
      <View style={estilos.contenedorError}>
        <Stack.Screen options={{ title: "Plato Inexistente" }} />
        <Text style={estilos.iconoError}>⚠️</Text>
        <Text style={estilos.tituloError}>Plato no encontrado</Text>
        <Text style={estilos.descripcionError}>
          El identificador {id ? `«${id}»` : ""} no corresponde a ningún plato
          registrado en nuestra carta.
        </Text>
        <Pressable
          style={estilos.botonVolver}
          onPress={() => router.back()}
        >
          <Text style={estilos.textoBotonVolver}>← Volver a la Carta</Text>
        </Pressable>
        <DondeEstoy />
      </View>
    );
  }

  const precioFormateado = platoEncontrado.precio.toLocaleString("es-AR");

  return (
    <ScrollView
      style={estilos.contenedor}
      contentContainerStyle={estilos.contenido}
    >
      <Stack.Screen
        options={{
          headerTitle: () => (
            <HeaderPilaTitulo titulo={platoEncontrado.nombre} />
          ),
        }}
      />

      <View style={estilos.tarjetaPrincipal}>
        <Text style={estilos.iconoGigante}>{platoEncontrado.icono}</Text>
        <View style={estilos.insigniaCategoria}>
          <Text style={estilos.textoInsignia}>
            {platoEncontrado.categoria.toUpperCase()}
          </Text>
        </View>

        <Text style={estilos.nombrePlato}>{platoEncontrado.nombre}</Text>
        <Text style={estilos.precioPlato}>${precioFormateado}</Text>

        <View style={estilos.lineaSeparadora} />

        <Text style={estilos.etiquetaDescripcion}>
          Descripción del plato:
        </Text>
        <Text style={estilos.textoDescripcion}>
          {platoEncontrado.descripcion}
        </Text>

        <View style={estilos.filaMetadatos}>
          <Text style={estilos.textoMetadatos}>
            ⏱️ Tiempo estimado: {platoEncontrado.tiempoMinutos ?? 5} min
          </Text>
          <Text style={estilos.textoMetadatos}>
            📍 Elaborado en Comedor IPF
          </Text>
        </View>
      </View>

      <Pressable
        style={estilos.botonAgregar}
        onPress={() => agregarPlato(platoEncontrado)}
      >
        <Text style={estilos.textoBotonAgregar}>🛒 Agregar al Carrito</Text>
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
    padding: 16,
  },
  tarjetaPrincipal: {
    backgroundColor: PALETA_COLORES.superficieTarjeta,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: PALETA_COLORES.bordeSuave,
    alignItems: "center",
    marginBottom: 16,
  },
  iconoGigante: {
    fontSize: 64,
    marginBottom: 8,
  },
  insigniaCategoria: {
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
    color: PALETA_COLORES.primarioInstitucional,
    letterSpacing: 0.5,
  },
  nombrePlato: {
    fontSize: 22,
    fontWeight: "800",
    color: PALETA_COLORES.textoPrincipal,
    textAlign: "center",
  },
  precioPlato: {
    fontSize: 24,
    fontWeight: "900",
    color: PALETA_COLORES.secundarioAccion,
    marginTop: 6,
  },
  lineaSeparadora: {
    height: 1,
    width: "100%",
    backgroundColor: PALETA_COLORES.bordeSuave,
    marginVertical: 16,
  },
  etiquetaDescripcion: {
    alignSelf: "flex-start",
    fontSize: 13,
    fontWeight: "700",
    color: PALETA_COLORES.textoSecundario,
    marginBottom: 6,
  },
  textoDescripcion: {
    fontSize: 14,
    color: PALETA_COLORES.textoPrincipal,
    lineHeight: 22,
    textAlign: "left",
    width: "100%",
  },
  filaMetadatos: {
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: PALETA_COLORES.bordeSuave,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textoMetadatos: {
    fontSize: 11,
    color: PALETA_COLORES.textoAtenuado,
    fontWeight: "500",
  },
  botonAgregar: {
    backgroundColor: PALETA_COLORES.secundarioAccion,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 16,
    shadowColor: PALETA_COLORES.secundarioAccion,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  textoBotonAgregar: {
    color: PALETA_COLORES.blancoPuro,
    fontSize: 16,
    fontWeight: "800",
  },
  contenedorError: {
    flex: 1,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: PALETA_COLORES.superficieTarjeta,
  },
  iconoError: {
    fontSize: 48,
    marginBottom: 12,
  },
  tituloError: {
    fontSize: 20,
    fontWeight: "800",
    color: PALETA_COLORES.peligroError,
    marginBottom: 6,
  },
  descripcionError: {
    fontSize: 14,
    color: PALETA_COLORES.textoSecundario,
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 20,
  },
  botonVolver: {
    backgroundColor: PALETA_COLORES.fondoLienzo,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: PALETA_COLORES.bordeSuave,
  },
  textoBotonVolver: {
    fontSize: 14,
    fontWeight: "700",
    color: PALETA_COLORES.textoPrincipal,
  },
});
