export default function StatCard({ label, value, hint }: { label: string; value: string | number; hint?: string }) {
  return (
    <div className="card">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted">{label}</p>
      <p className="mt-2 font-display text-3xl font-bold text-purple-deep">{value}</p>
      {hint && <p className="mt-1 text-xs text-muted">{hint}</p>}
    </div>
  );
}
