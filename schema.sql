import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <header className="border-b border-border bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <Image src="/logo.jpg" alt="Daarul Maqaaril logo" width={44} height={44} className="rounded-full" />
            <span className="font-display text-lg font-semibold text-purple-deep">
              Daarul Maqaaril
            </span>
          </div>
          <Link href="/login" className="btn-primary">
            Portal Login
          </Link>
        </div>
      </header>

      <section className="bg-gradient-to-b from-purple-faint to-parchment">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-gold">
            180 Bamgbose Street, Lagos Island
          </p>
          <h1 className="font-display text-4xl font-bold leading-tight text-purple-deep sm:text-5xl">
            Daarul Maqaaril Litahfeedhil Qur&rsquo;aan wa Ulumil Arabiyyah
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted">
            An Islamic school dedicated to Qur&rsquo;an memorisation, Tajweed,
            Arabic language, and the Islamic sciences — for children and
            adults alike.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link href="/login" className="btn-primary">
              Portal Login
            </Link>
            <a href="#about" className="btn-ghost">
              Learn more
            </a>
          </div>
        </div>
      </section>

      <section id="about" className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-6 sm:grid-cols-3">
          {[
            { title: "Tahfiz Programme", body: "Structured, tracked memorisation of all 30 Juz with Tajweed and fluency scoring." },
            { title: "Full Academics", body: "Islamic studies, Arabic, Hadith, Fiqh and Seerah alongside a standard curriculum, KG through JSS." },
            { title: "Family Portal", body: "Parents and students can log in to follow attendance, results and Tahfiz progress." }
          ].map((item) => (
            <div key={item.title} className="card">
              <h3 className="mb-2 font-display text-lg font-semibold text-purple-deep">
                {item.title}
              </h3>
              <p className="text-sm text-muted">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-border bg-purple-deep py-8 text-center text-sm text-white/80">
        &copy; {new Date().getFullYear()} Daarul Maqaaril Litahfeedhil Qur&rsquo;aan wa Ulumil Arabiyyah
      </footer>
    </main>
  );
}
