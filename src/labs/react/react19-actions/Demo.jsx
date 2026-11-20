import { useActionState, useOptimistic } from "react";
// useFormStatus lives in react-dom, not react — importing it from react
// yields undefined and crashes the demo on render.
import { useFormStatus } from "react-dom";
import { SEED, postMessage } from "./api";

// useFormStatus only works in a component rendered inside the form.
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
    >
      {pending ? "Posting…" : "Post message"}
    </button>
  );
}

export default function Demo() {
  const [state, dispatch, isPending] = useActionState(postMessage, {
    messages: SEED,
    error: null,
    draft: null,
  });
  const [optimisticMessages, addOptimistic] = useOptimistic(
    state.messages,
    (current, text) => [
      ...current,
      { id: `sending-${current.length}`, text, sending: true },
    ],
  );

  async function submit(formData) {
    const text = String(formData.get("message") ?? "").trim();
    if (text) addOptimistic(text);
    return dispatch(formData);
  }

  return (
    <div className="space-y-4">
      <form action={submit} className="flex max-w-md gap-2">
        <input
          name="message"
          defaultValue={state.draft ?? ""}
          placeholder="Leave a message…"
          aria-label="Message"
          className="min-w-0 flex-1 rounded-lg border border-line bg-surface px-3 py-2 text-sm text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        />
        <SubmitButton />
      </form>

      {state.error && (
        <p role="alert" className="text-sm text-accent">
          {state.error}
        </p>
      )}

      <ul className="space-y-2">
        {optimisticMessages.map((message) => (
          <li
            key={message.id}
            className={`rounded-lg border px-3 py-2 text-sm ${
              message.sending
                ? "border-dashed border-line text-ink-muted"
                : "border-line bg-surface text-ink"
            }`}
          >
            {message.text}
            {message.sending && (
              <span className="ml-2 font-mono text-xs">sending…</span>
            )}
          </li>
        ))}
      </ul>

      <p className="text-xs text-ink-muted">
        Include the word "fail" to watch the optimistic row roll back.
        {isPending ? " Action pending." : ""}
      </p>
    </div>
  );
}
