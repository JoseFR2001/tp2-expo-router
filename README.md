# Comedor IPF 🍽️ — Sistema Integral de Pedidos y Gestión Gastronómica

**Instituto Politécnico Formosa «Dr. Alberto Marcelo Zorrilla»**  
**Tecnicatura Superior en Desarrollo de Software Multiplataforma**  
**Taller Complementario – React Native II | Trabajo Práctico N° 2**  

---

### 🎓 Información Académica e Institucional

- **Institución:** Instituto Politécnico Formosa «Dr. Alberto Marcelo Zorrilla»
- **Carrera:** Tecnicatura Superior en Desarrollo de Software Multiplataforma (TSDSM)
- **Espacio Curricular:** Taller Complementario – React Native II
- **Cátedra Docente:**
  - **Prof. Rolón Lautaro Emanuel**
  - **Prof. Mereles Juliana Aracelli**
- **Alumno:** **Mendoza José Rafael**
- **Ciclo Lectivo:** 2026

---

## 📌 Fundamentación y Propósito del Trabajo

El presente trabajo práctico universitario fue desarrollado con el propósito de diseñar, estructurar e implementar un sistema móvil integral para la gestión de pedidos del comedor estudiantil del Instituto Politécnico Formosa.

El objetivo central radica en dominar la arquitectura moderna de navegación móvil mediante **Expo Router (SDK 57)**, vinculando la teoría de ruteo basado en archivos con la aplicación práctica y rigurosa de dos estructuras de datos lineales fundamentales en ciencias de la computación:

1. **Cola Eficiente (FIFO - First In, First Out):** Modela la línea de producción gastronómica del comedor. Los pedidos confirmados por los alumnos ingresan correlativamente al final de la cola y la cocina los atiende estrictamente desde el frente, garantizando equidad operativa y evitando que nadie pueda adelantarse en la espera. Dicha estructura se programó a mano con campos privados (`#items`, `#frente`), erradicando el uso de `array.shift()` para asegurar complejidad temporal constante $O(1)$ en el despacho.
2. **Pila (LIFO - Last In, First Out):**
   - **Deshacer en el Carrito:** Permite revertir la última acción de agregación de platos en orden cronológico inverso.
   - **Historial de Despacho:** Almacena las comandas entregadas por el personal de cocina, visualizándose desde el tope (la comanda recién salida) hacia la base histórica.

---

## 🏛️ Arquitectura por Features (Funcionalidades)

Para garantizar legibilidad, bajo acoplamiento y alta cohesión conforme a estándares profesionales de la industria de software, el código fuente se estructuró siguiendo una **Arquitectura por Features**, complementada con capas de interoperabilidad:

```text
src/
├── features/                           # Arquitectura modular orientada al dominio
│   ├── autenticacion/                  # Servicios y contratos de sesión de cocina
│   ├── carrito/                        # Pila LIFO, tipos y utilidades del carrito
│   ├── cocina/                         # Cola FIFO, monitor y comanda
│   ├── comun/                          # Paleta Stitch (Verde Pino, Verde Cinético, Crema) y DondeEstoy
│   └── platos/                         # Catálogo de 13 platos, TarjetaPlato y EncabezadoPila
├── app/                                # Enrutador declarativo basado en archivos (Expo Router)
├── components/                         # Contratos de componentes reutilizables
├── context/                            # ComedorContext (Gestión de estado global sincronizado)
├── data/                               # Origen de datos tipados del menú
└── estructuras/                        # Implementaciones puras de Pila y Cola (#items)
```

---

## 🌳 Árbol de Carpetas (`src/app`) y Navegadores

```text
src/app/
├── _layout.tsx                         -> Stack Raíz (Stack.Protected, unstable_settings, Theme)
├── (tabs)/
│   ├── _layout.tsx                     -> Navegador Tabs (Inicio, Menú, Carrito con Badge) + Tabs.Protected
│   ├── index.tsx                       -> Ruta '/' (Inicio: bienvenida institucional y accesos directos)
│   ├── cocina-tab.tsx                  -> Redirección protegida a la cocina (/cocina)
│   ├── menu/
│   │   ├── _layout.tsx                 -> Stack interno de la pestaña Menú
│   │   ├── index.tsx                   -> Ruta '/menu' (Carta con filtrado por categoría)
│   │   └── [id].tsx                    -> Ruta '/menu/[id]' (Detalle con header dinámico y contador de pila)
│   └── carrito/
│       ├── _layout.tsx                 -> Stack interno de la pestaña Carrito
│       ├── index.tsx                   -> Ruta '/carrito' (Pila de deshacer, total y confirmación)
│       └── nota.tsx                    -> Ruta '/carrito/nota' (Hoja inferior presentation: 'formSheet')
├── categorias/
│   └── [categoria].tsx                 -> Ruta '/categorias/[categoria]' (Stack raíz: filtro con validación)
├── buscar.tsx                          -> Ruta '/buscar' (Stack raíz: búsqueda con router.setParams en URL)
├── confirmar.tsx                       -> Ruta '/confirmar' (Stack raíz, presentation: 'modal')
├── turno/
│   └── [numero].tsx                    -> Ruta '/turno/[numero]' (Stack raíz: ticket y cálculo de espera)
├── login.tsx                           -> Ruta '/login' (Stack raíz, modal protegido sin sesión)
├── cocina/
│   ├── _layout.tsx                     -> Navegador Drawer (solo activo con sesión de cocina)
│   ├── index.tsx                       -> Ruta '/cocina' (Frente de cola FIFO y botón desencolar)
│   └── atendidos.tsx                   -> Ruta '/cocina/atendidos' (Pila LIFO de pedidos servidos)
├── ayuda/
│   ├── index.tsx                       -> Ruta '/ayuda' (Índice de artículos de ayuda)
│   └── [...slug].tsx                   -> Ruta '/ayuda/...' (Catch-all para artículos de profundidad variable)
├── pedido.tsx                          -> Ruta '/pedido' (<Redirect href="/carrito" />)
└── +not-found.tsx                      -> Pantalla 404 para URLs inexistentes
```

### Navegador de cada `_layout`:

1. **`src/app/_layout.tsx` (Stack Raíz):**
   - Envuelve la aplicación en `GestureHandlerRootView` y provee el `ComedorProvider`.
   - Declara `unstable_settings = { anchor: "(tabs)" }` para deep linking consistente.
   - Aplica `Stack.Protected` condicional: la ruta `login` solo existe sin sesión, mientras que `cocina` solo se monta cuando el personal se autentica.
2. **`src/app/(tabs)/_layout.tsx` (Tabs):**
   - Barra de navegación inferior compuesta por **Inicio**, **Menú** y **Carrito** (con `tabBarBadge` numérico reactivo).
   - Utiliza `Tabs.Protected` para desplegar la pestaña directa a **Cocina** únicamente cuando hay sesión activa.
3. **`src/app/(tabs)/menu/_layout.tsx` (Stack Interno):**
   - Mantiene visible la barra de pestañas al navegar entre el listado del menú y el detalle del plato (`/menu/[id]`).
4. **`src/app/(tabs)/carrito/_layout.tsx` (Stack Interno):**
   - Alberga el carrito y expone la pantalla `/carrito/nota` configurada como hoja inferior nativa (`presentation: "formSheet"` con detenciones en `0.5` y `0.9`).
5. **`src/app/cocina/_layout.tsx` (Drawer):**
   - Panel lateral deslizable con dos pantallas: `index` (Cola de comandas pendientes) y `atendidos` (Pila histórica de platos despachados). Incluye botón superior para cerrar sesión.

---

## 🔄 Justificación Técnica: `replace` vs `push` en Confirmación

En la pantalla modal `/confirmar`, al presionar **«Confirmar y Generar Turno»**, el flujo de navegación ejecuta:

```typescript
router.replace(`/turno/${pedidoGenerado.numeroTurno}`);
```

en lugar de `router.push()`.

### **Fundamentación:**
- **Prevención de pedidos duplicados:** Si se empleara `router.push()`, la pantalla `/confirmar` permanecería apilada en el historial inmediatamente por debajo del ticket. Al presionar el botón «Atrás» del dispositivo, el alumno volvería a la pantalla de confirmación, corriendo el riesgo de reconfirmar y generar involuntariamente un segundo pedido idéntico en la cola de cocina.
- **Ciclo de vida del estado transaccional:** Al confirmarse la comanda, el carrito de compras se vacía inmediatamente y el pedido pasa a ser gestionado por la cocina. La pantalla de confirmación queda obsoleta y carece de validez funcional como punto de retorno.
- **Reemplazo atómico de ruta:** `router.replace()` descarta la pantalla de confirmación de la pila y posiciona en el tope la pantalla del ticket de turno (`/turno/[numero]`).

---

## 🔗 Deep Links de Prueba

El esquema URL registrado en `app.json` es `"scheme": "comedoripf"`.

### 1. App instalada (Build propia):
- **Detalle de Plato #2:** `comedoripf://menu/2`
- **Categoría Almuerzo:** `comedoripf://categorias/almuerzo`
- **Búsqueda filtrada:** `comedoripf://buscar?q=chipa&categoria=desayuno`

### 2. Expo Go en Desarrollo (Dirección de prueba directa):
*(Sustituir `IP_LOCAL` por la dirección IP de la computadora de desarrollo en la red local, ej. `192.168.1.20`)*:

```text
exp://IP_LOCAL:8081/--/menu/2
```

> **Efecto de `anchor: "(tabs)"`:** Al abrir este deep link directamente desde un navegador web o mensaje de texto, Expo Router monta automáticamente la pestaña base debajo en la pila, permitiendo al usuario presionar «Atrás» y encontrarse dentro del ecosistema normal de la app.

---

## 🌟 Desafíos Opcionales Implementados (+10 Puntos Extra)

1. **Contador de pila en el Header (`HeaderPilaTitulo`):** En las pantallas `/menu/[id]` y `/categorias/[categoria]` se calcula en tiempo real la profundidad de la pila de navegación mediante `useNavigation().getState().routes.length`, mostrándolo en una insignia institucional.
2. **Hoja Inferior Nativa (`formSheet`):** La pantalla `/carrito/nota` se visualiza como una hoja inferior con `presentation: "formSheet"` y detenciones en `sheetAllowedDetents: [0.5, 0.9]`.
3. **Tiempo de Espera Estimado:** En `/turno/[numero]`, el sistema calcula dinámicamente el tiempo de preparación multiplicando la cantidad de pedidos precedentes en la cola por 3 minutos (`pedidosPorDelante * 3 min`).
4. **Pestaña Protegida (`Tabs.Protected`):** En `(tabs)/_layout.tsx`, la pestaña de Cocina aparece únicamente cuando el personal se ha autenticado.

---

## 🎤 Preguntas para la Defensa Oral (Sección G6)

### 1. ¿Qué método usaste para pasar de `/confirmar` a `/turno/[numero]` y qué pasaría si usaras `push`?
Se utilizó `router.replace()`. Si se hubiera empleado `router.push()`, la pantalla `/confirmar` permanecería apilada en el historial. Si el alumno presionara el botón de volver atrás desde `/turno/[numero]`, retornaría al formulario de confirmación con el riesgo de pulsar nuevamente y generar una orden duplicada en la cola de la cocina.

### 2. Si la cocina cierra sesión estando en `/cocina/atendidos`, ¿qué ocurre con esa pantalla? ¿Por qué no hace falta llamar a `router.back()`?
Al cerrar sesión, la variable reactiva de estado `usuario` pasa a ser `null`. Como la sección `cocina` está envuelta en un guard `<Stack.Protected guard={tieneSesionActiva}>`, Expo Router evalúa que la condición es falsa y **desmonta de forma declarativa e inmediata** todo el árbol de pantallas perteneciente a la cocina. No es necesario invocar `router.back()`, ya que la ruta protegida deja de existir en el navegador.

### 3. ¿Por qué “Deshacer” usa una pila y no una cola? ¿Y por qué los pedidos usan una cola y no una pila?
- **Deshacer usa una Pila (LIFO):** Porque la semántica de reversión exige anular la acción realizada más recientemente (último plato ingresado).
- **Los pedidos usan una Cola (FIFO):** Porque el servicio gastronómico de buffet debe respetar el orden cronológico de llegada de los comensales (el primer estudiante en confirmar es el primero en ser despachado).

### 4. ¿Qué pasa si alguien abre `comedoripf://menu/999`? ¿Y `comedoripf://no-existe`?
- En `comedoripf://menu/999`: La ruta `/menu/[id]` se activa, pero la lógica de validación interna comprueba que el id numérico `999` no se encuentra en el arreglo `PLATOS`, renderizando una vista de error amigable con botón para retornar a la carta.
- En `comedoripf://no-existe`: Ningún archivo del proyecto coincide con dicha ruta; Expo Router deriva el control automáticamente a la pantalla especial `+not-found.tsx` mostrando el código de error 404 y enlace al inicio.

### 5. Si tocás “Agregar al carrito” y enseguida el link al carrito, ¿en qué orden se procesan esas acciones de navegación y por qué?
Expo Router procesa las acciones a través de una **cola de eventos de navegación interna**. Al tocar «Agregar al carrito» se ejecuta la mutación sincrónica del estado en React y, a continuación, la petición de navegación al carrito entra en la cola de transiciones. El motor de ruteo despacha la navegación de manera ordenada una vez resuelta la acción previa, visualizándose el carrito con el ítem recién añadido ya reflejado en pantalla.

### 6. ¿Qué pantalla queda debajo cuando se abre `/categorias/bebidas` desde un deep link? ¿Qué configuración lo decide?
Queda debajo la pestaña de inicio `(tabs)`. Esto es determinado por la directiva exportada en el layout raíz:
```typescript
export const unstable_settings = {
  anchor: "(tabs)",
};
```
Esta directiva indica a Expo Router que utilice el grupo `(tabs)` como ancla estructural base en la pila ante accesos directos por enlaces profundos.

---

## 🚀 Guía de Instalación y Ejecución

1. **Instalar dependencias:**
   ```bash
   npx expo install
   ```

2. **Verificar tipos y código estático:**
   ```bash
   npx tsc --noEmit
   npx expo lint
   ```

3. **Iniciar el servidor de desarrollo:**
   ```bash
   npx expo start
   ```

4. **Ejecutar en la web:**
   ```bash
   npx expo start --web
   ```

5. **Credenciales del Personal de Cocina:**
   - **Usuario:** `cocina`
   - **Contraseña:** `1234`
