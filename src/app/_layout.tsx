import { Stack } from "expo-router";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ComedorProvider, useComedor } from "../context/ComedorContext";
import { PALETA_COLORES } from "../features/comun/colores";

export const unstable_settings = {
  anchor: "(tabs)",
};

const ElementoProtegidoStack: React.FC<{
  guard: boolean;
  children: React.ReactNode;
}> = ({ guard, children }) => {
  return guard ? <>{children}</> : null;
};

const PilaProtegida = Object.assign(Stack, {
  Protected: ElementoProtegidoStack,
}) as typeof Stack & {
  Protected: React.FC<{ guard: boolean; children: React.ReactNode }>;
};

function NavegacionRaiz() {
  const { usuario } = useComedor();
  const tieneSesionActiva = usuario !== null;

  return (
    <PilaProtegida
      screenOptions={{
        headerStyle: { backgroundColor: PALETA_COLORES.primarioInstitucional },
        headerTintColor: PALETA_COLORES.blancoPuro,
        headerTitleStyle: { fontWeight: "700" },
      }}
    >
      <PilaProtegida.Screen name="(tabs)" options={{ headerShown: false }} />

      <PilaProtegida.Screen
        name="categorias/[categoria]"
        options={{ title: "Categoría" }}
      />

      <PilaProtegida.Screen
        name="buscar"
        options={{ title: "Buscador de Platos" }}
      />

      <PilaProtegida.Screen
        name="confirmar"
        options={{ presentation: "modal", title: "Resumen y Confirmación" }}
      />

      <PilaProtegida.Screen
        name="turno/[numero]"
        options={{ title: "Ticket de Turno" }}
      />

      <PilaProtegida.Screen
        name="ayuda/index"
        options={{ title: "Centro de Ayuda" }}
      />

      <PilaProtegida.Screen
        name="ayuda/[...slug]"
        options={{ title: "Artículo de Ayuda" }}
      />

      <PilaProtegida.Screen
        name="pedido"
        options={{ title: "Redireccionando..." }}
      />

      <PilaProtegida.Protected guard={tieneSesionActiva}>
        <PilaProtegida.Screen name="cocina" options={{ headerShown: false }} />
      </PilaProtegida.Protected>

      <PilaProtegida.Protected guard={!tieneSesionActiva}>
        <PilaProtegida.Screen
          name="login"
          options={{
            presentation: "modal",
            title: "Acceso Personal de Cocina",
          }}
        />
      </PilaProtegida.Protected>

      <PilaProtegida.Screen
        name="+not-found"
        options={{ title: "Página no encontrada" }}
      />
    </PilaProtegida>
  );
}

export default function LayoutRaiz() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ComedorProvider>
        <NavegacionRaiz />
      </ComedorProvider>
    </GestureHandlerRootView>
  );
}
