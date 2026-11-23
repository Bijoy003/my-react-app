export type Role = "engineer" | "designer" | "writer";

export interface Member {
  id: number;
  name: string;
  role: Role;
  active: boolean;
}
