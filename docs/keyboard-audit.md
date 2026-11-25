# Keyboard and accessibility audit

Date: 2026-11-24. Scope: the app shell, the home page, the lesson template, the
hooks reference page and the recipe box. This is the deliverable for the
accessibility module in Phase 5.

Method: unplug the mouse. Tab through every page, activate controls with Enter
and Space, move around the lesson demo with the arrow keys, and check what
happens after a client-side navigation. Then inspect the same paths in the
Elements and Accessibility panes. No screen reader was available for this pass,
so the report is keyboard- and markup-based; that limitation is stated rather
than hidden.

## Findings and fixes

| Area             | Finding                                                                                                                | Fix                                                                                            |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| Skip navigation  | Every page started with the same ~30 sidebar links, so a keyboard user tabbed through them before reaching the lesson. | Added a “Skip to content” link that becomes visible on focus and targets `#main-content`.      |
| Route changes    | After clicking a sidebar link, focus stayed on the old link. A screen reader had no cue that the page had changed.     | `RouteChangeEffects` focuses `<main>` after each navigation, except the first render.          |
| Focus indicator  | Some controls set `focus-visible` utilities; the rest fell back to a browser default that was hard to see on the tint. | One global `:focus-visible` ring on every link, button, input, select, textarea and tab stop.  |
| Accent contrast  | The light-mode accent `#aa3bff` on white measured 4.39:1 — just under the 4.5:1 AA threshold for normal-sized text.    | Darkened the light-mode token to `#9333ea` (5.38:1 on white, 4.84:1 on the muted surface).     |
| Motion           | `scroll-behavior: smooth` ignored the visitor's reduced-motion preference.                                             | Smooth scrolling now applies only inside `prefers-reduced-motion: no-preference`.              |
| Loading feedback | Lazy lesson and practice panels rendered plain text while loading, with no status role.                                | Fallbacks use `role="status"`; the error boundary uses `role="alert"`.                         |
| Demo failures    | A demo that threw during render unmounted the whole app.                                                               | The demo panel sits inside the shared `ErrorBoundary`, so the page survives.                   |
| Tabs demo        | Keyboard interaction had to be built.                                                                                  | Roving `tabIndex`, arrow/Home/End keys, `aria-selected` and `aria-controls` are in `Tabs.jsx`. |

Verified as correct after the fixes:

- Header, sidebar and mobile navigation are labelled `<nav>` landmarks, and
  `NavLink` supplies `aria-current="page"`.
- Every form field has a visible `<label>`; errors and hints are connected with
  `aria-describedby` and invalid fields set `aria-invalid` (form-validation and
  the recipe box).
- Decorative icon text in `Feature` is `aria-hidden`.
- Status and error messages in the demos use `role="status"` and `role="alert"`.
- Only one of the two lesson navigations is in the accessibility tree at a
  time: the sidebar is `display: none` below the `lg` breakpoint and the chip
  row is hidden above it.

## Repeat it by hand

1. Load `/` and press Tab once: “Skip to content” appears. Enter moves focus to
   the main region.
2. Tab through the header, the sidebar and the concept cards. Every stop has a
   visible ring, and Enter opens the card.
3. From a lesson, open the accessibility demo. Tab once into the tab list, then
   use ArrowLeft, ArrowRight, Home and End. Focus and the selected tab move
   together.
4. Open the recipe box, submit an empty form, and use Tab: focus reaches each
   field, its error and the submit button.
5. Toggle “Reduce motion” in the operating system and reload: in-page anchors
   jump instead of gliding.
6. Resize below `lg`: the sidebar disappears and the chip navigation works with
   the same keys.

## Known limitations

- No manual screen-reader pass (VoiceOver, NVDA) has been run. Automated
  tooling cannot replace one.
- The inline links inside notes are ordinary prose, not a menu, so no menu
  keys are expected there.
- Colour contrast was checked against the two `@theme` backgrounds, not against
  every translucent overlay. Re-check if the tokens change.
