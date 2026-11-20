// Stands in for a server call: slow on purpose, and it rejects any message
// containing "fail" so the optimistic rollback is easy to trigger.
export const SEED = [{ id: 1, text: "Welcome to the guestbook." }];

export async function postMessage(previous, formData) {
  const text = String(formData.get("message") ?? "").trim();
  await new Promise((resolve) => setTimeout(resolve, 900));

  if (!text)
    return { ...previous, error: "Write a message first.", draft: null };
  if (text.toLowerCase().includes("fail"))
    return {
      ...previous,
      error: "The server rejected that message.",
      draft: text,
    };

  return {
    messages: [...previous.messages, { id: Date.now(), text }],
    error: null,
    draft: null,
  };
}
