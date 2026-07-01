import PageHeader from "@/components/admin/PageHeader";
import ComingSoon from "@/components/admin/ComingSoon";

export default function FeesPage() {
  return (
    <div>
      <PageHeader title="Fees & Payments" description="Record payments, print receipts, track outstanding balances." />
      <ComingSoon feature="Fees & Payments" />
    </div>
  );
}
