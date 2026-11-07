"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { nav } from "@/lib/content/site";
import { cn } from "@/lib/utils";

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const dark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(dark ? "light" : "dark")}
      className="grid h-10 w-10 place-items-center rounded-full text-fg-muted transition-colors duration-200 ease-out hover:bg-raised hover:text-fg"
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {/* Render both so the server and client agree; CSS shows the right one. */}
      <Sun className="hidden h-[18px] w-[18px] dark:block" aria-hidden />
      <Moon className="h-[18px] w-[18px] dark:hidden" aria-hidden />
    </button>
  );
}

export const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <a
        href="#main"
        className="btn-sky fixed left-4 top-3 z-[60] -translate-y-20 focus-visible:translate-y-0"
      >
        Skip to content
      </a>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300 ease-out",
          "pt-[env(safe-area-inset-top)]",
          scrolled || open
            ? "border-b border-rule bg-canvas/85 backdrop-blur-md supports-[backdrop-filter]:bg-canvas/70"
            : "border-b border-transparent"
        )}
      >
        <nav className="container-x flex h-[var(--nav-h)] items-center justify-between gap-6" aria-label="Main">
          <Link href="/" className="-ml-1 rounded-md p-1 text-[1.0625rem]" onClick={() => setOpen(false)}>
            <Logo />
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-3.5 py-2 text-small text-fg-muted transition-colors duration-200 ease-out hover:text-fg"
              >
                {item.label}
              </Link>
            ))}
            <span className="mx-2 h-5 w-px bg-rule" aria-hidden />
            <ThemeToggle />
            <Link href="/#contact" className="btn-sky ml-2 min-h-[2.5rem] px-4 text-small">
              Book a call
            </Link>
          </div>

          <div className="flex items-center gap-1 md:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-full text-fg"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
            >
              <span className="relative block h-3 w-5" aria-hidden>
                <span
                  className={cn(
                    "absolute left-0 top-0 h-[1.5px] w-5 rounded bg-current transition-transform duration-300 ease-out",
                    open && "translate-y-[5px] rotate-45"
                  )}
                />
                <span
                  className={cn(
                    "absolute bottom-0 left-0 h-[1.5px] w-5 rounded bg-current transition-transform duration-300 ease-out",
                    open && "-translate-y-[5.5px] -rotate-45"
                  )}
                />
              </span>
            </button>
          </div>
        </nav>
      </header>

      <div
        id="mobile-menu"
        className={cn(
          "fixed inset-0 z-40 bg-canvas transition-opacity duration-300 ease-out md:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        aria-hidden={!open}
        data-lenis-prevent
      >
        <nav
          className="container-x flex h-full flex-col pb-[max(2rem,env(safe-area-inset-bottom))] pt-[calc(var(--nav-h)+env(safe-area-inset-top)+1.5rem)]"
          aria-label="Mobile"
        >
          <ul className="flex flex-col">
            {nav.map((item, i) => (
              <li
                key={item.href}
                className={cn(
                  "border-b border-rule transition-[opacity,transform] duration-500 ease-out",
                  open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                )}
                style={{ transitionDelay: open ? `${60 + i * 40}ms` : "0ms" }}
              >
                <Link
                  href={item.href}
                  tabIndex={open ? 0 : -1}
                  onClick={() => setOpen(false)}
                  className="block py-5 font-display text-[2rem] font-semibold tracking-[-0.035em] text-fg"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-auto">
            <Link href="/#contact" tabIndex={open ? 0 : -1} onClick={() => setOpen(false)} className="btn-sky w-full">
              Book a call
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
};
