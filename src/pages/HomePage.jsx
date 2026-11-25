import { Link } from "react-router-dom";
import Card from "../components/Card";
import Code from "../components/Code";
import Feature from "../components/Feature";
import Hero from "../components/Hero";
import Section from "../components/Section";
import { features } from "../data/basics";
import { firstLab, labs } from "../labs/registry";

export default function HomePage() {
  const lessonCount = labs.length;

  return (
    <>
      <Hero
        eyebrow="A React 19 + Vite learning lab"
        title="Every topic gets a demo and a short note."
        subtitle="This project grows one lesson at a time. A lesson is a folder with a live demo, an explanation of how it works, and nothing else — so the examples never drift away from the notes."
      >
        {firstLab && (
          <Link
            to={`/labs/${firstLab.track}/${firstLab.id}`}
            className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            Start with {firstLab.title}
          </Link>
        )}
        <a
          href="#concepts"
          className="rounded-lg border border-line px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-surface-muted"
        >
          Browse the concepts
        </a>
      </Hero>

      <Section
        id="concepts"
        eyebrow="01 — Concepts"
        title="The map"
        intro={`${lessonCount} lesson${lessonCount === 1 ? "" : "s"} written so far. Every card opens a live demo and its notes.`}
      >
        <ul className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {features.map((feature) => (
            <li key={feature.id}>
              <Feature {...feature} />
            </li>
          ))}
        </ul>
      </Section>

      <Section
        id="structure"
        eyebrow="02 — Structure"
        title="How a lesson is stored"
        intro="Three files in one folder. The registry discovers them automatically, so adding a topic never means editing shared code."
      >
        <div className="grid gap-6 sm:grid-cols-3">
          <Card title="Demo.jsx">
            <p className="text-sm leading-relaxed">
              The live example. Interactive where it helps, under eighty lines,
              one idea per file.
            </p>
          </Card>

          <Card title="Notes.jsx">
            <p className="text-sm leading-relaxed">
              What it is, how it works, and the gotcha worth remembering.
              Written in the same JSX system as the demo.
            </p>
          </Card>

          <Card title="lab.js">
            <p className="text-sm leading-relaxed">
              Metadata: id, track, order, title, summary, plus the{" "}
              <Code>Demo</Code> and <Code>Notes</Code> it exports.
            </p>
          </Card>
        </div>

        <p className="mt-6 max-w-2xl text-sm leading-relaxed">
          The registry in <Code>src/labs/registry.js</Code> uses{" "}
          <Code>{"import.meta.glob('./**/lab.js')"}</Code> to find every lesson
          folder at build time. Create{" "}
          <Code>src/labs/react/error-boundaries/lab.js</Code> and the lesson
          appears in the sidebar and at its own URL, with no other edits.
        </p>
      </Section>
      <Section
        id="practice"
        eyebrow="03 — Practice"
        title="Put the pieces together"
        intro="Every module ends with something real. The recipe box is the Phase 5 exercise: one small CRUD app built from the lessons, with routes, typed data, a validated form and tests."
      >
        <div className="grid gap-6 sm:grid-cols-2">
          <Card title="Recipe box">
            <p className="text-sm leading-relaxed">
              Browse, filter, add, edit and remove recipes against a fake API.
              The list, detail and form are three nested routes, and each write
              invalidates the shared query cache.
            </p>
            <Link
              to="/practice"
              className="mt-4 inline-block text-xs font-medium text-accent hover:underline"
            >
              Open the practice app →
            </Link>
          </Card>

          <Card title="What it exercises">
            <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed">
              <li>Nested routes and URL parameters</li>
              <li>TanStack Query with cache invalidation</li>
              <li>React Hook Form and a Zod schema, typed end to end</li>
              <li>Five Vitest cases against a mocked API</li>
            </ul>
          </Card>
        </div>
      </Section>
    </>
  );
}
