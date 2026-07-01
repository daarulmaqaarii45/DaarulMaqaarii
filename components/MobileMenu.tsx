"use client";

import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "#about", label: "About" },
  { href: "#classes", label: "Classes" },
  { href: "#subjects", label: "Subjects" },
  { href: "#portals", label: "Portals" },
  { href: "#tahfiz", label: "Tahfiz" },
  { href: "#contact", label: "Contact" }
];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="menu-toggle"
        aria-label="Toggle menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? "\u2715" : "\u2630"}
      </button>
      <div className={`mobile-dropdown${open ? " open" : ""}`}>
        {links.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
            {link.label}
          </a>
        ))}
        <Link href="/login" className="nav-cta" onClick={() => setOpen(false)}>
          Portal Login
        </Link>
      </div>
    </>
  );
}
