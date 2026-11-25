# React Basics — a React 19 + Vite learning lab

A small app that grows one topic at a time. Each lesson is a folder containing a
live demo and a short explanation, and the app discovers lessons automatically.
The Phase 5 practice app at `/practice` puts the lessons together as a small
typed CRUD feature.

## Scripts

| Command                | What it does                             |
| ---------------------- | ---------------------------------------- |
| `npm run dev`          | Start the Vite dev server with HMR       |
| `npm run build`        | Production build into `dist/`            |
| `npm test`             | Run the Vitest + Testing Library suite   |
| `npm run test:watch`   | Rerun tests on save                      |
| `npm run preview`      | Serve the production build locally       |
| `npm run lint`         | Run ESLint over the whole project        |
| `npm run typecheck`    | Type-check the TypeScript lesson files   |
| `npm run format`       | Rewrite files with Prettier              |
| `npm run format:check` | Verify formatting without changing files |

## Project structure

```
index.html                 Vite entry document, mounts #root
vite.config.js             React + Tailwind plugins
tsconfig.json              Type-checking config for the .ts/.tsx lesson files
eslint.config.js           Flat ESLint config (JS/TS, React Hooks, React Refresh)
.prettierrc                Prettier rules (semi, double quotes, trailing commas)
src/
  main.jsx                 createRoot(...).render(<BrowserRouter><App />)
  App.jsx                  Route table only
  index.css                Tailwind import, design tokens, dark mode variables
  auth/
    auth-context.js        AuthContext + useAuth (pretend, in-memory auth)
    AuthProvider.jsx       Sign-in state for the whole app
    RequireAuth.jsx        Guard: redirect to /sign-in, remember the target
  layout/
    Layout.jsx             Header, sidebar, right rail, scroll restoration, boundary
    LessonRail.jsx         On this page, position, next lesson (xl screens)
  pages/
    HomePage.jsx           Hero, concept map, "how a lesson is stored", practice
    HooksPage.jsx          Every hook used in the lab, with what / when / where
    LessonPage.jsx         One lesson: lazy demo, notes, prev/next, error boundary
    SignInPage.jsx         Pretend sign-in, redirects back after success
    MemberPage.jsx         The guarded /member route
    NotFoundPage.jsx       Unknown track or slug
  practice/                Recipe box: routed CRUD feature (TypeScript)
    PracticeRoot.tsx       Query client + layout for the /practice routes
    PracticeLayout.tsx     Header, nav, Suspense around the child routes
    RecipeListPage.tsx     Query, filter, remove
    RecipeDetailPage.tsx   One recipe, edit and delete
    RecipeFormPage.tsx     Create/edit with React Hook Form + Zod
    api.ts                 In-memory fake REST service
    useRecipes.ts          Query + mutation hooks that share one cache key
    schema.ts              Zod rules, with RecipeInput inferred from them
    types.ts               Recipe and RecipeLevel
    Field.tsx              Label + error wrapper
    practice.test.tsx      Five cases against the mocked API
  labs/
    registry.js            Discovers every **/lab.js with import.meta.glob
    react/
      jsx/
        lab.js             Metadata: id, track, order, level, title, summary,
                           Demo and Notes (both lazily imported)
        Demo.jsx           The live example
        Notes.jsx          What / how / gotcha
      ...                  One folder per lesson — 26 today. A few keep a
                           helper file beside the demo (api.js, basket.js,
                           compute.js, schema.js, store.js, useMembers.js,
                           useTasks.js, useTaskBoard.js, useLocalStorage.js,
                           validate.js), and the `testing` lesson adds
                           Demo.test.jsx. See ROADMAP.md for the full list.
  test/setup.js            Vitest setup: jest-dom matchers, cleanup after each test
  test/matchers.d.ts       Adds the jest-dom matchers to the TypeScript tests
  components/              Shared UI: Card, Section, Feature, Hero, Nav,
                           ErrorBoundary, ...
  data/basics.js           The concept map on the home page
  data/hooks.js            The hook reference page
docs/
  keyboard-audit.md        Phase 5 accessibility audit, fixes and manual checks
```

## Adding a lesson

Create one folder and three files — no registry edits:

```
src/labs/react/<slug>/
  lab.js       import { lazy } from "react";
               const Demo = lazy(() => import("./Demo"));
               const Notes = lazy(() => import("./Notes"));
               export default { id: "<slug>", track: "react", order: 2,
                 level: "core", title: "...", summary: "...", Demo, Notes }
  Demo.jsx     export default function Demo() { ... }
  Notes.jsx    export default function Notes() { ... }
```

The lesson then appears in the sidebar and at `/labs/react/<slug>`. The two
panels are lazy so each lesson has its own chunk; `LessonPage` supplies the
Suspense fallback and the error boundary. The metadata in `lab.js` stays eager
because the sidebar needs the title and order on first paint.

Guidelines that keep the folder useful:

1. A lesson folder must be deletable without touching anything else.
2. Notes answer **what it is / how it works / the gotcha** — three short parts,
   not an essay.
3. Demos stay under about eighty lines; if longer, it is two topics.
4. Never paste code into the notes that already exists in `Demo.jsx`.

## Testing

Vitest runs the suite with React Testing Library in jsdom. Tests sit next to
the code they cover (`*.test.jsx`, `*.test.tsx`), and `src/test/setup.js` loads
the jest-dom matchers and unmounts each rendered tree. The suite is eleven cases:
six for the `testing` lesson (loading, success, error, retry, a typed filter and
the mocked API call) and five for the recipe box (list and filter, detail,
invalid form, create and delete). `npm test` runs it once; `npm run test:watch`
reruns on save. `src/test/matchers.d.ts` gives the TypeScript tests the
jest-dom matcher types.

## Roadmap

Phases, current status, conventions, and a dated session log live in
[`ROADMAP.md`](./ROADMAP.md). That file is the single source of truth for "what
is next" — read it first in any new session.

Agents and assistants should also read [`AGENTS.md`](./AGENTS.md) before making
changes.

## Config notes

- React 19, Vite 8, React Router 7, Tailwind 4 (via `@tailwindcss/vite`, so
  `src/index.css` only needs `@import "tailwindcss"`).
- Phase 4 added TanStack Query, Zustand, React Hook Form + Zod, and TypeScript
  tooling. The app itself is still JavaScript; only the `typescript` lesson and
  the `practice/` feature use `.ts`/`.tsx`, and `npm run typecheck` checks those
  files.
- Phase 5 added code splitting: every lesson's demo and notes, plus the practice
  routes, are `React.lazy` imports with Suspense fallbacks. The production build
  keeps the entry chunk well under Vite's 500 kB warning.
- ESLint uses `js.configs.recommended`, `typescript-eslint`, `react-hooks`,
  `react-refresh`, and ends with `eslint-config-prettier` so the two tools never
  argue.
- Prettier runs from the CLI and from VS Code (`.vscode/settings.json`).
- Vitest reads its config from the `test` key in `vite.config.js`; the
  environment is jsdom and the setup file is `src/test/setup.js`.
