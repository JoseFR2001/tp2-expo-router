import { router, Stack, useLocalSearchParams } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { DondeEstoy } from "../../components/DondeEstoy";
import { PALETA_COLORES } from "../../features/comun/colores";

export default function PantallaAyudaCatchAll() {
  const { slug } = useLocalSearchParams<{ slug?: string[] }>();

  const segmentosRuta = Array.isArray(slug)
    ? slug
    : slug
    ? [slug]
    : [];

  const rutaCompleta = segmentosRuta.join(" / ");
  const ultimoSegmento =
    segmentosRuta[segmentosRuta.length - 1] || "Artículo";
  const tituloHeader =
    ultimoSegmento.charAt(0).toUpperCase() + ultimoSegmento.slice(1);

  return (
    <ScrollView
      style={estilos.contenedor}
      contentContainerStyle={estilos.contenido}
    >
      <Stack.Screen options={{ title: `Ayuda: ${tituloHeader}` }} />

      <View style={estilos.cajaInsignia}>
        <Text style={estilos.textoInsignia}>
          Ruta Catch-All ([...slug].tsx)
        </Text>
      </View>

      <Text style={estilos.tituloPrincipal}>Sección de Ayuda</Text>
      <Text style={estilos.textoRuta}>Ruta actual: /ayuda/{rutaCompleta}</Text>

      <View style={estilos.tarjetaContenido}>
        <Text style={estilos.tituloTarjeta}>
          Información sobre «{tituloHeader}»:
        </Text>
        <Text style={estilos.parrafoTarjeta}>
          Esta vista demuestra cómo Expo Router resuelve rutas de profundidad
          variable mediante el patrón catch-all ([...slug].tsx).
        </Text>
        <Text style={estilos.parrafoTarjeta}>
          Todos los segmentos después de /ayuda/ se capturan en un arreglo de
          strings llamado slug:
        </Text>
        <View style={estilos.cajaCodigo}>
          <Text style={estilos.textoCodigo}>
            slug = {JSON.stringify(slug)}
          </Text>
        </View>
      </View>

      <Pressable
        style={estilos.botonVolver}
        onPress={() => router.back()}
      >
        <Text style={estilos.textoBotonVolver}>
          ← Volver a Temas de Ayuda
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
    padding: 16,
  },
  cajaInsignia: {
    alignSelf: "flex-start",
    backgroundColor: PALETA_COLORES.acentoCremaClaro,
    borderWidth: 1,
    borderColor: PALETA_COLORES.acentoCrema,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
  textoInsignia: {
    fontSize: 11,
    fontWeight: "800",
    color: PALETA_COLORES.primarioInstitucional,
  },
  tituloPrincipal: {
    fontSize: 22,
    fontWeight: "800",
    color: PALETA_COLORES.textoPrincipal,
  },
  textoRuta: {
    fontSize: 13,
    color: PALETA_COLORES.textoSecundario,
    marginTop: 2,
    marginBottom: 16,
    fontFamily: "monospace",
  },
  tarjetaContenido: {
    backgroundColor: PALETA_COLORES.superficieTarjeta,
    borderRadius: 14,
    padding: 18,
    borderWidth: 1,
    borderColor: PALETA_COLORES.bordeSuave,
    marginBottom: 20,
  },
  tituloTarjeta: {
    fontSize: 15,
    fontWeight: "700",
    color: PALETA_COLORES.textoPrincipal,
    marginBottom: 8,
  },
  parrafoTarjeta: {
    fontSize: 13,
    color: PALETA_COLORES.textoSecundario,
    lineHeight: 20,
    marginBottom: 8,
  },
  cajaCodigo: {
    backgroundColor: PALETA_COLORES.primarioOscuro,
    padding: 10,
    borderRadius: 8,
    marginTop: 6,
  },
  textoCodigo: {
    color: PALETA_COLORES.acentoCrema,
    fontFamily: "monospace",
    fontSize: 12,
  },
  botonVolver: {
    backgroundColor: PALETA_COLORES.primarioInstitucional,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 16,
  },
  textoBotonVolver: {
    color: PALETA_COLORES.blancoPuro,
    fontSize: 14,
    fontWeight: "700",
  },
});
