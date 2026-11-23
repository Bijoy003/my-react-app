import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { armFailure, fetchMembers } from "./api";
import Demo from "./Demo";

// Replacing the module keeps the network out of the tests: every test decides
// what the "server" returns before rendering.
vi.mock("./api", () => ({
  armFailure: vi.fn(),
  fetchMembers: vi.fn(),
}));

const members = [
  { id: 1, name: "Ada Lovelace", role: "Engineer" },
  { id: 2, name: "Grace Hopper", role: "Engineer" },
];

beforeEach(() => {
  vi.clearAllMocks();
});

describe("member directory", () => {
  it("shows a loading state until the request settles", () => {
    // A promise that never resolves leaves the component in its first state.
    fetchMembers.mockReturnValue(new Promise(() => {}));
    render(<Demo />);

    expect(screen.getByRole("status")).toHaveTextContent("Loading members");
  });

  it("renders the members after a successful request", async () => {
    fetchMembers.mockResolvedValue(members);
    render(<Demo />);

    expect(await screen.findByText("Ada Lovelace")).toBeInTheDocument();
    expect(screen.getByText("Grace Hopper")).toBeInTheDocument();
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
    expect(fetchMembers).toHaveBeenCalledTimes(1);
  });

  it("shows the server's message when the request fails", async () => {
    fetchMembers.mockRejectedValue(
      new Error("The member service is unavailable."),
    );
    render(<Demo />);

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "The member service is unavailable.",
    );
  });

  it("retries after a failure and then shows the members", async () => {
    const user = userEvent.setup();
    fetchMembers
      .mockRejectedValueOnce(new Error("The member service is unavailable."))
      .mockResolvedValueOnce(members);
    render(<Demo />);

    await user.click(await screen.findByRole("button", { name: "Try again" }));

    expect(await screen.findByText("Ada Lovelace")).toBeInTheDocument();
    expect(fetchMembers).toHaveBeenCalledTimes(2);
  });

  it("filters the list as the user types", async () => {
    const user = userEvent.setup();
    fetchMembers.mockResolvedValue(members);
    render(<Demo />);
    await screen.findByText("Ada Lovelace");

    await user.type(
      screen.getByRole("searchbox", { name: "Filter by name" }),
      "grace",
    );

    expect(screen.queryByText("Ada Lovelace")).not.toBeInTheDocument();
    expect(screen.getByText("Grace Hopper")).toBeInTheDocument();
  });

  it("arms one failure from the fake server", async () => {
    const user = userEvent.setup();
    fetchMembers.mockResolvedValue(members);
    render(<Demo />);
    await screen.findByText("Ada Lovelace");

    await user.click(
      screen.getByRole("button", { name: "Simulate a failure" }),
    );

    expect(armFailure).toHaveBeenCalledWith(true);
  });
});
