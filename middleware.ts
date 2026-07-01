import PageHeader from "@/components/admin/PageHeader";
import ComingSoon from "@/components/admin/ComingSoon";

export default function ReportsPage() {
  return (
    <div>
      <PageHeader title="Reports" description="Term summaries and export options." />
      <ComingSoon feature="Reports" />
    </div>
  );
}
