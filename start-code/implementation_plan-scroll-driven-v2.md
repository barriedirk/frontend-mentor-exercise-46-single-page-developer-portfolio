# Optimización de Fluidez — Video Hero con Reproducción Acelerada por Scroll

Optimización de alto rendimiento para el video de la sección Hero sustituyendo la manipulación forzada de fotogramas (`currentTime seeking`) por un **motor de reproducción nativa acelerada por inercia de scroll**, eliminando por completo los micro-tirones y garantizando 60fps continuos.

## User Review & Critical Decisions

> [!IMPORTANT]
> Decisiones confirmadas:
> - **Técnica de Fluidez (Opción 1)**: Reproducción asistida por el decodificador nativo del navegador con velocidad (`playbackRate`) vinculada a la velocidad de desplazamiento del usuario y desaceleración suave con inercia por fricción.
> - **Causa del Problema Actual**: Asignar repetidamente `video.currentTime` obliga a la GPU y al decodificador de video a vaciar el búfer de fotogramas y recalcular keyframes, lo que genera saltos y latencia visible.
> - **Solución**: Aprovechar el motor de reproducción por hardware de HTML5 (`video.play()`), ajustando dinámicamente `playbackRate` según el impulso del scroll y aplicando fricción suave al detenerse.

---

## 1. Overview & Core Concept

- **What It Does**: Cuando el usuario hace scroll hacia abajo en la sección Hero, el video se reproduce hacia adelante con total fluidez a una velocidad proporcional a la intensidad del scroll. Al detener el desplazamiento, una curva de inercia suave desacelera el video hasta pausarlo. Al regresar a la parte superior, el video regresa suavemente a su posición inicial.
- **Key Value**: Cero micro-tirones, cero bloqueos del hilo principal del navegador y una experiencia de usuario cinematográfica de 60fps constantes tanto en desktop como en pantallas de alta tasa de refresco (120Hz/ProMotion).

---

## 2. User Experience & Visual Design

### Key User Flows
1. **Scroll Activo hacia Abajo**:
   - Cada impulso de la rueda del ratón, trackpad o pantalla táctil incrementa la velocidad objetivo (`targetPlaybackRate`).
   - El video se reproduce hacia adelante de manera fluida y continua (sin saltos entre fotogramas) a $1.0\times$ - $2.5\times$ según la velocidad de lectura del usuario.
2. **Inercia y Detención Suave**:
   - Al dejar de scrollear, la velocidad no se corta en seco; decae exponencialmente mediante un factor de fricción ($0.90$ - $0.92$) hasta pausar el video de forma orgánica en reposo.
3. **Scroll hacia Arriba / Retorno a la Cabecera**:
   - Cuando el usuario vuelve a la parte superior de la página (`scrollY = 0`), el video rebobina suavemente o se reposiciona al primer fotograma para que vuelva a estar listo para el siguiente recorrido.
4. **Respeto a la Sección Hero**:
   - La interacción permanece confinada a la visibilidad del héroe en pantalla; al scrollear hacia las secciones inferiores (Habilidades y Proyectos), el video se pausa automáticamente para liberar recursos de GPU.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision: Motor de Reproducción Nativa + Inercia vs. Forzar `video.currentTime` por Píxel**
  - *Chosen Approach*: `video.play()` con tasa de velocidad dinámica y decaimiento por fricción en un bucle `requestAnimationFrame`.
  - *Why*: Los códecs de video web (H.264/MP4) están diseñados para decodificar flujos continuos a 60fps con compresión temporal; saltar a instantes arbitrarios en cada evento de scroll sobrecarga el decodificador del sistema operativo. La reproducción con tasa dinámica mantiene el pipeline de decodificación activo sin pérdidas de fotogramas.

---

## 4. Technical Architecture & Data Strategy *(Technical Reference)*

### Architecture & Component Diagram
```
┌────────────────────────────────────────────────────────────────────────┐
│                    Window Scroll / Wheel Events                        │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ Calculates scroll velocity & delta
                  ┌─────────────────▼─────────────────┐
                  │      Inertia Loop (RAF Engine)    │
                  │  - velocity += delta * impulse    │
                  │  - velocity *= friction (0.91)    │
                  │  - playbackRate = clamp(velocity) │
                  │  - if velocity < 0.05 => pause()  │
                  └─────────────────┬─────────────────┘
                                    │ Drives native playback
                  ┌─────────────────▼─────────────────┐
                  │       HTML5 Video Element         │
                  │   (Cloudinary MP4, 60fps sync)    │
                  └───────────────────────────────────┘
```

### Component Updates
- `src/components/ScrollDrivenHeroVideo.tsx`: Refactorización del controlador interno para gestionar el estado de inercia, velocidad de reproducción adaptativa y desaceleración suave.
- Verificación con `compile_applet` y `lint_applet` para certificar la compilación sin errores.
