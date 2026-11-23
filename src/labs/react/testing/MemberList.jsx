export default function MemberList({ members }) {
  return (
    <ul aria-label="Members" className="space-y-2">
      {members.map((member) => (
        <li
          key={member.id}
          className="flex items-center justify-between rounded-lg border border-line bg-surface px-3 py-2 text-sm"
        >
          <span className="text-ink">{member.name}</span>
          <span className="text-xs text-ink-muted">{member.role}</span>
        </li>
      ))}
    </ul>
  );
}
