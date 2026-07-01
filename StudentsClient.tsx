import { createClient } from "@/lib/supabase/server";
import StatCard from "@/components/admin/StatCard";
import PageHeader from "@/components/admin/PageHeader";
import Link from "next/link";

export default async function DashboardPage() {
  const supabase = createClient();

  const [{ count: studentCount }, { count: teacherCount }, { data: fees }, { data: attendanceToday }] =
    await Promise.all([
      supabase.from("students").select("*", { count: "exact", head: true }),
      supabase.from("profiles").select("*", { count: "exact", head: true }).eq("role", "teacher"),
      supabase.from("fees").select("amount_due, amount_paid"),
      supabase.from("attendance").select("status").eq("date", new Date().toISOString().slice(0, 10))
    ]);

  const totalDue = fees?.reduce((sum, f) => sum + Number(f.amount_due), 0) ?? 0;
  const totalPaid = fees?.reduce((sum, f) => sum + Number(f.amount_paid), 0) ?? 0;

  const presentToday = attendanceToday?.filter((a) => a.status === "present").length ?? 0;
  const attendanceRate =
    attendanceToday && attendanceToday.length > 0
      ? Math.round((presentToday / attendanceToday.length) * 100)
      : null;

  return (
    <div>
      <PageHeader title="Dashboard" description="Live overview of the school, pulled straight from Supabase." />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Students" value={studentCount ?? 0} hint="Total enrolled" />
        <StatCard label="Teachers" value={teacherCount ?? 0} hint="Active staff" />
        <StatCard
          label="Attendance today"
          value={attendanceRate !== null ? `${attendanceRate}%` : "No data yet"}
          hint={attendanceToday ? `${presentToday}/${attendanceToday.length} marked present` : "Register hasn't been taken today"}
        />
        <StatCard
          label="Fees collected"
          value={`₦${totalPaid.toLocaleString()}`}
          hint={`₦${(totalDue - totalPaid).toLocaleString()} outstanding`}
        />
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <Link href="/admin/students" className="btn-primary justify-self-start">Enrol a student</Link>
        <Link href="/admin/attendance" className="btn-ghost justify-self-start">Take attendance</Link>
        <Link href="/admin/fees" className="btn-ghost justify-self-start">Record a payment</Link>
      </div>

      {studentCount === 0 && (
        <p className="mt-8 text-sm text-muted">
          No data yet — this dashboard reads live from your Supabase tables.
          Enrol your first student, or run the seed data in{" "}
          <code className="rounded bg-purple-faint px-1 py-0.5 text-xs">supabase/schema.sql</code>.
        </p>
      )}
    </div>
  );
}
