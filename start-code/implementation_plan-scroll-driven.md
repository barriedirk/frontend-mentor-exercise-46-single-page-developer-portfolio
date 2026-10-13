# Integración de Video Scroll-Driven — Retrato Hero (Adam Keyes)

Sustitución de la imagen estática del retrato de la sección Hero por un video interactivo alojado en Cloudinary, sincronizado mediante desplazamiento de pantalla (*scroll-driven scrubbing*) con aceleración por hardware y preservando la estética monocromática del sistema de diseño de Frontend Mentor.

## User Review & Critical Decisions

> [!IMPORTANT]
> Decisiones confirmadas por el usuario:
> - **URL del Recurso**: `https://res.cloudinary.com/dpeqgssr9/video/upload/v1791844324/barrie_freyre_typing_at_workstation_20261012170125_fbacak.mp4`
> - **Sincronización por Scroll**: El avance del video se vinculará al desplazamiento mientras la sección Hero permanezca visible en el viewport (desde $0\%$ en la cabecera hasta el $100\%$ de la duración del video al alcanzar el divisor de habilidades), garantizando una experiencia natural y sin obligar al usuario a recorrer toda la página.
> - **Comportamiento en Dispositivos Móviles**: *Scrubbing* de alto rendimiento con `requestAnimationFrame` e interpolación lineal suave (`lerp`), con reproducción suave en segundo plano y compatibilidad táctil total sin bloquear el desplazamiento.
> - **Fidelidad Estética**: El video aplicará los mismos filtros del diseño (`grayscale contrast-125`) para integrarse de forma idéntica con el fondo `#242424` y el círculo decorativo SVG superpuesto.

---

## 1. Overview & Core Concept

- **What It Does**: Transforma el retrato estático del héroe en una pieza interactiva viva. A medida que el usuario hace scroll hacia abajo, el personaje realiza la animación del video (escribiendo en su estación de trabajo) y retrocede de forma fluida si el usuario hace scroll hacia arriba.
- **Target Audience**: Evaluadores y reclutadores que buscan un portafolio técnico con micro-interacciones avanzadas de vanguardia.
- **Key Value**: Mayor impacto visual y dinamismo manteniendo estrictamente el layout responsivo en Desktop (`445×720px`), Tablet (`322×600px`) y Mobile (`174×383px`).

---

## 2. User Experience & Visual Design

### Key User Flows
1. **Carga Inicial y Cero Parpadeo**:
   - El elemento `<video>` se precarga con atributos `muted`, `playsInline`, `preload="auto"` y `crossOrigin="anonymous"`.
   - Se muestra un póster o el primer fotograma con la imagen de retrato de respaldo mientras el video almacena en búfer sus primeros segundos, evitando cajas en blanco o destellos visuales.
2. **Scroll Scrubbing Interactivo**:
   - Al desplazarse por la cabecera y el bloque de introducción, un observador de scroll calcula la fracción de progreso normalizada $t \in [0, 1]$.
   - El tiempo del video se actualiza calculando `targetTime = t * duration`, amortiguado suavemente mediante un bucle de animación para evitar saltos bruscos entre keyframes.
3. **Consistencia Visual con el Retrato Original**:
   - Se conservan exactamente las mismas dimensiones CSS, el círculo superpuesto (`PatternCircle`) y el gradiente inferior (`from-[#242424]/40 via-[#242424] to-[#242424]`).
   - El filtro CSS `grayscale contrast-125 object-cover object-top` unifica el aspecto fotográfico en blanco y negro del reto.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Interpolación Suave (`lerp`) con `requestAnimationFrame` vs. Asignación Directa de `currentTime`**
  - *Chosen Approach*: Implementar un suavizado de fotogramas donde el valor de tiempo del video se aproxima progresivamente al tiempo objetivo (`currentTime += (targetTime - currentTime) * 0.15`).
  - *Why*: Modificar directamente `video.currentTime` en cada evento de scroll del navegador provoca micro-tirones y sobrecarga el decodificador; la interpolación garantiza 60fps constantes.
- **Decision 2: Resiliencia y Fallback Automático**
  - *Chosen Approach*: Si la conexión es lenta, falla la red o el usuario tiene activada la preferencia de accesibilidad `prefers-reduced-motion`, el sistema mantiene de respaldo la imagen estática optimizada de Adam Keyes sin romper el diseño.
  - *Why*: Cumple con las pautas de accesibilidad WCAG y la regla de tolerancia a fallos de `frontend-design`.

---

## 4. Technical Architecture & Data Strategy *(Technical Reference)*

### Architecture & Component Diagram
```
┌────────────────────────────────────────────────────────────────────────┐
│                        Hero Section Container                          │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                  ┌─────────────────▼─────────────────┐
                  │    ScrollDrivenHeroVideo          │
                  │  - Video element (Cloudinary MP4) │
                  │  - Poster fallback (Portrait JPG) │
                  │  - RAF Loop + lerp smoothing      │
                  │  - IntersectionObserver (inView)  │
                  └─────────────────┬─────────────────┘
                                    │
                  ┌─────────────────▼─────────────────┐
                  │ Overlaid PatternCircle & Motifs   │
                  └───────────────────────────────────┘
```

### Component Details
- `src/components/ScrollDrivenHeroVideo.tsx`: Componente modular y reutilizable que maneja la carga del video, cálculo de progreso relativo del viewport, suavizado de fotogramas, pausa cuando sale de pantalla y gestión de errores de reproducción.
- `src/App.tsx`: Reemplazo del bloque `<img>` estático por `<ScrollDrivenHeroVideo />` manteniendo todas las clases responsivas intactas.
- Verificación con `compile_applet` y `lint_applet` para confirmar la compilación exitosa.
