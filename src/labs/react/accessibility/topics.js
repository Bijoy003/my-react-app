export const topics = [
  {
    id: "semantics",
    label: "Semantic HTML",
    body: "Start with the element the browser already understands. A button submits, focuses and activates with the keyboard for free; a div needs role, tabIndex, key handlers and still misses the details. Landmarks (header, nav, main, footer) give screen-reader users an outline to jump around.",
  },
  {
    id: "labels",
    label: "Labels",
    body: "Every input needs a name that is visible and programmatic. Wrap the input in its label or point at it with htmlFor, and add a hint with aria-describedby when the format matters. A placeholder is not a label: it vanishes as soon as the field has content.",
  },
  {
    id: "keyboard",
    label: "Keyboard",
    body: "Tab must reach every control in a sensible order, Enter and Space must work, and focus must stay visible. Composite widgets such as this tab list use roving tabindex: only the selected tab is tabbable, and the arrow keys move between them.",
  },
  {
    id: "focus",
    label: "Focus management",
    body: "When the page changes without a full load, move focus to the new heading or main region. A dialog should trap focus while open and return it to the trigger when closed. This layout focuses main after every route change for exactly that reason.",
  },
  {
    id: "feedback",
    label: "Accessible feedback",
    body: "Colour alone does not announce anything. role=status is a polite live region; role=alert interrupts for errors. Keep the region in the DOM and change its text, because a region added at the same time as its message is often missed.",
  },
];
