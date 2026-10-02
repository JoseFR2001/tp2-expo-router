# Trabajo Práctico N° 2 — Expo Router: rutas, navegación, pilas y colas

**Instituto Politécnico Formosa «Dr. Alberto Marcelo Zorrilla»**  
**Tecnicatura Superior en Desarrollo de Software Multiplataforma**  
**Taller Complementario – React Native II**  

- **Docentes:** Prof. Rolón Lautaro Emanuel | Prof. Mereles Juliana Aracelli  
- **Alumno:** Mendoza José Rafael  
- **Fecha de Entrega:** 02 de Octubre de 2026  

---

## Parte A · Estructuras de datos: la pila y la cola

### A1. Conceptos

**a) ¿Qué significan LIFO y FIFO? ¿Cuál corresponde a la pila y cuál a la cola?**

- **LIFO (Last In, First Out):** Significa que el último elemento en ingresar es el primero en salir. Corresponde a la **Pila** (_Stack_).
- **FIFO (First In, First Out):** Significa que el primer elemento en ingresar es el primero en salir. Corresponde a la **Cola** (_Queue_).

**b) ¿Por qué extremo entra y por qué extremo sale un elemento en cada estructura?**

- **En la Pila:** Tanto la entrada (`push`) como la salida (`pop`) ocurren por el mismo y único extremo, denominado **tope** (_top_).
- **En la Cola:** Los elementos ingresan (`encolar`) por un extremo denominado **final** o parte posterior, y egresan (`desencolar`) por el extremo opuesto, denominado **frente** (_front_).

**c) Dá un ejemplo de la vida real y otro de una aplicación móvil para cada una.**

- **Pila (LIFO):**
  - _Vida real:_ Una pila de platos limpios para secar; el último plato colocado arriba es el primero que se retira.
  - _App móvil:_ El historial de pantallas en un navegador tipo `Stack` (ej. Instagram o Mercado Pago al navegar de _Inicio_ $\rightarrow$ _Detalle de Producto_ $\rightarrow$ _Formulario de Pago_). Al pulsar el botón "atrás", se desapila la pantalla superior para volver a la inmediatamente anterior.
- **Cola (FIFO):**
  - _Vida real:_ La fila de personas esperando ser atendidas en la caja de un supermercado o en el cajero automático; quien llega primero es atendido primero.
  - _App móvil:_ La cola de subida de fotos/mensajes en WhatsApp cuando se pierde la conexión y se van enviando en orden de redacción; o la cola de reproducción de canciones en Spotify.

---

### A2. Seguimiento de una pila

Código analizado (`seguimiento-pila.js`):

```javascript
const p = new Pila();
p.push("Inicio"); // Pila: ['Inicio']
p.push("Productos"); // Pila: ['Inicio', 'Productos']
p.push("Detalle 3"); // Pila: ['Inicio', 'Productos', 'Detalle 3']
p.pop(); // Sale 'Detalle 3' -> Pila: ['Inicio', 'Productos']
p.push("Perfil"); // Pila: ['Inicio', 'Productos', 'Perfil']
console.log(p.tope()); // (1)
console.log(p.pop()); // (2)
console.log(p.tope()); // (3)
console.log(p.vacia); // (4)
```

**Salidas de cada `console.log`:**

1. `(1)` Imprime: `'Perfil'` _(es el elemento que se encuentra en el tope)._
2. `(2)` Imprime: `'Perfil'` _(desapila y devuelve el elemento del tope)._
3. `(3)` Imprime: `'Productos'` _(al salir 'Perfil', el nuevo tope pasa a ser 'Productos')._
4. `(4)` Imprime: `false` _(la pila aún contiene 'Inicio' y 'Productos', no está vacía)._

**Estado final de la pila (de base a tope):**
`['Inicio', 'Productos']`

---

### A3. Seguimiento de una cola

Código analizado (`seguimiento-cola.js`):

```javascript
const c = new Cola();
c.encolar("Ana"); // Cola: ['Ana']
c.encolar("Beto"); // Cola: ['Ana', 'Beto']
c.desencolar(); // Sale 'Ana' (frente) -> Cola: ['Beto']
c.encolar("Caro"); // Cola: ['Beto', 'Caro']
c.encolar("Dani"); // Cola: ['Beto', 'Caro', 'Dani']
console.log(c.frente()); // (1)
console.log(c.desencolar()); // (2)
console.log(c.vacia); // (3)
```

**Salidas de cada `console.log`:**

1. `(1)` Imprime: `'Beto'` _(es el elemento que ocupa el frente de la cola)._
2. `(2)` Imprime: `'Beto'` _(desencola a Beto y lo devuelve)._
3. `(3)` Imprime: `false` _(la cola no está vacía; quedan 'Caro' y 'Dani')._

**Estado final de la cola (de frente a final):**
`['Caro', 'Dani']`

---

### A4. Análisis de la implementación

**a) En las clases de clase, el array se declara como `#items`. ¿Qué significa el `#` y qué problema evita?**

- **Significado:** El prefijo `#` define un campo privado (_private field_) introducido en la especificación ECMAScript moderna.
- **Problema que evita:** Evita que el estado interno sea accedido o mutado directamente desde fuera de la clase (por ejemplo, impidiendo llamadas directas como `pila.#items.pop()` o `pila.#items = []`). Garantiza el encapsulamiento y obliga a que cualquier alteración ocurra exclusivamente mediante los métodos públicos provistos (`push`, `pop`, `encolar`, `desencolar`), protegiendo la invariante de la estructura.

**b) La cola usa `array.shift()` para desencolar. ¿Qué problema de rendimiento tiene con colas muy grandes? ¿Cómo lo resuelven las colas “serias”?**

- **Problema de rendimiento:** `array.shift()` extrae el elemento en el índice `0`, lo que fuerza al motor de JavaScript a desplazar todos los $N-1$ elementos restantes una posición a la izquierda en memoria. Esto representa una complejidad temporal $O(N)$ por cada operación de extracción. En colas con miles o millones de elementos, desencolar repetidamente degrada el rendimiento de la aplicación.
- **Solución de colas "serias":** Utilizan un puntero o índice de frente (`#frente`). Al desencolar simplemente se lee el elemento en `#frente` y se incrementa el contador (`#frente++`), lo cual se ejecuta en tiempo constante $O(1)$ sin mover elementos en memoria.

**c) ¿Qué método de array usa la pila para sacar y cuál usa la cola? ¿Por qué no pueden usar el mismo?**

- La **pila** usa `array.pop()` (extrae del final del array).
- La **cola** (en su versión básica) usa `array.shift()` (extrae del inicio del array).
- **Por qué no pueden usar el mismo:** Porque la pila requiere retirar el _último_ elemento ingresado (principio LIFO, ubicado al final del array), mientras que la cola requiere retirar el _primer_ elemento que entró (principio FIFO, ubicado al principio del array).

---

### A5. Programación: una cola eficiente

```javascript
class ColaEficiente {
  #items = [];
  #frente = 0;

  encolar(x) {
    this.#items.push(x);
  }

  desencolar() {
    if (this.vacia) return undefined;
    const elemento = this.#items[this.#frente];
    this.#frente++;

    // Optimización de limpieza de memoria si la cola queda vacía
    if (this.#frente === this.#items.length) {
      this.#items = [];
      this.#frente = 0;
    }

    return elemento;
  }

  frente() {
    if (this.vacia) return undefined;
    return this.#items[this.#frente];
  }

  get vacia() {
    return this.#frente >= this.#items.length;
  }

  get tamanio() {
    return this.#items.length - this.#frente;
  }
}
```

---

### A6. Pila y cola dentro de Expo Router

**a) ¿Qué estructura describe el historial de pantallas de un Stack? ¿Qué pantalla es la visible y qué operación hace “atrás”?**

- El historial de navegación lo modela una **Pila** (_Stack_).
- La pantalla visible para el usuario es la que reside en el **tope de la pila**.
- La acción de volver "atrás" ejecuta un **`pop()`**, descartando la pantalla del tope y dejando a la vista la que quedó por debajo.

**b) ¿Qué estructura usa Expo Router para las acciones de navegación? ¿Qué pasa si el usuario toca dos links muy rápido?**

- Expo Router gestiona las transiciones a través de una **Cola** (_Event Queue_).
- Si el usuario presiona dos enlaces rápidamente, las peticiones de navegación se encolan secuencialmente. El despachador de navegación procesa la primera y, una vez completada la transición, atiende la siguiente, evitando desincronizaciones de pantalla o saltos de estado incongruentes.

---

## Parte B · Rutas basadas en archivos

### B1. Del archivo a la URL

| Archivo                              | URL que genera / función                                                                                                                                         |
| :----------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/app/(tabs)/index.tsx`           | `/` (Ruta raíz dentro del grupo de pestañas `(tabs)`; los paréntesis omiten el segmento en la URL).                                                              |
| `src/app/acerca.tsx`                 | `/acerca`                                                                                                                                                        |
| `src/app/(tabs)/perfil.tsx`          | `/perfil`                                                                                                                                                        |
| `src/app/(tabs)/productos/index.tsx` | `/productos`                                                                                                                                                     |
| `src/app/(tabs)/productos/[id].tsx`  | `/productos/:id` (ej. `/productos/4`, ruta dinámica con parámetro de ruta).                                                                                      |
| `src/app/docs/[...slug].tsx`         | `/docs/*` (Ruta _catch-all_ de profundidad variable, ej. `/docs/react/hooks/useState`).                                                                          |
| `src/app/_layout.tsx`                | No genera una URL. Es el layout raíz que envuelve la app con navegadores globales y contextos.                                                                   |
| `src/app/+not-found.tsx`             | No genera una URL directa. Se muestra automáticamente como pantalla 404 al ingresar a rutas inexistentes.                                                        |
| `src/app/Boton.tsx`                  | **Genera un problema.** Expo Router mapeará por error una pantalla `/Boton`. Los componentes auxiliares deben ubicarse fuera de `src/app`, en `src/components/`. |

---

### B2. De la URL al archivo

| URL                                                | Archivo (dentro de `src/app`)                                             |
| :------------------------------------------------- | :------------------------------------------------------------------------ |
| `/categorias/bebidas` (y cualquier otra categoría) | `src/app/categorias/[categoria].tsx`                                      |
| `/buscar?q=mate&categoria=kiosco`                  | `src/app/buscar.tsx` _(los query params no van en el nombre del archivo)_ |
| `/ayuda/pagos/tarjeta` y `/ayuda/horarios`         | `src/app/ayuda/[...slug].tsx`                                             |
| `/ayuda` (con una pantalla propia)                 | `src/app/ayuda/index.tsx`                                                 |

---

### B3. Verdadero o falso

**a) Con Expo Router, cada pantalla nueva se debe registrar en una tabla de configuración.**

- **Falso.** Expo Router se basa en el sistema de ruteo basado en archivos (_file-based routing_): cada archivo creado dentro de `app` genera automáticamente su ruta sin requerir una tabla manual.

**b) Los archivos `_layout.tsx` son pantallas que el usuario puede visitar.**

- **Falso.** Son componentes de infraestructura que estructuran navegadores (Stack, Tabs, Drawer) y proveedores de contexto; nunca se exponen como pantallas independientes.

**c) Una carpeta entre paréntesis, como `(tabs)`, no aparece en la URL.**

- **Verdadero.** Es la convención de grupos de rutas (_Route Groups_), permitiendo organizar layouts y carpetas sin alterar la jerarquía de las URLs visibles.

**d) Para agregar una librería conviene usar `npm install`, porque siempre trae la última versión.**

- **Falso.** En Expo siempre se debe usar `npx expo install <paquete>` para que resuelva la versión exacta compatible con el SDK instalado y no rompa el proyecto.

**e) En `package.json`, `"main": "expo-router/entry"` reemplaza al viejo `App.tsx`.**

- **Verdadero.** Es el punto de arranque que inicializa el motor de ruteo de Expo Router.

**f) La ruta `/_sitemap` lista todas las rutas de la app y sirve para depurar.**

- **Verdadero.** Es una herramienta integrada para inspeccionar el árbol de rutas activas durante el desarrollo.

**g) Si existen `docs/index.tsx` y `docs/[...slug].tsx`, la URL `/docs` muestra `docs/index.tsx`.**

- **Verdadero.** La coincidencia exacta (`index.tsx`) tiene precedencia sobre las rutas dinámicas y _catch-all_.

**h) En SDK 57, `expo-router` usa el mismo número de versión mayor que el SDK (57).**

- **Falso.** Es una pregunta capciosa: Expo Router mantiene su propio versionado semántico independiente del SDK de Expo (por ejemplo, Expo SDK 52 / 57 utiliza Expo Router v4.x o v5.x; no se sincronizan en número mayor).

---

## Parte C · Navegar: `<Link>`, router y la pila

### C1. Métodos de router

| Método                    | Qué le hace a la pila                                                                                                   |
| :------------------------ | :---------------------------------------------------------------------------------------------------------------------- |
| `router.push(href)`       | **Apila** una nueva pantalla en el tope del Stack, sin importar si ya existía antes en la pila.                         |
| `router.navigate(href)`   | Navega a la ruta indicada: si la pantalla ya existe en la pila, desapila hasta volver a ella; si no existe, la apila.   |
| `router.replace(href)`    | **Reemplaza** la pantalla actual por la nueva (desapila la actual y coloca la nueva en el tope sin acumular historial). |
| `router.back()`           | **Desapila** (`pop`) la pantalla actual, volviendo a la que estaba inmediatamente debajo.                               |
| `router.dismissTo(href)`  | Desapila en bloque todas las pantallas intermedias hasta alcanzar la ruta destino especificada.                         |
| `router.dismissAll()`     | Desapila todas las pantallas acumuladas en el Stack hasta regresar a la pantalla raíz.                                  |
| `router.canGoBack()`      | Consulta si hay pantallas previas en el Stack para poder volver atrás. Devuelve `true` o `false` sin mutar la pila.     |
| `router.setParams({...})` | Modifica los parámetros de búsqueda de la pantalla actual en la URL sin alterar la pila de pantallas.                   |

---

### C2. Simulación de la pila

Estado inicial: `[ /productos ]`

| #   | Instrucción                       | Pila resultante (base a tope)                                                               |
| :-- | :-------------------------------- | :------------------------------------------------------------------------------------------ |
| 1   | `router.push("/productos/1")`     | `[ /productos, /productos/1 ]`                                                              |
| 2   | `router.push("/productos/2")`     | `[ /productos, /productos/1, /productos/2 ]`                                                |
| 3   | `router.navigate("/productos/5")` | `[ /productos, /productos/1, /productos/2, /productos/5 ]`                                  |
| 4   | `router.push("/perfil")`          | `[ /productos, /productos/1, /productos/2, /productos/5, /perfil ]`                         |
| 5   | `router.replace("/buscar")`       | `[ /productos, /productos/1, /productos/2, /productos/5, /buscar ]` _(reemplaza `/perfil`)_ |
| 6   | `router.back()`                   | `[ /productos, /productos/1, /productos/2, /productos/5 ]` _(desapila `/buscar`)_           |
| 7   | `router.dismissTo("/productos")`  | `[ /productos ]` _(desapila todo hasta `/productos`)_                                       |
| 8   | `router.canGoBack()`              | Devuelve **`false`** _(solo queda `/productos`, no hay pantallas previas)._                 |

---

### C3. ¿Link o router?

**a) El usuario toca la tarjeta de un producto en una lista.**

- **Uso:** `<Link href="/productos/1">`
- **Justificación:** Es una navegación declarativa directa iniciada por la interacción del usuario con un componente visual estático.

**b) Se guarda un formulario, la API responde OK y hay que mostrar la pantalla de éxito.**

- **Uso:** `router.replace("/exito")`
- **Justificación:** Ocurre dentro de una función asíncrona tras completar una operación lógica. Se utiliza `replace` para evitar que el usuario vuelva atrás y reenvíe el formulario por error.

**c) Botón “Cancelar” dentro de un modal.**

- **Uso:** `router.back()`
- **Justificación:** La acción de cancelar un modal consiste en cerrar la vista actual y desapilarla del Stack.

**d) Después de un login exitoso hay que ir a la pantalla principal.**

- **Uso:** `router.replace("/")`
- **Justificación:** Se debe sustituir la pantalla de autenticación para que la pantalla de login no quede guardada en el historial al presionar "atrás".

**e) Volver desde el detalle de un pedido directamente a la lista de pedidos, que quedó tres pantallas más abajo.**

- **Uso:** `router.dismissTo("/pedidos")`
- **Justificación:** Desapila en bloque todas las vistas intermedias acumuladas de una sola vez hasta llegar a la pantalla destino.

---

### C4. Escribí el código

**a) Un `<Link>` que abra el producto con id 8 usando `href` como objeto:**

```tsx
<Link
  href={{
    pathname: "/productos/[id]",
    params: { id: "8" },
  }}
>
  Ver Plato #8
</Link>
```

**b) Un `<Link>` a `/perfil` que siempre apile, aunque la pantalla ya exista:**

```tsx
<Link href="/perfil" push>
  Ir a Perfil
</Link>
```

**c) Un botón (Pressable) propio que funcione como link a `/carrito` usando `asChild`:**

```tsx
<Link href="/carrito" asChild>
  <Pressable style={estilos.boton}>
    <Text style={estilos.texto}>Ver Carrito 🛒</Text>
  </Pressable>
</Link>
```

---

### C5. Pensar

- **En la web:** Cada `<Link>` se traduce a una etiqueta `<a href="...">` estándar. Esto permite que el usuario pueda abrir el enlace en una pestaña nueva con clic central o clic derecho, copiar la dirección URL al portapapeles y que los motores de búsqueda (SEO) indexen la página.
- **En el celular:** No hay barra de direcciones visible ni menú contextual de clic derecho. `<Link>` intercepta los toques táctiles y ejecuta llamadas nativas al despachador de navegación, disparando transiciones animadas y gestionando la pila de pantallas del sistema operativo.

---

## Parte D · Navegadores: Stack, Tabs y Drawer

### D1. Comparación

| Criterio                                 | Stack                                                                                           | Tabs                                                             | Drawer                                                                            |
| :--------------------------------------- | :---------------------------------------------------------------------------------------------- | :--------------------------------------------------------------- | :-------------------------------------------------------------------------------- |
| **¿Apila pantallas?**                    | **Sí**, cada navegación monta pantallas sobre el tope de la pila.                               | **No**, conmuta entre las pantallas principales de cada pestaña. | **No**, intercambia la pantalla activa desde un panel lateral.                    |
| **¿Cómo cambia de pantalla el usuario?** | Pulsando botones/enlaces o mediante el gesto de deslizar atrás.                                 | Tocando los íconos de la barra inferior o superior.              | Deslizando desde el borde de la pantalla o pulsando el ícono de menú hamburguesa. |
| **¿Desde dónde se importa en SDK 57?**   | `import { Stack } from 'expo-router'`                                                           | `import { Tabs } from 'expo-router'` (o `expo-router/js-tabs`)   | `import { Drawer } from 'expo-router/drawer'`                                     |
| **Un caso de uso típico**                | Flujos de navegación en profundidad (Listado $\rightarrow$ Detalle $\rightarrow$ Confirmación). | Secciones primarias de la aplicación (Inicio, Menú, Carrito).    | Menús administrativos o secundarios (Gestión de cocina, Historial, Ajustes).      |

---

### D2. Cada tab tiene su pila

- **¿Qué pantalla ve?** Ve el **detalle del producto 4**.
- **¿Por qué?** Porque cada pestaña del navegador Tabs aloja y gestiona su propia pila de navegación independiente. Al cambiar de pestaña no se destruye el estado ni se reinicia la pila de la pestaña anterior.
- **Apps comunes:** Instagram (al explorar perfiles dentro de la pestaña de búsqueda y cambiar al feed principal), Spotify o YouTube.

---

### D3. ¿Dónde va cada pantalla?

- **a) El detalle de un producto, que debe mantener visible la barra de pestañas:**  
  $\rightarrow$ **Dentro del Stack propio de la pestaña Menú.**
- **b) Un modal para confirmar una compra, que debe tapar la barra de pestañas:**  
  $\rightarrow$ **En el Stack raíz de la aplicación.**
- **c) La pantalla de login que se abre como modal:**  
  $\rightarrow$ **En el Stack raíz de la aplicación.**
- **d) La pantalla “Mis pedidos anteriores” dentro de la sección Perfil:**  
  $\rightarrow$ **Dentro del Stack interno de la pestaña Perfil.**

---

### D4. Configurar el Stack

**a) ¿Qué diferencia hay entre `screenOptions` y las `options` de un `Stack.Screen`?**

- `screenOptions`: Define propiedades globales compartidas que se heredan en todas las pantallas del navegador (colores de barra, tipografía, etc.).
- `options`: Configura propiedades puntuales y exclusivas de una pantalla en particular (su título específico, tipo de presentación `modal`, etc.).

**b) ¿Por qué `(tabs)` tiene `headerShown: false`?**

- Porque el navegador de pestañas maneja sus propios encabezados internos. Si no se ocultara el encabezado del Stack raíz en `(tabs)`, la aplicación mostraría dos barras de encabezado superpuestas en la parte superior de la pantalla.

**c) Si existe `src/app/perfil-publico.tsx` pero no está declarada en el Stack, ¿existe la pantalla? ¿Para qué sirve declararla?**

- **Sí existe** y el usuario puede visitarla gracias al ruteo automático por archivos.
- **Declararla** sirve para personalizar sus opciones visuales de presentación (ej.: definir un título personalizado, establecer `presentation: 'modal'`, o configurar botones en el header).

**d) Nombrá cuatro valores posibles de `presentation`. ¿Cuál usarías para una hoja inferior que se abre al 50%?**

- Cuatro valores posibles: `'card'`, `'modal'`, `'transparentModal'`, `'formSheet'`.
- Para una hoja inferior al 50% se utiliza **`'formSheet'`** combinada con `sheetAllowedDetents: [0.5, 0.9]`.

**e) ¿Cómo cambiarías el título del header desde la propia pantalla de detalle para que diga “Producto 7”?**

```tsx
import { Stack } from "expo-router";

export default function DetalleProducto() {
  return (
    <>
      <Stack.Screen options={{ title: "Producto 7" }} />
      {/* Contenido de la pantalla */}
    </>
  );
}
```

---

### D5. Tabs y Drawer en SDK 57

**a) ¿Qué cambió en SDK 57 al importar Tabs? ¿Qué alternativa experimental existe?**

- En las versiones recientes del SDK, se diferenció la implementación estándar de pestañas en JavaScript (`expo-router/js-tabs`) de implementaciones nativas especializadas. Como alternativa experimental se incluye `expo-router/apple-tabs` para renderizar componentes de pestañas nativos del sistema en iOS.

**b) ¿Qué dos paquetes necesita el Drawer y qué componente conviene poner en el layout raíz para los gestos?**

- Requiere `@react-navigation/drawer` y `react-native-gesture-handler` (junto con `react-native-reanimated`).
- En el layout raíz conviene envolver toda la jerarquía con `<GestureHandlerRootView style={{ flex: 1 }}>`.

**c) ¿Hace falta instalar `@react-navigation/drawer` en SDK 57? ¿Por qué?**

- **Sí hace falta**, porque `expo-router/drawer` es un envoltorio que delega la creación del menú lateral en la implementación nativa de React Navigation.

**d) Si hay navegadores anidados, ¿en qué navegador actúa `router.back()`?**

- Actúa en el **navegador más interno y activo** que contenga pantallas previas en su pila para desapilar. Si dicho navegador ya no tiene más pantallas, delega la acción al navegador ancestro inmediato.

---

## Parte E · Rutas dinámicas, parámetros y hooks

### E1. Encontrá el error

**Causa:** `useLocalSearchParams()` siempre retorna los parámetros como cadenas de texto (`string`). El array de productos almacena los identificadores como números (`id: 3`). La comparación estricta `p.id === id` compara un número con un string (`3 === "3"`), lo que siempre resulta en `false`.

**Código corregido:**

```tsx
export default function DetalleProducto() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const idNumerico = Number(id);
  const producto = productos.find((p) => p.id === idNumerico);

  if (idNumerico === 3) console.log("Es el chipá");
  if (!producto) return <Text>No existe el producto {id}</Text>;
  return <Text>{producto.nombre}</Text>;
}
```

---

### E2. Catch-all

Para `src/app/docs/[...slug].tsx`:
| URL | `slug` |
| :--- | :--- |
| `/docs/react` | `['react']` |
| `/docs/react/hooks/useState` | `['react', 'hooks', 'useState']` |
| `/docs` | `undefined` _(o redirige al índice si existe `docs/index.tsx`)_ |

---

### E3. Anatomía de una URL

Dada la URL: `rutasipf://buscar?q=mate&categoria=bebidas`

**a) Identificá el scheme, la ruta y los parámetros de búsqueda:**

- **Scheme:** `rutasipf`
- **Ruta:** `/buscar`
- **Parámetros de búsqueda:** `q = mate`, `categoria = bebidas`

**b) ¿Qué devuelve `useLocalSearchParams()` en `buscar.tsx`?**

- Devuelve el objeto: `{ q: 'mate', categoria: 'bebidas' }`.

**c) ¿Hacen falta corchetes en el nombre del archivo para recibir `q`? ¿Por qué?**

- **No.** Los corchetes en los nombres de archivos (`[id].tsx`) se reservan para parámetros de ruta (_path params_). Los parámetros que suceden al signo `?` son parámetros de consulta (_query params_) y los captura automáticamente `useLocalSearchParams()` sin necesidad de alterar el nombre del archivo.

**d) En el buscador, cada vez que el usuario escribe se llama a `router.setParams({ q: texto })` en lugar de `router.push`. Dá dos razones:**

1. Evita apilar una nueva pantalla en el historial por cada tecla presionada, lo que saturaría la pila de navegación e impediría volver atrás con un solo toque.
2. Es instantáneo, no produce parpadeos de animación ni renderizados completos de pantalla innecesarios.

---

### E4. ¿Dónde estoy?

| Hook                     | En `/productos/3`              | En `/buscar?q=chipa` |
| :----------------------- | :----------------------------- | :------------------- |
| `usePathname()`          | `"/productos/3"`               | `"/buscar"`          |
| `useSegments()`          | `["(tabs)", "productos", "3"]` | `["buscar"]`         |
| `useLocalSearchParams()` | `{ id: "3" }`                  | `{ q: "chipa" }`     |

---

### E5. Local vs global

**a) ¿Cuál es la diferencia entre `useLocalSearchParams` y `useGlobalSearchParams`? ¿Cuál es la opción por defecto y por qué?**

- `useLocalSearchParams`: Retorna exclusivamente los parámetros correspondientes a la ruta de la pantalla actual.
- `useGlobalSearchParams`: Retorna todos los parámetros presentes en la URL global en ese instante, incluyendo parámetros de pantallas hermanas o contenedoras.
- **Opción por defecto:** Se recomienda `useLocalSearchParams` para garantizar el aislamiento modular de los componentes y prevenir que cambios de parámetros en otras vistas fuercen re-renderizados innecesarios.

**b) ¿Para qué sirve `useFocusEffect`? Dá un ejemplo de uso.**

- Sirve para ejecutar un efecto cada vez que una pantalla gana el foco (pasa a estar visible), limpiando recursos cuando pierde el foco.
- _Ejemplo:_ Revalidar el estado de la cola de pedidos o actualizar el carrito cada vez que el alumno regresa a esa pestaña.

**c) La URL `/productos/mate` abre la pantalla de detalle aunque no exista ese producto. ¿Es un error de Expo Router? ¿De quién es la responsabilidad?**

- **No es un error de Expo Router.** El router se limita a resolver el patrón `/productos/[id]` hacia el archivo correspondiente.
- **Es responsabilidad del desarrollador**, quien debe validar dentro de la pantalla si el producto consultado existe en la base de datos o arreglo local, y mostrar una interfaz informativa de error si el ID es inexistente.

---

## Parte F · Redirecciones, rutas protegidas y deep links

### F1. Redirect

**a) ¿Qué hace `<Redirect href="/productos" />` y a qué método de router equivale?**

- Redirige al usuario de manera inmediata a la ruta `/productos`. Equivale a **`router.replace("/productos")`**.

**b) ¿Por qué una redirección debe reemplazar y no apilar? Describí el problema que aparecería.**

- Debe reemplazar porque si apilara (`push`), la pantalla intermedia que ejecutó la redirección quedaría registrada en la pila de navegación. Al presionar el botón "atrás", el usuario volvería a esa pantalla previa, la cual inmediatamente volvería a redirigirlo a `/productos`, atrapándolo en un bucle infinito del que no podría salir.

---

### F2. Stack.Protected

Código completado:

```tsx
function NavegacionRaiz() {
  const { usuario } = useAuth();
  const conSesion = usuario !== null;
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Protected guard={conSesion}>
        <Stack.Screen name="privado" />
      </Stack.Protected>
      <Stack.Protected guard={!conSesion}>
        <Stack.Screen name="login" options={{ presentation: "modal" }} />
      </Stack.Protected>
    </Stack>
  );
}
```

**a) ¿Qué le pasa a una pantalla cuando su guard es `false`?**

- La pantalla es completamente desmontada y excluida del árbol del navegador. No se renderiza en memoria ni es accesible por ninguna acción de navegación.

**b) Al iniciar sesión, el modal de login se cierra solo, sin llamar a `router.back()`. ¿Por qué?**

- Porque al iniciar sesión, `usuario` deja de ser `null`, lo que hace que `!conSesion` pase a ser `false`. Al volverse falso su guard, `Stack.Protected` desmonta inmediatamente la pantalla `login` del Stack.

**c) Aparece el aviso “The action ‘NAVIGATE’ … was not handled by any navigator”. ¿Qué lo causa y cómo se evita?**

- **Causa:** Ocurre cuando se intenta navegar hacia una pantalla cuyo `guard` está en `false` (la pantalla no existe en el navegador en ese momento).
- **Solución:** Ocultar o deshabilitar los enlaces/botones hacia pantallas protegidas cuando no se cumplan las condiciones de sesión, o verificar los permisos antes de disparar la navegación.

**d) ¿Qué ventaja tiene `Stack.Protected` frente a poner un `<Redirect>` condicional en cada pantalla?**

- Centraliza toda la lógica de seguridad y control de acceso en el layout raíz en un solo lugar declarativo, evitando duplicar comprobaciones en decenas de pantallas y previniendo destellos visuales (_flashes_) de pantallas no autorizadas antes de redirigir.

---

### F3. 404, anchor y rutas tipadas

**a) `+not-found.tsx`:** Es la pantalla predeterminada de error 404 que se visualiza automáticamente cuando el usuario intenta navegar a una URL que no coincide con ninguna ruta registrada. Se ubica en `src/app/+not-found.tsx`.
**b) `export const unstable_settings = { anchor: "(tabs)" }`:** Se define en `src/app/_layout.tsx` para establecer la ruta base (_anchor_) que debe montarse por debajo en el historial cuando la app se abre directamente desde un deep link profundo.
**c) `typedRoutes`:** Genera definiciones automáticas de TypeScript a partir de los archivos de rutas. Si se escribe `<Link href="/prodcutos" />`, el compilador emitirá un error de tipos indicando que la ruta no existe. Los tipos se generan automáticamente en `.expo/types/router.d.ts`.

---

### F4. Deep links

Con `"scheme": "comedoripf"` e IP de desarrollo `192.168.1.20`:
| Dónde | URL |
| :--- | :--- |
| **App instalada (build propia)** | `comedoripf://menu/7` |
| **Expo Go en desarrollo** | `exp://192.168.1.20:8081/--/menu/7` |
| **Web (`npx expo start --web`)** | `http://localhost:8081/menu/7` |

- **Significado de `/--/` en Expo Go:** Es un delimitador interno reservado que utiliza Expo Go para separar la URL del host de desarrollo de la ruta propia de la aplicación móvil.
- **Por qué el scheme propio no funciona en Expo Go:** Porque Expo Go es una app ya compilada en las tiendas de aplicaciones que solo responde a su propio scheme `exp://`. Para utilizar esquemas personalizados (`comedoripf://`) se requiere generar una _Development Build_ propia.

---

### F5. Errores comunes

**a) Error: “You are passing an array of styles to a child of `<Slot>`” al usar `asChild` con un array de estilos:**

- **Causa:** El clonador de elementos de `<Slot>` espera un objeto de estilo plano y falla al recibir un array de estilos compuesto.
- **Solución:** Aplanar el array de estilos usando `StyleSheet.flatten([estilos.boton, activo && estilos.activo])`.

**b) Un compañero creó `src/app/TarjetaProducto.tsx` y ahora la app tiene una ruta nueva:**

- **Causa:** En Expo Router todo archivo ubicado dentro de `src/app` es tratado automáticamente como una pantalla.
- **Solución:** Mover los componentes reutilizables a la carpeta `src/components/TarjetaProducto.tsx`.

**c) Después de iniciar sesión se usa `router.push("/")` y, al tocar atrás, el usuario vuelve al login:**

- **Causa:** `push` apiló el inicio sobre el login, manteniendo la pantalla de inicio de sesión en el historial.
- **Solución:** Utilizar `router.replace("/")` o controlar la pantalla mediante `Stack.Protected guard={!conSesion}` para que se desmonte sola.

**d) Expo Go dice que el proyecto es incompatible después de instalar un paquete con `npm install`:**

- **Causa:** Se instaló una librería que incluye código nativo no compilado en Expo Go, o se instaló una versión incompatible con el SDK actual.
- **Solución:** Instalar paquetes siempre con `npx expo install <paquete>` o compilar una _Development Build_ con `npx expo run:android` / `npx expo run:ios`.
