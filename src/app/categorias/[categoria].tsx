import { Stack, router, useLocalSearchParams } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { DondeEstoy } from "../../components/DondeEstoy";
import { HeaderPilaTitulo } from "../../components/HeaderPila";
import { TarjetaPlato } from "../../components/TarjetaPlato";
import { PLATOS } from "../../data/platos";
import { PALETA_COLORES } from "../../features/comun/colores";

const CATEGORIAS_VALIDAS = ["desayuno", "almuerzo", "bebidas", "kiosco"];

export default function PantallaCategoria() {
  const { categoria } = useLocalSearchParams<{ categoria: string }>();

  const categoriaNormalizada = (categoria || "").toLowerCase();
  const esCategoriaValida = CATEGORIAS_VALIDAS.includes(
    categoriaNormalizada
  );

  if (!esCategoriaValida) {
    return (
      <View style={estilos.contenedorError}>
        <Stack.Screen options={{ title: "Categoría Inválida" }} />
        <Text style={estilos.iconoError}>⚠️</Text>
        <Text style={estilos.tituloError}>Categoría no disponible</Text>
        <Text style={estilos.descripcionError}>
          La categoría {categoria ? `«${categoria}»` : ""} no existe. Las
          categorías permitidas son: desayuno, almuerzo, bebidas y kiosco.
        </Text>
        <Pressable
          style={estilos.botonVolver}
          onPress={() => router.back()}
        >
          <Text style={estilos.textoBotonVolver}>← Volver</Text>
        </Pressable>
        <DondeEstoy />
      </View>
    );
  }

  const platosFiltrados = PLATOS.filter(
    (plato) => plato.categoria === categoriaNormalizada
  );

  const tituloFormateado =
    categoriaNormalizada.charAt(0).toUpperCase() +
    categoriaNormalizada.slice(1);

  const sufijoOpciones =
    platosFiltrados.length === 1 ? "opción" : "opciones";

  return (
    <ScrollView
      style={estilos.contenedor}
      contentContainerStyle={estilos.contenido}
    >
      <Stack.Screen
        options={{
          headerTitle: () => (
            <HeaderPilaTitulo titulo={`Categoría: ${tituloFormateado}`} />
          ),
        }}
      />

      <View style={estilos.encabezado}>
        <Text style={estilos.tituloPrincipal}>
          Platos de {tituloFormateado}
        </Text>
        <Text style={estilos.subtituloPrincipal}>
          Mostrando {platosFiltrados.length} {sufijoOpciones} preparadas por el
          comedor.
        </Text>
      </View>

      <View style={estilos.listaPlatos}>
        {platosFiltrados.map((plato) => (
          <TarjetaPlato key={plato.id} plato={plato} />
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
  encabezado: {
    marginBottom: 16,
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
  },
  listaPlatos: {
    marginBottom: 16,
  },
  contenedorError: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
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
    paddingHorizontal: 20,
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
