// A deliberately expensive filter. Real work might be fuzzy matching,
// sorting or formatting; a little busywork per row gives the profiler a
// signal that a laptop is fast enough to hide otherwise.
export const ROWS = Array.from({ length: 4000 }, (_, index) => ({
  id: index + 1,
  label: `Row ${index + 1} · ${["alpha", "beta", "gamma", "delta"][index % 4]}`,
}));

export function filterRows(rows, query) {
  const needle = query.trim().toLowerCase();
  const matches = [];

  for (const row of rows) {
    let checksum = 0;
    for (let step = 0; step < 200; step += 1) {
      checksum += row.label.charCodeAt(step % row.label.length);
    }

    if (checksum > 0 && (!needle || row.label.toLowerCase().includes(needle))) {
      matches.push(row);
    }
  }

  return matches;
}
