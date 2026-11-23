import { create } from "zustand";

const SEED = [
  { id: "book-1", title: "Refactoring UI", read: true },
  { id: "book-2", title: "Thinking in Systems", read: false },
];

// create() returns a hook, but the state itself lives outside React. Any
// component can subscribe; no provider is needed.
export const useReadingList = create((set) => ({
  books: SEED,
  filter: "all",

  add: (title) =>
    set((state) => ({
      books: [...state.books, { id: crypto.randomUUID(), title, read: false }],
    })),

  toggle: (id) =>
    set((state) => ({
      books: state.books.map((book) =>
        book.id === id ? { ...book, read: !book.read } : book,
      ),
    })),

  remove: (id) =>
    set((state) => ({
      books: state.books.filter((book) => book.id !== id),
    })),

  setFilter: (filter) => set({ filter }),
}));
