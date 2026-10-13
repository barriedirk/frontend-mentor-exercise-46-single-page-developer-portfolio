# Soporte Bilingüe (Inglés / Castellano) — Portafolio Adam Keyes

Incorporación de un sistema de internacionalización (i18n) ligero, modular y tipado para permitir alternar fluidamente entre inglés (predeterminado según el reto de Frontend Mentor) y castellano, manteniendo intacta la fidelidad visual del sistema de diseño.

## User Review & Critical Decisions

> [!IMPORTANT]
> Decisiones confirmadas por el usuario:
> - **Ubicación del Selector**: Control discreto y minimalista `EN | ES` integrado en la cabecera junto al grupo de enlaces sociales, respetando la estética tipográfica Space Grotesk sin recurrir a badges o pills discordantes.
> - **Alcance de Traducción**: Traducción total de la interfaz, abarcando titulares, biografía, años de experiencia, encabezados, títulos y resúmenes de los 6 proyectos, modales de inspección técnica, etiquetas del formulario y mensajes de validación de error en tiempo real.
> - **Persistencia**: Se guardará la preferencia de idioma en `localStorage` (con fallback predeterminado a inglés `'en'`) para que se conserve al recargar o navegar.

---

## 1. Overview & Core Concept

- **What It Does**: Proporciona un cambio instantáneo de idioma sin recarga de página (`client-side state`), traduciendo cada componente del portafolio al español mientras preserva el inglés original como estándar predeterminado.
- **Target Audience**: Reclutadores hispanohablantes e internacionales que evalúan tanto el diseño front-end como las capacidades de adaptación accesible y bilingüe.
- **Key Value**: Experiencia de usuario nativa y coherente en ambos idiomas con cero impacto en el rendimiento o en los tiempos de renderizado.

---

## 2. User Experience & Visual Design

### Key User Flows
1. **Detección e Idioma Predeterminado**:
   - Al cargar la página por primera vez, se muestra en **inglés** (`EN`) tal como dicta el reto original. Si el usuario ya había seleccionado español anteriormente, se restaura desde `localStorage`.
2. **Interacción con el Selector `EN | ES`**:
   - En la cabecera (junto a los íconos de GitHub, Frontend Mentor, LinkedIn y Twitter), se renderiza un control tipográfico minimalista:
     - Idioma activo: texto resaltado en verde `#4EE1A0` con sutil subrayado activo o peso destacado.
     - Idioma alterno: texto en `#D9D9D9`/60 con hover interactivo a `#FFFFFF` o `#4EE1A0`.
     - Separador tipográfico discreto `/` o `|`.
   - Sin recargas ni parpadeos: el cambio es instantáneo e imperceptible.
3. **Traducción Coherente por Secciones**:
   - **Hero**: `"¡Mucho gusto! Soy Adam Keyes."` (con subrayado en `"Adam Keyes"`), biografía traducida: `"Radicado en el Reino Unido, soy un desarrollador front-end apasionado por crear aplicaciones web accesibles que encanten a los usuarios."`, y botón `"CONTÁCTAME"`.
   - **Habilidades (Skills)**: `"4 años de experiencia"` / `"3 años de experiencia"`.
   - **Proyectos**: `"Proyectos"`, `"VER PROYECTO"`, `"VER CÓDIGO"`, con descripciones detalladas y aspectos clave en español en el modal interactivo.
   - **Formulario de Contacto**: `"Contacto"`, texto descriptivo traducido, placeholders en mayúsculas (`NOMBRE`, `CORREO ELECTRÓNICO`, `MENSAJE`), validaciones en español (`"Disculpa, no puede estar vacío"`, `"Disculpa, formato inválido aquí"`), botón `"ENVIAR MENSAJE"` y mensaje de éxito tras el envío.
   - **Pie y Design System**: Botón `"Sistema de Diseño"` y textos informativos del modal adaptados.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Arquitectura de Diccionario Tipado vs. Dependencia Externa (react-i18next)**
  - *Chosen Approach*: Módulo de traducción centralizado y estrictamente tipado con TypeScript (`src/data/translations.ts`), con un tipo de esquema compartido `TranslationDictionary`.
  - *Why*: Para una Single-Page Application de este tamaño, un diccionario nativo en TypeScript es mucho más ligero, no añade dependencias pesadas, evita errores en tiempo de compilación mediante tipado estricto y garantiza renderizado sincrónico sin saltos de contenido (CLS = 0).
- **Decision 2: Integración Visual del Selector EN / ES**
  - *Chosen Approach*: Integrar el selector directamente en la cabecera y en el pie de página mediante botones de texto limpios con estilo `Space Grotesk`, cumpliendo con la regla de *Zero-Pill Discipline* de `frontend-design`.
  - *Why*: Evita flotantes intrusivos que puedan ocultar elementos de navegación o desentonar con el diseño sobrio de Frontend Mentor.

---

## 4. Technical Architecture & Data Strategy *(Technical Reference)*

### Architecture & Component Diagram
```
┌────────────────────────────────────────────────────────────────────────┐
│                        App Component (Root)                            │
│  State: lang ('en' | 'es') <--> localStorage('adam_keyes_lang')        │
│  Data: t = TRANSLATIONS[lang]                                          │
└───────────────────┬────────────────────────────────────────────────────┘
                    │
      ┌─────────────┼────────────────────────────┬───────────────────────┐
      │             │                            │                       │
┌─────▼──────┐ ┌────▼────────┐ ┌─────────────────▼──┐ ┌──────────────────▼──┐
│  Header    │ │ HeroSection │ │   Skills & Projects│ │   Contact & Footer  │
│ - Logo     │ │ - Title     │ │ - Years experience │ │ - Labels / Inputs   │
│ - Social   │ │ - Subtitle  │ │ - Project titles   │ │ - Error validations │
│ - [EN|ES]  │ │ - CTA       │ │ - Modal info & code│ │ - Success toast     │
└────────────┘ └─────────────┘ └────────────────────┘ └─────────────────────┘
```

### Data Model & Files
- `src/data/translations.ts`:
  - Definición de claves completas para inglés y español (`header`, `hero`, `skills`, `projects`, `contact`, `validation`, `modals`).
  - Lista de proyectos bilingües con títulos, resúmenes, viñetas de arquitectura y fragmentos explicativos en ambos idiomas.
- `src/App.tsx`:
  - Hook de estado `language` sincronizado con `localStorage`.
  - Función de alternancia y paso de textos dinámicos a cada sección y a los modales `ProjectModal` y `DesignSystemModal`.
- Verificación con `compile_applet` para certificar la ausencia de errores de tipos o sintaxis.
