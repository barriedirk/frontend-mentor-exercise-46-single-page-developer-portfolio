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

export const HERO_PORTRAIT_IMAGE = "/images/barrie_freyre_portrait.jpg";

export const SKILLS_DATA: SkillItem[] = [
  { name: "HTML", experience: "10+ Years Experience" },
  { name: "CSS", experience: "10+ Years Experience" },
  { name: "Javascript", experience: "10+ Years Experience" },
  { name: "Accessibility", experience: "8+ Years Experience" },
  { name: "React", experience: "5+ Years Experience" },
  { name: "Angular", experience: "5+ Years Experience" },
  { name: "Sass", experience: "5+ Years Experience" },
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "link-sharing-app",
    title: "LINK-SHARING APP",
    tags: ["REACT", "EXPRESS", "POSTGRESQL", "NX"],
    image: "/images/project_link_sharing_app.jpg",
    summary:
      "Full-stack link-sharing platform built in an Nx monorepo featuring real-time live preview mockups, drag-and-drop link reordering, JWT authentication, and PostgreSQL persistence.",
    highlights: [
      "Nx monorepo orchestrating React 19, Express REST API, and shared TypeScript validation schemas",
      "Interactive mobile phone preview synced in real-time with form state and dynamic link validation",
      "Comprehensive testing suite spanning Vitest unit tests and Cypress E2E flows",
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
    title: "KANBAN TASK MANAGEMENT",
    tags: ["NEXT.JS", "STRAPI", "ZUSTAND", "REACT HOOK FORM"],
    image: "/images/project_kanban_task_management_web_app.jpg",
    summary:
      "Fully responsive multi-board Kanban application with Strapi headless CMS backend, Zustand state management, subtask completion tracking, and dark/light themes.",
    highlights: [
      "Dynamic multi-column board workflow with optimistic state updates powered by Zustand",
      "Robust form validation for boards, columns, and subtasks using React Hook Form and Zod",
      "Headless CMS integration via Strapi REST API with persisted custom board hierarchies",
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
    title: "AUDIOPHILE E-COMMERCE",
    tags: ["NEXT.JS", "REACT", "TAILWIND CSS", "STORYBOOK"],
    image: "/images/project_audiophile_ecommerce_website.jpg",
    summary:
      "High-end multi-page audio gear e-commerce store built with Next.js, Tailwind CSS, persistent shopping cart drawer, and isolated UI component development in Storybook.",
    highlights: [
      "Modular UI design system documented and tested in Storybook with full accessibility support",
      "Persistent shopping cart state handling dynamic quantities, VAT calculations, and checkout modal",
      "Art-directed responsive picture elements ensuring optimal image fidelity across all devices",
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
    title: "FOREIGN EXCHANGE CONVERTER",
    tags: ["NEXT.JS", "REACT", "ZUSTAND", "TAILWIND CSS"],
    image: "/images/project_foreign_exchange_currency_converter.jpg",
    summary:
      "Modern multi-currency exchange rate application with internationalization (i18n), real-time conversion calculator, historical rate charts, and Zustand state caching.",
    highlights: [
      "Multi-language routing and localization (/en, /es) built directly on Next.js",
      "Axios API client with response caching, debounced rate conversions, and resilient error recovery",
      "Interactive charts comparing currency fluctuations over 30, 90, and 365-day timeframes",
    ],
    liveUrl: "https://foreign-exchange-currency-converter-eta.vercel.app/en",
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
    title: "GALLERIA SLIDESHOW SITE",
    tags: ["ASTRO", "TAILWIND CSS", "TYPESCRIPT"],
    image: "/images/project_art_gallery.jpg",
    summary:
      "High-performance editorial masonry art gallery built with Astro and Tailwind CSS, featuring an automated fullscreen slideshow player and interactive painting lightbox.",
    highlights: [
      "Astro Island architecture delivering zero-JS baseline page load and blisteringly fast paint times",
      "CSS columns masonry grid presenting historical fine art in uncropped original aspect ratios",
      "Full keyboard slideshow controller (Space, Arrow keys) with persistent playback progress bar",
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
    title: "POMODORO APP",
    tags: ["ASTRO", "TAILWIND CSS", "TYPESCRIPT"],
    image: "/images/project_pomodoro.jpg",
    summary:
      "Customizable Pomodoro productivity timer built in Astro and Tailwind CSS with configurable intervals (pomodoro, short break, long break), circular SVG timer, and theme customization.",
    highlights: [
      "Precise web worker countdown loop preventing browser tab throttling and time drifts",
      "Dynamic SVG stroke-dashoffset circle animation calculating remaining percentage in real time",
      "User preferences modal allowing font selection (Sans, Serif, Mono) and custom accent colors",
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
    title: "SPACE TOURISM WEBSITE",
    tags: ["ASTRO", "TAILWIND CSS"],
    image: "/images/project_space_tourism_multi_page_website.jpg",
    summary:
      "Immersive multi-page astronomy and space tourism web experience with interactive tabs for destinations, crew members, and space flight launch technologies.",
    highlights: [
      "Accessible tablist and tabpanel implementation with complete keyboard navigation (WAI-ARIA)",
      "Responsive design switching between horizontal tabs, dots pagination, and numbered button selectors",
      "Astro content-driven architecture rendering optimized modern image formats (AVIF/WebP)",
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
    title: "TIC TAC TOE GAME",
    tags: ["JAVASCRIPT", "CSS", "LOCALSTORAGE"],
    image: "/images/project_tic_tac_toe_game.jpg",
    summary:
      "Classic Tic-Tac-Toe game created with pure vanilla JavaScript and CSS, featuring a Redux-inspired unidirectional state manager, invincible Minimax AI CPU mode, and local score persistence.",
    highlights: [
      "Minimax decision tree AI algorithm ensuring challenging, unbeatable CPU difficulty",
      "Unidirectional state flow (action -> reducer -> render) implemented entirely in vanilla ES6+",
      "Turn-by-turn keyboard navigation and screen reader live score updates",
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
    title: "ENTERTAINMENT WEB APP",
    tags: ["REACT", "REDUX", "TAILWIND CSS", "REACT ROUTER"],
    image: "/images/project_entertainment_web_app.jpg",
    summary:
      "Multi-page streaming catalog entertainment app built with React and Redux, featuring real-time debounced title search across movies & TV series, category filtering, and bookmarked media lists.",
    highlights: [
      "Redux Toolkit slice managing bookmark toggling with local storage synchronization",
      "Accessible keyboard-navigable card rails and responsive CSS grid for seamless browsing",
      "Debounced dynamic search filter updating results smoothly without layout shifts",
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
    title: "MEMORY GAME",
    tags: ["ANGULAR", "NGRX", "RXJS", "SCSS"],
    image: "/images/project_memory_game.jpg",
    summary:
      "Feature-packed memory matching game built in Angular with NgRx state management, RxJS streams, configurable grid sizes (4x4, 6x6), icon or number tokens, and 1 to 4 multiplayer turn tracking.",
    highlights: [
      "NgRx reactive state machine orchestrating multiplayer turn rotations, pairs discovered, and tiebreakers",
      "RxJS timer streams powering accurate solo countdowns and move counters",
      "Hardware-accelerated 3D card flip animations built with modular SCSS transitions",
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
];
