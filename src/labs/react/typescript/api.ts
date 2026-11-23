import type { Member } from "./types";

const MEMBERS: Member[] = [
  { id: 1, name: "Ada Lovelace", role: "engineer", active: true },
  { id: 2, name: "Grace Hopper", role: "engineer", active: false },
  { id: 3, name: "Dieter Rams", role: "designer", active: true },
  { id: 4, name: "Ursula Le Guin", role: "writer", active: false },
];

// Stands in for a JSON endpoint. The return type is the contract the rest of
// the feature is typed against.
export async function fetchMembers(): Promise<Member[]> {
  await new Promise((resolve) => setTimeout(resolve, 450));
  return MEMBERS.map((member) => ({ ...member }));
}
