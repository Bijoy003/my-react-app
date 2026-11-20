# Roadmap

A living document. **Update "Current state" and "Session log" at the end of every
session** so the next one can start without re-reading the code.

Status: ✅ done · 🚧 in progress · ⬜ not started · 💡 idea

## Current state

_Last updated: 2026-11-20_

- **Phase 1 is complete.** Router, layout shell, auto-discovering registry, and
  one reference lesson are in place and verified.
- **1 of 6** React concept cards has a real lesson page
  (`/labs/react/conditional-rendering`). The other five are placeholders that
  read "Notes coming soon".
- Tracks are declared in `src/labs/registry.js` (`TRACK_META`); only `react` has
  lessons, so only `react` shows in the sidebar.
- Tooling is green: `lint`, `format:check`, and `build` all pass.

**Next task:** Phase 2, first item — create `src/labs/react/jsx/`.

## Phase 1 — Shell ✅

- ✅ Replace the Vite template with a real page.
- ✅ Prettier config, ignore file, `format` / `format:check` scripts.
- ✅ Add `react-router-dom` and a route table (`/`, `/labs/:track/:slug`, `*`).
- ✅ `Layout` with header, grouped sidebar, mobile chips, scroll restoration.
- ✅ `labs/registry.js` using `import.meta.glob("./**/lab.js", { eager: true })`.
- ✅ `LessonPage` with breadcrumb, demo panel, notes panel, prev/next.
- ✅ Reference lesson: `conditional-rendering` (interactive status playground).
- ✅ Home rebuilt as a lab index (concept map + "how a lesson is stored").
- ✅ README, this roadmap, `AGENTS.md`.

## Phase 2 — Migrate the remaining concepts 🚧

Extraction work, not new writing: every one of these already exists as a working
component. Goal is six lessons covering the original brief, with `components/`
keeping only genuinely shared UI.

| order | lab id           | title                 | demo built from               | notes should cover                                       |
| ----- | ---------------- | --------------------- | ----------------------------- | -------------------------------------------------------- |
| 1     | `jsx`            | JSX                   | `Hero.jsx`                    | expressions in braces, attributes vs props, fragments    |
| 2     | `components`     | Functional components | `Nav.jsx`                     | a function returning markup, capitalisation, purity      |
| 3     | `props`          | Props                 | `Feature.jsx` / `Card.jsx`    | destructuring, defaults, spread, read-only, one-way flow |
| 4     | `composition`    | Composition           | `Card` children + `Hero` slot | `children`, named slots, why not inheritance             |
| 5     | `conditional`    | Conditional rendering | already written               | (see existing lesson)                                    |
| 6     | `list-rendering` | List rendering        | home concept grid             | `map`, stable `key`, filtering before render             |

> Note: `conditional-rendering` currently has `order: 1`. Renumber it to `5` in
> `src/labs/react/conditional-rendering/lab.js` when the first Phase 2 lesson
> lands, so the sequence reads JSX → components → props → composition →
> conditional → lists.

- ⬜ `jsx` lesson.
- ⬜ `components` lesson.
- ⬜ `props` lesson.
- ⬜ `composition` lesson.
- ⬜ `list-rendering` lesson.
- ⬜ Renumber `conditional-rendering` to `order: 5`.
- ⬜ Point the remaining five cards in `src/data/basics.js` at their `href`.
- ⬜ After each lesson: move anything genuinely shared into `components/` and
  delete what the lesson absorbed from `pages/HomePage.jsx`.

## Phase 3 — Conveniences ⬜

- ⬜ **Show the real source.** A `SourceView` component that reads the lesson's
  own files with `import.meta.glob("../labs/**/Demo.jsx", { query: "?raw",
import: "default" })`, rendered under the notes. Snippets can't go stale.
- ⬜ **Progress tracking.** A "Mark as done" toggle stored in `localStorage`,
  shown as a check in the sidebar and a counter in the header.
- ⬜ **Search / filter** the sidebar by title and level.
- ⬜ **Lazy-load lessons** once there are ~10+: lazy globs + `React.lazy` +
  `Suspense`, so the initial bundle stops growing.
- ⬜ **Error boundary** around the demo panel, so one broken demo can't blank the
  page (and becomes its own lesson later).
- ⬜ "Try it yourself" prompt per lesson: a one-line challenge in the notes.

## Phase 4 — Next.js track ⬜

Decide when the first Next-specific topic comes up (Server Components, Server
Actions, route handlers, `loading.js`, data fetching). Those cannot run under
Vite, so the track needs its own app.

- ⬜ Choose a location: sibling app (`../react-basics-next`) or `next-app/` in
  this repo.
- ⬜ Reuse the `labs/<track>/<slug>/{lab.js,Demo,Notes}` convention and the same
  sidebar behaviour.
- ⬜ Decide whether lessons are shared between apps or duplicated per runtime.

## Backlog 💡

- A lesson on React Router itself (`useParams`, `NavLink`, `Outlet`) using this
  app as the example.
- `useState`, `useEffect`, `useRef`, keyboard/event handling lessons.
- A `docs/` page explaining the Tailwind `@theme` token system.
- Dark/light override toggle in addition to `prefers-color-scheme`.
- Deployment note: static hosts need an SPA rewrite to `index.html` for
  `BrowserRouter` deep links (or switch to `HashRouter`).

## Conventions

1. A lesson folder must be deletable without touching anything else.
2. Notes answer **what it is / how it works / the gotcha** — three short parts.
3. Demos stay under ~80 lines; if longer, it is two topics.
4. Never paste code into notes that already exists in `Demo.jsx`.
5. Data and helpers live outside component files (`react-refresh` rule).
6. `lab.js` is the only file the registry requires; `Demo.jsx` and `Notes.jsx`
   are the convention, not a hard requirement.

## Decisions log

| Date       | Decision                                                   | Why                                                                   |
| ---------- | ---------------------------------------------------------- | --------------------------------------------------------------------- |
| 2026-11-19 | React Router over hand-rolled routing                      | Shareable per-topic URLs; the router is itself worth learning         |
| 2026-11-19 | Notes as `Notes.jsx`, not Markdown                         | No extra dependencies; styling stays consistent with the demos        |
| 2026-11-19 | Removed the fake plans/pricing section                     | It stopped fitting once the project became a learning lab             |
| 2026-11-20 | Lab metadata + demo + notes in one folder, auto-discovered | Adding a topic touches nothing shared; sidebar and routes can't drift |
| 2026-11-20 | Eager `import.meta.glob`                                   | Simplest registry; revisit in Phase 3 when the bundle grows           |
| 2026-11-20 | Next.js track deferred                                     | Server-only topics need a different runtime; decide when it matters   |

## Session log

| Date       | What changed                                                                                     |
| ---------- | ------------------------------------------------------------------------------------------------ |
| 2026-11-19 | Replaced the Vite template with a React Basics landing page; added Prettier config + scripts.    |
| 2026-11-20 | Phase 1: router, `Layout`, registry, `LessonPage`, conditional-rendering lesson, README rewrite. |
| 2026-11-20 | Added this roadmap and `AGENTS.md`.                                                              |
