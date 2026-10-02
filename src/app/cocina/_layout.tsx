import { Ionicons } from "@expo/vector-icons";
import { Drawer } from "expo-router/drawer";
import { Pressable, StyleSheet, Text } from "react-native";
import { useComedor } from "../../context/ComedorContext";
import { PALETA_COLORES } from "../../features/comun/colores";

export default function LayoutCocinaDrawer() {
  const { cerrarSesion } = useComedor();

  return (
    <Drawer
      screenOptions={{
        headerStyle: { backgroundColor: PALETA_COLORES.primarioInstitucional },
        headerTintColor: PALETA_COLORES.blancoPuro,
        headerTitleStyle: { fontWeight: "700" },
        drawerActiveTintColor: PALETA_COLORES.secundarioAccion,
        drawerInactiveTintColor: PALETA_COLORES.textoSecundario,
        drawerLabelStyle: { fontWeight: "600" },
        headerRight: () => (
          <Pressable style={estilos.botonSalir} onPress={cerrarSesion}>
            <Text style={estilos.textoBotonSalir}>Cerrar Sesión 🚪</Text>
          </Pressable>
        ),
      }}
    >
      <Drawer.Screen
        name="index"
        options={{
          title: "Cola de Cocina",
          drawerLabel: "Pedidos Pendientes (FIFO)",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="list-circle" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="atendidos"
        options={{
          title: "Historial Atendidos",
          drawerLabel: "Historial Atendidos (LIFO)",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="checkmark-done-circle" size={size} color={color} />
          ),
        }}
      />
    </Drawer>
  );
}

const estilos = StyleSheet.create({
  botonSalir: {
    marginRight: 14,
    backgroundColor: PALETA_COLORES.primarioOscuro,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: PALETA_COLORES.acentoCrema,
  },
  textoBotonSalir: {
    color: PALETA_COLORES.blancoPuro,
    fontSize: 12,
    fontWeight: "700",
  },
});
