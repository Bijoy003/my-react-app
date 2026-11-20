import { Link } from "react-router-dom";
import Code from "../components/Code";

export default function NotFoundPage() {
  return (
    <div className="py-16">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
        404
      </p>
      <h1 className="mt-3 text-3xl font-semibold text-ink">
        That lesson has not been written yet.
      </h1>
      <p className="mt-3 max-w-xl leading-relaxed">
        The topic may still be a placeholder on the map. A lesson only exists
        once its folder under <Code>src/labs</Code> does.
      </p>
      <Link
        to="/"
        className="mt-8 inline-block rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
      >
        Back to the map
      </Link>
    </div>
  );
}
