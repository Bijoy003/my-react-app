// Plain data lives outside `components/` so the react-refresh lint rule,
// which wants component files to export only components, stays happy.

export const features = [
  {
    id: "jsx",
    icon: "</>",
    title: "JSX",
    text: "HTML-shaped syntax compiled to function calls. Everything on this page is JSX, including the attributes.",
  },
  {
    id: "components",
    icon: "f()",
    title: "Functional components",
    text: "A component is a function that returns markup. Capitalised name, no class, no `this`.",
  },
  {
    id: "props",
    icon: "->",
    title: "Props",
    text: "Read-only inputs passed from parent to child. Destructure them in the parameter list to keep things short.",
  },
  {
    id: "composition",
    icon: "[]",
    title: "Composition",
    text: "Small components nest through `children` and named slots, exactly like the cards and sections on this page.",
  },
  {
    id: "conditional",
    icon: "?:",
    title: "Conditional rendering",
    text: "Ternaries pick one element, `&&` shows or hides one, and an early `return null` opts out entirely.",
    href: "/labs/react/conditional-rendering",
  },
  {
    id: "lists",
    icon: "map",
    title: "List rendering",
    text: "Turn arrays into elements with `map()` and give each item a stable `key` so React can track it.",
  },
];

export const footerLinks = [
  { href: "https://react.dev/", label: "React docs" },
  { href: "https://vite.dev/", label: "Vite docs" },
  { href: "https://eslint.org/", label: "ESLint" },
  { href: "https://prettier.io/", label: "Prettier" },
];
