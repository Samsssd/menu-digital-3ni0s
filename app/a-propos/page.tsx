import type { Metadata } from "next";
import AboutClient from "@/app/a-propos/AboutClient";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "L'histoire de notre café de quartier : notre savoir-faire, nos valeurs et nos horaires d'ouverture au 12 rue des Grains, Paris.",
};

export default function AboutPage() {
  return <AboutClient />;
}
