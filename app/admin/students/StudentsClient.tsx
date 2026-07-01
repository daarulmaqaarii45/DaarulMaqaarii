"use client";

import { useMemo, useState, useTransition } from "react";
import Badge from "@/components/admin/Badge";
import { addStudent, deleteStudent, updateFeeStatus } from "./actions";
import type { ClassRow, Student } from "@/lib/types";

export default function StudentsClient({
  initialStudents,
  classes
}: {
  initialStudents: Student[];
  classes: ClassRow[];
}) {
  const [query, setQuery] = useState("");
  const [classFilter, setClassFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const filtered = useMemo(() => {
    return initialStudents.filter((s) => {
      const matchesQuery =
        s.full_name.toLowerCase().includes(query.toLowerCase()) ||
        s.admission_no.toLowerCase().includes(query.toLowerCase());
      const matchesClass = classFilter === "all" || s.class_id === classFilter;
      return matchesQuery && matchesClass;
    });
  }, [initialStudents, query, classFilter]);

  async function handleSubmit(formData: FormData) {
    setError(null);
    const result = await addStudent(formData);
    if (result?.error) {
      setError(result.error);
    } else {
      setShowForm(false);
    }
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <input
          className="input max-w-xs"
          placeholder="Search by name or admission no."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select className="input max-w-xs" value={classFilter} onChange={(e) => setClassFilter(e.target.value)}>
          <option value="all">All classes</option>
          {classes.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
        <button className="btn-primary ml-auto" onClick={() => setShowForm((v) => !v)}>
          {showForm ? "Cancel" : "Enrol student"}
        </button>
      </div>

      {showForm && (
        <form action={handleSubmit} className="card mb-6 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="label" htmlFor="full_name">Full name</label>
            <input className="input" id="full_name" name="full_name" required />
          </div>
          <div>
            <label className="label" htmlFor="class_id">Class</label>
            <select className="input" id="class_id" name="class_id">
              <option value="">Unassigned</option>
              {classes.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label" htmlFor="date_of_birth">Date of birth</label>
            <input className="input" id="date_of_birth" name="date_of_birth" type="date" />
          </div>
          <div>
            <label className="label" htmlFor="guardian_name">Guardian name</label>
            <input className="input" id="guardian_name" name="guardian_name" />
          </div>
          <div>
            <label className="label" htmlFor="guardian_phone">Guardian phone</label>
            <input className="input" id="guardian_phone" name="guardian_phone" />
          </div>
          <div className="flex items-end">
            <button type="submit" className="btn-primary" disabled={isPending}>
              {isPending ? "Saving…" : "Save student"}
            </button>
          </div>
          {error && <p className="text-sm text-danger sm:col-span-2">{error}</p>}
          <p className="text-xs text-muted sm:col-span-2">
            Admission number is generated automatically on save.
          </p>
        </form>
      )}

      <div className="card overflow-x-auto p-0">
        <table className="w-full text-left text-sm">
          <thead className="bg-purple-faint text-xs uppercase tracking-wide text-purple-deep">
            <tr>
              <th className="px-4 py-3">Admission No.</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Class</th>
              <th className="px-4 py-3">Guardian</th>
              <th className="px-4 py-3">Fee status</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((s) => (
              <tr key={s.id} className="border-t border-border">
                <td className="px-4 py-3 font-mono text-xs">{s.admission_no}</td>
                <td className="px-4 py-3 font-medium">{s.full_name}</td>
                <td className="px-4 py-3">{s.classes?.name ?? "—"}</td>
                <td className="px-4 py-3 text-muted">
                  {s.guardian_name ?? "—"}
                  {s.guardian_phone ? ` · ${s.guardian_phone}` : ""}
                </td>
                <td className="px-4 py-3">
                  <select
                    className="rounded-md border border-border bg-white px-2 py-1 text-xs"
                    value={s.fee_status}
                    onChange={(e) =>
                      startTransition(() => {
                        updateFeeStatus(s.id, e.target.value as "paid" | "partial" | "owing");
                      })
                    }
                  >
                    <option value="paid">Paid</option>
                    <option value="partial">Partial</option>
                    <option value="owing">Owing</option>
                  </select>
                  <span className="ml-2 align-middle"><Badge status={s.fee_status} /></span>
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    className="text-xs font-semibold text-danger hover:underline"
                    onClick={() => {
                      if (confirm(`Remove ${s.full_name}?`)) {
                        startTransition(() => deleteStudent(s.id));
                      }
                    }}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-muted">
                  No students match your search yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
