import { Link } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useComedor } from "../../context/ComedorContext";
import { PALETA_COLORES } from "../comun/colores";
import { Plato } from "./tipos";

interface PropiedadesTarjetaPlato {
  plato: Plato;
}

export const TarjetaPlato: React.FC<PropiedadesTarjetaPlato> = ({ plato }) => {
  const { agregarPlato } = useComedor();

  const precioFormateado = plato.precio.toLocaleString("es-AR");

  return (
    <View style={estilos.tarjeta}>
      <View style={estilos.encabezado}>
        <Text style={estilos.iconoPlato}>{plato.icono}</Text>
        <View style={estilos.informacion}>
          <Text style={estilos.nombrePlato}>{plato.nombre}</Text>
          <Text style={estilos.etiquetaCategoria}>
            {plato.categoria.toUpperCase()}
          </Text>
        </View>
        <Text style={estilos.precioPlato}>${precioFormateado}</Text>
      </View>

      <Text style={estilos.descripcionPlato} numberOfLines={2}>
        {plato.descripcion}
      </Text>

      <View style={estilos.contenedorAcciones}>
        <Link href={`/menu/${plato.id}`} asChild>
          <Pressable style={estilos.botonDetalle}>
            <Text style={estilos.textoBotonDetalle}>Ver Detalle 👁️</Text>
          </Pressable>
        </Link>

        <Pressable
          style={estilos.botonAgregar}
          onPress={() => agregarPlato(plato)}
        >
          <Text style={estilos.textoBotonAgregar}>+ Agregar 🛒</Text>
        </Pressable>
      </View>
    </View>
  );
};

const estilos = StyleSheet.create({
  tarjeta: {
    backgroundColor: PALETA_COLORES.superficieTarjeta,
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: PALETA_COLORES.bordeSuave,
    shadowColor: PALETA_COLORES.primarioInstitucional,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  encabezado: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  iconoPlato: {
    fontSize: 32,
    marginRight: 12,
  },
  informacion: {
    flex: 1,
  },
  nombrePlato: {
    fontSize: 16,
    fontWeight: "700",
    color: PALETA_COLORES.textoPrincipal,
  },
  etiquetaCategoria: {
    fontSize: 10,
    fontWeight: "800",
    color: PALETA_COLORES.primarioInstitucional,
    letterSpacing: 0.5,
    marginTop: 2,
  },
  precioPlato: {
    fontSize: 17,
    fontWeight: "800",
    color: PALETA_COLORES.secundarioAccion,
  },
  descripcionPlato: {
    fontSize: 13,
    color: PALETA_COLORES.textoSecundario,
    lineHeight: 18,
    marginBottom: 12,
  },
  contenedorAcciones: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 8,
  },
  botonDetalle: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: PALETA_COLORES.acentoCremaClaro,
    borderWidth: 1,
    borderColor: PALETA_COLORES.acentoCrema,
  },
  textoBotonDetalle: {
    fontSize: 12,
    fontWeight: "600",
    color: PALETA_COLORES.primarioInstitucional,
  },
  botonAgregar: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    backgroundColor: PALETA_COLORES.secundarioAccion,
  },
  textoBotonAgregar: {
    fontSize: 12,
    fontWeight: "700",
    color: PALETA_COLORES.blancoPuro,
  },
});
