import { PROJECTS_DATA } from "./projects";

export type Language = "en" | "es";

export interface TranslatedProject {
  id: string;
  title: string;
  tags: string[];
  image: string;
  summary: string;
  highlights: string[];
  liveUrl: string;
  repoUrl: string;
  codeSnippet: string;
}

export interface Translations {
  header: {
    logo: string;
    socialAria: string;
    langToggleAria: string;
    skipToContent: string;
    opensInNewTab: string;
  };
  hero: {
    greetingLine1: string;
    greetingLine2: string;
    imPrefix: string;
    name: string;
    dot: string;
    bio: string;
    contactBtn: string;
    portraitAlt: string;
  };
  skills: {
    sectionAria: string;
    sectionTitle: string;
    yearsExperience: (count: number) => string;
    skills: {
      name: string;
      years: number;
    }[];
  };
  projects: {
    sectionTitle: string;
    contactBtn: string;
    viewProject: string;
    viewCode: string;
    tabDetails: string;
    tabImplementation: string;
    liveDemoLabel: string;
    githubLabel: string;
    inspectSource: string;
    backToPortfolio: string;
    projectOverview: string;
    architectureHighlights: string;
    coreSnippet: string;
    snippetSubtitle: (projectTitle: string) => string;
    copySnippet: string;
    copiedSnippet: string;
    specificationIndex: (index: number) => string;
    tablistAria: string;
    closeModal: string;
    liveSiteTooltip: string;
    githubTooltip: string;
    list: TranslatedProject[];
  };
  contact: {
    title: string;
    description: string;
    nameLabel: string;
    emailLabel: string;
    messageLabel: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    messagePlaceholder: string;
    sendBtn: string;
    successMessage: (name: string) => string;
    errors: {
      required: string;
      invalidEmail: string;
    };
  };
  footer: {
    logo: string;
    designSystemBtn: string;
    socialAria: string;
  };
  designSystem: {
    title: string;
    subtitle: string;
    backBtn: string;
    colorTitle: string;
    typographyTitle: string;
    interactiveTitle: string;
    buttonIdle: string;
    buttonHover: string;
    textFieldActive: string;
    textFieldError: string;
    sampleErrorText: string;
    bodySample1: string;
    bodySample2: string;
  };
}

export const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    header: {
      logo: "barriefreyre",
      socialAria: "Social media",
      langToggleAria: "Select language",
      skipToContent: "Skip to content",
      opensInNewTab: "opens in a new tab",
    },
    hero: {
      greetingLine1: "Nice to ",
      greetingLine2: "meet you! ",
      imPrefix: "I’m ",
      name: "Barrie Freyre",
      dot: ".",
      bio: "Based in Peru, I’m a front-end developer passionate about building accessible web apps that users love.",
      contactBtn: "CONTACT ME",
      portraitAlt: "Barrie Freyre portrait",
    },
    skills: {
      sectionAria: "Technical skills and experience",
      sectionTitle: "Skills",
      yearsExperience: (count: number) => `${count} Years Experience`,
      skills: [
        { name: "HTML", years: 10 },
        { name: "CSS", years: 10 },
        { name: "Javascript", years: 10 },
        { name: "Accessibility", years: 7 },
        { name: "React", years: 5 },
        { name: "Angular", years: 5 },
        { name: "SASS", years: 5 },
      ],
    },
    projects: {
      sectionTitle: "Projects",
      contactBtn: "CONTACT ME",
      viewProject: "VIEW PROJECT",
      viewCode: "VIEW CODE",
      tabDetails: "DETAILS",
      tabImplementation: "IMPLEMENTATION",
      liveDemoLabel: "LIVE DEMO",
      githubLabel: "GITHUB",
      inspectSource: "INSPECT SOURCE",
      backToPortfolio: "BACK TO PORTFOLIO",
      projectOverview: "Project Overview",
      architectureHighlights: "Key Architecture Highlights",
      coreSnippet: "Core Implementation Snippet",
      snippetSubtitle: (projectTitle: string) =>
        `Clean, accessible implementation from ${projectTitle}`,
      copySnippet: "COPY SNIPPET",
      copiedSnippet: "COPIED TO CLIPBOARD",
      specificationIndex: (index: number) => `0${index}. Specification`,
      tablistAria: "Project view mode",
      closeModal: "Close modal",
      liveSiteTooltip: "Visit live site (opens in new tab)",
      githubTooltip: "View GitHub repository (opens in new tab)",
      list: PROJECTS_DATA,
    },
    contact: {
      title: "Contact",
      description:
        "I would love to hear about your project and how I could help. Please fill in the form, and I’ll get back to you as soon as possible.",
      nameLabel: "Name",
      emailLabel: "Email address",
      messageLabel: "Message",
      namePlaceholder: "NAME",
      emailPlaceholder: "EMAIL",
      messagePlaceholder: "MESSAGE",
      sendBtn: "SEND MESSAGE",
      successMessage: (name: string) =>
        `Thank you, ${name}! Your message has been received and Adam will get back to you soon.`,
      errors: {
        required: "Sorry, can't be empty",
        invalidEmail: "Sorry, invalid format here",
      },
    },
    footer: {
      logo: "barriefreyre",
      designSystemBtn: "Design System",
      socialAria: "Footer social media",
    },
    designSystem: {
      title: "portfolio",
      subtitle: "design system",
      backBtn: "BACK TO PORTFOLIO",
      colorTitle: "Color",
      typographyTitle: "Typography",
      interactiveTitle: "Interactive Elements",
      buttonIdle: "Button Idle",
      buttonHover: "Button Hover",
      textFieldActive: "Text Field Active",
      textFieldError: "Text Field Error",
      sampleErrorText: "Sorry, invalid format here",
      bodySample1:
        "This is Body (L). Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat.",
      bodySample2:
        "Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue. Morbi purus libero, faucibus adipiscing, commodo quis, gravida id, est. Sed lectus. Praesent elementum hendrerit tortor. Sed semper lorem at felis. Vestibulum volutpat.",
    },
  },
  es: {
    header: {
      logo: "barriefreyre",
      socialAria: "Redes sociales",
      langToggleAria: "Seleccionar idioma",
      skipToContent: "Saltar al contenido principal",
      opensInNewTab: "abre en una nueva pestaña",
    },
    hero: {
      greetingLine1: "¡Mucho ",
      greetingLine2: "gusto! ",
      imPrefix: "Soy ",
      name: "Barrie Freyre",
      dot: ".",
      bio: "Radicado en Perú, soy un desarrollador front-end apasionado por crear aplicaciones web accesibles que encanten a los usuarios.",
      contactBtn: "CONTÁCTAME",
      portraitAlt: "Retrato de Barrie Freyre",
    },
    skills: {
      sectionAria: "Habilidades técnicas y experiencia",
      sectionTitle: "Habilidades",
      yearsExperience: (count: number) => `${count} años de experiencia`,
      skills: [
        { name: "HTML", years: 10 },
        { name: "CSS", years: 10 },
        { name: "Javascript", years: 10 },
        { name: "Accessibility", years: 7 },
        { name: "React", years: 5 },
        { name: "Angular", years: 5 },
        { name: "SASS", years: 5 },
      ],
    },
    projects: {
      sectionTitle: "Proyectos",
      contactBtn: "CONTÁCTAME",
      viewProject: "VER PROYECTO",
      viewCode: "VER CÓDIGO",
      tabDetails: "DETALLES",
      tabImplementation: "IMPLEMENTACIÓN",
      liveDemoLabel: "VER DEMO",
      githubLabel: "GITHUB",
      inspectSource: "INSPECCIONAR CÓDIGO",
      backToPortfolio: "VOLVER AL PORTAFOLIO",
      projectOverview: "Resumen del Proyecto",
      architectureHighlights: "Aspectos Clave de Arquitectura",
      coreSnippet: "Fragmento Principal de Implementación",
      snippetSubtitle: (projectTitle: string) =>
        `Implementación limpia y accesible de ${projectTitle}`,
      copySnippet: "COPIAR CÓDIGO",
      copiedSnippet: "¡COPIADO AL PORTAPAPELES!",
      specificationIndex: (index: number) => `0${index}. Especificación`,
      tablistAria: "Modo de visualización del proyecto",
      closeModal: "Cerrar ventana modal",
      liveSiteTooltip: "Visitar sitio en vivo (se abre en nueva pestaña)",
      githubTooltip: "Ver repositorio en GitHub (se abre en nueva pestaña)",
      list: [
        {
          id: "link-sharing-app",
          title: "LINK-SHARING APP",
          tags: ["REACT", "EXPRESS", "POSTGRESQL", "NX"],
          image: "/src/assets/images/project_link_sharing_app.jpg",
          summary:
            "Plataforma full-stack para compartir enlaces construida en un monorepositorio Nx, con vista previa interactiva en dispositivo móvil en tiempo real, reordenamiento drag-and-drop, autenticación JWT y persistencia en PostgreSQL.",
          highlights: [
            "Monorepositorio Nx que orquesta React 19, API REST en Express y esquemas de validación compartidos en TypeScript",
            "Vista previa interactiva en maqueta de móvil sincronizada en tiempo real con validación dinámica de enlaces",
            "Conjunto exhaustivo de pruebas con tests unitarios en Vitest y flujos E2E en Cypress",
          ],
          liveUrl: "https://link-sharing-frontend.onrender.com/#/login",
          repoUrl:
            "https://github.com/barriedirk/frontend-mentor-exercise-38-link-sharing-app",
          codeSnippet: `export function useLinkReorder(links: Link[], onReorder: (links: Link[]) => void) {
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const items = Array.from(links);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    onReorder(items.map((item, idx) => ({ ...item, order: idx })));
  };
  return { handleDragEnd };
}`,
        },
        {
          id: "kanban-task-management",
          title: "GESTIÓN DE TAREAS KANBAN",
          tags: ["NEXT.JS", "STRAPI", "ZUSTAND", "REACT HOOK FORM"],
          image: "/src/assets/images/project_kanban_task_management_web_app.jpg",
          summary:
            "Aplicación Kanban responsiva con múltiples tableros conectada a un CMS headless Strapi, gestión de estado reactiva con Zustand, seguimiento de subtareas y temas claro/oscuro.",
          highlights: [
            "Flujo de trabajo multi-columna con actualizaciones optimistas de estado mediante Zustand",
            "Validación robusta de formularios para tableros, columnas y subtareas con React Hook Form y Zod",
            "Integración con CMS headless Strapi REST API con jerarquías personalizadas de tableros persistentes",
          ],
          liveUrl: "https://frontend-mentor-exercise-41-kanban.vercel.app/",
          repoUrl:
            "https://github.com/barriedirk/frontend-mentor-exercise-41-kanban-task-management-web-app",
          codeSnippet: `export const useKanbanStore = create<KanbanState>((set) => ({
  boards: [],
  activeBoardId: null,
  moveTask: (taskId, sourceColId, targetColId, newIndex) =>
    set((state) => {
      const activeBoard = state.boards.find((b) => b.id === state.activeBoardId);
      if (!activeBoard) return state;
      const updatedColumns = transferTask(activeBoard.columns, taskId, sourceColId, targetColId, newIndex);
      return { boards: updateBoardColumns(state.boards, activeBoard.id, updatedColumns) };
    }),
}));`,
        },
        {
          id: "audiophile-ecommerce",
          title: "TIENDA E-COMMERCE AUDIOPHILE",
          tags: ["NEXT.JS", "REACT", "TAILWIND CSS", "STORYBOOK"],
          image: "/src/assets/images/project_audiophile_ecommerce_website.jpg",
          summary:
            "Tienda e-commerce multi-página para equipos de audio de alta fidelidad construida con Next.js, Tailwind CSS, carrito de compras persistente y catálogo de componentes en Storybook.",
          highlights: [
            "Sistema de diseño modular documentado y probado en Storybook con soporte integral de accesibilidad",
            "Carrito de compras persistente con cálculo de impuestos (VAT), cantidades dinámicas y modal de checkout",
            "Elementos picture responsivos con dirección de arte para garantizar máxima fidelidad visual",
          ],
          liveUrl: "https://audiophile-e-commerce-website-web-a.vercel.app/",
          repoUrl:
            "https://github.com/barriedirk/frontend-mentor-exercise-42-audiophile-e-commerce-website",
          codeSnippet: `export function CartSummary({ items, shipping = 50 }: CartSummaryProps) {
  const subtotal = useMemo(() => items.reduce((acc, i) => acc + i.price * i.quantity, 0), [items]);
  const vat = Math.round(subtotal * 0.2);
  const grandTotal = subtotal + shipping;

  return (
    <div className="flex flex-col gap-2 p-6 bg-neutral-900 rounded-lg text-white">
      <div className="flex justify-between text-neutral-400"><span>TOTAL</span><span>$ {subtotal.toLocaleString()}</span></div>
      <div className="flex justify-between text-neutral-400"><span>VAT (INCLUDED)</span><span>$ {vat.toLocaleString()}</span></div>
      <div className="flex justify-between font-bold text-accent mt-4"><span>GRAND TOTAL</span><span>$ {grandTotal.toLocaleString()}</span></div>
    </div>
  );
}`,
        },
        {
          id: "currency-converter",
          title: "CONVERSOR DE DIVISAS",
          tags: ["NEXT.JS", "REACT", "ZUSTAND", "TAILWIND CSS"],
          image:
            "/src/assets/images/project_foreign_exchange_currency_converter.jpg",
          summary:
            "Aplicación moderna de cambio de divisas con soporte de internacionalización (i18n), calculadora de conversión en tiempo real, gráficos de tasas históricas y caché de estado con Zustand.",
          highlights: [
            "Enrutamiento multi-idioma y localización (/en, /es) implementado directamente en Next.js",
            "Cliente API con Axios que implementa caché, conversiones con debounce y recuperación resiliente de errores",
            "Gráficos interactivos para comparar fluctuaciones de tasas en periodos de 30, 90 y 365 días",
          ],
          liveUrl:
            "https://foreign-exchange-currency-converter-eta.vercel.app/en",
          repoUrl:
            "https://github.com/barriedirk/frontend-mentor-exercise-44-foreign-exchange-currency-converter",
          codeSnippet: `export async function convertCurrency(amount: number, from: string, to: string): Promise<ConversionResult> {
  const { data } = await apiClient.get<RateResponse>(\`/latest?from=\${from}&to=\${to}\`);
  const rate = data.rates[to];
  const converted = Number((amount * rate).toFixed(4));
  return { amount, from, to, rate, result: converted, timestamp: Date.now() };
}`,
        },
        {
          id: "galleria-slideshow",
          title: "GALERÍA DE ARTE SLIDESHOW",
          tags: ["ASTRO", "TAILWIND CSS", "TYPESCRIPT"],
          image: "/src/assets/images/project_art_gallery.jpg",
          summary:
            "Galería de arte editorial con diseño Masonry de alto rendimiento construida con Astro y Tailwind CSS, con reproductor de diapositivas a pantalla completa y visor modal lightbox.",
          highlights: [
            "Arquitectura de islas Astro que ofrece carga inicial ultrarrápida sin sobrecarga innecesaria de JavaScript",
            "Cuadrícula masonry con columnas CSS que preserva las proporciones originales de cada obra pictórica",
            "Controlador de presentaciones accesible por teclado con barra de progreso fluida",
          ],
          liveUrl:
            "https://barriedirk.github.io/frontend-mentor-exercise-27-galleria-slideshow-site/",
          repoUrl:
            "https://github.com/barriedirk/frontend-mentor-exercise-27-galleria-slideshow-site",
          codeSnippet: `---
import { paintings } from '../data/artworks';
const { currentSlideIndex = 0 } = Astro.props;
const current = paintings[currentSlideIndex];
const progressPercentage = ((currentSlideIndex + 1) / paintings.length) * 100;
---
<div class="slideshow-hud flex items-center justify-between border-t border-neutral-200 p-6">
  <div>
    <h2 class="font-bold text-lg text-black">{current.name}</h2>
    <p class="text-sm text-neutral-500">{current.artist.name}</p>
  </div>
  <div class="h-1 bg-neutral-200 fixed bottom-0 left-0 right-0">
    <div class="h-full bg-black transition-all duration-300" style={\`width: \${progressPercentage}%\`} />
  </div>
</div>`,
        },
        {
          id: "pomodoro-app",
          title: "APLICACIÓN POMODORO",
          tags: ["ASTRO", "TAILWIND CSS", "TYPESCRIPT"],
          image: "/src/assets/images/project_pomodoro.jpg",
          summary:
            "Temporizador de productividad Pomodoro personalizable en Astro y Tailwind CSS con intervalos configurables, reloj circular SVG con cuenta regresiva y personalización de temas y fuentes.",
          highlights: [
            "Bucle de cuenta regresiva con web worker para evitar desaceleración del temporizador en pestañas inactivas",
            "Animación circular SVG con stroke-dashoffset calculando el porcentaje restante en tiempo real",
            "Modal de preferencias para seleccionar tipografía (Sans, Serif, Mono) y colores de énfasis",
          ],
          liveUrl:
            "https://barriedirk.github.io/frontend-mentor-exercise-28-pomodoro-app/",
          repoUrl:
            "https://github.com/barriedirk/frontend-mentor-exercise-28-pomodoro-app",
          codeSnippet: `export function calculateSvgProgress(secondsLeft: number, totalSeconds: number, radius = 120): number {
  const circumference = 2 * Math.PI * radius;
  const progressRatio = secondsLeft / totalSeconds;
  return circumference * (1 - progressRatio);
}`,
        },
        {
          id: "space-tourism-website",
          title: "SITIO WEB TURISMO ESPACIAL",
          tags: ["ASTRO", "TAILWIND CSS"],
          image:
            "/src/assets/images/project_space_tourism_multi_page_website.jpg",
          summary:
            "Experiencia web inmersiva de turismo espacial y astronomía de múltiples páginas con pestañas interactivas para destinos planetarios, tripulación y tecnologías de lanzamiento.",
          highlights: [
            "Implementación accesible de pestañas (tablist/tabpanel) con navegación completa por teclado (WAI-ARIA)",
            "Diseño responsivo que alterna entre pestañas horizontales, paginación por puntos y selectores numéricos",
            "Arquitectura de Astro orientada a contenido con optimización de imágenes en formatos modernos (AVIF/WebP)",
          ],
          liveUrl:
            "https://barriedirk.github.io/frontend-mentor-exercise-26-space-tourism-multi-page-website/",
          repoUrl:
            "https://github.com/barriedirk/frontend-mentor-exercise-26-space-tourism-multi-page-website",
          codeSnippet: `---
import Layout from '../layouts/Layout.astro';
import destinations from '../data/destinations.json';
const { destination = destinations[0] } = Astro.props;
---
<main class="destination-page min-h-screen bg-space-dark text-white px-6 md:px-24 py-12">
  <h1 class="font-barlow-condensed uppercase tracking-widest text-lg md:text-2xl text-neutral-400">
    <span class="font-bold text-neutral-600 mr-4">01</span> Pick your destination
  </h1>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mt-12">
    <img src={destination.images.webp} alt={destination.name} class="mx-auto w-64 md:w-96 animate-spin-slow" />
    <article>
      <h2 class="font-bellefair text-7xl uppercase">{destination.name}</h2>
      <p class="font-barlow text-neutral-300 leading-relaxed mt-4">{destination.description}</p>
    </article>
  </div>
</main>`,
        },
        {
          id: "tic-tac-toe-game",
          title: "JUEGO TRES EN LÍNEA (TIC TAC TOE)",
          tags: ["JAVASCRIPT", "CSS", "LOCALSTORAGE"],
          image: "/src/assets/images/project_tic_tac_toe_game.jpg",
          summary:
            "Juego clásico de Tres en Línea desarrollado con Vanilla JavaScript y CSS, con gestión de estado unidireccional inspirada en Redux, modo CPU con algoritmo Minimax invencible y persistencia local de puntuaciones.",
          highlights: [
            "Algoritmo de IA Minimax que garantiza un modo contra CPU desafiante e imbatible",
            "Flujo de estado unidireccional (acción -> reductor -> render) implementado puramente en JavaScript ES6+",
            "Navegación por teclado celda por celda y anuncios para lectores de pantalla",
          ],
          liveUrl:
            "https://barriedirk.github.io/frontend-mentor-exercise-21-tic-tac-toe-game/",
          repoUrl:
            "https://github.com/barriedirk/frontend-mentor-exercise-21-tic-tac-toe-game",
          codeSnippet: `function minimax(board, depth, isMaximizing) {
  const winner = checkWinner(board);
  if (winner === 'O') return 10 - depth;
  if (winner === 'X') return depth - 10;
  if (board.every(cell => cell !== null)) return 0;

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = 'O';
        bestScore = Math.max(bestScore, minimax(board, depth + 1, false));
        board[i] = null;
      }
    }
    return bestScore;
  }
}`,
        },
        {
          id: "entertainment-web-app",
          title: "APP WEB DE ENTRETENIMIENTO",
          tags: ["REACT", "REDUX", "TAILWIND CSS", "REACT ROUTER"],
          image: "/src/assets/images/project_entertainment_web_app.jpg",
          summary:
            "Aplicación de catálogo de streaming y entretenimiento con React y Redux, búsqueda instantánea en tiempo real entre películas y series, filtros por categorías y gestión de marcadores guardados.",
          highlights: [
            "Redux Toolkit para gestionar el guardado de marcadores con sincronización en almacenamiento local",
            "Rieles de tarjetas accesibles por teclado y cuadrícula responsiva con Tailwind CSS",
            "Filtro de búsqueda en tiempo real con debounce que actualiza los resultados sin saltos visuales",
          ],
          liveUrl:
            "https://barriedirk.github.io/frontend-mentor-exercise-34-entertainment-web-app/#/",
          repoUrl:
            "https://github.com/barriedirk/frontend-mentor-exercise-34-entertainment-web-app",
          codeSnippet: `export const entertainmentSlice = createSlice({
  name: 'entertainment',
  initialState,
  reducers: {
    toggleBookmark: (state, action: PayloadAction<string>) => {
      const item = state.media.find(m => m.id === action.payload);
      if (item) {
        item.isBookmarked = !item.isBookmarked;
        saveBookmarksToStorage(state.media.filter(m => m.isBookmarked).map(m => m.id));
      }
    },
  },
});`,
        },
        {
          id: "memory-game",
          title: "JUEGO DE MEMORIA",
          tags: ["ANGULAR", "NGRX", "RXJS", "SCSS"],
          image: "/src/assets/images/project_memory_game.jpg",
          summary:
            "Juego de memoria interactivo desarrollado en Angular con gestión de estado en NgRx y flujos RxJS, tableros configurables (4x4 y 6x6), fichas de números o iconos y modo multijugador de 1 a 4 personas.",
          highlights: [
            "Máquina de estados reactiva con NgRx para rotación de turnos, conteo de pares y desempates",
            "Flujos reactivos de temporizador con RxJS para el modo individual y conteo de movimientos",
            "Animaciones 3D de volteo de tarjetas aceleradas por hardware con SCSS modular",
          ],
          liveUrl:
            "https://barriedirk.github.io/frontend-mentor-exercise-33-memory-game/#/",
          repoUrl:
            "https://github.com/barriedirk/frontend-mentor-exercise-33-memory-game",
          codeSnippet: `@Component({
  selector: 'app-memory-board',
  templateUrl: './memory-board.component.html',
  styleUrls: ['./memory-board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MemoryBoardComponent {
  cards$ = this.store.select(selectCards);
  isLocked$ = this.store.select(selectIsBoardLocked);

  onCardClick(cardIndex: number): void {
    this.store.dispatch(MemoryActions.flipCard({ cardIndex }));
  }
}`,
        },
      ],
    },
    contact: {
      title: "Contacto",
      description:
        "Me encantaría conocer tu proyecto y cómo podría ayudarte. Por favor completa el formulario y te responderé a la brevedad.",
      nameLabel: "Nombre",
      emailLabel: "Correo electrónico",
      messageLabel: "Mensaje",
      namePlaceholder: "NOMBRE",
      emailPlaceholder: "CORREO ELECTRÓNICO",
      messagePlaceholder: "MENSAJE",
      sendBtn: "ENVIAR MENSAJE",
      successMessage: (name: string) =>
        `¡Muchas gracias, ${name}! Tu mensaje ha sido recibido y Adam se pondrá en contacto pronto.`,
      errors: {
        required: "Disculpa, no puede estar vacío",
        invalidEmail: "Disculpa, formato inválido aquí",
      },
    },
    footer: {
      logo: "barriefreyre",
      designSystemBtn: "Sistema de Diseño",
      socialAria: "Redes sociales del pie de página",
    },
    designSystem: {
      title: "portafolio",
      subtitle: "sistema de diseño",
      backBtn: "VOLVER AL PORTAFOLIO",
      colorTitle: "Color",
      typographyTitle: "Tipografía",
      interactiveTitle: "Elementos Interactivos",
      buttonIdle: "Botón en Reposo",
      buttonHover: "Botón al Pasar el Cursor",
      textFieldActive: "Campo de Texto Activo",
      textFieldError: "Campo de Texto con Error",
      sampleErrorText: "Disculpa, formato inválido aquí",
      bodySample1:
        "Este es el Cuerpo (L). Espacio tipográfico legible con altura de línea equilibrada para párrafos de presentación y lectura en pantalla.",
      bodySample2:
        "Diseño basado en Space Grotesk con pesos Medium (500) y Bold (700). Cumple estrictamente con las proporciones y tokens del reto de Frontend Mentor.",
    },
  },
};
