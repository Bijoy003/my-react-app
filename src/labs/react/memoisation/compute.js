// Deterministic data so the demo behaves the same on every load.
const STEMS = [
  "react",
  "router",
  "state",
  "effect",
  "memo",
  "context",
  "reducer",
  "suspense",
];

export const WORDS = Array.from(
  { length: 2000 },
  (_, i) => `${STEMS[i % STEMS.length]}-${Math.floor(i / STEMS.length)}`,
);

// Deliberately slow: the busy loop gives each pass a visible cost, so the
// difference between "recompute every render" and "reuse the cache" is
// readable in milliseconds rather than taken on faith.
export function slowFilter(query) {
  const start = performance.now();
  const needle = query.trim().toLowerCase();
  const matches = WORDS.filter((word) => {
    let burn = 0;
    for (let i = 0; i < 20000; i += 1) burn += i;
    return burn > 0 && word.includes(needle);
  });
  return {
    matches: matches.slice(0, 8),
    total: matches.length,
    ms: Math.max(1, Math.round(performance.now() - start)),
  };
}
