import { getInfoBySlug, getAllSlugs } from "@/lib/supabase";
import { DestinationPage } from "@/components/destinationPage";
import { notFound } from "next/navigation";
import { getImageBySlug } from "@/lib/utils";
interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const slugs = await getAllSlugs("food");
  return slugs.map((slug) => ({
    slug,
  }));
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  const dest = await getInfoBySlug("food", slug);

  const image = getImageBySlug(slug);
  if (!dest) return notFound();

  return (
    <DestinationPage
      destination={dest.name}
      embed={dest.embed}
      content={dest.content}
      image={image}
      category="FOOD"
    />
  );
}
