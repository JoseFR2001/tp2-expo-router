import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { DondeEstoy } from "../../../components/DondeEstoy";
import { TarjetaPlato } from "../../../components/TarjetaPlato";
import { PLATOS } from "../../../data/platos";
import { PALETA_COLORES } from "../../../features/comun/colores";

const CATEGORIAS_DISPONIBLES = [
  { identificador: "todas", etiqueta: "Todo", icono: "🍽️" },
  { identificador: "desayuno", etiqueta: "Desayuno", icono: "☕" },
  { identificador: "almuerzo", etiqueta: "Almuerzo", icono: "🥩" },
  { identificador: "bebidas", etiqueta: "Bebidas", icono: "🥤" },
  { identificador: "kiosco", etiqueta: "Kiosco", icono: "🍪" },
];

export default function PantallaMenu() {
  const [categoriaActiva, setCategoriaActiva] = useState("todas");

  const platosFiltrados =
    categoriaActiva === "todas"
      ? PLATOS
      : PLATOS.filter((plato) => plato.categoria === categoriaActiva);

  return (
    <ScrollView
      style={estilos.contenedor}
      contentContainerStyle={estilos.contenido}
    >
      <Text style={estilos.tituloPrincipal}>Nuestra Carta 📜</Text>
      <Text style={estilos.subtituloPrincipal}>
        Seleccioná tu comida o bebida y sumala al carrito.
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={estilos.contenedorCategorias}
      >
        {CATEGORIAS_DISPONIBLES.map((categoriaItem) => {
          const estaSeleccionada =
            categoriaActiva === categoriaItem.identificador;
          return (
            <Pressable
              key={categoriaItem.identificador}
              style={[
                estilos.botonCategoria,
                estaSeleccionada && estilos.botonCategoriaActiva,
              ]}
              onPress={() => setCategoriaActiva(categoriaItem.identificador)}
            >
              <Text style={estilos.iconoCategoria}>{categoriaItem.icono}</Text>
              <Text
                style={[
                  estilos.textoCategoria,
                  estaSeleccionada && estilos.textoCategoriaActiva,
                ]}
              >
                {categoriaItem.etiqueta}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

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
  contenedorCategorias: {
    gap: 8,
    paddingBottom: 16,
  },
  botonCategoria: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: PALETA_COLORES.superficieTarjeta,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: PALETA_COLORES.bordeSuave,
  },
  botonCategoriaActiva: {
    backgroundColor: PALETA_COLORES.primarioInstitucional,
    borderColor: PALETA_COLORES.primarioInstitucional,
  },
  iconoCategoria: {
    fontSize: 14,
  },
  textoCategoria: {
    fontSize: 13,
    fontWeight: "600",
    color: PALETA_COLORES.textoSecundario,
  },
  textoCategoriaActiva: {
    color: PALETA_COLORES.blancoPuro,
  },
  listaPlatos: {
    marginTop: 8,
  },
});
