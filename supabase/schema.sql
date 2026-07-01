-- Daarul Maqaaril Litahfeedhil Qur'aan wa Ulumil Arabiyyah
-- Run this once in the Supabase SQL editor (Project → SQL Editor → New query).

-- =========================================================
-- 1. PROFILES  (one row per auth.users row; carries the role)
-- =========================================================
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  role text not null check (role in ('admin', 'teacher', 'student', 'parent')),
  phone text,
  created_at timestamptz not null default now()
);

-- Auto-create a profile row whenever a new auth user signs up — whether
-- via email/password or Google OAuth. Reads full_name and role from the
-- signup form when present (see app/signup/actions.ts), and falls back to
-- Google's own metadata keys, then the email, if not.
-- The role is sanitized here too: even if someone tampers with the client
-- request, only 'student' or 'parent' can ever be self-assigned. Admin and
-- teacher roles are only ever set manually in the table editor.
create or replace function public.handle_new_user()
returns trigger as $$
declare
  requested_role text := new.raw_user_meta_data->>'role';
  safe_role text := case when requested_role = 'parent' then 'parent' else 'student' end;
begin
  insert into public.profiles (id, full_name, role)
  values (
    new.id,
    coalesce(
      new.raw_user_meta_data->>'full_name',
      new.raw_user_meta_data->>'name',   -- Google OAuth uses "name"
      new.email
    ),
    safe_role
  );
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- =========================================================
-- 2. CORE SCHOOL TABLES
-- =========================================================
create table if not exists classes (
  id uuid primary key default gen_random_uuid(),
  name text not null,               -- e.g. "KG 1", "JSS 2", "Tahfiz A", "Adult Evening"
  level text not null,               -- e.g. "KG", "Primary", "JSS", "Tahfiz", "Adult"
  capacity int not null default 30,
  teacher_id uuid references profiles(id),
  created_at timestamptz not null default now()
);

create table if not exists subjects (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  code text unique,
  created_at timestamptz not null default now()
);

create table if not exists teacher_assignments (
  id uuid primary key default gen_random_uuid(),
  teacher_id uuid not null references profiles(id) on delete cascade,
  class_id uuid references classes(id) on delete cascade,
  subject_id uuid references subjects(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists students (
  id uuid primary key default gen_random_uuid(),
  admission_no text unique not null,
  full_name text not null,
  class_id uuid references classes(id),
  date_of_birth date,
  guardian_name text,
  guardian_phone text,
  fee_status text not null default 'owing' check (fee_status in ('paid', 'partial', 'owing')),
  profile_id uuid references profiles(id),   -- link to a login for the student/parent portal
  enrolled_at date not null default current_date,
  created_at timestamptz not null default now()
);

create table if not exists attendance (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references students(id) on delete cascade,
  class_id uuid references classes(id),
  date date not null default current_date,
  status text not null check (status in ('present', 'absent', 'late')),
  recorded_by uuid references profiles(id),
  created_at timestamptz not null default now(),
  unique (student_id, date)
);

create table if not exists fees (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references students(id) on delete cascade,
  term text not null,                 -- e.g. "2026 Term 2"
  amount_due numeric(12,2) not null default 0,
  amount_paid numeric(12,2) not null default 0,
  method text,                        -- cash, transfer, card
  receipt_no text,
  recorded_by uuid references profiles(id),
  paid_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists exam_results (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references students(id) on delete cascade,
  subject_id uuid not null references subjects(id) on delete cascade,
  term text not null,
  score numeric(5,2) not null,
  grade text,
  position int,
  remarks text,
  recorded_by uuid references profiles(id),
  created_at timestamptz not null default now(),
  unique (student_id, subject_id, term)
);

create table if not exists tahfiz_records (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references students(id) on delete cascade,
  juz_number int not null check (juz_number between 1 and 30),
  status text not null default 'not_started' check (status in ('not_started', 'in_progress', 'memorized')),
  fluency_score numeric(4,1),
  tajweed_score numeric(4,1),
  updated_by uuid references profiles(id),
  updated_at timestamptz not null default now(),
  unique (student_id, juz_number)
);

create table if not exists announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null,
  audience text[] not null default array['all'],  -- students, parents, teachers, all
  created_by uuid references profiles(id),
  created_at timestamptz not null default now()
);

-- =========================================================
-- 3. HELPER: is_staff() — true for admin or teacher
-- =========================================================
create or replace function public.is_staff()
returns boolean as $$
  select exists (
    select 1 from profiles
    where id = auth.uid() and role in ('admin', 'teacher')
  );
$$ language sql security definer stable;

create or replace function public.is_admin()
returns boolean as $$
  select exists (
    select 1 from profiles where id = auth.uid() and role = 'admin'
  );
$$ language sql security definer stable;

-- =========================================================
-- 4. ROW LEVEL SECURITY
-- =========================================================
alter table profiles enable row level security;
alter table classes enable row level security;
alter table subjects enable row level security;
alter table teacher_assignments enable row level security;
alter table students enable row level security;
alter table attendance enable row level security;
alter table fees enable row level security;
alter table exam_results enable row level security;
alter table tahfiz_records enable row level security;
alter table announcements enable row level security;

-- Profiles: everyone can read their own row; staff can read all.
create policy "read own profile" on profiles for select using (auth.uid() = id or is_staff());
create policy "update own profile" on profiles for update using (auth.uid() = id);

-- Staff (admin + teacher) get full read access to school data.
-- Only admin can insert/update/delete most tables; teachers can write to
-- attendance, exam_results and tahfiz_records for their own classes.
create policy "staff read classes" on classes for select using (is_staff());
create policy "admin write classes" on classes for all using (is_admin()) with check (is_admin());

create policy "staff read subjects" on subjects for select using (is_staff());
create policy "admin write subjects" on subjects for all using (is_admin()) with check (is_admin());

create policy "staff read assignments" on teacher_assignments for select using (is_staff());
create policy "admin write assignments" on teacher_assignments for all using (is_admin()) with check (is_admin());

create policy "staff read students" on students for select using (is_staff());
create policy "admin write students" on students for all using (is_admin()) with check (is_admin());

create policy "staff read attendance" on attendance for select using (is_staff());
create policy "staff write attendance" on attendance for all using (is_staff()) with check (is_staff());

create policy "staff read fees" on fees for select using (is_staff());
create policy "admin write fees" on fees for all using (is_admin()) with check (is_admin());

create policy "staff read results" on exam_results for select using (is_staff());
create policy "staff write results" on exam_results for all using (is_staff()) with check (is_staff());

create policy "staff read tahfiz" on tahfiz_records for select using (is_staff());
create policy "staff write tahfiz" on tahfiz_records for all using (is_staff()) with check (is_staff());

create policy "everyone read announcements" on announcements for select using (auth.role() = 'authenticated');
create policy "staff write announcements" on announcements for all using (is_staff()) with check (is_staff());

-- =========================================================
-- 5. SEED DATA (safe to skip — delete this block if you'd rather start empty)
-- =========================================================
insert into subjects (name, code) values
  ('Qur''an Recitation (Tilawah)', 'QUR101'),
  ('Tahfiz (Memorisation)', 'TAH101'),
  ('Tajweed', 'TAJ101'),
  ('Arabic Language', 'ARB101'),
  ('Islamic Studies', 'ISL101'),
  ('Hadith', 'HAD101'),
  ('Fiqh', 'FIQ101'),
  ('Seerah', 'SEE101'),
  ('English', 'ENG101'),
  ('Mathematics', 'MTH101')
on conflict (code) do nothing;

insert into classes (name, level, capacity) values
  ('KG 1', 'KG', 25),
  ('KG 2', 'KG', 25),
  ('Primary 1-3', 'Primary', 30),
  ('Primary 4-6', 'Primary', 30),
  ('JSS 1', 'JSS', 35),
  ('JSS 2', 'JSS', 35),
  ('JSS 3', 'JSS', 35),
  ('Tahfiz Class', 'Tahfiz', 40),
  ('Adult Evening Class', 'Adult', 20)
on conflict do nothing;
