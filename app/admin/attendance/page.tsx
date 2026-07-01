
import PageHeader from "@/components/admin/PageHeader";
import ComingSoon from "@/components/admin/ComingSoon";

export default function AttendancePage() {
  return (
    <div>
      <PageHeader title="Attendance" description="Daily present/absent/late register per class." />
      <ComingSoon feature="Attendance" />
    </div>
  );
}
