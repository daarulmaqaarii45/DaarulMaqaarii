import PageHeader from "@/components/admin/PageHeader";
import ComingSoon from "@/components/admin/ComingSoon";

export default function ClassesPage() {
  return (
    <div>
      <PageHeader title="Classes" description="Manage class levels, capacity and assigned teacher." />
      <ComingSoon feature="Classes" />
    </div>
  );
}
