import Image from "next/image";

export default function CheckEmailPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-purple-faint px-4">
      <div className="card w-full max-w-sm text-center">
        <Image src="/logo.jpg" alt="Daarul Maqaaril logo" width={56} height={56} className="mx-auto mb-3 rounded-full" />
        <h1 className="font-display text-xl font-semibold text-purple-deep">Check your email</h1>
        <p className="mt-2 text-sm text-muted">
          We&rsquo;ve sent a confirmation link to finish creating your account.
          Click it, then come back and sign in.
        </p>
      </div>
    </main>
  );
}
