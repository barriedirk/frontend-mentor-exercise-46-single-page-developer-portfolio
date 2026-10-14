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
      list: [
        {
          id: "design-portfolio",
          title: "DESIGN PORTFOLIO",
          tags: ["HTML", "CSS"],
          image:
            "/src/assets/images/project_design_portfolio_1791778824064.jpg",
          summary:
            "A single-page responsive design portfolio featuring an asymmetric CSS Grid bento layout for multi-disciplinary disciplines and an interactive work carousel.",
          highlights: [
            "CSS Grid template areas adapting seamlessly across Mobile, Tablet, and Desktop breakpoints",
            "Accessible keyboard-navigable image slider with smooth hardware-accelerated transitions",
            "Fluid typography scale using CSS clamp() and custom properties",
          ],
          liveUrl:
            "https://www.frontendmentor.io/challenges/singlepage-design-portfolio-2MMhyhfKVo",
          repoUrl: "https://github.com/adamkeyes/single-page-design-portfolio",
          codeSnippet: `.skills-bento {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 1.5rem;
}
.card-graphic-design {
  grid-column: span 2;
  grid-row: span 2;
  background-color: #755CDE;
}`,
        },
        {
          id: "e-learning-landing-page",
          title: "E-LEARNING LANDING PAGE",
          tags: ["HTML", "CSS"],
          image:
            "/src/assets/images/project_elearning_landing_1791778833605.jpg",
          summary:
            "Responsive marketing landing page for Skilled E-Learning with custom gradient cards, overlapping SVG badges, and high-conversion call-to-action states.",
          highlights: [
            "Responsive art-directed hero imagery with overlapping statistic callouts",
            "Equal-height CSS Grid course cards with floating top-offset category icons",
            "WCAG AA compliant contrast across gradient interactive buttons",
          ],
          liveUrl:
            "https://www.frontendmentor.io/challenges/skilled-elearning-landing-page-S1ObDrZ8q",
          repoUrl:
            "https://github.com/adamkeyes/skilled-elearning-landing-page",
          codeSnippet: `.course-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  row-gap: 5rem;
  column-gap: 1.875rem;
}
.btn-gradient-primary {
  background: linear-gradient(180deg, #FF6F48 0%, #F02AA6 100%);
}`,
        },
        {
          id: "todo-web-app",
          title: "TODO WEB APP",
          tags: ["HTML", "CSS", "JAVASCRIPT"],
          image: "/src/assets/images/project_todo_webapp_1791778842944.jpg",
          summary:
            "Feature-complete task management web application with drag-and-drop list reordering, real-time status filtering (All, Active, Completed), and theme switching.",
          highlights: [
            "Drag-and-drop reordering with keyboard accessibility and persistent state",
            "Instant filtering between All, Active, and Completed tasks with live counter",
            "Dark and light theme engine backed by CSS custom properties",
          ],
          liveUrl:
            "https://www.frontendmentor.io/challenges/todo-app-Su1_KokOW",
          repoUrl: "https://github.com/adamkeyes/todo-web-app",
          codeSnippet: `function filterTasks(tasks, status) {
  if (status === 'active') return tasks.filter(t => !t.completed);
  if (status === 'completed') return tasks.filter(t => t.completed);
  return tasks;
}`,
        },
        {
          id: "entertainment-web-app",
          title: "ENTERTAINMENT WEB APP",
          tags: ["HTML", "CSS", "JAVASCRIPT"],
          image:
            "/src/assets/images/project_entertainment_webapp_1791778852150.jpg",
          summary:
            "Multi-view streaming catalog application featuring horizontal trending rails, instant search across movies and TV series, and interactive bookmarking.",
          highlights: [
            "Real-time search filtering across Movies, TV Series, and Bookmarked views",
            "Horizontal snap-scrolling Trending rail with hover play overlays",
            "Optimistic bookmark toggle state with accessible ARIA live announcements",
          ],
          liveUrl:
            "https://www.frontendmentor.io/challenges/entertainment-web-app-J-UhgAW1X",
          repoUrl: "https://github.com/adamkeyes/entertainment-web-app",
          codeSnippet: `const filteredCatalog = catalog.filter(item => {
  const matchesCategory = activeTab === 'all' || item.category === activeTab;
  const matchesQuery = item.title.toLowerCase().includes(query.toLowerCase());
  return matchesCategory && matchesQuery;
});`,
        },
        {
          id: "memory-game",
          title: "MEMORY GAME",
          tags: ["HTML", "CSS", "JAVASCRIPT"],
          image: "/src/assets/images/project_memory_game_1791778861130.jpg",
          summary:
            "Interactive memory matching game supporting both 4x4 and 6x6 grid sizes, custom icon or number tokens, solo timer mode, and up to 4-player turn tracking.",
          highlights: [
            "Configurable 4x4 or 6x6 board generator using Fisher-Yates shuffle algorithm",
            "Multiplayer turn state machine tracking moves, pairs matched, and tie-breakers",
            "Zero-latency token flip animations and full keyboard grid navigation",
          ],
          liveUrl:
            "https://www.frontendmentor.io/challenges/memory-game-vse4WFPvM",
          repoUrl: "https://github.com/adamkeyes/memory-game",
          codeSnippet: `function shuffleTokens(tokens) {
  const copy = [...tokens, ...tokens];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}`,
        },
        {
          id: "art-gallery-showcase",
          title: "ART GALLERY SHOWCASE",
          tags: ["HTML", "CSS", "JAVASCRIPT"],
          image: "/src/assets/images/project_art_gallery_1791778870286.jpg",
          summary:
            'Editorial masonry art gallery experience ("galleria.") with an interactive slideshow player, progress indicator bar, and high-resolution painting lightbox.',
          highlights: [
            "Masonry grid layout celebrating historical fine art proportions without cropping",
            "Interactive slideshow controller with keyboard arrow navigation and progress bar",
            "High-resolution modal lightbox viewer for inspecting brushwork details",
          ],
          liveUrl:
            "https://www.frontendmentor.io/challenges/galleria-slideshow-site-tEA4pwsa6",
          repoUrl: "https://github.com/adamkeyes/galleria-slideshow-site",
          codeSnippet: `.masonry-gallery {
  columns: 4 280px;
  column-gap: 2.5rem;
}
.masonry-item {
  break-inside: avoid;
  margin-bottom: 2.5rem;
}`,
        },
      ],
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
      list: [
        {
          id: "design-portfolio",
          title: "PORTAFOLIO DE DISEÑO",
          tags: ["HTML", "CSS"],
          image:
            "/src/assets/images/project_design_portfolio_1791778824064.jpg",
          summary:
            "Portafolio responsivo de diseño de una sola página que integra un diseño asimétrico tipo Bento en CSS Grid para disciplinas creativas y un carrusel interactivo.",
          highlights: [
            "Áreas de plantilla en CSS Grid adaptadas perfectamente para móvil, tableta y escritorio",
            "Deslizador de imágenes accesible por teclado con transiciones aceleradas por hardware",
            "Escala tipográfica fluida mediante funciones CSS clamp() y propiedades personalizadas",
          ],
          liveUrl:
            "https://www.frontendmentor.io/challenges/singlepage-design-portfolio-2MMhyhfKVo",
          repoUrl: "https://github.com/adamkeyes/single-page-design-portfolio",
          codeSnippet: `.skills-bento {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 1.5rem;
}
.card-graphic-design {
  grid-column: span 2;
  grid-row: span 2;
  background-color: #755CDE;
}`,
        },
        {
          id: "e-learning-landing-page",
          title: "PÁGINA E-LEARNING",
          tags: ["HTML", "CSS"],
          image:
            "/src/assets/images/project_elearning_landing_1791778833605.jpg",
          summary:
            "Página de aterrizaje responsiva para la plataforma Skilled E-Learning con tarjetas de degradados vibrantes, distintivos SVG superpuestos y llamadas a la acción de alta conversión.",
          highlights: [
            "Diseño de imagen héroe con dirección de arte responsiva y tarjetas de estadísticas flotantes",
            "Cuadrícula CSS Grid de cursos con altura homogénea e iconos desplazados hacia arriba",
            "Contraste conforme a WCAG AA en todos los botones y degradados interactivos",
          ],
          liveUrl:
            "https://www.frontendmentor.io/challenges/skilled-elearning-landing-page-S1ObDrZ8q",
          repoUrl:
            "https://github.com/adamkeyes/skilled-elearning-landing-page",
          codeSnippet: `.course-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  row-gap: 5rem;
  column-gap: 1.875rem;
}
.btn-gradient-primary {
  background: linear-gradient(180deg, #FF6F48 0%, #F02AA6 100%);
}`,
        },
        {
          id: "todo-web-app",
          title: "APLICACIÓN TODO",
          tags: ["HTML", "CSS", "JAVASCRIPT"],
          image: "/src/assets/images/project_todo_webapp_1791778842944.jpg",
          summary:
            "Aplicación web completa de gestión de tareas con reordenamiento por arrastrar y soltar (drag and drop), filtros de estado en tiempo real (Todas, Activas, Completadas) y cambio de tema.",
          highlights: [
            "Reordenamiento por arrastre accesible mediante teclado y sincronización de estado",
            "Filtrado instantáneo entre tareas activas y finalizadas con contador dinámico",
            "Motor de modo claro y oscuro sustentado en variables CSS",
          ],
          liveUrl:
            "https://www.frontendmentor.io/challenges/todo-app-Su1_KokOW",
          repoUrl: "https://github.com/adamkeyes/todo-web-app",
          codeSnippet: `function filterTasks(tasks, status) {
  if (status === 'active') return tasks.filter(t => !t.completed);
  if (status === 'completed') return tasks.filter(t => t.completed);
  return tasks;
}`,
        },
        {
          id: "entertainment-web-app",
          title: "APP DE ENTRETENIMIENTO",
          tags: ["HTML", "CSS", "JAVASCRIPT"],
          image:
            "/src/assets/images/project_entertainment_webapp_1791778852150.jpg",
          summary:
            "Catálogo multimedia estilo plataforma de streaming con sección de tendencias en carrusel horizontal, búsqueda en tiempo real de películas y series, y guardado de favoritos.",
          highlights: [
            "Búsqueda en vivo combinada en categorías de Películas, Series y Marcadores",
            "Riel horizontal con scroll snap para títulos en tendencia y superposiciones al pasar el cursor",
            "Marcadores optimistas con avisos accesibles para lectores de pantalla",
          ],
          liveUrl:
            "https://www.frontendmentor.io/challenges/entertainment-web-app-J-UhgAW1X",
          repoUrl: "https://github.com/adamkeyes/entertainment-web-app",
          codeSnippet: `const filteredCatalog = catalog.filter(item => {
  const matchesCategory = activeTab === 'all' || item.category === activeTab;
  const matchesQuery = item.title.toLowerCase().includes(query.toLowerCase());
  return matchesCategory && matchesQuery;
});`,
        },
        {
          id: "memory-game",
          title: "JUEGO DE MEMORIA",
          tags: ["HTML", "CSS", "JAVASCRIPT"],
          image: "/src/assets/images/project_memory_game_1791778861130.jpg",
          summary:
            "Juego interactivo de emparejar fichas con soporte para tableros de 4x4 y 6x6, iconos o números, cronómetro individual y modo multijugador por turnos de hasta 4 participantes.",
          highlights: [
            "Generador aleatorio de fichas mediante el algoritmo de barajado Fisher-Yates",
            "Máquina de estados multijugador que computa movimientos, parejas acertadas y desempates",
            "Animaciones de volteo de fichas con latencia cero y navegación íntegra por teclado",
          ],
          liveUrl:
            "https://www.frontendmentor.io/challenges/memory-game-vse4WFPvM",
          repoUrl: "https://github.com/adamkeyes/memory-game",
          codeSnippet: `function shuffleTokens(tokens) {
  const copy = [...tokens, ...tokens];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}`,
        },
        {
          id: "art-gallery-showcase",
          title: "GALERÍA DE ARTE",
          tags: ["HTML", "CSS", "JAVASCRIPT"],
          image: "/src/assets/images/project_art_gallery_1791778870286.jpg",
          summary:
            'Experiencia editorial de galería en mosaico ("galleria.") con visor interactivo de diapositivas, barra de progreso en vivo y caja de luz (lightbox) en alta definición.',
          highlights: [
            "Diseño de cuadrícula estilo Masonry que respeta las proporciones históricas de cada óleo",
            "Controlador de presentación secuencial con flechas del teclado y barra de avance",
            "Visor modal ampliado en alta fidelidad para admirar el detalle de los trazos",
          ],
          liveUrl:
            "https://www.frontendmentor.io/challenges/galleria-slideshow-site-tEA4pwsa6",
          repoUrl: "https://github.com/adamkeyes/galleria-slideshow-site",
          codeSnippet: `.masonry-gallery {
  columns: 4 280px;
  column-gap: 2.5rem;
}
.masonry-item {
  break-inside: avoid;
  margin-bottom: 2.5rem;
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
