# React Basics — a React 19 + Vite learning lab

A small app that grows one topic at a time. Each lesson is a folder containing a
live demo and a short explanation, and the app discovers lessons automatically.

## Scripts

| Command                | What it does                             |
| ---------------------- | ---------------------------------------- |
| `npm run dev`          | Start the Vite dev server with HMR       |
| `npm run build`        | Production build into `dist/`            |
| `npm run preview`      | Serve the production build locally       |
| `npm run lint`         | Run ESLint over the whole project        |
| `npm run format`       | Rewrite files with Prettier              |
| `npm run format:check` | Verify formatting without changing files |

## Project structure

```
index.html                 Vite entry document, mounts #root
vite.config.js             React + Tailwind plugins
eslint.config.js           Flat ESLint config (JS, React Hooks, React Refresh)
.prettierrc                Prettier rules (semi, double quotes, trailing commas)
src/
  main.jsx                 createRoot(...).render(<BrowserRouter><App />)
  App.jsx                  Route table only
  index.css                Tailwind import, design tokens, dark mode variables
  layout/
    Layout.jsx             Header, sidebar, scroll restoration, <Outlet />
  pages/
    HomePage.jsx           Hero, concept map, "how a lesson is stored"
    LessonPage.jsx         One lesson: demo, notes, prev/next
    NotFoundPage.jsx       Unknown track or slug
  labs/
    registry.js            Discovers every **/lab.js with import.meta.glob
    react/
      jsx/
        lab.js             Metadata: id, track, order, level, title, Demo, Notes
        Demo.jsx           The live example
        Notes.jsx          What / how / gotcha
      components/
        lab.js             Metadata: id, track, order, level, title, Demo, Notes
        Demo.jsx           The live example
        Notes.jsx          What / how / gotcha
      props/
        lab.js             Metadata: id, track, order, level, title, Demo, Notes
        Demo.jsx           The live example
        Notes.jsx          What / how / gotcha
      composition/
        lab.js             Metadata: id, track, order, level, title, Demo, Notes
        Demo.jsx           The live example
        Notes.jsx          What / how / gotcha
      conditional-rendering/
        lab.js             Metadata: id, track, order, level, title, Demo, Notes
        Demo.jsx           The live example
        Notes.jsx          What / how / gotcha
      list-rendering/
        lab.js             Metadata: id, track, order, level, title, Demo, Notes
        Demo.jsx           The live example
        Notes.jsx          What / how / gotcha
  components/              Shared UI: Card, Section, Feature, Hero, Nav, ...
  data/basics.js           The concept map on the home page
```

## Adding a lesson

Create one folder and three files — no registry edits:

```
src/labs/react/<slug>/
  lab.js       export default { id: "<slug>", track: "react", order: 2,
                 level: "core", title: "...", summary: "...", Demo, Notes }
  Demo.jsx     export default function Demo() { ... }
  Notes.jsx    export default function Notes() { ... }
```

The lesson then appears in the sidebar and at `/labs/react/<slug>`.

Guidelines that keep the folder useful:

1. A lesson folder must be deletable without touching anything else.
2. Notes answer **what it is / how it works / the gotcha** — three short parts,
   not an essay.
3. Demos stay under about eighty lines; if longer, it is two topics.
4. Never paste code into the notes that already exists in `Demo.jsx`.

## Roadmap

Phases, current status, conventions, and a dated session log live in
[`ROADMAP.md`](./ROADMAP.md). That file is the single source of truth for "what
is next" — read it first in any new session.

Agents and assistants should also read [`AGENTS.md`](./AGENTS.md) before making
changes.

## Config notes

- React 19, Vite 8, React Router 7, Tailwind 4 (via `@tailwindcss/vite`, so
  `src/index.css` only needs `@import "tailwindcss"`).
- ESLint uses `js.configs.recommended`, `react-hooks`, `react-refresh`, and ends
  with `eslint-config-prettier` so the two tools never argue.
- Prettier runs from the CLI and from VS Code (`.vscode/settings.json`).
