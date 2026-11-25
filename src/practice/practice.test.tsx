import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { createRecipe, deleteRecipe, listRecipes } from "./api";
import PracticeLayout from "./PracticeLayout";
import RecipeDetailPage from "./RecipeDetailPage";
import RecipeFormPage from "./RecipeFormPage";
import RecipeListPage from "./RecipeListPage";
import type { Recipe } from "./types";

// The feature talks to one module, so replacing it keeps the fake server's
// timers and failures out of the tests.
vi.mock("./api", () => ({
  listRecipes: vi.fn(),
  createRecipe: vi.fn(),
  updateRecipe: vi.fn(),
  deleteRecipe: vi.fn(),
  isOffline: vi.fn(() => false),
  setOffline: vi.fn(),
}));

const stored: Recipe[] = [
  {
    id: 1,
    title: "Mushroom risotto",
    minutes: 35,
    level: "medium",
    notes: "Keep the stock warm.",
  },
  {
    id: 2,
    title: "Chocolate rye cookies",
    minutes: 30,
    level: "hard",
    notes: "Chill the dough overnight.",
  },
];

function renderAt(path: string) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route path="/practice" element={<PracticeLayout />}>
            <Route index element={<RecipeListPage />} />
            <Route path="new" element={<RecipeFormPage />} />
            <Route path=":id" element={<RecipeDetailPage />} />
            <Route path=":id/edit" element={<RecipeFormPage />} />
          </Route>
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>,
  );
}

beforeEach(() => {
  vi.clearAllMocks();
});

describe("recipe box", () => {
  it("loads the list and filters it as the user types", async () => {
    const user = userEvent.setup();
    vi.mocked(listRecipes).mockResolvedValue(stored);
    renderAt("/practice");

    expect(screen.getByRole("status")).toHaveTextContent("Loading recipes");
    expect(await screen.findByText("Mushroom risotto")).toBeInTheDocument();

    await user.type(
      screen.getByRole("searchbox", { name: "Filter recipes" }),
      "cookie",
    );

    expect(screen.queryByText("Mushroom risotto")).not.toBeInTheDocument();
    expect(screen.getByText("Chocolate rye cookies")).toBeInTheDocument();
  });

  it("opens a recipe and shows its notes", async () => {
    const user = userEvent.setup();
    vi.mocked(listRecipes).mockResolvedValue(stored);
    renderAt("/practice");

    await user.click(
      await screen.findByRole("link", { name: "Mushroom risotto" }),
    );

    expect(
      await screen.findByRole("heading", { name: "Mushroom risotto" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Keep the stock warm.")).toBeInTheDocument();
  });

  it("blocks an invalid form before calling the API", async () => {
    const user = userEvent.setup();
    vi.mocked(listRecipes).mockResolvedValue(stored);
    renderAt("/practice/new");

    await user.click(screen.getByRole("button", { name: "Add recipe" }));

    expect(
      await screen.findByText(
        "Give the recipe a title of at least 3 characters.",
      ),
    ).toBeInTheDocument();
    expect(createRecipe).not.toHaveBeenCalled();
  });

  it("creates a recipe and navigates to it", async () => {
    const user = userEvent.setup();
    const created: Recipe = {
      id: 9,
      title: "Tomato soup",
      minutes: 20,
      level: "easy",
      notes: "Blend while hot.",
    };
    vi.mocked(listRecipes).mockResolvedValue([...stored, created]);
    vi.mocked(createRecipe).mockResolvedValue(created);
    renderAt("/practice/new");

    await user.type(screen.getByLabelText("Title"), "Tomato soup");
    await user.clear(screen.getByLabelText("Minutes"));
    await user.type(screen.getByLabelText("Minutes"), "20");
    await user.type(screen.getByLabelText("Notes"), "Blend while hot.");
    await user.click(screen.getByRole("button", { name: "Add recipe" }));

    expect(createRecipe).toHaveBeenCalledWith({
      title: "Tomato soup",
      minutes: 20,
      level: "easy",
      notes: "Blend while hot.",
    });
    expect(
      await screen.findByRole("heading", { name: "Tomato soup" }),
    ).toBeInTheDocument();
  });

  it("removes a recipe through the API", async () => {
    const user = userEvent.setup();
    vi.mocked(listRecipes).mockResolvedValue(stored);
    vi.mocked(deleteRecipe).mockResolvedValue({ id: 1 });
    renderAt("/practice");

    await user.click(
      await screen.findByRole("button", { name: "Remove Mushroom risotto" }),
    );

    expect(deleteRecipe).toHaveBeenCalledWith(1, expect.anything());
  });
});
