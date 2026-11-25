# Roadmap

Single source of truth for "what is next". It is read in full at the start of
every session, so keep it short. There is no separate history file: the
pre-compaction roadmap — full phase notes, every decision and the old session
log — is in git at `0572982` (`git show 0572982:ROADMAP.md`). Use it only when
you need a date or the reasoning behind an old choice.

Status: ✅ done · 🚧 in progress · ⬜ not started · 💡 optional idea

## Current state

_Last updated: 2026-11-25_

| Section  | Hours | Status |
| -------- | ----- | ------ |
| React 19 | 33.5  | ✅     |
| Total    | 33.5  | —      |

- **The React track is complete: Phases 1–5 are done, with 26 lessons.** Their
  order and titles live in `src/labs/registry.js`; all 26 home concept cards
  link to a lesson.
- **Phase 5 deliverables:** the `testing` suite, the keyboard audit
  (`docs/keyboard-audit.md`), the before/after profile in `performance`, the
  fixed identity bug in `debugging`, the recipe box at `/practice` with five
  tests, the extracted `useLocalStorage`, and the loading fallback plus error
  boundary in `suspense-boundaries` (now wrapping every demo and the route
  outlet).
- **App shell:** routes in `src/App.jsx`; grouped sidebar with mobile chips;
  sticky lesson rail beside the demo at `xl` (hidden below); notes as
  full-width auto-fit columns; 1600px shell. `/hooks` is a reference page (30
  hooks), not a lesson. `/practice` is a routed TypeScript CRUD feature, not a
  lesson.
- **Deliberately fake:** auth is in memory (`src/auth/`, gone on refresh), and
  each data lesson ships its own in-memory API with latency and a failure
  switch. The lab has no server, database or secrets.
- **TypeScript is lesson-and-practice only:** the shell stays JavaScript;
  `tsconfig.json` covers the `typescript` lesson and `src/practice/`;
  `npm run typecheck` runs `tsc --noEmit`.
- **Code splitting:** every `lab.js` lazily imports `Demo` and `Notes`, and the
  practice routes are lazy. Metadata stays eager so the sidebar paints at once;
  `LessonPage` and `PracticeLayout` own the Suspense fallbacks.
- **Tooling green:** `test` 11/11, `lint`, `typecheck`, `format:check` and
  `build` (312 modules, entry ~314 kB).

**Next task:** an owner review of Phase 5 against the original plan, then a
choice from the lab platform backlog below — or parking the curriculum. Record
a new module decision here before starting it.

## Where things live

| Path                     | Contents                                                                      |
| ------------------------ | ----------------------------------------------------------------------------- |
| `src/labs/react/<slug>/` | One self-contained lesson: `lab.js`, `Demo.jsx`, `Notes.jsx` (+ helper files) |
| `src/labs/registry.js`   | `import.meta.glob` discovery and `TRACK_META`                                 |
| `src/practice/`          | Recipe box: routed typed CRUD, fake API, tests                                |
| `src/pages/`             | Home, hooks reference, lesson, sign-in, member, 404                           |
| `src/components/`        | Shared UI only (`Card`, `Section`, `Feature`, `Hero`, `Nav`, `ErrorBoundary`) |
| `docs/keyboard-audit.md` | Phase 5 accessibility review                                                  |

## Conventions

1. A lesson folder must be deletable without touching anything else.
2. Notes answer **what it is / how it works / the gotcha** — three short parts.
3. Demos stay under ~80 lines; if longer, it is two topics.
4. Never paste code into notes that already exists in `Demo.jsx`.
5. Data and helpers live outside component files (`react-refresh` rule).
6. `lab.js` is the only required file; `Demo.jsx` and `Notes.jsx` are convention.
7. Record each plan module's deliverable and review outcome in the session log
   (three lines at most; put detail in the commit message).

## Still-binding decisions

- React Router over hand-rolled routing; notes are `Notes.jsx`, not Markdown.
- Lessons are auto-discovered folders; never hand-edit a registry list.
- Hand-written Tailwind on `@theme` tokens; no shadcn/ui; no `dark:` classes.
- Pretend client-side auth; server-dependent work stays outside `src/labs/`.
- Each data lesson owns a fake API; the practice app lives in `src/practice/`.
- TypeScript only in the `typescript` lesson and `src/practice/`.
- Lazy `Demo`/`Notes`; eager metadata.
- The practice app is not a lesson; `/hooks` is a page, not a lesson.
- Older decisions (30 rows, 2026-11-19 → 2026-11-24) are in
  `git show 0572982:ROADMAP.md`.

## Lab platform backlog 💡

- **Show the real source.** `SourceView` reading a lesson's own files with
  `import.meta.glob(..., { query: "?raw" })`, under the notes.
- **Progress tracking.** "Mark as done" in `localStorage`, a sidebar check and a
  header counter.
- **Search / filter** the sidebar by title and level.
- **"Try it yourself" prompt** per lesson: one challenge line in the notes.
- A `docs/` page on the Tailwind `@theme` token system.
- A dark/light override toggle in addition to `prefers-color-scheme`.
- Deployment note: static hosts need an SPA rewrite to `index.html` for
  `BrowserRouter` deep links (or switch to `HashRouter`).

## Session log

Keep one short row per session; the detail lives in git.

| Date       | What changed                                                                                               |
| ---------- | ---------------------------------------------------------------------------------------------------------- |
| 2026-11-24 | Phase 5 complete: lessons 22–26, `/practice`, keyboard audit, error boundaries, lazy lessons, 11/11 tests. |
| 2026-11-24 | Wide layout: 1600px shell, responsive grids, rail beside the demo, notes full-width; checks green.         |
| 2026-11-25 | Roadmap compacted to the short version (binding decisions only); long history now in git commit `0572982`. |
