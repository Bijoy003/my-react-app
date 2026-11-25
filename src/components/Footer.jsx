import { footerLinks } from "../data/basics";
import Code from "./Code";

export default function Footer() {
  return (
    <footer className="border-t border-line px-6 py-10">
      <div className="mx-auto flex max-w-[100rem] flex-col gap-4 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p>
          React 19 + Vite. One folder per lesson under <Code>src/labs</Code>.
        </p>

        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {footerLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="hover:text-ink"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
