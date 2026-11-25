# React Basics — a React 19 + Vite learning lab

A small app that grows one topic at a time. Each lesson is a self-contained
folder with a live demo and a short explanation, discovered automatically. The
`/practice` app puts the lessons together as a typed CRUD feature.

## Scripts

| Command                | What it does                             |
| ---------------------- | ---------------------------------------- |
| `npm run dev`          | Start the Vite dev server with HMR       |
| `npm run build`        | Production build into `dist/`            |
| `npm test`             | Run the Vitest + Testing Library suite   |
| `npm run test:watch`   | Rerun tests on save                      |
| `npm run preview`      | Serve the production build locally       |
| `npm run lint`         | Run ESLint over the whole project        |
| `npm run typecheck`    | Type-check the `.ts`/`.tsx` files        |
| `npm run format`       | Rewrite files with Prettier              |
| `npm run format:check` | Verify formatting without changing files |

## Project structure

```
src/
  main.jsx, App.jsx       BrowserRouter entry and the route table
  index.css               Tailwind import, @theme tokens, dark-mode overrides
  auth/                   Pretend in-memory auth and the route guard
  layout/                 Layout, LessonRail, skip link, focus after navigation
  pages/                  Home, Hooks, Lesson, SignIn, Member, 404
  labs/registry.js        Discovers every **/lab.js with import.meta.glob
  labs/react/<slug>/      One lesson: lab.js + Demo.jsx + Notes.jsx (+ helpers)
  practice/               Recipe box: routed TypeScript CRUD, fake API, tests
  components/             Shared UI: Card, Section, Feature, Hero, Nav, ErrorBoundary
  data/                   basics.js (home concept map), hooks.js (hooks page)
  test/                   Vitest setup and TypeScript matcher types
docs/
  keyboard-audit.md       Phase 5 accessibility audit and manual checks
```

There are 26 lessons today; a few keep helper files beside the demo, and the
`testing` lesson adds `Demo.test.jsx`. `src/labs/registry.js` holds the list.

## Adding a lesson

Create one folder and three files — no registry edits:

```
src/labs/react/<slug>/
  lab.js       metadata + lazy Demo/Notes
  Demo.jsx     export default function Demo() { ... }
  Notes.jsx    export default function Notes() { ... }
```

`lab.js` needs `id` (equal to the folder name), `track`, `order`, `level`,
`title`, `summary`, `Demo` and `Notes`; copy the lazy `import()` pattern from any
lesson. `LessonPage` supplies the Suspense fallback and error boundary, and the
metadata stays eager because the sidebar needs it on first paint.

The folder must stay deletable on its own; notes answer **what / how / gotcha**;
demos stay under about eighty lines; never paste code that already lives in
`Demo.jsx`.

## Testing

Vitest + React Testing Library run in jsdom. Tests sit next to the code
(`*.test.jsx`, `*.test.tsx`), and `src/test/setup.js` loads the jest-dom matchers
and unmounts each tree. Eleven cases: six for the `testing` lesson, five for the
recipe box. `src/test/matchers.d.ts` types the matchers for the TypeScript tests.

## Docs

- [`AGENTS.md`](./AGENTS.md) — briefing for coding agents.
- [`ROADMAP.md`](./ROADMAP.md) — status, next task, conventions, backlog. Read
  it first in a new session; it is kept short on purpose.
- [`docs/keyboard-audit.md`](./docs/keyboard-audit.md) — accessibility review.

## Config notes

- React 19, Vite 8, React Router 7, Tailwind 4 (via `@tailwindcss/vite`, so
  `src/index.css` only needs `@import "tailwindcss"`).
- TanStack Query, Zustand, React Hook Form + Zod and TypeScript tooling serve the
  later lessons and the practice app. The app shell is JavaScript; only the
  `typescript` lesson and `src/practice/` are `.ts`/`.tsx`.
- ESLint: `js.configs.recommended`, `typescript-eslint`, `react-hooks`,
  `react-refresh`, then `eslint-config-prettier`. Prettier runs from the CLI and
  VS Code; Vitest reads its config from the `test` key in `vite.config.js`.
- `opencode.jsonc` is agent tooling config only: it caps tool output, keeps a
  smaller compaction tail and ignores `dist/` in the file watcher.
