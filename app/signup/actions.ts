"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function signup(formData: FormData) {
  const supabase = createClient();

  const full_name = String(formData.get("full_name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const role = String(formData.get("role") ?? "student");

  // Only ever allow self-registration as student or parent. Admin/teacher
  // accounts are promoted manually in the Supabase table editor — never
  // trust a role coming from a public form for staff access.
  const safeRole = role === "parent" ? "parent" : "student";

  if (!full_name || !email || !password) {
    redirect(`/signup?error=${encodeURIComponent("All fields are required.")}`);
  }
  if (password.length < 6) {
    redirect(`/signup?error=${encodeURIComponent("Password must be at least 6 characters.")}`);
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name, role: safeRole },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/auth/callback`
    }
  });

  if (error) {
    redirect(`/signup?error=${encodeURIComponent(error.message)}`);
  }

  // If email confirmation is on, there's no session yet — send them to a
  // "check your inbox" screen. If it's off, they're already signed in.
  if (data.session) {
    redirect("/");
  }
  redirect("/signup/check-email");
}
