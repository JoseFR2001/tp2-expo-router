import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { useComedor } from "../../context/ComedorContext";
import { PALETA_COLORES } from "../../features/comun/colores";

const ElementoProtegidoTab: React.FC<{
  guard: boolean;
  children: React.ReactNode;
}> = ({ guard, children }) => {
  return guard ? <>{children}</> : null;
};

const PestaniasProtegidas = Object.assign(Tabs, {
  Protected: ElementoProtegidoTab,
}) as typeof Tabs & {
  Protected: React.FC<{ guard: boolean; children: React.ReactNode }>;
};

export default function LayoutPestanias() {
  const { carrito, usuario } = useComedor();
  const tieneSesionActiva = usuario !== null;
  const cantidadEnCarrito = carrito.length;

  return (
    <PestaniasProtegidas
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: PALETA_COLORES.primarioInstitucional,
        tabBarInactiveTintColor: PALETA_COLORES.textoAtenuado,
        tabBarStyle: {
          backgroundColor: PALETA_COLORES.superficieTarjeta,
          borderTopWidth: 1,
          borderTopColor: PALETA_COLORES.bordeSuave,
          paddingBottom: 6,
          paddingTop: 6,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
      }}
    >
      <PestaniasProtegidas.Screen
        name="index"
        options={{
          title: "Inicio",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />

      <PestaniasProtegidas.Screen
        name="menu"
        options={{
          title: "Menú",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="restaurant-outline" size={size} color={color} />
          ),
        }}
      />

      <PestaniasProtegidas.Screen
        name="carrito"
        options={{
          title: "Carrito",
          tabBarBadge: cantidadEnCarrito > 0 ? cantidadEnCarrito : undefined,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart-outline" size={size} color={color} />
          ),
        }}
      />

      <PestaniasProtegidas.Protected guard={tieneSesionActiva}>
        <PestaniasProtegidas.Screen
          name="cocina-tab"
          options={{
            title: "Cocina",
            href: "/cocina",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="flame-outline" size={size} color={color} />
            ),
          }}
        />
      </PestaniasProtegidas.Protected>
    </PestaniasProtegidas>
  );
}
