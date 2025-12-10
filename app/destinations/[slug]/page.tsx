import { getDestinationBySlug, getAllDestinationSlugs } from "@/lib/supabase";
import { DestinationPage } from "@/components/destinationPage";
import { notFound } from "next/navigation";

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const slugs = await getAllDestinationSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  const dest = await getDestinationBySlug(slug);

  if (!dest) return notFound();

  return (
    <DestinationPage
      destination={dest.destination}
      title={dest.infoTitle ?? dest.title}
      description={dest.infoDescription ?? dest.description}
      embed={dest.mapsEmbed ?? dest.embed}
      image={dest.images}
    />
  );
}
