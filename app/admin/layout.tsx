import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Sidebar from "@/components/admin/Sidebar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, role")
    .eq("id", user.id)
    .single();

  // Middleware already blocks non-staff, but guard again here in case this
  // layout renders before a fresh session propagates.
  if (!profile || !["admin", "teacher"].includes(profile.role)) redirect("/login");

  return (
    <div className="flex min-h-screen bg-parchment">
      <Sidebar fullName={profile.full_name} role={profile.role} />
      <main className="flex-1 overflow-y-auto p-8">{children}</main>
    </div>
  );
}