"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Coffee,
  Leaf,
  Clock,
  MapPin,
  Heart,
  Sprout,
  ArrowRight,
  Quote,
} from "lucide-react";

const HOURS = [
  { day: "Lundi", time: "7h30 — 19h00" },
  { day: "Mardi", time: "7h30 — 19h00" },
  { day: "Mercredi", time: "7h30 — 19h00" },
  { day: "Jeudi", time: "7h30 — 19h00" },
  { day: "Vendredi", time: "7h30 — 19h00" },
  { day: "Samedi", time: "8h30 — 18h00" },
  { day: "Dimanche", time: "8h30 — 18h00" },
];

const VALUES = [
  {
    icon: Sprout,
    title: "Circuit court",
    text: "Nos grains proviennent de trois coopératives en direct, sans intermédiaire.",
  },
  {
    icon: Leaf,
    title: "Zéro gaspillage",
    text: "Invendus offerts en fin de journée et marc de café repris par un maraîcher voisin.",
  },
  {
    icon: Heart,
    title: "Fait main",
    text: "Tout est préparé sur place, chaque matin, dans notre cuisine ouverte.",
  },
];

export default function AboutClient() {
  return (
    <div className="overflow-hidden">
      {/* ============ HERO ============ */}
      <section className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-40 top-0 h-[32rem] w-[32rem] rounded-full bg-amber/10 blur-[140px]"
        />
        <div className="relative mx-auto max-w-7xl px-5 pt-32 sm:px-8 sm:pt-40">
          <div className="grid items-end gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 rounded-full border border-latte bg-ivory/70 px-4 py-1.5 text-xs font-medium text-mocha backdrop-blur"
              >
                <Coffee className="h-3.5 w-3.5 text-amber" />
                Notre histoire
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.06 }}
                className="mt-6 font-display text-[2.75rem] font-semibold leading-[1.03] tracking-tight text-espresso sm:text-6xl lg:text-7xl text-balance"
              >
                Un café de quartier,{" "}
                <span className="italic text-amber">depuis 2014</span>.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.14 }}
                className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-mocha"
              >
                Né d&apos;une envie simple — celle d&apos;un endroit où l&apos;on
                prend le temps de respirer entre deux rendez-vous. Une décennie
                plus tard, nous torréfions toujours nos grains et pétrissons nos
                pâtisseries à l&apos;heure où la ville s&apos;éveille.
              </motion.p>
            </div>

            {/* Stat tiles */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-5"
            >
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "2014", label: "Année d'ouverture" },
                  { value: "3", label: "Coopératives partenaires" },
                  { value: "100%", label: "Fait maison" },
                  { value: "7j", label: "Ouvert toute la semaine" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-latte/70 bg-ivory/60 p-5 backdrop-blur-sm"
                  >
                    <p className="font-display text-3xl font-semibold text-espresso">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-xs font-medium uppercase tracking-[0.12em] text-stone">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============ STORY ============ */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6 }}
              className="lg:sticky lg:top-28"
            >
              <p className="eyebrow text-amber">Notre savoir-faire</p>
              <h2 className="mt-3 font-display text-4xl font-semibold leading-tight tracking-tight text-espresso sm:text-5xl text-balance">
                La lenteur, notre seule précipitation
              </h2>
            </motion.div>
          </div>

          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6 }}
              className="space-y-6 text-pretty text-base leading-relaxed text-mocha"
            >
              <p>
                Tout a commencé par un comptoir étroit et une machine
                empruntée. Marion, ancienne agronome, voulait comprendre le
                voyage d&apos;un grain, du producteur à la tasse. Antoine, pâtissier
                autodidacte, y voyait l&apos;endroit idéal pour laisser reposer ses
                pâtes levées.
              </p>
              <p>
                Onze ans plus tard, la machine a changé mais la philosophie
                demeure : sélectionner les meilleures origines, torréfier en
                petites quantités, et laisser le temps faire son œuvre — que ce
                soit pour une infusion lente ou une brioche qui pousse toute la
                nuit.
              </p>
              <p>
                Notre menu numérique, c&apos;est l&apos;aboutissement de cette
                attention : une carte claire, filtrable selon vos préférences
                diététiques, qui met en lumière des produits que nous aimons et
                défendons.
              </p>
            </motion.div>

            {/* Pull quote */}
            <motion.figure
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-10 rounded-[2rem] border border-latte/70 bg-ivory/60 p-8 backdrop-blur-sm sm:p-10"
            >
              <Quote className="h-7 w-7 text-amber/50" />
              <blockquote className="mt-4 font-display text-2xl font-medium italic leading-snug text-espresso text-balance">
                « On ne fait pas du café pour se réveiller. On le fait pour
                s&apos;arrêter. »
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-espresso text-sm font-semibold text-ivory">
                  M
                </span>
                <div className="leading-tight">
                  <p className="text-sm font-semibold text-espresso">
                    Marion Lebreton
                  </p>
                  <p className="text-xs text-stone">Co-fondatrice</p>
                </div>
              </figcaption>
            </motion.figure>
          </div>
        </div>
      </section>

      {/* ============ VALUES ============ */}
      <section className="relative mx-auto max-w-7xl px-5 py-8 sm:px-8">
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-latte to-transparent"
        />
        <div className="pt-16">
          <p className="eyebrow text-amber">Nos engagements</p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-espresso sm:text-5xl text-balance">
            Trois principes, pas un de plus
          </h2>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-2xl border border-latte/70 bg-ivory/60 p-6 backdrop-blur-sm"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-cream-deep text-amber ring-1 ring-latte">
                  <v.icon className="h-5 w-5" strokeWidth={1.8} />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-espresso">
                  {v.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-mocha">
                  {v.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ HOURS & LOCATION ============ */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="overflow-hidden rounded-[2rem] border border-latte/70 bg-ivory/60 backdrop-blur-sm">
          <div className="grid lg:grid-cols-2">
            {/* Hours */}
            <div className="border-b border-latte/70 p-8 sm:p-12 lg:border-b-0 lg:border-r">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-cream-deep text-amber ring-1 ring-latte">
                  <Clock className="h-5 w-5" />
                </span>
                <h2 className="font-display text-2xl font-semibold tracking-tight text-espresso">
                  Horaires d&apos;ouverture
                </h2>
              </div>

              <ul className="mt-8 divide-y divide-latte/60">
                {HOURS.map((row) => (
                  <li
                    key={row.day}
                    className="flex items-center justify-between py-3.5"
                  >
                    <span className="text-sm font-medium text-espresso">
                      {row.day}
                    </span>
                    <span className="font-display text-sm text-mocha">
                      {row.time}
                    </span>
                  </li>
                ))}
              </ul>

              <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-sage/10 px-4 py-2 text-xs font-semibold text-sage ring-1 ring-sage/20">
                <span className="h-1.5 w-1.5 rounded-full bg-sage" />
                Ouvert maintenant
              </p>
            </div>

            {/* Location */}
            <div className="p-8 sm:p-12">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-cream-deep text-amber ring-1 ring-latte">
                  <MapPin className="h-5 w-5" />
                </span>
                <h2 className="font-display text-2xl font-semibold tracking-tight text-espresso">
                  Nous trouver
                </h2>
              </div>

              <div className="mt-8 space-y-4 text-mocha">
                <p className="font-display text-lg text-espresso">
                  12 rue des Grains
                  <br />
                  75011 Paris
                </p>
                <p className="text-sm leading-relaxed">
                  À deux minutes du métro Saint-Ambroise (ligne 9). Une
                  terrasse abritée vous attend dès les premiers rayons.
                </p>
              </div>

              {/* Stylized map placeholder */}
              <div className="mt-8 overflow-hidden rounded-2xl ring-1 ring-latte">
                <div
                  className="relative aspect-[16/9] bg-cream-deep"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(154,138,119,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(154,138,119,0.18) 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                  }}
                >
                  {/* roads */}
                  <div className="absolute left-0 top-1/2 h-1.5 w-full -translate-y-1/2 rotate-6 bg-latte" />
                  <div className="absolute left-1/3 top-0 h-full w-1.5 -rotate-12 bg-latte" />
                  {/* pin */}
                  <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-amber text-ivory shadow-lift ring-4 ring-ivory">
                      <Coffee className="h-5 w-5" />
                    </span>
                    <span className="mt-1 rounded-full bg-ivory/90 px-2 py-0.5 text-[0.65rem] font-semibold text-espresso shadow-soft">
                      Menu Digital
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="mt-12 flex flex-col items-center justify-between gap-6 rounded-[2rem] bg-espresso p-8 text-center sm:flex-row sm:p-12 sm:text-left"
        >
          <div>
            <h3 className="font-display text-3xl font-semibold leading-tight text-ivory sm:text-4xl text-balance">
              Passez nous voir, ou parcourez la carte d&apos;ici
            </h3>
            <p className="mt-2 max-w-md text-pretty text-ivory/65">
              Le menu numérique est à jour chaque jour. Réservez votre moment
              café.
            </p>
          </div>
          <Link
            href="/menu"
            className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-ivory px-7 py-4 text-sm font-semibold text-espresso transition-all duration-300 hover:bg-cream-deep hover:shadow-lift"
          >
            Découvrir le menu
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
