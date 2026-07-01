export default function ComingSoon({ feature }: { feature: string }) {
  return (
    <div className="card border-dashed text-center">
      <p className="font-display text-lg font-semibold text-purple-deep">{feature} — connect this next</p>
      <p className="mx-auto mt-2 max-w-md text-sm text-muted">
        The layout is wired up. Follow the pattern in{" "}
        <code className="rounded bg-purple-faint px-1 py-0.5 text-xs">app/admin/students/page.tsx</code>{" "}
        to pull real data from Supabase for this section.
      </p>
    </div>
  );
}
