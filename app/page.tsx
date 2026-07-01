import Image from "next/image";
import Link from "next/link";
import MobileMenu from "@/components/MobileMenu";
import "./home.css";

export default function HomePage() {
  return (
    <main className="dm-home">
      <header>
        <div className="nav-wrap">
          <div className="brand">
            <Image src="/logo.jpg" alt="Daarul Maqaarii Litahfeedhil Qur'aan logo" width={46} height={46} />
            <div className="brand-text">
              <span className="en">
                Daarul <span className="gold-letter">Maqaarii</span>
              </span>
              <span className="ar-small">دار المقاري لتحفيظ القرآن وعلوم العربية</span>
            </div>
          </div>
          <div className="nav-right">
            <nav>
              <ul>
                <li><a href="#about">About</a></li>
                <li><a href="#classes">Classes</a></li>
                <li><a href="#subjects">Subjects</a></li>
                <li><a href="#portals">Portals</a></li>
                <li><a href="#tahfiz">Tahfiz</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </nav>
            <Link href="/login" className="nav-cta">
              Portal Login
            </Link>
            <MobileMenu />
          </div>
        </div>
      </header>

      <section className="hero">
        <div className="hero-content">
          <div className="eyebrow">نصر من الله — Help from Allah</div>
          <h1 className="ar">دَارُ الْمَقَارِئِ لِتَحْفِيظِ الْقُرْآنِ وَعُلُومِ الْعَرَبِيَّةِ</h1>
          <div className="ayah">وَلَقَدْ يَسَّرْنَا الْقُرْآنَ لِلذِّكْرِ فَهَلْ مِن مُّدَّكِرٍ</div>
          <div className="sub-en">
            Daarul <span className="gold-letter">Maqaarii</span> Litahfeedhil Qur&apos;aan wa Ulumil Arabiyyah
          </div>
          <div className="motto">
            حِفْظٌ، تَجْوِيدٌ، وَعُلُومٌ عَرَبِيَّةٌ أَصِيلَةٌ
            <span>Qur&apos;an Memorization · Tajweed · Arabic &amp; Islamic Sciences — Lagos Island</span>
          </div>
          <div className="hero-ctas">
            <a href="#admission" className="btn-primary">
              Apply for Admission
            </a>
            <a href="#portals" className="btn-ghost">
              Access Student / Parent Portal
            </a>
          </div>
        </div>

        <svg className="mosque-skyline" viewBox="0 0 1440 260" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <rect x={0} y={190} width={1440} height={70} />
          <rect x={40} y={120} width={22} height={140} rx={2} />
          <ellipse cx={51} cy={112} rx={12} ry={14} />
          <rect x={1378} y={120} width={22} height={140} rx={2} />
          <ellipse cx={1389} cy={112} rx={12} ry={14} />
          <rect x={170} y={150} width={16} height={110} />
          <ellipse cx={178} cy={146} rx={9} ry={11} />
          <rect x={1254} y={150} width={16} height={110} />
          <ellipse cx={1262} cy={146} rx={9} ry={11} />
          <path d="M520 260 V150 a200 200 0 0 1 400 0 V260 Z" />
          <path d="M620 150 a100 100 0 0 1 200 0 z" />
          <rect x={700} y={60} width={40} height={60} rx={3} />
          <ellipse cx={720} cy={55} rx={22} ry={26} />
          <rect x={712} y={20} width={16} height={34} />
          <ellipse cx={720} cy={16} rx={7} ry={9} />
          <rect x={300} y={180} width={26} height={80} rx={2} />
          <ellipse cx={313} cy={172} rx={14} ry={16} />
          <rect x={1114} y={180} width={26} height={80} rx={2} />
          <ellipse cx={1127} cy={172} rx={14} ry={16} />
          <path d="M420 260 V210 a60 60 0 0 1 120 0 V260 Z" />
          <path d="M900 260 V210 a60 60 0 0 1 120 0 V260 Z" />
          <rect x={0} y={230} width={1440} height={30} />
        </svg>
      </section>

      <section className="about" id="about">
        <div className="geo-pattern" />
        <div
          className="calligraphy-watermark"
          style={{ fontSize: "clamp(2.5rem,10vw,6.5rem)", color: "rgba(195,165,255,0.10)", top: "20%" }}
        >
          حِفْظُ الْقُرْآنِ
        </div>
        <div className="section-inner">
          <div>
            <div className="ar">&quot;وَلَقَدْ يَسَّرْنَا الْقُرْآنَ لِلذِّكْرِ فَهَلْ مِن مُّدَّكِرٍ&quot;</div>
            <p>
              Daarul Maqaarii Litahfeedhil Qur&apos;aan wa Ulumil Arabiyyah is a Tahfeedh and Arabic learning
              institution located at 180 Bamgbose Street, Lagos Island, dedicated to raising huffaadh grounded
              in sound Tajweed, Aqeedah, Fiqh, and classical Arabic.
            </p>
            <p>
              Our programme runs from Nursery through Ibtidaiyyah, dedicated Tahfiz tracks, and adult classes —
              built on disciplined daily memorization, qualified teachers, and a structured curriculum spanning
              the Islamic sciences.
            </p>
          </div>
          <div className="about-stats">
            <div className="stat-card">
              <div className="num">200+</div>
              <div className="label">Students Enrolled</div>
            </div>
            <div className="stat-card">
              <div className="num">10+</div>
              <div className="label">Qualified Teachers</div>
            </div>
            <div className="stat-card">
              <div className="num">7</div>
              <div className="label">Classes Levels</div>
            </div>
            <div className="stat-card">
              <div className="num">10</div>
              <div className="label">Core Subjects</div>
            </div>
          </div>
        </div>
      </section>

      <section id="classes">
        <div className="section-inner">
          <div className="section-head">
            <div className="eyebrow">الفصول الدراسية</div>
            <h2>
              C<span className="gold-letter">l</span>asses
            </h2>
            <p>A clear academic ladder from early years to dedicated memorization and adult learning tracks.</p>
          </div>
          <div className="classes-grid">
            {[
              { ar: "الرَّوْضَة", en: "KG", body: "Foundational learning and early Qur'an exposure." },
              { ar: "الصَّفُّ الأَوَّلُ الِابْتِدَائِيُّ", en: "PR 1", body: "Letter recognition, basic recitation and core academics." },
              { ar: "الصَّفُّ الثَّانِي الِابْتِدَائِيُّ", en: "PR 2", body: "Building Qur'an, Arabic, and academic foundations." },
              { ar: "الصَّفُّ الثَّالِثُ الِابْتِدَائِيُّ", en: "PR 3", body: "Structured Arabic and Islamic sciences track." },
              { ar: "الصَّفُّ الرَّابِعُ الِابْتِدَائِيُّ", en: "PR 4", body: "Advancing memorization, Tajweed, and core subjects." },
              { ar: "الْمَرْحَلَةُ الْإِعْدَادِيَّةُ", en: "JSS", body: "Junior Secondary — deeper Qur'an, Arabic and Islamic sciences." },
              { ar: "فصول التحفيظ", en: "Tahfiz Classes", body: "Dedicated daily Qur'an memorization programme." },
              { ar: "فصول الكبار", en: "Adult Classes", body: "Evening and weekend learning for adult students." }
            ].map((c) => (
              <div className="class-card" key={c.en}>
                <div className="ar">{c.ar}</div>
                <h3>{c.en}</h3>
                <p>{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="subjects" id="subjects">
        <div className="section-inner">
          <div className="section-head">
            <div className="eyebrow">المواد الدراسية</div>
            <h2>
              Su<span className="gold-letter">b</span>jects
            </h2>
            <p>A balanced curriculum across memorization, recitation science, and the core Islamic disciplines.</p>
          </div>
          <div className="subjects-list">
            {[
              "Qur'an (Tahfiz)",
              "Tajweed",
              "Aqeedah",
              "Fiqh",
              "Hadith",
              "Seerah",
              "Arabic Language",
              "Islamic Studies",
              "Du'a and Adhkar",
              "Akhlaq"
            ].map((s) => (
              <span className="subject-pill" key={s}>
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="portals" id="portals">
        <div className="section-inner">
          <div className="section-head">
            <div className="eyebrow">بوابات الدخول</div>
            <h2>
              Po<span className="gold-letter">r</span>tals
            </h2>
            <p>Dedicated dashboards for every member of the Madrasah community.</p>
          </div>
          <div className="portals-grid">
            <div className="portal-card">
              <h3>Teacher Portal</h3>
              <ul>
                <li>Record attendance</li>
                <li>Upload assessments</li>
                <li>Enter examination scores</li>
                <li>Upload notes and assignments</li>
                <li>Send announcements</li>
              </ul>
              <Link href="/login" className="btn-ghost">
                Teacher Login
              </Link>
            </div>
            <div className="portal-card">
              <h3>Student Portal</h3>
              <ul>
                <li>View profile and timetable</li>
                <li>Attendance record</li>
                <li>Assessment &amp; exam results</li>
                <li>Homework</li>
                <li>Fee payment status</li>
              </ul>
              <Link href="/login" className="btn-ghost">
                Student Login
              </Link>
            </div>
            <div className="portal-card">
              <h3>Parent Portal</h3>
              <ul>
                <li>View child&apos;s attendance</li>
                <li>Check academic performance</li>
                <li>View outstanding fees</li>
                <li>Download receipts</li>
                <li>Receive announcements</li>
              </ul>
              <Link href="/login" className="btn-ghost">
                Parent Login
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="tahfiz" id="tahfiz">
        <div className="section-inner">
          <div>
            <div className="eyebrow">برنامج التحفيظ</div>
            <h2>
              Tah<span className="gold-letter">f</span>iz Module
            </h2>
            <p>
              Every student&apos;s memorization journey is tracked precisely — current surah, juz completed, daily
              targets, and a teacher&apos;s fluency and Tajweed evaluation, so progress is always visible to
              students and parents alike.
            </p>
            <a href="#admission" className="btn-primary">
              Enroll in Tahfiz
            </a>
          </div>
          <div className="tahfiz-card">
            <div className="row">
              <span>Current Surah</span>
              <span>Al-Baqarah</span>
            </div>
            <div className="row">
              <span>Juz Memorized</span>
              <span>5 of 30</span>
            </div>
            <div className="row">
              <span>Daily Target</span>
              <span>1 page</span>
            </div>
            <div className="row">
              <span>Revision Schedule</span>
              <span>Daily, post-Fajr</span>
            </div>
            <div className="row">
              <span>Fluency Score</span>
              <span>88%</span>
            </div>
            <div className="row">
              <span>Tajweed Score</span>
              <span>91%</span>
            </div>
          </div>
        </div>
      </section>

      <section className="announce">
        <div className="section-inner">
          <div className="section-head">
            <div className="eyebrow">الإعلانات</div>
            <h2>
              Anno<span className="gold-letter">u</span>ncements
            </h2>
          </div>
          <div className="announce-grid">
            <div className="announce-card">
              <span className="tag">Examination</span>
              <h4>Mid-Term Timetable Released</h4>
              <p>Mid-term examinations begin next week across all classes. Check the timetable in your portal.</p>
            </div>
            <div className="announce-card">
              <span className="tag">Event</span>
              <h4>Qur&apos;an Recitation Competition</h4>
              <p>Annual Tahfiz competition for all memorization classes. Registration is open.</p>
            </div>
            <div className="announce-card">
              <span className="tag">Fees</span>
              <h4>Term Fee Reminder</h4>
              <p>Outstanding tuition and weekend fees should be cleared before resumption.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta" id="admission">
        <div className="geo-pattern" />
        <div
          className="calligraphy-watermark"
          style={{
            fontSize: "clamp(2.5rem,11vw,7rem)",
            color: "rgba(227,199,102,0.10)",
            bottom: "-10%",
            top: "auto",
            transform: "translate(-50%,0)"
          }}
        >
          نَصْرٌ مِّنَ اللَّهِ وَفَتْحٌ قَرِيبٌ
        </div>
        <div className="section-inner">
          <div className="ar" style={{ fontSize: "clamp(1.6rem,4vw,2.6rem)", lineHeight: 1.9 }}>
            تَعَالَوْا إِلَى كَلِمَةٍ سَوَاءٍ
          </div>
          <h2>
            Begin Your Child&apos;s <span className="gold-letter">Qur&apos;an</span> Journey
          </h2>
          <p>
            Admissions are open for Nursery, Primary, Ibtidaiyyah, Tahfiz, and Adult classes at Daarul Maqaarii
            Litahfeedhil Qur&apos;aan wa Ulumil Arabiyyah.
          </p>
          <a href="#contact" className="btn-primary">
            Apply for Admission
          </a>
        </div>
      </section>

      <footer id="contact">
        <div className="footer-grid">
          <div>
            <div className="brand">
              <Image src="/logo.jpg" alt="logo" width={46} height={46} />
              <div className="brand-text">
                <span className="en">
                  Daarul <span className="gold-letter">Maqaarii</span>
                </span>
                <span className="ar-small" style={{ color: "var(--gold-soft)" }}>
                  وَ عُلُومِ الْعَرَبِيَّة
                </span>
              </div>
            </div>
            <p style={{ marginTop: 16, fontSize: "0.85rem" }}>
              A Tahfeedh and Arabic learning institution in Lagos Island, raising huffaadh grounded in Tajweed and
              sound Islamic knowledge.
            </p>
          </div>
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#about">About Us</a></li>
              <li><a href="#classes">Classes</a></li>
              <li><a href="#subjects">Subjects</a></li>
              <li><a href="#portals">Portals</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Programmes</h4>
            <ul>
              <li><a href="#tahfiz">Tahfiz Module</a></li>
              <li><a href="#">Examinations</a></li>
              <li><a href="#">Certificates</a></li>
              <li><a href="#admission">Admissions</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <ul>
              <li>180 Bamgbose Street, Lagos Island</li>
              <li>Phone: +2348032066837, +2347035849026, +2348185248808</li>
              <li>Email: daarulmaqaarii@gmail.com</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Daarul Maqaarii Litahfeedhil Qur&apos;aan wa Ulumil Arabiyyah. All rights reserved.</span>
          <span className="ar" style={{ color: "var(--gold-soft)" }}>
            نَصْرٌ مِّنَ اللَّه
          </span>
        </div>
      </footer>
    </main>
  );
}
