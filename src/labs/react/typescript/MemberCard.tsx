import type { Member } from "./types";

interface MemberCardProps {
  member: Member;
}

const ROLE_LABELS: Record<Member["role"], string> = {
  engineer: "Engineer",
  designer: "Designer",
  writer: "Writer",
};

export default function MemberCard({ member }: MemberCardProps) {
  return (
    <li className="rounded-lg border border-line bg-surface px-3 py-2">
      <p className="text-sm font-medium text-ink">{member.name}</p>
      <p className="mt-1 flex items-center gap-2 text-xs text-ink-muted">
        {ROLE_LABELS[member.role]}
        <span
          className={`rounded-full px-2 py-0.5 ${
            member.active
              ? "bg-accent/10 text-accent"
              : "border border-line text-ink-muted"
          }`}
        >
          {member.active ? "Active" : "Away"}
        </span>
      </p>
    </li>
  );
}
