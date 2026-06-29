"use client";

import Link from "next/link";
import { Coffee, MapPin, Clock, Camera } from "lucide-react";
import { cn } from "@/lib/utils";

const LOGO_URL =
  "https://d2w5g74r7hbhjx.cloudfront.net/app_9f02912e/branding/logo/4b503941964321e7mqxxrljv.png";

const NAV = [
  { href: "/", label: "Accueil" },
  { href: "/menu", label: "Le Menu" },
  { href: "/categories", label: "Catégories" },
  { href: "/a-propos", label: "À propos" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-24 overflow-hidden bg-espresso text-ivory">
      {/* warm glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 h-64 w-[40rem] -translate-x-1/2 rounded-full bg-amber/20 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #fcf9f3 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        {/* Top */}
        <div className="grid gap-12 border-b border-ivory/10 py-16 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="inline-flex h-12 w-12 overflow-hidden rounded-2xl bg-ivory/5 ring-1 ring-ivory/15">
                <img
                  src={LOGO_URL}
                  alt="Logo du café"
                  className="h-full w-full object-cover"
                />
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-display text-xl font-semibold tracking-tight">
                  Menu Digital
                </span>
                <span className="mt-1 text-[0.62rem] font-medium uppercase tracking-[0.32em] text-ivory/50">
                  Café &amp; Brunch
                </span>
              </span>
            </Link>
            <p className="mt-6 max-w-sm text-pretty text-sm leading-relaxed text-ivory/65">
              Un café de quartier où l&apos;on prend le temps. Grains torréfiés
              avec soin, pâtisseries maison et une carte qui évolue au fil des
              saisons.
            </p>

            <div className="mt-7 flex items-center gap-3">
              <a
                href="#"
                aria-label="Instagram"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-ivory/5 text-ivory/70 ring-1 ring-ivory/10 transition-colors hover:bg-ivory/10 hover:text-ivory"
              >
                <Camera className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="Site web"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-ivory/5 text-ivory/70 ring-1 ring-ivory/10 transition-colors hover:bg-ivory/10 hover:text-ivory"
              >
                <Coffee className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3">
            <h3 className="eyebrow text-ivory/40">Navigation</h3>
            <ul className="mt-5 space-y-3">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="link-underline text-sm text-ivory/75 transition-colors hover:text-ivory"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Practical */}
          <div className="md:col-span-4">
            <h3 className="eyebrow text-ivory/40">Le Café</h3>
            <ul className="mt-5 space-y-4 text-sm text-ivory/75">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-amber-soft" />
                <span>12 rue des Grains, 75011 Paris</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-amber-soft" />
                <span>
                  Lun – Ven · 7h30 — 19h00
                  <br />
                  Sam – Dim · 8h30 — 18h00
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-4 py-8 text-xs text-ivory/45 sm:flex-row">
          <p>© {year} Menu Digital. Tous droits réservés.</p>
          <p className="text-center sm:text-right">
            Mentions légales · CGV · Politique de confidentialité
          </p>
        </div>
      </div>
    </footer>
  );
}

export function FooterDivider({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "mx-auto h-px w-full max-w-7xl bg-gradient-to-r from-transparent via-latte to-transparent",
        className
      )}
    />
  );
}
