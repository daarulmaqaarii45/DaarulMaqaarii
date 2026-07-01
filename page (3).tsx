import PageHeader from "@/components/admin/PageHeader";
import ComingSoon from "@/components/admin/ComingSoon";

export default function CertificatesPage() {
  return (
    <div>
      <PageHeader title="Certificates" description="Live-preview and print admission letters, report cards, Tahfiz certificates." />
      <ComingSoon feature="Certificates" />
    </div>
  );
}
