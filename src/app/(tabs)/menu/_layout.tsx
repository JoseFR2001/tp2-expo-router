import { Stack } from "expo-router";
import { PALETA_COLORES } from "../../../features/comun/colores";

export default function LayoutMenuStack() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: PALETA_COLORES.primarioInstitucional },
        headerTintColor: PALETA_COLORES.blancoPuro,
        headerTitleStyle: { fontWeight: "700" },
      }}
    >
      <Stack.Screen name="index" options={{ title: "Menú del Comedor" }} />
      <Stack.Screen name="[id]" />
    </Stack>
  );
}
