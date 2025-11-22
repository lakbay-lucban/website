export const dynamicParams = false;

import data from "@/data/destinations.json";
import { DestinationPage } from "@/components/destinationPage";
import { notFound } from "next/navigation";

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
  return data.map(d => ({
    slug: d.link // must match your `[slug]` param
  }));
}

export default function Page({ params }: { params: Params }) {
  const slug = params.slug.toLowerCase().trim();

  const dest = (data as Destination[]).find(d => d.link.toLowerCase().trim() === slug);

//   if (!dest) {
//     notFound();
//   }
    if (!dest) {
    return <h1>DESTINATION NOT FOUND: {params.slug}</h1>;
    }

  const heroImage = dest!.showcaseImages.length > 0 ? dest!.showcaseImages : [dest!.preview];

  return (
    <DestinationPage
      destination={dest.destination}
      title={dest.infoTitle}
      description={dest.infoDescription}
      embed={dest.mapsEmbed}
      image={heroImage}
    />
  );
}
