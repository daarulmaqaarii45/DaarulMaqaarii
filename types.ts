import PageHeader from "@/components/admin/PageHeader";
import ComingSoon from "@/components/admin/ComingSoon";

export default function TeachersPage() {
  return (
    <div>
      <PageHeader title="Teachers" description="Staff directory, subjects and classes assigned." />
      <ComingSoon feature="Teachers" />
    </div>
  );
}
