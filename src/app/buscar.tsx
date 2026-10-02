import { router, useLocalSearchParams } from "expo-router";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { DondeEstoy } from "../components/DondeEstoy";
import { TarjetaPlato } from "../components/TarjetaPlato";
import { PLATOS } from "../data/platos";
import { PALETA_COLORES } from "../features/comun/colores";

const CATEGORIAS_FILTRO = [
  "todas",
  "desayuno",
  "almuerzo",
  "bebidas",
  "kiosco",
];

export default function PantallaBuscar() {
  const parametrosBusqueda = useLocalSearchParams<{
    q?: string;
    categoria?: string;
  }>();

  const textoBusqueda = parametrosBusqueda.q || "";
  const categoriaSeleccionada = parametrosBusqueda.categoria || "todas";

  const manejadorCambioTexto = (nuevoTexto: string) => {
    router.setParams({ q: nuevoTexto });
  };

  const manejadorSeleccionarCategoria = (categoriaElegida: string) => {
    router.setParams({
      categoria: categoriaElegida === "todas" ? "" : categoriaElegida,
    });
  };

  const platosFiltrados = PLATOS.filter((plato) => {
    const coincideTexto =
      plato.nombre.toLowerCase().includes(textoBusqueda.toLowerCase()) ||
      plato.descripcion.toLowerCase().includes(textoBusqueda.toLowerCase());

    const coincideCategoria =
      categoriaSeleccionada === "todas" ||
      !categoriaSeleccionada ||
      plato.categoria === categoriaSeleccionada;

    return coincideTexto && coincideCategoria;
  });

  return (
    <ScrollView
      style={estilos.contenedor}
      contentContainerStyle={estilos.contenido}
    >
      <Text style={estilos.tituloPrincipal}>🔎 Explorar Platos</Text>
      <Text style={estilos.subtituloPrincipal}>
        Filtrado en vivo sincronizado con los parámetros de la URL.
      </Text>

      <TextInput
        style={estilos.campoEntrada}
        placeholder="Escribí un nombre o ingrediente..."
        placeholderTextColor={PALETA_COLORES.textoAtenuado}
        value={textoBusqueda}
        onChangeText={manejadorCambioTexto}
      />

      <Text style={estilos.etiquetaFiltro}>Filtrar categoría:</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={estilos.desplazamientoFiltros}
      >
        {CATEGORIAS_FILTRO.map((categoriaItem) => {
          const estaActiva =
            (categoriaSeleccionada || "todas") === categoriaItem;
          return (
            <Pressable
              key={categoriaItem}
              style={[
                estilos.chipFiltro,
                estaActiva && estilos.chipFiltroActivo,
              ]}
              onPress={() => manejadorSeleccionarCategoria(categoriaItem)}
            >
              <Text
                style={[
                  estilos.textoChip,
                  estaActiva && estilos.textoChipActivo,
                ]}
              >
                {categoriaItem.toUpperCase()}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <View style={estilos.encabezadoResultados}>
        <Text style={estilos.conteoResultados}>
          Resultados encontrados:{" "}
          <Text style={estilos.textoNegrita}>{platosFiltrados.length}</Text>
        </Text>
      </View>

      {platosFiltrados.length === 0 ? (
        <View style={estilos.tarjetaSinResultados}>
          <Text style={estilos.iconoSinResultados}>🍽️</Text>
          <Text style={estilos.tituloSinResultados}>Sin coincidencias</Text>
          <Text style={estilos.textoSinResultados}>
            No encontramos platos que coincidan con {textoBusqueda ? `«${textoBusqueda}»` : "la búsqueda"}. Probá con otro
            término o categoría.
          </Text>
        </View>
      ) : (
        platosFiltrados.map((plato) => (
          <TarjetaPlato key={plato.id} plato={plato} />
        ))
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
  tituloPrincipal: {
    fontSize: 22,
    fontWeight: "800",
    color: PALETA_COLORES.textoPrincipal,
  },
  subtituloPrincipal: {
    fontSize: 13,
    color: PALETA_COLORES.textoSecundario,
    marginTop: 2,
    marginBottom: 16,
  },
  campoEntrada: {
    backgroundColor: PALETA_COLORES.superficieTarjeta,
    borderWidth: 1,
    borderColor: PALETA_COLORES.bordeSuave,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: PALETA_COLORES.textoPrincipal,
    marginBottom: 14,
  },
  etiquetaFiltro: {
    fontSize: 12,
    fontWeight: "700",
    color: PALETA_COLORES.textoSecundario,
    marginBottom: 8,
  },
  desplazamientoFiltros: {
    marginBottom: 16,
  },
  chipFiltro: {
    backgroundColor: PALETA_COLORES.superficieTarjeta,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: PALETA_COLORES.bordeSuave,
    marginRight: 8,
  },
  chipFiltroActivo: {
    backgroundColor: PALETA_COLORES.primarioInstitucional,
    borderColor: PALETA_COLORES.primarioInstitucional,
  },
  textoChip: {
    fontSize: 11,
    fontWeight: "700",
    color: PALETA_COLORES.textoSecundario,
  },
  textoChipActivo: {
    color: PALETA_COLORES.blancoPuro,
  },
  encabezadoResultados: {
    marginBottom: 10,
  },
  conteoResultados: {
    fontSize: 13,
    color: PALETA_COLORES.textoSecundario,
  },
  textoNegrita: {
    fontWeight: "bold",
    color: PALETA_COLORES.textoPrincipal,
  },
  tarjetaSinResultados: {
    backgroundColor: PALETA_COLORES.superficieTarjeta,
    borderRadius: 12,
    padding: 24,
    alignItems: "center",
    borderWidth: 1,
    borderColor: PALETA_COLORES.bordeSuave,
    marginBottom: 16,
  },
  iconoSinResultados: {
    fontSize: 36,
    marginBottom: 8,
  },
  tituloSinResultados: {
    fontSize: 16,
    fontWeight: "700",
    color: PALETA_COLORES.textoPrincipal,
  },
  textoSinResultados: {
    fontSize: 13,
    color: PALETA_COLORES.textoSecundario,
    textAlign: "center",
    marginTop: 4,
    lineHeight: 18,
  },
});
