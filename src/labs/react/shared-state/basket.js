import { createContext, useContext } from "react";

export const PRODUCTS = [
  { id: "earl-grey", name: "Earl Grey", price: 3.2 },
  { id: "breakfast", name: "English Breakfast", price: 2.8 },
  { id: "chamomile", name: "Chamomile", price: 3.6 },
];

export const BasketContext = createContext(null);

// Related transitions in one place: every change to the basket is an action.
export function basketReducer(items, action) {
  switch (action.type) {
    case "add": {
      const found = items.find((item) => item.id === action.product.id);
      return found
        ? items.map((item) =>
            item.id === found.id ? { ...item, qty: item.qty + 1 } : item,
          )
        : [...items, { ...action.product, qty: 1 }];
    }
    case "remove":
      return items.filter((item) => item.id !== action.id);
    default:
      return items;
  }
}

export function useBasket() {
  const basket = useContext(BasketContext);
  if (!basket) throw new Error("useBasket needs the BasketContext provider");
  return basket;
}
