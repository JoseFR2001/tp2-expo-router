import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { DondeEstoy } from "../components/DondeEstoy";
import { useComedor } from "../context/ComedorContext";
import { PALETA_COLORES } from "../features/comun/colores";

export default function PantallaLogin() {
  const { iniciarSesion } = useComedor();
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [claveIngresada, setClaveIngresada] = useState("");
  const [mensajeError, setMensajeError] = useState("");

  const manejadorIngreso = () => {
    setMensajeError("");
    const inicioCorrecto = iniciarSesion(nombreUsuario, claveIngresada);
    if (!inicioCorrecto) {
      setMensajeError(
        "Credenciales inválidas. Usuario: «cocina» | Clave: «1234»"
      );
    }
  };

  return (
    <View style={estilos.contenedor}>
      <Text style={estilos.iconoCandado}>🔐</Text>
      <Text style={estilos.tituloPrincipal}>Acceso del Personal</Text>
      <Text style={estilos.subtituloPrincipal}>
        Ingresá tus credenciales de cocina para gestionar la cola de pedidos.
      </Text>

      {mensajeError ? (
        <View style={estilos.cajaError}>
          <Text style={estilos.textoError}>{mensajeError}</Text>
        </View>
      ) : null}

      <Text style={estilos.etiquetaCampo}>Usuario:</Text>
      <TextInput
        style={estilos.campoEntrada}
        placeholder="Ej: cocina"
        placeholderTextColor={PALETA_COLORES.textoAtenuado}
        value={nombreUsuario}
        onChangeText={setNombreUsuario}
        autoCapitalize="none"
      />

      <Text style={estilos.etiquetaCampo}>Contraseña:</Text>
      <TextInput
        style={estilos.campoEntrada}
        placeholder="Ej: 1234"
        placeholderTextColor={PALETA_COLORES.textoAtenuado}
        value={claveIngresada}
        onChangeText={setClaveIngresada}
        secureTextEntry
      />

      <Pressable
        style={estilos.botonIngresar}
        onPress={manejadorIngreso}
      >
        <Text style={estilos.textoBotonIngresar}>Ingresar al Sistema</Text>
      </Pressable>

      <Text style={estilos.textoPista}>
        💡 Claves de prueba del Comedor IPF:{" "}
        <Text style={estilos.textoNegrita}>cocina</Text> /{" "}
        <Text style={estilos.textoNegrita}>1234</Text>
      </Text>

      <DondeEstoy />
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    padding: 24,
    backgroundColor: PALETA_COLORES.superficieTarjeta,
    justifyContent: "center",
  },
  iconoCandado: {
    fontSize: 44,
    marginBottom: 8,
  },
  tituloPrincipal: {
    fontSize: 24,
    fontWeight: "800",
    color: PALETA_COLORES.textoPrincipal,
  },
  subtituloPrincipal: {
    fontSize: 13,
    color: PALETA_COLORES.textoSecundario,
    marginTop: 4,
    marginBottom: 20,
    lineHeight: 18,
  },
  cajaError: {
    backgroundColor: PALETA_COLORES.peligroFondo,
    borderWidth: 1,
    borderColor: PALETA_COLORES.peligroError,
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
  },
  textoError: {
    fontSize: 12,
    color: PALETA_COLORES.peligroError,
    fontWeight: "600",
  },
  etiquetaCampo: {
    fontSize: 13,
    fontWeight: "700",
    color: PALETA_COLORES.textoPrincipal,
    marginBottom: 4,
  },
  campoEntrada: {
    backgroundColor: PALETA_COLORES.fondoLienzo,
    borderWidth: 1,
    borderColor: PALETA_COLORES.bordeSuave,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: PALETA_COLORES.textoPrincipal,
    marginBottom: 16,
  },
  botonIngresar: {
    backgroundColor: PALETA_COLORES.primarioInstitucional,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 6,
  },
  textoBotonIngresar: {
    color: PALETA_COLORES.blancoPuro,
    fontSize: 15,
    fontWeight: "800",
  },
  textoPista: {
    fontSize: 12,
    color: PALETA_COLORES.textoSecundario,
    textAlign: "center",
    marginTop: 18,
  },
  textoNegrita: {
    fontWeight: "bold",
    color: PALETA_COLORES.primarioInstitucional,
  },
});
