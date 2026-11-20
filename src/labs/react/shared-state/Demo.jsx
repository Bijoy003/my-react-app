import { useReducer } from "react";
import { BasketContext, PRODUCTS, basketReducer, useBasket } from "./basket";

function ProductRow({ product }) {
  const { dispatch } = useBasket();
  return (
    <li className="flex items-center justify-between gap-3 rounded-lg border border-line bg-surface px-3 py-2">
      <span className="text-sm font-medium text-ink">
        {product.name}{" "}
        <span className="font-normal text-ink-muted">
          £{product.price.toFixed(2)}
        </span>
      </span>
      <button
        type="button"
        onClick={() => dispatch({ type: "add", product })}
        className="rounded-lg border border-line px-2 py-1 text-xs transition-colors hover:border-accent hover:text-accent"
      >
        Add
      </button>
    </li>
  );
}

function BasketPanel() {
  const { items, dispatch } = useBasket();
  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <section aria-label="Basket" className="rounded-xl border border-line p-4">
      <h3 className="font-semibold text-ink">Basket</h3>
      {items.length === 0 ? (
        <p className="mt-2 text-sm">Nothing yet — add a tea.</p>
      ) : (
        <ul className="mt-2 space-y-1 text-sm">
          {items.map((item) => (
            <li key={item.id} className="flex justify-between gap-2">
              <span>
                {item.name} × {item.qty}
              </span>
              <button
                type="button"
                aria-label={`Remove ${item.name}`}
                onClick={() => dispatch({ type: "remove", id: item.id })}
                className="text-xs text-ink-muted hover:text-accent"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
      <p className="mt-3 font-mono text-sm text-ink">
        Total £{total.toFixed(2)}
      </p>
    </section>
  );
}

export default function Demo() {
  const [items, dispatch] = useReducer(basketReducer, []);

  return (
    <BasketContext.Provider value={{ items, dispatch }}>
      <div className="grid gap-4 sm:grid-cols-2">
        <ul className="space-y-2">
          {PRODUCTS.map((product) => (
            <ProductRow key={product.id} product={product} />
          ))}
        </ul>
        <BasketPanel />
      </div>
      <p className="mt-4 text-sm leading-relaxed">
        Two siblings, one state: the rows dispatch, the basket reads — no props
        pass between them.
      </p>
    </BasketContext.Provider>
  );
}
