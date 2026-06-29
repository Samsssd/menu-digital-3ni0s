import { notFound } from "next/navigation";
import CategoryDetailClient from "./CategoryDetailClient";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function CategoryDetailPage({ params }: PageProps) {
  const { id } = await params;

  if (!id) {
    notFound();
  }

  return <CategoryDetailClient id={id} />;
}
