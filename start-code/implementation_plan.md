# Portafolio de Desarrollador Single-Page — Barrie Freyre (Frontend Mentor)

Implementación pixel-perfect y totalmente responsiva del reto **Single-Page Developer Portfolio** de Frontend Mentor, reproduciendo con exactitud el sistema de diseño proporcionado, los puntos de quiebre (Desktop, Tablet y Mobile), las superposiciones interactivas en los proyectos y la validación en tiempo real del formulario de contacto.

## User Review & Critical Decisions

> [!IMPORTANT]
> Revisa las decisiones confirmadas antes de iniciar la construcción del código y generación de recursos visuales:

- **Estructura Single-Page e Imágenes de Proyectos**: Se implementará como un portafolio de una sola página fiel a las 4 capturas proporcionadas (`Desktop`, `Tablet`, `Mobile` y `Design System`), generando retratos y miniaturas de alta fidelidad visual para el perfil de Barrie Freyre y los 6 proyectos destacados, además de un visor lightbox/modal opcional al hacer clic en `VIEW PROJECT` o `VIEW CODE` para inspeccionar cada proyecto en detalle sin salir de la aplicación.
- **Validación del Formulario de Contacto**: Se aplicarán exactamente los estados del *Design System* (reposo `#D9D9D9`/`#FFFFFF`, foco/activo en verde `#4EE1A0`, y estado de error en rojo coral `#FF6F5B` con el mensaje `"Sorry, invalid format here"` e ícono de advertencia circular), junto con confirmación visual al enviar un mensaje válido.
- **Arquitectura Modular de Componentes**: Estructuraremos la aplicación con componentes desacoplados y tipados en TypeScript (Cabecera, Héroe, Cuadrícula de Habilidades, Galería de Proyectos y Formulario de Contacto) listos para previsualización inmediata y portables a Next.js.

---

## 1. Overview & Core Concept

- **What It Does**: Presenta el portafolio profesional de **Barrie Freyre**, desarrollador front-end radicado en el Reino Unido, destacando su biografía, años de experiencia en 6 tecnologías clave, una galería interactiva de 6 proyectos web y un formulario de contacto validado en tiempo real.
- **Target Audience / Persona**: Reclutadores técnicos, clientes potenciales y evaluadores de retos de Frontend Mentor que buscan precisión tipográfica, accesibilidad (WCAG AA, navegación por teclado) y adaptación fluida entre móvil, tableta y escritorio.
- **Key Value**: Fidelidad absoluta al sistema de diseño original combinada con micro-interacciones fluidas, estados de formulario reales y activos gráficos generados a medida sin enlaces rotos.

---

## 2. User Experience & Visual Design

### Key User Flows
1. **Presentación e Impacto Inicial (Hero & Navegación)**:
   - Cabecera superior con el logotipo `barriefreyre` a la izquierda y los 4 íconos sociales (`GitHub`, `Frontend Mentor`, `LinkedIn`, `Twitter/X`) a la derecha, superpuestos sobre el contenedor del retrato en blanco y negro en Tablet y Desktop, o centrados en columna en Mobile.
   - Titular principal `"Nice to meet you! I'm Barrie Freyre."` con subrayado grueso en verde esmeralda (`#4EE1A0`) bajo `"Barrie Freyre"` y botón de acción `"CONTACT ME"` que desplaza suavemente la vista hacia el formulario inferior.
2. **Exploración de Habilidades (Skills Grid)**:
   - Sección delimitada por una línea divisoria horizontal (`#FFFFFF` / `#D9D9D9` con opacidad sutil), mostrando **HTML** (4 Years Experience), **CSS** (4 Years Experience), **Javascript** (4 Years Experience), **Accessibility** (4 Years Experience), **React** (3 Years Experience) y **Sass** (3 Years Experience).
   - Distribución adaptativa: 1 columna centrada en Mobile (con línea divisoria inferior), 2 columnas en Tablet y 3 columnas en Desktop, acompañada de los anillos decorativos SVG en el extremo derecho.
3. **Galería de Proyectos (Projects Showcase)**:
   - Encabezado con título `"Projects"` y botón `"CONTACT ME"`.
   - Cuadrícula de 6 proyectos (**Design Portfolio**, **E-Learning Landing Page**, **Todo Web App**, **Entertainment Web App**, **Memory Game**, **Art Gallery Showcase**) con sus etiquetas tecnológicas en texto limpio (`HTML`, `CSS`, `JAVASCRIPT`).
   - **Comportamiento Responsivo de Acciones**:
     - En **Desktop**: Al pasar el cursor (`hover`) o enfocar con teclado sobre la miniatura del proyecto, aparece un velo oscuro (`rgba(0, 0, 0, 0.75)`) con los enlaces `"VIEW PROJECT"` y `"VIEW CODE"` centrados vertical y horizontalmente.
     - En **Tablet y Mobile**: Los enlaces `"VIEW PROJECT"` y `"VIEW CODE"` se muestran permanentemente debajo de las etiquetas de tecnología de cada tarjeta, tal como especifican las capturas de Tablet y Mobile.
4. **Formulario de Contacto y Pie de Página (Contact & Footer)**:
   - Fondo gris carbón (`#242424`) a ancho completo con bloque de texto introductorio a la izquierda (Desktop) o centrado arriba (Tablet/Mobile) y formulario a la derecha/abajo con campos `NAME`, `EMAIL` y `MESSAGE`.
   - Validación interactiva al escribir o enviar: borde inferior verde (`#4EE1A0`) cuando el campo es válido/activo, y borde rojo (`#FF6F5B`) con ícono de exclamación y texto `"Sorry, invalid format here"` alineado a la derecha cuando el correo o campo es inválido.

### Visual Identity & Theme
- **Aesthetic Direction**: Minimalismo editorial oscuro de alto contraste, con geometría tipográfica contundente y motivos lineales (anillos elípticos y círculo decorativo superpuesto).
- **Color Palette & Mood**:
  - `--bg-primary`: `#151515` (Negro profundo — `RGB 21, 21, 21` / `HSL 0°, 0%, 8%`) — 60% lienzo principal.
  - `--bg-secondary`: `#242424` (Gris carbón — `RGB 36, 36, 36` / `HSL 0°, 0%, 14%`) — 30% superficie estructural del bloque de contacto y tarjetas.
  - `--text-primary`: `#FFFFFF` (Blanco puro — `RGB 255, 255, 255`) — Titulares, nombres de proyectos y enlaces activos.
  - `--text-secondary`: `#D9D9D9` (Gris claro — `RGB 217, 217, 217` / `HSL 0°, 0%, 85%`) — Párrafos descriptivos, años de experiencia y etiquetas tecnológicas.
  - `--accent`: `#4EE1A0` (Verde menta/esmeralda — `RGB 78, 225, 160` / `HSL 153°, 71%, 59%`) — 10% acento en subrayados de botones, subrayado del nombre y estado activo de inputs.
  - `--error`: `#FF6F5B` (Rojo coral) — Estado de error en inputs y mensajes de validación.
- **Typography & Hierarchy**:
  - Fuente del sistema de diseño: **Space Grotesk** (`500 Medium` y `700 Bold`).
  - **Heading (XL)**: `88px` font-size, `88px` line-height, `-2.5px` letter-spacing (Desktop) / `72px` (Tablet) / `40px` (Mobile).
  - **Heading (L)**: `48px` font-size, `56px` line-height, `-1.5px` letter-spacing (Desktop/Tablet) / `32px` (Mobile).
  - **Heading (M)**: `24px` font-size, `32px` line-height, Bold.
  - **Body (L)**: `18px` font-size, `28px` line-height, Medium (`16px` en Mobile).
- **Interactive Feedback & Motion**:
  - Transiciones suaves (`150ms–200ms cubic-bezier(0.16, 1, 0.3, 1)`) en el cambio de color de texto e íconos sociales de `#FFFFFF` a `#4EE1A0` al hacer hover.
  - Aparición de la capa superpuesta en las tarjetas de proyecto en Desktop mediante `opacity` sin desplazamientos bruscos de layout.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Comportamiento Dual de Tarjetas de Proyecto (Hover en Desktop vs. Fijo en Tablet/Mobile)**
  - *Chosen Approach*: Renderizar la superposición centrada sobre la imagen en pantallas `lg` ($\ge 1024\text{px}$) al hacer hover/focus, y mostrar la fila de botones `VIEW PROJECT` / `VIEW CODE` debajo de las etiquetas en pantallas menores a `1024px`.
  - *Why*: En dispositivos táctiles no existe el estado hover; el diseño original de Frontend Mentor resuelve esto colocando los botones debajo de cada tarjeta en las vistas Tablet y Mobile.
- **Decision 2: Visor Interactivo de Proyectos (Modal de Vista Previa y Código)**
  - *Chosen Approach*: Al hacer clic en `VIEW PROJECT` o `VIEW CODE`, se abre un visor modal limpio con la vista ampliada del proyecto, descripción técnica y vista previa interactiva.
  - *Why*: Garantiza que todos los botones tengan un manejador interactivo real y útil dentro de la aplicación.

---

## 4. Technical Architecture & Data Strategy *(Technical Reference)*

### Architecture & Component Diagram
```
┌─────────────────────────────────────────────────────────────────────────┐
│                      PortfolioApp (Single-Page Root)                    │
│  State: activeProjectModal, contactFormState, validationErrors, toast   │
└───────────────┬─────────────────────────────┬───────────────────────────┘
                │                             │
      ┌─────────▼──────────┐        ┌─────────▼──────────┐
      │   Header & Hero    │        │    SkillsGrid      │
      │ - SocialLinks (4)  │        │ - 6 Tech Items     │
      │ - Hero Portrait    │        │ - Rings SVG Motif  │
      │ - Circle SVG Motif │        └─────────┬──────────┘
      └─────────┬──────────┘                  │
                │                             │
      ┌─────────▼──────────┐        ┌─────────▼──────────┐
      │  ProjectsSection   │        │   ContactFooter    │
      │ - ProjectCard (x6) │        │ - ValidatedForm    │
      │ - Hover Overlay    │        │   (Name/Email/Msg) │
      │ - ProjectModal     │        │ - Bottom SocialBar │
      └────────────────────┘        └────────────────────┘
```

### Data Model & State
- **Catálogo de Proyectos (`PROJECTS_DATA`)**: Lista tipada con los 6 proyectos oficiales (`Design Portfolio`, `E-Learning Landing Page`, `Todo Web App`, `Entertainment Web App`, `Memory Game`, `Art Gallery Showcase`), cada uno con su miniatura de alta resolución, lista de tecnologías (`HTML`, `CSS`, `JAVASCRIPT`), resumen del reto y detalles de código.
- **Estado del Formulario (`ContactFormState`)**:
  - Valores: `name`, `email`, `message`.
  - Estados por campo: `idle` | `active` | `valid` | `error`.
  - Reglas de validación: `name` obligatorio, `email` con expresión regular de formato válido (`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`), y `message` obligatorio.

### Interactive Component & State Mapping
- **Botones `CONTACT ME`**: Ejecutan `scrollIntoView({ behavior: 'smooth' })` hacia el contenedor `#contact` y enfocan automáticamente el campo `NAME`.
- **Tarjetas de Proyecto (`ProjectCard`)**: Soportan tanto hover de ratón como foco de teclado (`focus-within:opacity-100`) en Desktop, y abren el modal interactivo al pulsar `VIEW PROJECT` o `VIEW CODE`.
- **Formulario (`ContactSection`)**: Evalúa en `onBlur` y `onChange` (si ya hubo intento de envío) cada campo, mostrando el borde `#FF6F5B`, el ícono SVG de exclamación rojo a la derecha del input y el texto `"Sorry, invalid format here"` debajo del borde inferior. Al enviarse con éxito, limpia los campos y muestra una confirmación visual en `#4EE1A0`.
