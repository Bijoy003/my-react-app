import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// Test APIs are imported explicitly rather than made global, so React Testing
// Library cannot register its own cleanup. Unmount after every test instead:
// a leftover tree would keep answering queries.
afterEach(cleanup);
