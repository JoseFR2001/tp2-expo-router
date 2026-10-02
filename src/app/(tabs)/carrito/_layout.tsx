import { Stack } from "expo-router";
import { PALETA_COLORES } from "../../../features/comun/colores";

export default function LayoutCarritoStack() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: PALETA_COLORES.primarioInstitucional },
        headerTintColor: PALETA_COLORES.blancoPuro,
        headerTitleStyle: { fontWeight: "700" },
      }}
    >
      <Stack.Screen name="index" options={{ title: "Mi Carrito" }} />
      <Stack.Screen
        name="nota"
        options={{
          presentation: "formSheet",
          sheetAllowedDetents: [0.5, 0.9],
          title: "Aclaración para Cocina",
        }}
      />
    </Stack>
  );
}
