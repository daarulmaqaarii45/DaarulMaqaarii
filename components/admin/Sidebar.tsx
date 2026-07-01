"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { logout } from "@/app/login/actions";

const NAV = [
  { href: "/admin", label: "Dashboard", exact: true },
  { href: "/admin/students", label: "Students" },
  { href: "/admin/teachers", label: "Teachers" },
  { href: "/admin/classes", label: "Classes" },
  { href: "/admin/subjects", label: "Subjects" },
  { href: "/admin/timetable", label: "Timetable" },
  { href: "/admin/attendance", label: "Attendance" },
  { href: "/admin/tahfiz", label: "Tahfiz" },
  { href: "/admin/fees", label: "Fees & Payments" },
  { href: "/admin/exams", label: "Exams & Results" },
  { href: "/admin/announcements", label: "Announcements" },
  { href: "/admin/certificates", label: "Certificates" },
  { href: "/admin/reports", label: "Reports" }
];

export default function Sidebar({ fullName, role }: { fullName: string; role: string }) {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-border bg-purple-deep text-white">
      <div className="flex items-center gap-2 px-5 py-5">
        <Image src="/logo.jpg" alt="Logo" width={32} height={32} className="rounded-full" />
        <span className="font-display text-sm font-semibold leading-tight">
          Daarul Maqaaril
        </span>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3">
        {NAV.map((item) => {
          const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block rounded-md px-3 py-2 text-sm transition-colors ${
                active ? "bg-gold text-purple-deep font-semibold" : "text-white/85 hover:bg-white/10"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/10 px-4 py-4">
        <p className="truncate text-sm font-medium">{fullName}</p>
        <p className="mb-3 text-xs capitalize text-white/60">{role}</p>
        <form action={logout}>
          <button type="submit" className="text-xs font-semibold text-gold-soft hover:underline">
            Sign out
          </button>
        </form>
      </div>
    </aside>
  );
}
