import Image from "next/image";
import Link from "next/link";
import { signup } from "./actions";
import GoogleButton from "@/components/admin/GoogleButton";

export default function SignupPage({ searchParams }: { searchParams: { error?: string } }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-purple-faint px-4 py-10">
      <div className="card w-full max-w-sm">
        <div className="mb-6 flex flex-col items-center text-center">
          <Image src="/logo.jpg" alt="Daarul Maqaaril logo" width={56} height={56} className="mb-3 rounded-full" />
          <h1 className="font-display text-xl font-semibold text-purple-deep">Create an account</h1>
          <p className="mt-1 text-sm text-muted">For students and parents</p>
        </div>

        {searchParams.error && (
          <p className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-danger">{searchParams.error}</p>
        )}

        <GoogleButton next="/" />

        <div className="my-4 flex items-center gap-3 text-xs text-muted">
          <div className="h-px flex-1 bg-border" />
          or
          <div className="h-px flex-1 bg-border" />
        </div>

        <form action={signup} className="space-y-4">
          <div>
            <label className="label" htmlFor="full_name">Full name</label>
            <input className="input" id="full_name" name="full_name" required />
          </div>
          <div>
            <label className="label" htmlFor="email">Email</label>
            <input className="input" id="email" name="email" type="email" required autoComplete="email" />
          </div>
          <div>
            <label className="label" htmlFor="password">Password</label>
            <input className="input" id="password" name="password" type="password" required minLength={6} autoComplete="new-password" />
          </div>
          <div>
            <label className="label" htmlFor="role">I am a</label>
            <select className="input" id="role" name="role" defaultValue="student">
              <option value="student">Student</option>
              <option value="parent">Parent / Guardian</option>
            </select>
          </div>
          <button type="submit" className="btn-primary w-full">Create account</button>
        </form>

        <p className="mt-4 text-center text-sm text-muted">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-purple hover:underline">Sign in</Link>
        </p>
        <p className="mt-2 text-center text-xs text-muted">
          Staff account? Ask an administrator to set you up — staff accounts
          aren&rsquo;t self-registered.
        </p>
      </div>
    </main>
  );
}
