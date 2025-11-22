export const dynamicParams = false;

import data from "@/data/destinations.json";
import { DestinationPage } from "@/components/destinationPage";

type Destination = {
  link: string;
  destination: string;
  infoTitle: string;
  infoDescription: string;
  mapsEmbed: string;
  showcaseImages: string[];
  preview: string;
};

type Params = {
  slug: string;
};

export async function generateStaticParams() {
  const slugs = data.map(d => d.link);
  console.log("GENERATING SLUGS:", slugs);
  return slugs.map(slug => ({ slug }));
}

export default function Page({ params }: { params: { slug?: string } }) {
  // Guard against missing slug
  if (!params?.slug) {
    return <h1>No destination specified</h1>;
  }

  const slug = params.slug.toLowerCase().trim();

  // Normalize JSON links to match the URL
  const dest = data.find(d => d.link.toLowerCase().trim() === slug);

  if (!dest) {
    return <h1>DESTINATION NOT FOUND: {slug}</h1>;
  }

  const heroImages = dest.showcaseImages.length > 0 ? dest.showcaseImages : [dest.preview];

  return (
    <DestinationPage
      destination={dest.destination}
      title={dest.infoTitle}
      description={dest.infoDescription}
      embed={dest.mapsEmbed}
      image={heroImages}
    />
  );
}
