# Daarul Maqaaril — Next.js + Supabase

Real, database-backed rebuild of the admin portal. The public site is a
lightweight Next.js page; the admin portal is authenticated, role-checked,
and reads/writes live Supabase data.

## Stack

- **Next.js 14** (App Router, Server Components, Server Actions)
- **Supabase** — Postgres database, Auth, Row Level Security
- **Tailwind CSS** — styling, using the same purple/gold palette as the original design
- **Vercel** — deployment

## What's real vs. what's scaffolded

| Section | Status |
|---|---|
| Auth (login, session, role-based route protection) | ✅ Real |
| Dashboard stats | ✅ Real — reads live counts from Supabase |
| Students (list, search, filter, enrol, fee status, remove) | ✅ Real — full Supabase CRUD |
| Teachers, Classes, Subjects, Timetable, Attendance, Tahfiz, Fees, Exams, Announcements, Certificates, Reports | 🚧 Page + nav wired, shows a "connect this next" placeholder |

The Students page is the reference implementation. Copy its pattern
(`app/admin/students/page.tsx` + `StudentsClient.tsx` + `actions.ts`) for
each remaining section — same shape every time: server component fetches
data, client component handles search/forms, server actions do the writes.

## 1. Create your Supabase project

1. Go to [supabase.com](https://supabase.com) → New Project.
2. Once it's ready, open **SQL Editor → New query**, paste the contents of
   `supabase/schema.sql`, and run it. This creates all 10 tables, RLS
   policies, and seeds the 10 subjects + 9 classes from the original design.
3. Go to **Project Settings → API** and copy the **Project URL** and
   **anon public key**.

## 2. Configure environment variables

```bash
cp .env.local.example .env.local
```

Fill in the two values from step 1.

## 3. Install and run locally

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` for the public site, `/login` for the portal.

## 4. Create your first admin

New sign-ups default to the `student` role (see the `handle_new_user`
trigger in `schema.sql`). To get into the admin portal:

1. In Supabase, go to **Authentication → Users → Add user** (or sign up
   through your own sign-up flow once you build one) and create an account
   with your email and a password.
2. Go to **Table Editor → profiles**, find that row, and change `role`
   from `student` to `admin`.
3. Log in at `/login` with that email and password.

Teachers work the same way — set their `role` to `teacher` instead.

## 5. Deploy to Vercel

1. Push this repo to GitHub.
2. On Vercel: **Add New Project → Import** this repo → Framework preset
   **Next.js** (auto-detected) → add the two `NEXT_PUBLIC_SUPABASE_*`
   env vars in the project settings → **Deploy**.

## Database schema

See `supabase/schema.sql` for the full definitions. Summary:

- `profiles` — one row per login, carries `role` (admin / teacher / student / parent)
- `classes`, `subjects`, `teacher_assignments`
- `students` — admission no. is auto-generated on enrolment
- `attendance` — one row per student per day
- `fees` — amount due/paid per term, with receipt tracking
- `exam_results` — score, grade, position, remarks per subject per term
- `tahfiz_records` — one row per student per Juz (1–30), with status and scores
- `announcements` — targeted by audience

All tables have Row Level Security enabled: admins have full access,
teachers can read everything and write attendance/results/Tahfiz records,
and students/parents (once you build their portal routes) will only see
their own data — add those policies when you get there.

## Next steps

- Build out the remaining admin sections following the Students pattern.
- Add student/parent-facing routes (`/portal/...`) that read their own
  records only — the RLS groundwork is already there in `is_staff()` /
  policies, you'll add matching "own record" policies per table.
- Certificates/report printing: consider `@react-pdf/renderer` or a
  print-specific CSS stylesheet for the live-preview + print flow.
