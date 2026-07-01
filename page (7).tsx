import PageHeader from "@/components/admin/PageHeader";
import ComingSoon from "@/components/admin/ComingSoon";

export default function TimetablePage() {
  return (
    <div>
      <PageHeader title="Timetable" description="Weekly class schedule, printable per class." />
      <ComingSoon feature="Timetable" />
    </div>
  );
}
