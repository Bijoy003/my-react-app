// A plain-data inventory of every hook this app uses. Keeping it outside the
// page component lets the page stay presentation-only, and the list is easy to
// extend when a lesson introduces another hook.
//
// Checked against src/ on 2026-11-23.

export const hookGroups = [
  {
    id: "state",
    eyebrow: "01 — State",
    title: "State and memory",
    intro:
      "A component runs its function again on every render, so its local variables are recreated. These hooks are how it remembers something between renders.",
    hooks: [
      {
        name: "useState",
        source: "React",
        what: "Gives a component a piece of memory that survives re-renders. You get the current value and a setter; calling the setter asks React to render the component again.",
        when: "Use it for state that belongs to one component: an input's value, a toggle, a selected tab, or a small list.",
        lesson: "State, events and forms",
        href: "/labs/react/state-events-forms",
      },
      {
        name: "useReducer",
        source: "React",
        what: "A bigger version of useState for state with several related changes. A reducer function receives the current state and an action, then returns the next state.",
        when: "Use it when one piece of state has many named transitions, such as add, remove and reset, and you want that logic in one testable function.",
        lesson: "Shared state",
        href: "/labs/react/shared-state",
      },
      {
        name: "useRef",
        source: "React",
        what: "Creates a box whose current value you can change without causing a re-render. It can hold a DOM element or any value you want to keep between renders.",
        when: "Use it to reach a DOM element (focus, scroll, measure) or to remember a value that should not appear in the UI.",
        lesson: "Effects and refs",
        href: "/labs/react/effects-and-refs",
      },
    ],
  },
  {
    id: "shared-state",
    eyebrow: "02 — Shared state",
    title: "Sharing values across components",
    intro:
      "Props flow down one level at a time. Context is how this app skips the middle layers when many components need the same value.",
    hooks: [
      {
        name: "useContext",
        source: "React",
        what: "Reads the nearest value that a provider placed on a context. It lets nested components share data without passing props through every level.",
        when: "Use it for values many components need, such as the signed-in user, a theme, or the basket in this lab.",
        lesson: "Shared state",
        href: "/labs/react/shared-state",
      },
    ],
  },
  {
    id: "effects",
    eyebrow: "03 — Effects",
    title: "Side effects and performance",
    intro:
      "Rendering should be pure: same inputs, same output. These hooks handle the things outside React and the expensive work you may want to cache.",
    hooks: [
      {
        name: "useEffect",
        source: "React",
        what: "Runs code after a render so the component can synchronise with something outside React: a network request, a subscription, a timer, or the browser.",
        when: "Use it only for side effects that must happen because the component is on screen. If a value can be calculated during render, calculate it there instead.",
        lesson: "Effects and refs",
        href: "/labs/react/effects-and-refs",
      },
      {
        name: "useMemo",
        source: "React",
        what: "Caches the result of a calculation between renders and only recalculates when one of its dependencies changes.",
        when: "Use it for a genuinely expensive calculation, or when a value must keep the same identity for a memoised child. Measure before adding it.",
        lesson: "Memoisation",
        href: "/labs/react/memoisation",
      },
      {
        name: "useCallback",
        source: "React",
        what: "Caches a function's identity between renders, so the same function instance is passed down until its dependencies change.",
        when: "Use it when a memoised child or an effect depends on the function's identity. On its own it does not make anything faster.",
        lesson: "Memoisation",
        href: "/labs/react/memoisation",
      },
    ],
  },
  {
    id: "forms",
    eyebrow: "04 — Forms",
    title: "Forms and async UI",
    intro:
      "React 19 added hooks for forms that submit asynchronously. They keep pending states and optimistic updates close to the form itself.",
    hooks: [
      {
        name: "useActionState",
        source: "React",
        what: "Connects an async form action to component state. It returns the latest result, an action to pass to the form, and a pending flag.",
        when: "Use it for forms whose submit handler needs the previous result, such as an error message or a success notice, plus a pending state.",
        lesson: "Actions and optimistic UI",
        href: "/labs/react/react19-actions",
      },
      {
        name: "useFormStatus",
        source: "React DOM",
        what: "Reads the pending status of the closest parent form. It must be called from a component rendered inside that form.",
        when: "Use it to disable a submit button or show a spinner without lifting the pending state into the form's parent.",
        lesson: "Actions and optimistic UI",
        href: "/labs/react/react19-actions",
      },
      {
        name: "useOptimistic",
        source: "React",
        what: "Shows the result you expect straight away while an async action is still running, then falls back to the real data if the action fails.",
        when: "Use it for a list or message that should feel instant but is still confirmed by the server later.",
        lesson: "Actions and optimistic UI",
        href: "/labs/react/react19-actions",
      },
      {
        name: "use()",
        source: "React 19",
        what: "Reads a promise or a context during render. With a promise, the component suspends until the promise resolves, so a nearby Suspense boundary shows its fallback. Unlike other hooks, it can be called inside a condition.",
        when: "Use it to read a promise you already have, or as a shorter useContext when the context read is conditional.",
        lesson: "use() and ref props",
        href: "/labs/react/use-and-ref-props",
      },
    ],
  },
  {
    id: "routing",
    eyebrow: "05 — Routing",
    title: "Reading and changing the URL",
    intro:
      "These hooks come from React Router, not React itself. They let a page react to the address bar and move the visitor around without a full reload.",
    hooks: [
      {
        name: "useParams",
        source: "React Router",
        what: "Reads the dynamic parts of the current URL as an object. On the route /labs/:track/:slug, it returns { track, slug }.",
        when: "Use it when a page's content depends on the URL, such as a lesson slug or a product id.",
        lesson: "Routing fundamentals",
        href: "/labs/react/routing",
      },
      {
        name: "useLocation",
        source: "React Router",
        what: "Returns the current location object: the pathname, search string, hash, and any state passed by navigation.",
        when: "Use it when you need to react to the current URL, remember where the user came from, or reset something when the path changes.",
        lesson: "Routing fundamentals",
        href: "/labs/react/routing",
      },
      {
        name: "useNavigate",
        source: "React Router",
        what: "Returns a function that moves the user to another route from an event handler. It can also replace the current history entry.",
        when: "Use it after an action finishes, such as a successful sign-in or a delete. For normal links, use the Link component instead.",
        lesson: "Routing fundamentals",
        href: "/labs/react/routing",
      },
      {
        name: "useSearchParams",
        source: "React Router",
        what: "Reads and writes the query string as a URLSearchParams object. The setter updates the URL and re-renders the component.",
        when: "Use it for view options that should be shareable in the URL, such as a filter, a page number, or a search term.",
        lesson: "Routing fundamentals",
        href: "/labs/react/routing",
      },
    ],
  },
  {
    id: "libraries",
    eyebrow: "06 — Libraries",
    title: "Hooks from the data and form libraries",
    intro:
      "These hooks come from the packages added in Phase 4. They follow the same rules as React's own hooks; they just wrap a lot of behaviour for you.",
    hooks: [
      {
        name: "useQuery",
        source: "TanStack Query",
        what: "Fetches and caches server data under a key. It gives you the data, loading and error states, and refetches when the cache goes stale.",
        when: "Use it for data you read from an API. It replaces the hand-written loading and error useEffect pattern.",
        lesson: "Server state",
        href: "/labs/react/server-state",
      },
      {
        name: "useMutation",
        source: "TanStack Query",
        what: "Wraps a create, update, or delete call. It tracks pending and error state, and can run callbacks such as cache invalidation on success.",
        when: "Use it for writes to the server, then invalidate the query whose data changed.",
        lesson: "Server state",
        href: "/labs/react/server-state",
      },
      {
        name: "useQueryClient",
        source: "TanStack Query",
        what: "Returns the shared query client, which can invalidate, refetch, or read cached queries from anywhere inside the provider.",
        when: "Use it when a mutation needs to refresh another query, as the server-state lesson does after add and delete.",
        lesson: "Server state",
        href: "/labs/react/server-state",
      },
      {
        name: "useForm",
        source: "React Hook Form",
        what: "Creates a form controller: register inputs, read errors, handle submit, and connect a validation schema.",
        when: "Use it for forms with several fields or validation rules, so you do not hand-write state and error handling for every input.",
        lesson: "Form validation",
        href: "/labs/react/form-validation",
      },
      {
        name: "useReadingList",
        source: "Zustand",
        what: "The hook returned by Zustand's create(). Passing a selector subscribes the component to just that slice of the reading-list store.",
        when: "Use it to read or change shared client state that lives outside React, with no provider and fewer re-renders.",
        lesson: "Zustand",
        href: "/labs/react/zustand",
      },
    ],
  },
  {
    id: "custom",
    eyebrow: "07 — Custom",
    title: "Custom hooks in this lab",
    intro:
      "A custom hook is just a function whose name starts with use and that calls other hooks. It shares logic, not state, and gives the rest of the app a smaller API to work with.",
    hooks: [
      {
        name: "useAuth",
        source: "Custom hook",
        what: "Wraps useContext(AuthContext) and returns the current user plus the sign-in and sign-out functions.",
        when: "Use it in any component that needs to know who is signed in. It throws a clear error if the component is outside AuthProvider.",
        lesson: "Protected routes",
        href: "/labs/react/protected-routes",
      },
      {
        name: "useBasket",
        source: "Custom hook",
        what: "Wraps useContext(BasketContext) and returns the basket items plus the dispatch function that changes them.",
        when: "Use it in components inside the basket provider. It throws a clear error if the provider is missing.",
        lesson: "Shared state",
        href: "/labs/react/shared-state",
      },
      {
        name: "useTasks",
        source: "Custom hook",
        what: "Owns the task list for the API lesson: loading, error, retry, add, toggle and delete, all backed by the fake REST module.",
        when: "Use it to keep network and status logic out of the component that renders the list.",
        lesson: "API integration",
        href: "/labs/react/api-integration",
      },
      {
        name: "useMembers",
        source: "Custom hook",
        what: "Fetches the typed member list and returns the members, status and error. Its return type is declared, so consumers get typed data.",
        when: "Use it in the TypeScript lesson to see a custom hook with an explicit contract.",
        lesson: "TypeScript with React",
        href: "/labs/react/typescript",
      },
      {
        name: "useTaskBoard",
        source: "Custom hook",
        what: "Combines useQuery, two useMutations and the fake offline switch for the server-state board.",
        when: "Use it to keep query keys, mutations and invalidation in one place while the board component stays presentational.",
        lesson: "Server state",
        href: "/labs/react/server-state",
      },
    ],
  },
];
