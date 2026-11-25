# Roadmap

A living document. **Update "Current state" and "Session log" at the end of every
session** so the next one can start without re-reading the code.

The curriculum started as the 80-hour plan in
[`React_NextJS_Detailed_Learning_Plan.docx`](./React_NextJS_Detailed_Learning_Plan.docx).
On 2026-11-20 it was trimmed to the React track only (33.5h): the Next.js,
backend and final-project phases are parked below, outside the active budget.
The docx remains the reference for those parked modules if they ever return.

Status: ✅ done · 🚧 in progress · ⬜ not started · 💡 optional idea

## Current state

_Last updated: 2026-11-24_

| Section   | Hours    | Status |
| --------- | -------- | ------ |
| React 19  | 33.5     | ✅     |
| **Total** | **33.5** | —      |

- **The React track is complete: Phases 1–5 are done. There are 26 lessons**, in
  order: `jsx`, `components`, `props`, `composition`, `conditional-rendering`,
  `list-rendering`, `styling`, `state-events-forms`, `effects-and-refs`,
  `memoisation`, `react19-actions`, `use-and-ref-props`, `shared-state`,
  `routing`, `protected-routes`, `api-integration`, `server-state`, `zustand`,
  `typescript`, `form-validation`, `testing`, `accessibility`, `performance`,
  `debugging`, `custom-hooks`, `suspense-boundaries`. All twenty-six concept
  cards on the home page link to their lesson.
- **Phase 5 deliverables:** the `testing` lesson's six React Testing Library
  cases; a keyboard audit with fixes (`docs/keyboard-audit.md`); a live
  before/after profile in `performance`; a prepared bug fixed in `debugging`;
  the routed, typed recipe box at `/practice` with five tests; an extracted
  `useLocalStorage`; and a loading fallback plus error boundary in
  `suspense-boundaries`, with every lesson demo and the route outlet now inside
  the app's shared boundary.
- **Phase 4 deliverables:** a full CRUD flow against a fake REST module
  (`api-integration`), one query plus one mutation with cache invalidation
  (`server-state`), a store-backed reading list with selectors (`zustand`), a
  typed member directory converted to `.tsx` (`typescript`), and a validated
  enrolment form with accessible field errors (`form-validation`).
- **Phase 3 deliverables:** a responsive token-styled page (`styling`), a
  controlled enrolment form (`state-events-forms`), a guestbook form with
  pending and optimistic states (`react19-actions`), a Context + `useReducer`
  basket (`shared-state`), and one real guarded route — `/member` behind
  `RequireAuth`, with sign-in and redirect-back.
- **Phase 3 gap-fill (2026-11-20):** an owner review found topics that were
  notes-only or untaught. Three lessons closed the gaps: `memoisation`
  (hands-on `useMemo`/`useCallback`/`memo` with a cache toggle and a render
  counter), `use-and-ref-props` (live `use()` under Suspense and ref-as-prop
  focus), and `routing` (a live inspector for params, search params, nested
  layouts and navigation).
- **Styling stays hand-written Tailwind** (see decisions): no shadcn/ui. Dark
  mode remains a variable override; no `dark:` classes.
- **Auth is deliberately pretend:** a name in memory via `src/auth/`, gone on
  refresh. The guard pattern is the lesson; real enforcement belongs on a
  server this lab does not have.
- **Server data is fake too:** each data lesson (and `testing`, and `practice`)
  ships its own in-memory API module with latency and a failure switch, so the
  folders stay self-contained and the lab keeps running under Vite. Swapping in
  `fetch` is a one-module change.
- **Practice app (2026-11-24):** `/practice` is the Phase 5 exercise, not a
  lesson. It is a routed, TypeScript CRUD feature — list, detail, create and
  edit — built from TanStack Query, React Hook Form and Zod, with its own fake
  API and five tests. The sidebar links to it directly because it earns its
  place by integrating the lessons, not by teaching one new topic.
- **Code splitting (2026-11-24):** every `lab.js` lazily imports its `Demo` and
  `Notes`, and the practice routes are lazy too. The registry still reads
  lesson metadata eagerly so the sidebar can render immediately; `LessonPage`
  and `PracticeLayout` own the Suspense fallbacks.
- **Accessibility fixes (2026-11-24):** the layout has a skip link and moves
  focus to `main` after navigation; `src/index.css` owns one global
  `:focus-visible` ring and respects `prefers-reduced-motion`; the light-mode
  accent moved from `#aa3bff` (4.39:1 on white) to `#9333ea` (5.38:1). Details
  and the manual test script are in `docs/keyboard-audit.md`.
- **Sidebar scroll (2026-11-24):** the desktop topic list is capped to the
  space under the 4rem header (`max-h-[calc(100svh_-_4rem)]`) and scrolls on
  its own, so the last lessons no longer require scrolling the whole page. A
  slim, token-coloured scrollbar (`.sidebar-scroll`) keeps it unobtrusive.
- **Lesson rail (2026-11-24):** lesson routes gained a sticky rail
  (`LessonRail.jsx`): "On this page" anchors, the lesson's position and level,
  and the next lesson with its summary. It began as a third shell column at
  `xl` and now renders beside the demo inside `LessonPage` (see Wide layout);
  below `xl` it is hidden, so nothing is reserved on pages without a rail.
- **Wide layout (2026-11-24):** the shell widened again from `max-w-7xl` to
  `max-w-[100rem]` (1600px) in `Layout`, `Nav` and `Footer`, shrinking the outer
  gutters on large monitors. The width goes to content, not longer lines: the
  home concept map is 3 columns at `xl` and 4 at `2xl`, and the hooks reference
  and the recipe list are 3 columns at `xl`. Lessons keep demo above notes. The
  rail pairs with the demo — both are short, so they sit side by side at `xl`
  (demo `1fr`, rail a sticky `16rem`) without the vertical waste of pairing it
  with the tall notes. The notes then take the full column width below, laid out
  as auto-fit section columns
  (`repeat(auto-fit,minmax(18rem,1fr))` on the shared `Notes.jsx` root) so lines
  stay readable without a fixed cap. List-style demos drop their inner width
  caps to fill the panel; forms keep a readable width. The shell is now always
  sidebar + one content column.
- Tracks are declared in `src/labs/registry.js` (`TRACK_META`); the `nextjs`
  entry was removed with the roadmap trim, so `react` is the only track.
- Every lesson folder is self-contained. Several lessons keep helper files
  beside the demo (`validate.js`, `api.js`, `basket.js`, `compute.js`,
  `Lists.jsx`, `useTasks.js`, `useMembers.js`, `store.js`, `schema.js`,
  `api.ts`, `useMembers.ts`, `Tabs.jsx`, `FixedField.jsx`, `RowList.jsx`,
  `ProfileTable.jsx`, `useLocalStorage.js`, `NoteCard.jsx`, `SlowPanel.jsx`) so
  component files stay presentation-only, and `testing` keeps its suite in
  `Demo.test.jsx`. `components/` holds only the shared UI the app uses, now
  including `ErrorBoundary`; `src/test/` holds the setup and matcher types.
- **TypeScript is lesson-and-practice only:** the app shell stays JavaScript.
  The `typescript` lesson and `src/practice/` are `.ts`/`.tsx`,
  `tsconfig.json` covers them, ESLint has a `typescript-eslint` block, and
  `npm run typecheck` runs `tsc --noEmit`.
- **Hooks reference page (2026-11-23):** `/hooks` lists every hook the app
  actually uses — 30 across React, React Router, TanStack Query, React Hook
  Form, Zustand and the lab's own custom hooks. Each card gives a plain-language
  "what it does / when to use it" and links to the lesson or practice app where
  it runs. It is a page, not a lesson, because it spans the whole curriculum
  and needs no demo.
- Tooling is green: `test` (11/11), `lint`, `typecheck`, `format:check`, and
  `build` all pass (312 modules). The entry chunk is about 314 kB, so the
  > 500 kB warning is gone. The `testing`, `performance`, `debugging`,
  > `custom-hooks` and `suspense-boundaries` demos were render-verified through
  > Vite's SSR pipeline with their registry orders and home-card links.

**Next task:** Phase 5 is complete, so the React curriculum is done. Next is an
owner review of Phase 5 against the original plan, then a choice from the lab
platform backlog — or parking the curriculum. Do not start a new module without
recording that decision here first.

## How the plan maps onto this lab

1. One plan module becomes at most two lessons here plus one small deliverable.
   The lesson explains the concept; the deliverable proves it.
2. Lesson folders stay self-contained. Anything that needs a server, a database
   or a secret lives outside `src/labs/`, so the lab keeps running under Vite.
3. Work in plan order. A module can close early when existing work already meets
   its deliverable, but the review pass still happens.
4. A module is ✅ only when its deliverable exists and review comments are
   addressed. The session log records both.

## Phase 1 — Lab shell ✅

- ✅ Replace the Vite template with a real page.
- ✅ Prettier config, ignore file, `format` / `format:check` scripts.
- ✅ Add `react-router-dom` and a route table (`/`, `/labs/:track/:slug`, `*`).
- ✅ `Layout` with header, grouped sidebar, mobile chips, scroll restoration.
- ✅ `labs/registry.js` using `import.meta.glob("./**/lab.js", { eager: true })`.
- ✅ `LessonPage` with breadcrumb, demo panel, notes panel, prev/next.
- ✅ Reference lesson: `conditional-rendering` (interactive status playground).
- ✅ Home rebuilt as a lab index (concept map + "how a lesson is stored").
- ✅ README, this roadmap, `AGENTS.md`.

## Phase 2 — First six React lessons ✅

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

> Note: `conditional-rendering` was renumbered from `order: 1` to `order: 5`
> when `jsx` landed, so the sequence reads JSX → components → props →
> composition → conditional → lists.

- ✅ `jsx` lesson.
- ✅ `components` lesson.
- ✅ `props` lesson.
- ✅ `composition` lesson.
- ✅ `list-rendering` lesson.
- ✅ Renumber `conditional-rendering` to `order: 5`.
- ✅ Point all six cards in `src/data/basics.js` at their `href`.
- ✅ Review shared UI after each lesson: no demo absorbed a home-page component,
  so `components/` is unchanged.

## Phase 3 — React foundations, remaining (11h) ✅

- ✅ **JavaScript refresh (1h).** Self-check, no lesson: ES6+ modules,
  destructuring, spread/rest, array methods, promises, `async`/`await` and
  error handling are exercised throughout the modules below.
- ✅ **Rendering and styling (2h).** Decision: hand-written Tailwind, no
  shadcn/ui. The `styling` lesson builds a responsive page from a reusable
  `Stat` piece on the `@theme` tokens. Review: semantic section and heading
  order, labelled landmarks, a `focus-visible` ring, token contrast in both
  colour schemes. _Deliverable: the styled page (the lesson demo)._
- ✅ **State, events and forms (2h).** `state-events-forms`: `useState`,
  synthetic events, controlled inputs, submit handling, accessible error
  feedback. _Deliverable: the controlled enrolment form._
- ✅ **Core hooks (3h).** Two lessons: `effects-and-refs` (`useEffect`,
  cleanup, dependencies, `useRef`; notes cover unnecessary effects and the
  React Compiler) and `react19-actions` (`useActionState`, `useFormStatus`,
  `useOptimistic`). _Deliverable: the guestbook form with pending and
  optimistic states, including rollback when the fake server rejects a
  message._
- ✅ **Gap-fill: memoisation.** `memoisation` turns the former notes-only
  `useMemo`/`useCallback` coverage into a demo: a deliberately slow filter
  with a cache toggle, plus a `memo` child whose render counter shows what a
  stable callback identity saves. Notes keep the React Compiler guidance.
- ✅ **Gap-fill: use() and ref props.** `use-and-ref-props` turns the former
  notes-only React 19 extras into a demo: `use()` reading a handler-created
  promise under Suspense, and a focus button driving a ref passed as a plain
  prop.
- ✅ **Component communication and shared state (1.5h).** `shared-state`:
  lifting state, passing callbacks, Context and `useReducer`, and when shared
  state is justified. _Deliverable: the basket feature shared by two siblings._
- ✅ **Client-side routing (1.5h).** `routing` lesson (a live inspector reading
  the app's real router: params, search params, location state, `Link` vs
  `useNavigate`; notes cover the route table and nested layouts with `Outlet`)
  and `protected-routes` lesson (a panel that flips the app's auth state and
  drives the real guarded route — React Router v7 forbids nesting a
  `MemoryRouter` inside the app's router) plus the app-level pattern:
  `src/auth/` (`AuthProvider`, `RequireAuth`), `/sign-in`, and the guarded
  `/member` route with redirect-back via navigation state. _Deliverable: one
  guarded route (`/member`)._

Review notes: demos run 48–95 lines; the longest keep their data and state
logic in sibling files so the component files stay presentation-only, matching
the existing 92-line precedents. The styling accessibility review is recorded
above; the fake auth is documented as UX-only in the lesson notes. All checks
green. The gap-fill lessons were added on 2026-11-20 after an owner review
against the original plan's topic list; they extend Phase 3 beyond its
original 11h budget by roughly 1.5h of lesson work.

## Phase 4 — React data, types and forms (8h) ✅

- ✅ **API integration (2h).** `api-integration`: a full create/update/delete
  flow with loading, error and empty states, a retry path, and a network-failure
  switch. _Deliverable: the CRUD task list._
- ✅ **Server-state management (1.5h).** `server-state`: `useQuery` for the list,
  `useMutation` for add and delete, `invalidateQueries` after each mutation,
  stale data kept on screen during refetch. _Deliverable: one query and one
  mutation._
- ✅ **Zustand (1h).** `zustand`: a reading-list store with actions, a filter,
  and per-slice selectors; notes compare local state, Context, Zustand and
  server state. _Deliverable: the store-backed reading list._
- ✅ **TypeScript with React (2h).** `typescript`: a typed member directory with
  `Member`/`Role` types, typed props, state, events, API response and custom
  hook. The app stays JavaScript; the lesson is `.tsx` and `tsc --noEmit`
  checks it. _Deliverable: one feature converted to TypeScript._
- ✅ **Form validation (1.5h).** `form-validation`: React Hook Form with a Zod
  schema, shared rules, field-level messages, `aria-invalid`/`aria-describedby`,
  and a fake submit. _Deliverable: the validated enrolment form._

Review notes: every data lesson owns its fake API so the folder remains
deletable. The server-state board is split into a hook, a list and a board
component; the other entry points are 70–110 lines, with repeated rows in
sibling components. The `typescript` lesson forced the first lint/typecheck
split: ESLint now has a `typescript-eslint` block and `npm run typecheck` is
part of the check suite. SSR smoke test: 20 demos + 20 notes render (40/40),
orders 1–20, 20 home cards linked; 14 logic checks cover CRUD, offline
rejection, store actions, schema validation and the resolver. The build warns
about a 539 kB chunk; lazy-loading lessons is Phase 5 performance work, not a
Phase 4 defect.

## Phase 5 — React quality (13h) ✅

- ✅ **React testing (2h).** `testing`: a member directory that really loads,
  fails and retries, plus six Vitest + React Testing Library cases in
  `Demo.test.jsx`. The notes cover role and label queries, `getBy` vs
  `findBy`, `userEvent`, and `vi.mock` on the demo's own API module.
  _Deliverable: tests for loading, success and error states, with a retry, a
  typed filter and a mocked API call._
- ✅ **Accessibility fundamentals (2.5h).** `accessibility`: a tab list with
  roving `tabIndex`, arrow/Home/End keys and `useId`-linked ARIA, plus an
  announced save message. The review fixed the app itself: skip link, focus to
  `main` after navigation, one global `:focus-visible` ring, reduced-motion
  handling and a darker AA-passing accent. _Deliverable: the keyboard audit and
  fixes in `docs/keyboard-audit.md`._
- ✅ **Practical performance (3h).** `performance`: a 4,000-row filter wrapped in
  `<Profiler>`, a cache toggle and a capture button that keeps the last two
  profiles side by side. The app-level fix is code splitting: every lesson and
  the practice routes are lazy. _Deliverable: the before/after profile._
- ✅ **Debugging and developer tools (1h).** `debugging`: a prepared identity bug
  — a component declared inside its parent — with a fix toggle that keeps the
  input's state. Notes cover the DevTools panels, breakpoints, StrictMode and
  the common bug classes. _Deliverable: the prepared bug fixed._
- ✅ **React practice exercises (2h).** The recipe box at `/practice`: a routed,
  typed CRUD feature with list, detail, create and edit, using TanStack Query,
  React Hook Form, Zod and a fake API. Five Vitest cases cover list/filter,
  detail, validation, create and delete. _Deliverable: the CRUD feature plus
  review fixes._
- ✅ **Custom hooks (1h).** `custom-hooks`: `useLocalStorage` with lazy
  initialisation, an effect write, `useDebugValue`, and two cards that share
  the logic while keeping separate state. _Deliverable: the extracted hook._
- ✅ **Suspense and error boundaries (1.5h).** `suspense-boundaries`: a timed
  `lazy` panel under a `role="status"` fallback, and a thrower inside the shared
  `ErrorBoundary` with a reset. The app now wraps every demo panel and the route
  outlet in that boundary. _Deliverable: the loading fallback and error boundary._

Review notes (Phase 5): lessons 22–26 stay inside the ~80-line demo convention
by moving tabs, rows, the profile table, the local-storage hook, the fixed field
and the slow panel into sibling files. The practice app is deliberately not a
lesson: it integrates earlier material instead of introducing a concept, so it
lives in `src/practice/` and is linked from the sidebar and home page. The
accessibility audit is a real app review, not a demo-only claim, and it records
the one limitation honestly: no manual screen-reader pass was run. The
performance split moved the entry chunk from 562 kB to about 312 kB; the
remaining large chunk is Zod and React Hook Form, loaded only when a form route
opens. The TypeScript tests needed one new shared file, `src/test/matchers.d.ts`,
for the jest-dom matcher types; the runtime setup is unchanged.

## Parked from the original plan 💡

Removed from the active roadmap on 2026-11-20 (owner's decision: focus on
React). These hours do not count towards the 33.5. Revive them only if a
project or architectural need makes them relevant; the docx holds the full
module detail.

- **Next.js 16 (26.5h).** App Router, Server/Client Components, data fetching,
  caching and revalidation, rendering strategies, Route Handlers, Server
  Actions, auth, loading/error conventions, metadata, testing, deployment.
  Needs its own runtime and practice app — never lesson folders under Vite.
- **Backend and API integration (12h).** ORM and database fundamentals,
  authentication and roles, external APIs with auth tokens, OpenAPI/Swagger
  type generation against .NET-backed APIs. Needs a server and a database.
- **Final project (8h).** A small full-stack app tying the above together.
  Parked along with its dependencies.

## Explicitly out of scope

The plan parks these until a project or architectural need makes them relevant.
Do not spend the plan's hours here.

- **React internals** — Fiber, reconciliation, scheduler, custom renderers.
- **Custom framework infrastructure** — hooks/state libraries.
- **Advanced state management** — complex Redux middleware, large-scale state
  architecture.
- **Hydration and streaming internals** — deep hydration debugging, low-level
  streaming SSR, Suspense internals.
- **Advanced build tooling** — custom Webpack config, bundler plugins, pipeline
  internals.
- **Micro-frontends** — module federation, independent deployment, cross-app
  integration.
- **React Server Components internals** — the RSC protocol and framework
  internals.

## Lab platform backlog 💡

Optional improvements to this lab. They support the curriculum but do not count
towards the plan's hours.

- **Show the real source.** A `SourceView` component reading each lesson's own
  files with `import.meta.glob(..., { query: "?raw" })`, under the notes.
- **Progress tracking.** A "Mark as done" toggle in `localStorage`, a check in
  the sidebar, and a counter in the header.
- **Search / filter** the sidebar by title and level.
- **"Try it yourself" prompt** per lesson: a one-line challenge in the notes.
- A `docs/` page explaining the Tailwind `@theme` token system.
- A dark/light override toggle in addition to `prefers-color-scheme`.
- Deployment note: static hosts need an SPA rewrite to `index.html` for
  `BrowserRouter` deep links (or switch to `HashRouter`).

## Open questions

- **TypeScript conversion.** Resolved on 2026-11-23: keep the app in JavaScript;
  the TypeScript lesson is written in `.tsx` and checked with `tsc --noEmit`.
  Phase 5 added a second typed surface, `src/practice/`, including its tests.
  A full conversion remains out of scope; the mixed setup is deliberate.

## Conventions

1. A lesson folder must be deletable without touching anything else.
2. Notes answer **what it is / how it works / the gotcha** — three short parts.
3. Demos stay under ~80 lines; if longer, it is two topics.
4. Never paste code into notes that already exists in `Demo.jsx`.
5. Data and helpers live outside component files (`react-refresh` rule).
6. `lab.js` is the only file the registry requires; `Demo.jsx` and `Notes.jsx`
   are the convention, not a hard requirement.
7. Record each plan module's deliverable and review outcome in the session log.

## Decisions log

| Date       | Decision                                                                                         | Why                                                                                                                                                                                                                                                                                                                                          |
| ---------- | ------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2026-11-19 | React Router over hand-rolled routing                                                            | Shareable per-topic URLs; the router is itself worth learning                                                                                                                                                                                                                                                                                |
| 2026-11-19 | Notes as `Notes.jsx`, not Markdown                                                               | No extra dependencies; styling stays consistent with the demos                                                                                                                                                                                                                                                                               |
| 2026-11-19 | Removed the fake plans/pricing section                                                           | It stopped fitting once the project became a learning lab                                                                                                                                                                                                                                                                                    |
| 2026-11-20 | Lab metadata + demo + notes in one folder, auto-discovered                                       | Adding a topic touches nothing shared; sidebar and routes can't drift                                                                                                                                                                                                                                                                        |
| 2026-11-20 | Eager `import.meta.glob`                                                                         | Simplest registry; revisit when the bundle grows (Phase 5, performance)                                                                                                                                                                                                                                                                      |
| 2026-11-20 | Next.js track deferred                                                                           | Server-only topics need a different runtime; decide when it matters                                                                                                                                                                                                                                                                          |
| 2026-11-20 | `jsx` demo written inline instead of importing `Hero`                                            | The lesson should show the syntax itself; `Hero` stays shared UI                                                                                                                                                                                                                                                                             |
| 2026-11-20 | Phase 2 demos keep their own markup and data                                                     | Lessons stay deletable; shared UI serves the home page and layout only                                                                                                                                                                                                                                                                       |
| 2026-11-20 | Guidance-only `mentor` agent in `.opencode/agents/`                                              | The owner writes lesson code; permissions enforce it, not just a prompt                                                                                                                                                                                                                                                                      |
| 2026-11-20 | Adopted the 80-hour plan as the curriculum source of truth                                       | Replaces the ad-hoc Phase 3/4 topic lists with a fixed scope and budget                                                                                                                                                                                                                                                                      |
| 2026-11-20 | Plan modules map to lessons plus one small deliverable                                           | Keeps one topic per folder while honouring the plan's review checkpoints                                                                                                                                                                                                                                                                     |
| 2026-11-20 | Stay on JavaScript until the TypeScript module                                                   | Avoids a half-migrated app; conversion scope is decided when it starts                                                                                                                                                                                                                                                                       |
| 2026-11-20 | Server-dependent work leaves the lab app                                                         | Lesson folders must stay self-contained, deletable, and Vite-runnable                                                                                                                                                                                                                                                                        |
| 2026-11-20 | Roadmap trimmed to React-only (33.5h)                                                            | Owner's focus is React; Next.js, backend and final project parked above                                                                                                                                                                                                                                                                      |
| 2026-11-20 | Retired the owner-writes-code rule; removed `mentor`                                             | Owner asked the agent to write lesson code directly                                                                                                                                                                                                                                                                                          |
| 2026-11-20 | Hand-written Tailwind over shadcn/ui                                                             | Lessons stay dependency-light; the deliverable uses the `@theme` tokens                                                                                                                                                                                                                                                                      |
| 2026-11-20 | Pretend client-side auth for the guarded route                                                   | No backend in the lab; the guard teaches the pattern, a server enforces                                                                                                                                                                                                                                                                      |
| 2026-11-20 | Protected-routes demo drives the real `/member` route                                            | React Router v7 throws on a nested `MemoryRouter`; a sandbox cannot render inside the app router                                                                                                                                                                                                                                             |
| 2026-11-20 | Gap-fill lessons before Phase 4                                                                  | Owner review found notes-only topics (`useMemo`/`useCallback`, `use()`, ref-as-prop) and untaught routing basics; added `memoisation`, `use-and-ref-props`, `routing`                                                                                                                                                                        |
| 2026-11-23 | Added TanStack Query and Zustand                                                                 | Both are named Phase 4 deliverables; hand-rolling their behaviour would obscure the lesson                                                                                                                                                                                                                                                   |
| 2026-11-23 | Added React Hook Form, Zod and `@hookform/resolvers`                                             | The plan's form-validation module needs a schema resolver; repeating Phase 3's hand-written validation would teach nothing new                                                                                                                                                                                                               |
| 2026-11-23 | Added TypeScript + `typescript-eslint`, kept the app in JS                                       | Resolves the open question: only the `typescript` lesson is `.tsx`; `tsc --noEmit` checks it, and old lessons stay untouched                                                                                                                                                                                                                 |
| 2026-11-23 | Each data lesson ships its own fake API module                                                   | Folders stay self-contained and deletable, and the lab needs no server, database or secret                                                                                                                                                                                                                                                   |
| 2026-11-23 | Accepted the >500 kB build chunk for now                                                         | Query, Zod and React Hook Form are not small; lazy-loading lessons is scheduled as Phase 5 performance work                                                                                                                                                                                                                                  |
| 2026-11-23 | Hooks guide is a page at `/hooks`, not a lesson                                                  | It spans all lessons and has no single demo; a lesson folder would force a fake demo and break the one-topic-per-folder rule                                                                                                                                                                                                                 |
| 2026-11-23 | Added Vitest, jsdom and React Testing Library                                                    | The testing module needs a runner, a DOM and user-event simulations; all three are the plan's named tools, and Vitest reuses the Vite config                                                                                                                                                                                                 |
| 2026-11-24 | Lazy-load every lesson panel and the practice routes                                             | Splits the 562 kB entry chunk; metadata stays eager so the sidebar renders immediately, and Suspense owns the fallbacks                                                                                                                                                                                                                      |
| 2026-11-24 | Practice app at `/practice`, outside `src/labs/`                                                 | It integrates earlier topics rather than teaching one; routing belongs to the app shell, and the sidebar links to it directly                                                                                                                                                                                                                |
| 2026-11-24 | One shared `ErrorBoundary` around the demo panel                                                 | A broken demo must not blank the page; error boundaries still require a class, and the lesson reuses the same component                                                                                                                                                                                                                      |
| 2026-11-24 | Changed the light accent token to `#9333ea`                                                      | The old `#aa3bff` measured 4.39:1 on white; the new value passes AA at 5.38:1 and still reads as the same purple                                                                                                                                                                                                                             |
| 2026-11-24 | Added `src/test/matchers.d.ts`                                                                   | `setup.js` is JavaScript, which `tsc` does not include, so the TypeScript tests needed the jest-dom matcher types in the program                                                                                                                                                                                                             |
| 2026-11-24 | Lesson rail in the right margin, shell at `max-w-7xl`                                            | The gutters came from the 1152px cap; stretching text to fill them would push lines well past 100 characters. The rail uses the space for wayfinding and only renders at `xl`                                                                                                                                                                |
| 2026-11-24 | Wide shell (1600px), responsive grids; rail beside the demo, notes full-width as section columns | Owner saw gutters, then an empty band right of the demo/notes, and rejected rail-beside-notes. Pairing the rail with the short demo and giving the notes the full row (as auto-fit columns) fills the width while keeping lines readable. Side-by-side demo/notes was rejected earlier: a short demo beside tall notes wastes vertical space |

## Session log

| Date       | What changed                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 2026-11-19 | Replaced the Vite template with a React Basics landing page; added Prettier config + scripts.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| 2026-11-20 | Phase 1: router, `Layout`, registry, `LessonPage`, conditional-rendering lesson, README rewrite.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| 2026-11-20 | Added this roadmap and `AGENTS.md`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| 2026-11-20 | Phase 2 start: `jsx` lesson (demo + notes), `conditional-rendering` renumbered to 5, home CTA.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| 2026-11-20 | Added the `mentor` agent: lesson code is the owner's, docs stay with the agent.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| 2026-11-20 | Phase 2: `components` lesson (capitalisation toggle demo), home card linked, README structure.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| 2026-11-20 | Phase 2 complete: `props`, `composition`, `list-rendering`; all six cards linked; tooling green.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| 2026-11-20 | Adopted the 80-hour React/Next.js plan; roadmap regrouped into Phases 3–8 with mapping rules.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| 2026-11-20 | Trimmed roadmap to React-only; parked Next.js/backend/final project; removed the mentor agent and the owner-writes-code rule.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| 2026-11-20 | Phase 3 complete: six lessons (`styling` → `protected-routes`), `/member` guarded route with sign-in, home map extended to 12 cards; lint/format/build green.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| 2026-11-20 | Fixed two render crashes: `useFormStatus` now imported from `react-dom` (was `react`); `protected-routes` demo rewritten to drive the real `/member` guard instead of a nested `MemoryRouter`. Verified all 12 demos at runtime (jsdom, 33/33); lint/format/build green.                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| 2026-11-20 | Phase 3 gap-fill: added `memoisation` (order 10), `use-and-ref-props` (order 12), `routing` (order 14); renumbered `react19-actions`→11, `shared-state`→13, `protected-routes`→15; home map now 15 cards; cross-links added in `effects-and-refs` and `react19-actions` notes. Memoisation demo reworked twice to satisfy the react-hooks compiler lint rules (no ref writes or setState in render/effects; counter writes DOM from an effect). SSR smoke test: 15 demos + 15 notes render, orders 1–15, all cards link (33/33). lint/format/build green (93 modules).                                                                                                                                                   |
| 2026-11-20 | Investigated "actions demo not working" (blank page in dev): verified the demo end-to-end with a throwaway jsdom harness — full app, StrictMode, dev and prod React, all 10 interaction checks pass (optimistic row, pending, rollback, draft, empty error). No code bug; the running dev server's dep cache was disturbed by the temporary jsdom install/prune (lockfile change → re-optimisation). Fix: restart dev server + hard refresh. Harness and jsdom removed; no dependency added.                                                                                                                                                                                                                             |
| 2026-11-20 | Fixed "Link is not defined" crash on `/labs/react/react19-actions`: the file on disk already imported `Link`, but the running dev server served a stale transform without it. Touched `Notes.jsx` to invalidate Vite's cache; verified the served module and an SSR render of the notes (Link present). No source change; ROADMAP.md reformatted; lint/format/build green.                                                                                                                                                                                                                                                                                                                                               |
| 2026-11-23 | Phase 4 complete: added `api-integration` (16), `server-state` (17), `zustand` (18), `typescript` (19), `form-validation` (20); home map now 20 cards. Added TanStack Query, Zustand, React Hook Form + Zod, and TypeScript tooling; ESLint covers `.ts`/`.tsx` and `npm run typecheck` joins the checks. The app stays JavaScript; only the TypeScript lesson is `.tsx`. Fake APIs live in each lesson folder. Verified 20 demos + 20 notes via SSR (40/40), orders 1-20, 20 cards linked, plus 14 logic checks (CRUD, offline, store, schema, resolver). lint/typecheck/format/build green (268 modules); build warns about a 539 kB chunk, deferred to Phase 5.                                                       |
| 2026-11-23 | Fixed the `vite: stop` task, which failed with "Property \"OwningProcess\" cannot be found" whenever non-connection output reached `Select-Object -ExpandProperty`. Logic moved to `.vscode/stop-vite.ps1`, run via `-File` (no nested quoting); it walks the property with `ForEach-Object`, skips PIDs 0/4, dedupes, and falls back to `netstat` when NetTCPIP is missing. No source change.                                                                                                                                                                                                                                                                                                                           |
| 2026-11-23 | Added the `/hooks` reference page: 25 hooks in seven groups, each with "what it does", "use it when", and a link to the lesson where it runs. Added `src/data/hooks.js`, `src/pages/HooksPage.jsx`, a route, and sidebar/mobile links. No lesson count change (20 lessons).                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| 2026-11-23 | Phase 5 start: added the `testing` lesson (order 21) with a member directory that loads, fails and retries, plus `Demo.test.jsx` — six Vitest + React Testing Library cases for loading, success, error, retry, a typed filter and the mocked API module. Added Vitest, jsdom, `@testing-library/react`, `user-event` and `jest-dom`; `npm test` / `test:watch` scripts and `src/test/setup.js`. Home map now 21 cards. Verified the lesson via SSR (registry order, demo loading state, notes sections, card link). test/lint/typecheck/format/build green (276 modules); chunk now 562 kB, still deferred.                                                                                                             |
| 2026-11-24 | Phase 5 complete: added five lessons (`accessibility` 22, `performance` 23, `debugging` 24, `custom-hooks` 25, `suspense-boundaries` 26), the `/practice` recipe box (routed, typed CRUD with five tests), and the `docs/keyboard-audit.md` deliverable. App work: skip link, focus to main after navigation, global focus ring, reduced-motion guard, AA accent token, `ErrorBoundary` around every demo and the route outlet, lazy `Demo`/`Notes` in all 26 `lab.js` files, lazy practice routes, and a `matchers.d.ts` for typed tests. Home map now 26 cards plus a practice section; hooks page now 30 hooks. Checks green: test 11/11, lint, typecheck, format, build (310 modules, entry ~312 kB — warning gone). |
| 2026-11-24 | Sidebar usability fix: the desktop lesson list scrolls inside a viewport-capped sticky column (`max-h-[calc(100svh_-_4rem)]`, `overflow-y-auto`, `overscroll-contain`) with a slim token-coloured scrollbar (`.sidebar-scroll` in `src/index.css`), so the last topics are reachable without scrolling the page. test 11/11, lint, typecheck, format, build green (311 modules).                                                                                                                                                                                                                                                                                                                                         |
| 2026-11-24 | Layout: the shell moved from `max-w-6xl` to `max-w-7xl` and lesson routes gained a sticky right rail at `xl` (`src/layout/LessonRail.jsx` + a conditional third grid column in `Layout.jsx`): "On this page" anchors, lesson position/level, next lesson and summary. Lesson sections got `id`/`scroll-mt-24`, notes are capped at `34rem`, and Nav/Footer widened to match. Rail belongs to the shell so it reads the registry rather than receiving props through the route. test 11/11, lint, typecheck, format, build green (312 modules, entry ~314 kB).                                                                                                                                                            |
| 2026-11-24 | Wide layout: shell `max-w-7xl` → `max-w-[100rem]` (1600px) in Layout/Nav/Footer; home concept map 3-col at `xl` / 4-col at `2xl`, hooks and recipe list 3-col at `xl`; lessons stay stacked (demo above notes); the rail moved from the shell into `LessonPage` beside the demo (sticky `16rem` at `xl`), and the notes take the full column width below as auto-fit section columns on the shared `Notes.jsx` root; list-style demos drop their inner caps and the shell is sidebar + one content column. A side-by-side trial was reverted: a short demo beside tall notes wastes height. test 11/11, lint, typecheck, format:check, build green (312 modules, entry ~314 kB).                                         |
