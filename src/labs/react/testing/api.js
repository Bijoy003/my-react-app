// A fake member service with latency and a one-shot failure switch. The tests
// replace this whole module, so the demo is the only thing that ever runs it.
const MEMBERS = [
  { id: 1, name: "Ada Lovelace", role: "Engineer" },
  { id: 2, name: "Grace Hopper", role: "Engineer" },
  { id: 3, name: "Alan Turing", role: "Researcher" },
];

let armed = false;

export function armFailure(value) {
  armed = value;
}

export async function fetchMembers() {
  await new Promise((resolve) => setTimeout(resolve, 300));
  if (armed) {
    // Fail once, then clear the flag so "Try again" can succeed.
    armed = false;
    throw new Error("The member service is unavailable.");
  }
  return structuredClone(MEMBERS);
}
