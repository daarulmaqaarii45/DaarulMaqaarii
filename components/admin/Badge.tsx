const STYLES: Record<string, string> = {
  paid: "bg-green-50 text-success border-success/30",
  partial: "bg-yellow-50 text-gold border-gold/40",
  owing: "bg-red-50 text-danger border-danger/30",
  present: "bg-green-50 text-success border-success/30",
  absent: "bg-red-50 text-danger border-danger/30",
  late: "bg-yellow-50 text-gold border-gold/40"
};

export default function Badge({ status }: { status: string }) {
  return (
    <span className={`inline-block rounded-full border px-2.5 py-0.5 text-xs font-semibold capitalize ${STYLES[status] ?? "bg-gray-50 text-muted border-border"}`}>
      {status}
    </span>
  );
}
