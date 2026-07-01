"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

function generateAdmissionNo() {
  const year = new Date().getFullYear();
  const random = Math.floor(1000 + Math.random() * 9000);
  return `DMQ/${year}/${random}`;
}

export async function addStudent(formData: FormData) {
  const supabase = createClient();

  const full_name = String(formData.get("full_name") ?? "").trim();
  const class_id = String(formData.get("class_id") ?? "") || null;
  const date_of_birth = String(formData.get("date_of_birth") ?? "") || null;
  const guardian_name = String(formData.get("guardian_name") ?? "").trim() || null;
  const guardian_phone = String(formData.get("guardian_phone") ?? "").trim() || null;

  if (!full_name) return { error: "Full name is required." };

  const { error } = await supabase.from("students").insert({
    admission_no: generateAdmissionNo(),
    full_name,
    class_id,
    date_of_birth,
    guardian_name,
    guardian_phone
  });

  if (error) return { error: error.message };

  revalidatePath("/admin/students");
  revalidatePath("/admin");
  return { error: null };
}

export async function updateFeeStatus(studentId: string, fee_status: "paid" | "partial" | "owing") {
  const supabase = createClient();
  const { error } = await supabase.from("students").update({ fee_status }).eq("id", studentId);
  if (error) return { error: error.message };
  revalidatePath("/admin/students");
  return { error: null };
}

export async function deleteStudent(studentId: string) {
  const supabase = createClient();
  const { error } = await supabase.from("students").delete().eq("id", studentId);
  if (error) return { error: error.message };
  revalidatePath("/admin/students");
  revalidatePath("/admin");
  return { error: null };
}
