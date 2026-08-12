"use client";

import { usePathname } from "next/navigation";
import { personal } from "@/data/personal";

const quickLinks = [
  { id: "top", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export function Footer() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const sectionHref = (id: string) => (isHome ? `#${id}` : `/#${id}`);

  return (
    <footer className="grain-surface overflow-hidden bg-ink px-6 pt-20 md:px-10">
      <div className="mx-auto max-w-content">
        <h2 className="max-w-xl text-4xl font-semibold leading-tight tracking-tightest2 text-paper sm:text-5xl">
          {personal.footerStatement}
        </h2>

        <div className="mt-14 grid gap-10 pb-16 sm:grid-cols-2">
          <div>
            <p className="text-sm text-paper/50">/Quick links</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {quickLinks.map((link) => (
                <a
                  key={link.id}
                  href={sectionHref(link.id)}
                  className="rounded-control bg-paper/10 px-4 py-2 text-sm text-paper transition-colors hover:bg-paper/20"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm text-paper/50">/Contact</p>
            <a
              href={`mailto:${personal.email}`}
              className="mt-4 inline-block text-sm text-paper hover:underline"
            >
              {personal.email}
            </a>
            <p className="mt-6 text-xs text-paper/40">
              © {new Date().getFullYear()} {personal.name}. All rights reserved.
            </p>
          </div>
        </div>

        <p
          aria-hidden
          className="select-none whitespace-nowrap pb-6 text-center text-[13vw] font-extrabold leading-none tracking-tightest2 text-paper/10"
        >
          {personal.name.split(" ")[0].toUpperCase()}
        </p>
      </div>
    </footer>
  );
}
