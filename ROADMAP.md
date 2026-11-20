# Roadmap

A living document. **Update "Current state" and "Session log" at the end of every
session** so the next one can start without re-reading the code.

The curriculum is the 80-hour plan in
[`React_NextJS_Detailed_Learning_Plan.docx`](./React_NextJS_Detailed_Learning_Plan.docx).
Its modules, hours, deliverables, and code-review checkpoints set the scope; this
file records order, status, and how each module lands in this repo. The plan's
hours include implementation, review, and addressing review comments.

Status: ✅ done · 🚧 in progress · ⬜ not started · 💡 optional idea

## Current state

_Last updated: 2026-11-20_

| Section         | Hours  | Status |
| --------------- | ------ | ------ |
| React 19        | 33.5   | 🚧     |
| Next.js 16      | 26.5   | ⬜     |
| Backend and API | 12     | ⬜     |
| Final project   | 8      | ⬜     |
| **Total**       | **80** | —      |

- **React setup and fundamentals (1.5h) is done.** All six lessons are written,
  in order: `jsx`, `components`, `props`, `composition`,
  `conditional-rendering`, `list-rendering`. All six concept cards on the home
  page link to their lesson.
- **Rendering and styling (2h) is partly done.** Tailwind 4 with `@theme` tokens,
  a responsive layout, and dark mode from variable overrides are in place.
  Missing: shadcn/ui, and the styling/accessibility review the plan asks for.
- **Client-side routing (1.5h) is partly done.** React Router 7, a nested
  `Layout`, route params, `NavLink`, and scroll restoration exist. Missing: the
  protected-route pattern.
- **The rest of the React track is untouched:** the JavaScript self-check,
  state/events/forms, core hooks, shared state, API and server state, Zustand,
  TypeScript, React Hook Form + Zod, testing, accessibility, performance,
  debugging, custom hooks, Suspense and error boundaries.
- Tracks are declared in `src/labs/registry.js` (`TRACK_META`); only `react` has
  lessons, so only `react` shows in the sidebar. The `nextjs` track is declared
  and waiting.
- Every lesson folder is self-contained. `components/` holds only the shared UI
  the home page and layout use; the `jsx` lesson writes its own equivalent of
  `Hero`, and the other demos keep their own markup and data.
- Tooling is green: `lint`, `format:check`, and `build` all pass.

**Next task:** Phase 3 — finish **Rendering and styling**: decide on shadcn/ui,
then build one responsive lesson from the existing tokens and review its
accessibility basics. The 1-hour JavaScript refresh is a self-check that can run
alongside it.

## How the plan maps onto this lab

1. One plan module becomes at most two lessons here plus one small deliverable.
   The lesson explains the concept; the deliverable proves it.
2. Lesson folders stay self-contained. Anything that needs a server, a database,
   a secret, or the Next.js runtime lives in the practice app, not in
   `src/labs/`, so the lab keeps running under Vite.
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

## Phase 3 — React foundations, remaining (11h) 🚧

- ⬜ **JavaScript refresh (1h).** Self-check, no lesson: ES6+ modules,
  destructuring, spread/rest, array methods, promises, `async`/`await`, error
  handling. Fold it into the modules that use them.
- 🚧 **Rendering and styling (2h).** Tailwind and the token system exist. Add
  shadcn/ui, build one responsive page from reusable pieces, and review styling
  consistency and accessibility basics. _Deliverable: the styled page._
- ⬜ **State, events and forms (2h).** `useState`, events, controlled inputs,
  submission, and feedback. _Deliverable: a controlled form._
- ⬜ **Core hooks (3h).** `useEffect`, `useRef`, `useMemo`, `useCallback`,
  dependencies and cleanup; React 19 `useActionState`, `useFormStatus`,
  `useOptimistic`, `use()`, ref as a prop; when an effect is unnecessary and what
  React Compiler changes about manual memoisation. _Deliverable: a form with
  pending and optimistic states._
- ⬜ **Component communication and shared state (1.5h).** Lift state, pass
  callbacks, Context and `useReducer`, and decide when shared state is justified.
  The composition lesson covers only the layout half. _Deliverable: one
  shared-state feature._
- 🚧 **Client-side routing (1.5h).** Add the protected-route pattern to the
  existing Router 7 setup. _Deliverable: one guarded route._

## Phase 4 — React data, types and forms (8h) ⬜

- ⬜ **API integration (2h).** REST calls, loading/error/empty states,
  submission, and CRUD workflows. _Deliverable: a small CRUD flow against a
  sample endpoint._
- ⬜ **Server-state management (1.5h).** TanStack Query: queries, mutations,
  refetching, and cache invalidation. _Deliverable: one query and one mutation._
- ⬜ **Zustand (1h).** A small store, actions, selectors; choosing between local
  state, Context, and Zustand. Redux stays out of the core plan. _Deliverable: a
  store-backed feature._
- ⬜ **TypeScript with React (2h).** Props, state, events, forms, API responses,
  reusable components, and typed custom hooks. _Deliverable: one feature
  converted to TypeScript._
- ⬜ **Form validation (1.5h).** React Hook Form with Zod, reusable rules, and
  accessible field-level errors. _Deliverable: a validated form._

## Phase 5 — React quality (13h) ⬜

- ⬜ **React testing (2h).** React Testing Library, user interactions, mocked API
  calls. _Deliverable: tests for loading, success, and error states._
- ⬜ **Accessibility fundamentals (2.5h).** Semantic HTML, labels, keyboard
  navigation, focus management, accessible feedback. _Deliverable: a keyboard
  audit and fixes._
- ⬜ **Practical performance (3h).** Unnecessary renders, justified memoisation,
  lazy loading, React DevTools, and React Compiler. _Deliverable: a before/after
  profile._
- ⬜ **Debugging and developer tools (1h).** Browser and React DevTools; state,
  network, rendering, and runtime bugs. _Deliverable: fix a prepared bug._
- ⬜ **React practice exercises (2h).** One small CRUD interface using routing,
  forms, API integration, TypeScript, and tests. _Deliverable: the CRUD feature
  plus review fixes._
- ⬜ **Custom hooks (1h).** Reusable behaviour, hook rules, and separation from
  presentation. _Deliverable: an extracted hook._
- ⬜ **Suspense and error boundaries (1.5h).** Async UI fallbacks and graceful
  rendering failures. _Deliverable: a loading fallback and an error boundary._

## Phase 6 — Next.js 16 (26.5h) ⬜

The plan's Next.js modules cannot run under Vite. Phase 6 starts by choosing
where the practice app lives (see Open questions); this lab's `nextjs` track
stays empty until that app exists, and the modules are tracked here rather than
as lesson folders.

**Setup and routing (3h)**

- ⬜ **Introduction and setup (1h).** Next.js 16 application structure, scripts,
  and a local run. _Deliverable: the starter project._
- ⬜ **App Router, layouts, and routing (2h).** Pages, nested layouts, dynamic
  routes, route groups, `loading` and `not-found`. _Deliverable: a multi-route
  shell._

**Components and data (10.5h)**

- ⬜ **Server and Client Components (2h).** Component boundaries, interactivity,
  data flow, and composition. _Deliverable: a page using both._
- ⬜ **Data fetching (2h).** Fetching in Server Components, async requests,
  loading and errors. _Deliverable: a data-driven page._
- ⬜ **Caching and revalidation (4.5h).** Request/data caching, revalidation,
  freshness, Cache Components, the `use cache` directive, and Partial
  Prerendering (PPR). _Deliverable: caching and invalidation on a data-driven
  page._
- ⬜ **Rendering strategies (2h).** Static and dynamic rendering, SSR, SSG, ISR,
  and the trade-offs for freshness and personalisation. _Deliverable: two
  rendering approaches compared._

**Mutations and auth (5.5h)**

- ⬜ **Route Handlers (1.5h).** Endpoints, HTTP methods, input validation,
  responses, and backend connections. _Deliverable: one tested Route Handler._
- ⬜ **Server Actions (1.5h).** Form submissions, mutations, validation, and
  success/failure responses. _Deliverable: a server-side form mutation._
- ⬜ **Authentication and security (2.5h).** Sign-in, protected routes and server
  operations, sessions, and authorisation; Proxy for request-level checks,
  enforcement inside server operations. _Deliverable: a protected route and a
  protected server operation._

**UX and delivery (7.5h)**

- ⬜ **Loading and error handling (1.5h).** `loading`, `error`, and not-found
  conventions; streaming with Suspense. _Deliverable: streamed page sections._
- ⬜ **Metadata and SEO basics (1h).** Titles, descriptions, and social-sharing
  metadata. _Deliverable: metadata on key pages._
- ⬜ **Styling and assets (1h).** Style organisation, responsive layouts, images,
  fonts, and static assets. _Deliverable: a styled, responsive page._
- ⬜ **Next.js testing (1.5h).** Key components, route behaviour, and
  end-to-end tests for important journeys. _Deliverable: one tested critical
  route._
- ⬜ **Performance and deployment (2.5h).** Bundle and rendering performance,
  environment variables, production builds, deployment, server-only secrets, and
  the `NEXT_PUBLIC_` prefix. _Deliverable: a deployed production build._

## Phase 7 — Backend and API integration (12h) ⬜

This phase runs inside the Next.js practice app: Route Handlers and Server
Actions call the data layer, and nothing secret reaches the browser.

- ⬜ **ORM and database fundamentals (4h).** Relational modelling, schema,
  migrations, relationships, parameterised access, transactions, and connection
  management. Prisma or Drizzle, or the `mssql` driver for direct SQL Server
  access. _Deliverable: a schema, a migration, and a CRUD data layer._
- ⬜ **Authentication and role-based authorisation (3h).** Auth.js sign-in and
  sessions; roles checked in Route Handlers and Server Actions. _Deliverable:
  authentication plus one role check._
- ⬜ **Calling an external API with auth tokens (2.5h).** Server-side calls,
  token storage and refresh, timeouts, errors, and response validation.
  _Deliverable: one authenticated integration._
- ⬜ **OpenAPI/Swagger type generation (2.5h).** Generate TypeScript types or a
  client from a specification and consume .NET-backed APIs through the generated
  contracts. _Deliverable: typed contracts from a sample spec._

## Phase 8 — Final project (8h) ⬜

- ⬜ **Final project (8h).** A small full-stack app on Next.js 16, React 19, and
  TypeScript. Next.js is the whole stack: Route Handlers/Server Actions for
  server operations, Auth.js for authentication, and Prisma or Drizzle with SQL
  Server or PostgreSQL for persistence.

  Time split: scope and data model 1h; core pages and forms 1.5h; server
  operations and database 2h; authentication and roles 1h; validation and tests
  0.75h; code review 0.75h; review fixes and polish 1h.

  Definition of done:

  - Next.js is the full stack; no ASP.NET Core backend.
  - SQL Server or PostgreSQL through an ORM or driver.
  - Authentication plus at least one role-based authorisation rule.
  - One small CRUD workflow with validation and user feedback.
  - Small enough to finish in 8 hours, review included.

## Explicitly out of scope

The plan parks these until a project or architectural need makes them relevant.
Do not spend the 80 hours here.

- **React internals** — Fiber, reconciliation, scheduler, custom renderers.
- **Custom framework infrastructure** — hooks/state libraries, custom Next.js
  servers.
- **Advanced state management** — complex Redux middleware, large-scale state
  architecture.
- **Hydration and streaming internals** — deep hydration debugging, low-level
  streaming SSR, Suspense internals.
- **Custom caching infrastructure** — cache handlers, distributed caching.
- **Advanced build tooling** — custom Webpack config, bundler plugins, pipeline
  internals.
- **Edge infrastructure** — Edge Runtime internals, edge deployment
  architecture.
- **Micro-frontends** — module federation, independent deployment, cross-app
  integration.
- **React Server Components internals** — the RSC protocol and framework
  internals.

## Lab platform backlog 💡

Optional improvements to this lab. They support the curriculum but do not count
towards the 80 hours.

- **Show the real source.** A `SourceView` component reading each lesson's own
  files with `import.meta.glob(..., { query: "?raw" })`, under the notes.
- **Progress tracking.** A "Mark as done" toggle in `localStorage`, a check in
  the sidebar, and a counter in the header.
- **Search / filter** the sidebar by title and level.
- **"Try it yourself" prompt** per lesson: a one-line challenge in the notes.
- **Apply the performance module here:** lazy-load lessons with `React.lazy` +
  `Suspense` once there are ~10+.
- **Apply the error-boundary module here:** wrap the demo panel so one broken
  demo cannot blank the page.
- A `docs/` page explaining the Tailwind `@theme` token system.
- A dark/light override toggle in addition to `prefers-color-scheme`.
- Deployment note: static hosts need an SPA rewrite to `index.html` for
  `BrowserRouter` deep links (or switch to `HashRouter`).

## Open questions

- **TypeScript conversion.** Convert the lab app when the TypeScript module
  starts, or keep the app in JavaScript and write only new lessons in `.tsx`?
  The first is cleaner; the second is faster and keeps old lessons untouched.
- **shadcn/ui.** Adopt it for lesson demos, or keep hand-written Tailwind so
  lessons stay dependency-light? The plan asks for it in the styling module.
- **Next.js location.** `next-app/` inside this repo, or a sibling project such
  as `../react-next-practice`?
- **Where Next.js notes live.** In the practice app itself, or mirrored back
  into this lab's empty `nextjs` track?

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

| Date       | Decision                                                   | Why                                                                      |
| ---------- | ---------------------------------------------------------- | ------------------------------------------------------------------------ |
| 2026-11-19 | React Router over hand-rolled routing                      | Shareable per-topic URLs; the router is itself worth learning            |
| 2026-11-19 | Notes as `Notes.jsx`, not Markdown                         | No extra dependencies; styling stays consistent with the demos           |
| 2026-11-19 | Removed the fake plans/pricing section                     | It stopped fitting once the project became a learning lab                |
| 2026-11-20 | Lab metadata + demo + notes in one folder, auto-discovered | Adding a topic touches nothing shared; sidebar and routes can't drift    |
| 2026-11-20 | Eager `import.meta.glob`                                   | Simplest registry; revisit when the bundle grows (Phase 5, performance)  |
| 2026-11-20 | Next.js track deferred                                     | Server-only topics need a different runtime; decide when it matters      |
| 2026-11-20 | `jsx` demo written inline instead of importing `Hero`      | The lesson should show the syntax itself; `Hero` stays shared UI         |
| 2026-11-20 | Phase 2 demos keep their own markup and data               | Lessons stay deletable; shared UI serves the home page and layout only   |
| 2026-11-20 | Guidance-only `mentor` agent in `.opencode/agents/`        | The owner writes lesson code; permissions enforce it, not just a prompt  |
| 2026-11-20 | Adopted the 80-hour plan as the curriculum source of truth | Replaces the ad-hoc Phase 3/4 topic lists with a fixed scope and budget  |
| 2026-11-20 | Plan modules map to lessons plus one small deliverable     | Keeps one topic per folder while honouring the plan's review checkpoints |
| 2026-11-20 | Stay on JavaScript until the TypeScript module             | Avoids a half-migrated app; conversion scope is decided when it starts   |
| 2026-11-20 | Server-dependent work leaves the lab app                   | Lesson folders must stay self-contained, deletable, and Vite-runnable    |

## Session log

| Date       | What changed                                                                                     |
| ---------- | ------------------------------------------------------------------------------------------------ |
| 2026-11-19 | Replaced the Vite template with a React Basics landing page; added Prettier config + scripts.    |
| 2026-11-20 | Phase 1: router, `Layout`, registry, `LessonPage`, conditional-rendering lesson, README rewrite. |
| 2026-11-20 | Added this roadmap and `AGENTS.md`.                                                              |
| 2026-11-20 | Phase 2 start: `jsx` lesson (demo + notes), `conditional-rendering` renumbered to 5, home CTA.   |
| 2026-11-20 | Added the `mentor` agent: lesson code is the owner's, docs stay with the agent.                  |
| 2026-11-20 | Phase 2: `components` lesson (capitalisation toggle demo), home card linked, README structure.   |
| 2026-11-20 | Phase 2 complete: `props`, `composition`, `list-rendering`; all six cards linked; tooling green. |
| 2026-11-20 | Adopted the 80-hour React/Next.js plan; roadmap regrouped into Phases 3–8 with mapping rules.    |
