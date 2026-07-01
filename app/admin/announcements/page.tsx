
import PageHeader from "@/components/admin/PageHeader";
import ComingSoon from "@/components/admin/ComingSoon";

export default function AnnouncementsPage() {
  return (
    <div>
      <PageHeader title="Announcements" description="Create and target notices to students, parents or teachers." />
      <ComingSoon feature="Announcements" />
    </div>
  );
}
