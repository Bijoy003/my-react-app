import { Link } from "react-router-dom";
import Card from "./Card";

// Optional `href` turns the whole card into a link. Everything else stays
// the same, which is the point of keeping presentation in one component.
export default function Feature({ icon, title, text, href }) {
  const card = (
    <Card
      className={`h-full ${
        href ? "transition-colors group-hover:border-accent" : ""
      }`}
    >
      <span
        aria-hidden="true"
        className="mb-4 inline-flex h-10 min-w-10 items-center justify-center rounded-lg bg-accent/10 px-2 font-mono text-sm text-accent"
      >
        {icon}
      </span>
      <h3 className="text-lg font-semibold text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed">{text}</p>
      <p
        className={`mt-4 text-xs font-medium ${
          href ? "text-accent" : "text-ink-muted"
        }`}
      >
        {href ? "Open the lesson →" : "Notes coming soon"}
      </p>
    </Card>
  );

  return href ? (
    <Link to={href} className="group block h-full">
      {card}
    </Link>
  ) : (
    card
  );
}
