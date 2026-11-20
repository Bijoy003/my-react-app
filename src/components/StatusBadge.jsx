const STYLES = {
  open: "bg-emerald-500/10 text-emerald-600",
  "few-seats": "bg-amber-500/10 text-amber-600",
  waitlist: "bg-rose-500/10 text-rose-600",
};

const LABELS = {
  open: "Enrolling now",
  "few-seats": "Few seats left",
  waitlist: "Waitlist",
};

// Conditional rendering, three ways in one small component:
//   1. an early `return null` when the status is missing or unknown,
//   2. `&&` for the optional detail text,
//   3. a lookup instead of a chain of ternaries for the label and colours.
export default function StatusBadge({ status, detail }) {
  if (!status || !LABELS[status]) return null;

  return (
    <p
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${STYLES[status]}`}
    >
      <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
      {LABELS[status]}
      {status !== "open" && detail && (
        <span className="opacity-70">· {detail}</span>
      )}
    </p>
  );
}
