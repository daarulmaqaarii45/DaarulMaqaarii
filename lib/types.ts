export type Role = "admin" | "teacher" | "student" | "parent";

export interface Profile {
  id: string;
  full_name: string;
  role: Role;
  phone: string | null;
}

export interface Student {
  id: string;
  admission_no: string;
  full_name: string;
  class_id: string | null;
  date_of_birth: string | null;
  guardian_name: string | null;
  guardian_phone: string | null;
  fee_status: "paid" | "partial" | "owing";
  enrolled_at: string;
  classes?: { name: string } | null;
}

export interface ClassRow {
  id: string;
  name: string;
  level: string;
  capacity: number;
}
