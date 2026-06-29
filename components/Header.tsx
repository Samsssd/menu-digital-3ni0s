"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Coffee } from "lucide-react";
import { cn } from "@/lib/utils";

const LOGO_URL =
  "https://d2w5g74r7hbhjx.cloudfront.net/app_9f02912e/branding/logo/4b503941964321e7mqxxrljv.png";

const NAV = [
  { href: "/", label: "Accueil" },
  { href: "/menu", label: "Le Menu" },
  { href: "/categories", label: "Catégories" },
  { href: "/a-propos", label: "À propos" },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-ivory/85 backdrop-blur-xl border-b border-latte/60 shadow-soft"
            : "bg-transparent border-b border-transparent"
        )}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-3"
            aria-label="Menu Digital — accueil"
          >
            <span className="relative inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-cream-deep ring-1 ring-latte transition-transform duration-500 group-hover:scale-105">
              <img
                src={LOGO_URL}
                alt="Logo du café"
                className="h-full w-full object-cover"
              />
            </span>
            <span className="hidden flex-col leading-none sm:flex">
              <span className="font-display text-lg font-semibold tracking-tight text-espresso">
                Menu Digital
              </span>
              <span className="mt-0.5 text-[0.62rem] font-medium uppercase tracking-[0.32em] text-stone">
                Café &amp; Brunch
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300",
                  isActive(item.href)
                    ? "text-espresso"
                    : "text-mocha hover:text-espresso"
                )}
              >
                {isActive(item.href) && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-cream-deep ring-1 ring-latte/70"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/menu"
              className="hidden items-center gap-2 rounded-full bg-espresso px-5 py-2.5 text-sm font-medium text-ivory transition-all duration-300 hover:bg-coffee hover:shadow-lift md:inline-flex"
            >
              <Coffee className="h-4 w-4" strokeWidth={2} />
              Découvrir le menu
            </Link>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-cream-deep text-espresso ring-1 ring-latte transition-colors hover:bg-latte-soft md:hidden"
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={open}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div
              className="absolute inset-0 bg-espresso/40 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.nav
              initial={{ y: -24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -24, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-x-0 top-0 origin-top bg-ivory px-5 pb-10 pt-24 shadow-lift"
            >
              <ul className="flex flex-col divide-y divide-latte/60">
                {NAV.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.06 }}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center justify-between py-5 font-display text-2xl tracking-tight transition-colors",
                        isActive(item.href) ? "text-amber" : "text-espresso"
                      )}
                    >
                      {item.label}
                      <span className="text-stone">
                        0{i + 1}
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <Link
                href="/menu"
                className="mt-8 flex items-center justify-center gap-2 rounded-full bg-espresso px-5 py-3.5 text-sm font-medium text-ivory"
              >
                <Coffee className="h-4 w-4" strokeWidth={2} />
                Découvrir le menu
              </Link>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
