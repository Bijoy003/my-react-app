import { useState } from "react";
import Code from "../../../components/Code";

const TOPICS = [
  { id: "jsx", title: "JSX", level: "core" },
  { id: "components", title: "Functional components", level: "core" },
  { id: "props", title: "Props", level: "core" },
  { id: "composition", title: "Composition", level: "core" },
  {
    id: "conditional-rendering",
    title: "Conditional rendering",
    level: "core",
  },
  { id: "use-state", title: "useState", level: "hooks" },
];

const FILTERS = ["all", "core", "hooks"];

function TopicRow({ topic }) {
  const [starred, setStarred] = useState(false);

  return (
    <li className="flex items-center justify-between gap-3 rounded-lg border border-line bg-surface px-3 py-2">
      <span className="text-sm font-medium text-ink">{topic.title}</span>
      <button
        type="button"
        aria-pressed={starred}
        aria-label={`${starred ? "Unstar" : "Star"} ${topic.title}`}
        onClick={() => setStarred((current) => !current)}
        className={`text-lg leading-none ${
          starred ? "text-accent" : "text-ink-muted hover:text-ink"
        }`}
      >
        {starred ? "★" : "☆"}
      </button>
    </li>
  );
}

export default function Demo() {
  const [filter, setFilter] = useState("all");
  const [byIndex, setByIndex] = useState(false);

  // Filter first, then map: the array only contains rows that will be shown.
  const visible = TOPICS.filter(
    (topic) => filter === "all" || topic.level === filter,
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((option) => (
          <button
            key={option}
            type="button"
            aria-pressed={filter === option}
            onClick={() => setFilter(option)}
            className={`rounded-lg border px-3 py-1.5 font-mono text-xs transition-colors ${
              filter === option
                ? "border-accent bg-accent/10 text-accent"
                : "border-line text-ink-muted hover:text-ink"
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      <ul className="grid gap-2 sm:grid-cols-2">
        {visible.map((topic, index) => (
          <TopicRow key={byIndex ? index : topic.id} topic={topic} />
        ))}
      </ul>

      <label className="flex w-fit items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={byIndex}
          onChange={(event) => setByIndex(event.target.checked)}
          className="size-4 accent-[var(--color-accent)]"
        />
        Use the index as the key
      </label>

      <p className="text-sm leading-relaxed">
        Star <Code>JSX</Code>, then filter to <Code>hooks</Code>. With{" "}
        <Code>topic.id</Code> the star stays behind; with the index it jumps to
        the row that takes the same position.
      </p>
    </div>
  );
}
