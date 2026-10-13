export interface SkillItem {
  name: string;
  experience: string;
}

export interface ProjectItem {
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

export const HERO_PORTRAIT_IMAGE = '/src/assets/images/adam_keyes_portrait_1791778813977.jpg';

export const SKILLS_DATA: SkillItem[] = [
  { name: 'HTML', experience: '4 Years Experience' },
  { name: 'CSS', experience: '4 Years Experience' },
  { name: 'Javascript', experience: '4 Years Experience' },
  { name: 'Accessibility', experience: '4 Years Experience' },
  { name: 'React', experience: '3 Years Experience' },
  { name: 'Sass', experience: '3 Years Experience' },
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'design-portfolio',
    title: 'DESIGN PORTFOLIO',
    tags: ['HTML', 'CSS'],
    image: '/src/assets/images/project_design_portfolio_1791778824064.jpg',
    summary:
      'A single-page responsive design portfolio featuring an asymmetric CSS Grid bento layout for multi-disciplinary disciplines and an interactive work carousel.',
    highlights: [
      'CSS Grid template areas adapting seamlessly across Mobile, Tablet, and Desktop breakpoints',
      'Accessible keyboard-navigable image slider with smooth hardware-accelerated transitions',
      'Fluid typography scale using CSS clamp() and custom properties',
    ],
    liveUrl: 'https://www.frontendmentor.io/challenges/singlepage-design-portfolio-2MMhyhfKVo',
    repoUrl: 'https://github.com/adamkeyes/single-page-design-portfolio',
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
    id: 'e-learning-landing-page',
    title: 'E-LEARNING LANDING PAGE',
    tags: ['HTML', 'CSS'],
    image: '/src/assets/images/project_elearning_landing_1791778833605.jpg',
    summary:
      'Responsive marketing landing page for Skilled E-Learning with custom gradient cards, overlapping SVG badges, and high-conversion call-to-action states.',
    highlights: [
      'Responsive art-directed hero imagery with overlapping statistic callouts',
      'Equal-height CSS Grid course cards with floating top-offset category icons',
      'WCAG AA compliant contrast across gradient interactive buttons',
    ],
    liveUrl: 'https://www.frontendmentor.io/challenges/skilled-elearning-landing-page-S1ObDrZ8q',
    repoUrl: 'https://github.com/adamkeyes/skilled-elearning-landing-page',
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
    id: 'todo-web-app',
    title: 'TODO WEB APP',
    tags: ['HTML', 'CSS', 'JAVASCRIPT'],
    image: '/src/assets/images/project_todo_webapp_1791778842944.jpg',
    summary:
      'Feature-complete task management web application with drag-and-drop list reordering, real-time status filtering (All, Active, Completed), and theme switching.',
    highlights: [
      'Drag-and-drop reordering with keyboard accessibility and persistent state',
      'Instant filtering between All, Active, and Completed tasks with live counter',
      'Dark and light theme engine backed by CSS custom properties',
    ],
    liveUrl: 'https://www.frontendmentor.io/challenges/todo-app-Su1_KokOW',
    repoUrl: 'https://github.com/adamkeyes/todo-web-app',
    codeSnippet: `function filterTasks(tasks, status) {
  if (status === 'active') return tasks.filter(t => !t.completed);
  if (status === 'completed') return tasks.filter(t => t.completed);
  return tasks;
}`,
  },
  {
    id: 'entertainment-web-app',
    title: 'ENTERTAINMENT WEB APP',
    tags: ['HTML', 'CSS', 'JAVASCRIPT'],
    image: '/src/assets/images/project_entertainment_webapp_1791778852150.jpg',
    summary:
      'Multi-view streaming catalog application featuring horizontal trending rails, instant search across movies and TV series, and interactive bookmarking.',
    highlights: [
      'Real-time search filtering across Movies, TV Series, and Bookmarked views',
      'Horizontal snap-scrolling Trending rail with hover play overlays',
      'Optimistic bookmark toggle state with accessible ARIA live announcements',
    ],
    liveUrl: 'https://www.frontendmentor.io/challenges/entertainment-web-app-J-UhgAW1X',
    repoUrl: 'https://github.com/adamkeyes/entertainment-web-app',
    codeSnippet: `const filteredCatalog = catalog.filter(item => {
  const matchesCategory = activeTab === 'all' || item.category === activeTab;
  const matchesQuery = item.title.toLowerCase().includes(query.toLowerCase());
  return matchesCategory && matchesQuery;
});`,
  },
  {
    id: 'memory-game',
    title: 'MEMORY GAME',
    tags: ['HTML', 'CSS', 'JAVASCRIPT'],
    image: '/src/assets/images/project_memory_game_1791778861130.jpg',
    summary:
      'Interactive memory matching game supporting both 4x4 and 6x6 grid sizes, custom icon or number tokens, solo timer mode, and up to 4-player turn tracking.',
    highlights: [
      'Configurable 4x4 or 6x6 board generator using Fisher-Yates shuffle algorithm',
      'Multiplayer turn state machine tracking moves, pairs matched, and tie-breakers',
      'Zero-latency token flip animations and full keyboard grid navigation',
    ],
    liveUrl: 'https://www.frontendmentor.io/challenges/memory-game-vse4WFPvM',
    repoUrl: 'https://github.com/adamkeyes/memory-game',
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
    id: 'art-gallery-showcase',
    title: 'ART GALLERY SHOWCASE',
    tags: ['HTML', 'CSS', 'JAVASCRIPT'],
    image: '/src/assets/images/project_art_gallery_1791778870286.jpg',
    summary:
      'Editorial masonry art gallery experience ("galleria.") with an interactive slideshow player, progress indicator bar, and high-resolution painting lightbox.',
    highlights: [
      'Masonry grid layout celebrating historical fine art proportions without cropping',
      'Interactive slideshow controller with keyboard arrow navigation and progress bar',
      'High-resolution modal lightbox viewer for inspecting brushwork details',
    ],
    liveUrl: 'https://www.frontendmentor.io/challenges/galleria-slideshow-site-tEA4pwsa6',
    repoUrl: 'https://github.com/adamkeyes/galleria-slideshow-site',
    codeSnippet: `.masonry-gallery {
  columns: 4 280px;
  column-gap: 2.5rem;
}
.masonry-item {
  break-inside: avoid;
  margin-bottom: 2.5rem;
}`,
  },
];
