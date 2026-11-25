# AGENTS.md

Project briefing for coding agents. Read this and `ROADMAP.md` before changing
anything.

## What this is

A React 19 + Vite learning lab. Each topic is a folder with a live demo and a
written explanation; the app discovers lessons automatically. The owner is
learning React, so clarity beats cleverness.

## Read first

1. `ROADMAP.md` — current phase, next task, conventions, decisions, session log.
2. `README.md` — structure and the "adding a lesson" checklist.

Update `ROADMAP.md` (Current state + Session log) when work is finished.

## Commands

```
npm run dev           # Vite dev server, HMR
npm run build         # production build
npm test              # Vitest + React Testing Library, once
npm run test:watch    # Vitest in watch mode
npm run lint          # ESLint
npm run typecheck     # tsc --noEmit (TypeScript lesson files)
npm run format        # Prettier write
npm run format:check  # Prettier verify
```

Before reporting work as done, run `test`, `lint`, `typecheck`, `format:check`,
and `build`, and say what the results were.

## Architecture

```
src/main.jsx              BrowserRouter + StrictMode
src/App.jsx               route table only
src/layout/Layout.jsx     header, sidebar, lesson rail, route boundary
src/pages/                HomePage, HooksPage, LessonPage, NotFoundPage, ...
src/labs/registry.js      import.meta.glob("./**/lab.js", { eager: true })
src/labs/<track>/<slug>/  lab.js + Demo.jsx + Notes.jsx
src/practice/             Recipe box: routed, typed CRUD deliverable
src/components/           shared UI only
src/data/basics.js        the home-page concept map
```

- Never edit a registry list by hand. A new `lab.js` is discovered automatically.
- `lab.js` default-exports `{ id, track, order, level, title, summary, Demo, Notes }`.
  `id` must equal the folder name; links are `/labs/<track>/<id>`.
- `Demo` and `Notes` are `React.lazy` imports; `LessonPage` owns the Suspense
  fallback and the error boundary. Keep the metadata import eager.
- Keep lesson folders self-contained. Shared UI belongs in `src/components/`.

## Style

- Prettier owns formatting (double quotes, semicolons, 80 cols, trailing commas).
  Do not hand-format against it.
- ESLint: `js.configs.recommended`, `react-hooks`, `react-refresh`, then
  `eslint-config-prettier`.
- `react-refresh/only-export-components` means component files export only
  components — put data, helpers, and lookup objects elsewhere.
- UI copy is British English ("Enrol", "practise", "colours").
- Comments explain _why_, not _what_.
- Tailwind 4 with tokens from `@theme` in `src/index.css`: prefer `bg-surface`,
  `text-ink`, `border-line`, `text-accent` over raw colours. Dark mode comes from
  the variable overrides, so avoid `dark:` classes.

## Do not

- Do not delete files you did not create without checking `ROADMAP.md` and git
  history first.
- Do not add dependencies without recording the reason in the roadmap's
  decisions log.
- Do not invent a `plans`/marketing section — the project is a learning lab.
- Do not put API keys or secrets in this repo; there is no backend and no env
  file yet.
