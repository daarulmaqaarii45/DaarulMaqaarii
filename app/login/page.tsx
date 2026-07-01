import Image from "next/image";
import Link from "next/link";
import { login } from "./actions";
import GoogleButton from "@/components/admin/GoogleButton";

export default function LoginPage({
  searchParams
}: {
  searchParams: { error?: string; next?: string };
}) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-purple-faint px-4">
      <div className="card w-full max-w-sm">
        <div className="mb-6 flex flex-col items-center text-center">
          <Image src="/logo.jpg" alt="Daarul Maqaaril logo" width={56} height={56} className="mb-3 rounded-full" />
          <h1 className="font-display text-xl font-semibold text-purple-deep">
            Portal Login
          </h1>
          <p className="mt-1 text-sm text-muted">
            Daarul Maqaaril staff &amp; admin portal
          </p>
        </div>

        {searchParams.error === "not-authorized" && (
          <p className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-danger">
            Your account isn&rsquo;t set up for the admin portal yet. Ask an
            administrator to update your role.
          </p>
        )}
        {searchParams.error && searchParams.error !== "not-authorized" && (
          <p className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-danger">
            {searchParams.error}
          </p>
        )}

        <GoogleButton next={searchParams.next ?? "/admin"} />

        <div className="my-4 flex items-center gap-3 text-xs text-muted">
          <div className="h-px flex-1 bg-border" />
          or
          <div className="h-px flex-1 bg-border" />
        </div>

        <form action={login} className="space-y-4">
          <input type="hidden" name="next" value={searchParams.next ?? "/admin"} />
          <div>
            <label className="label" htmlFor="email">Email</label>
            <input className="input" id="email" name="email" type="email" required autoComplete="email" />
          </div>
          <div>
            <label className="label" htmlFor="password">Password</label>
            <input className="input" id="password" name="password" type="password" required autoComplete="current-password" />
          </div>
          <button type="submit" className="btn-primary w-full">
            Sign in
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-muted">
          New here?{" "}
          <Link href="/signup" className="font-semibold text-purple hover:underline">Create an account</Link>
        </p>
      </div>
    </main>
  );
}
