const TIPS = [
  "Derive during render; synchronise in effects.",
  "A ref is a box; state is a signal.",
  "Keys identify rows, not order.",
  "Lift state only as high as it needs to go.",
  "Optimistic UI is a preview, never the source of truth.",
];

// The promise is created in the click handler, never during render: use()
// must see the same promise on every re-render, or it would keep suspending
// on fresh ones forever.
export function fetchTip() {
  const tip = TIPS[Math.floor(Math.random() * TIPS.length)];
  return new Promise((resolve) => setTimeout(() => resolve(tip), 900));
}
