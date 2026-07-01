import { createClient } from "@/lib/supabase/server";
import PageHeader from "@/components/admin/PageHeader";
import StudentsClient from "./StudentsClient";

export default async function StudentsPage() {
  const supabase = createClient();

  const [{ data: students }, { data: classes }] = await Promise.all([
    supabase
      .from("students")
      .select("id, admission_no, full_name, class_id, guardian_name, guardian_phone, fee_status, enrolled_at, classes(name)")
      .order("full_name"),
    supabase.from("classes").select("id, name, level, capacity").order("name")
  ]);

  return (
    <div>
      <PageHeader
        title="Students"
        description="Enrol students, search the register, and track fee status — all live in Supabase."
      />
      <StudentsClient initialStudents={(students as any) ?? []} classes={classes ?? []} />
    </div>
  );
}
