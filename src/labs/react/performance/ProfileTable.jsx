export default function ProfileTable({ profiles }) {
  if (profiles.length === 0) {
    return (
      <p className="text-sm leading-relaxed text-ink-muted">
        Press “Re-render parent” a few times and capture. Then switch the cache
        on, repeat the same presses and capture again — the table keeps the last
        two profiles so the comparison is side by side.
      </p>
    );
  }

  return (
    <table className="w-full text-left text-xs">
      <caption className="pb-2 text-left text-ink-muted">
        Captured commits. Times are the Profiler's actualDuration, in
        milliseconds.
      </caption>
      <thead>
        <tr className="border-b border-line text-ink">
          <th scope="col" className="py-1 font-medium">
            Mode
          </th>
          <th scope="col" className="py-1 text-right font-medium">
            Commits
          </th>
          <th scope="col" className="py-1 text-right font-medium">
            Average
          </th>
          <th scope="col" className="py-1 text-right font-medium">
            Worst
          </th>
        </tr>
      </thead>
      <tbody>
        {profiles.map((profile, index) => (
          <tr key={`${profile.mode}-${index}`} className="border-b border-line">
            <th scope="row" className="py-1 font-normal text-ink">
              {profile.mode}
            </th>
            <td className="py-1 text-right">{profile.commits}</td>
            <td className="py-1 text-right">{profile.average.toFixed(1)} ms</td>
            <td className="py-1 text-right">{profile.worst.toFixed(1)} ms</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
