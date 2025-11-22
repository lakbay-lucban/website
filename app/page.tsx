"use client";

import { Alex_Brush } from "next/font/google";
import { ShowcaseCarousel } from "@/components/showcaseCarousel";
import destinations from '@/data/destinations.json';

const alex_brush = Alex_Brush({ subsets: ["latin"], weight: "400"});
const images = destinations.slice(0, 5).map(d => d.preview);

export default function Home() {
  return (
    <div>
      <div className="relative w-full h-170">
        <ShowcaseCarousel images={images} />

        <h1 className="absolute top-1/2 md:left-10 transform -translate-y-1/2 text-5xl md:text-left text-center font-bold px-15 text-white text-shadow-md text-shadow-black">
          <span className={`${alex_brush.className} md:text-6xl text-4xl antialiased`}>Welcome to<br/></span>
          <i className="text-yellow-400 md:text-7xl text-5xl">LUCBAN, QUEZON</i><br/>
          <span className="md:text-4xl text-xl">Yanong Rikit! Baling Ganda!</span>
        </h1>
      </div>

      <div className="w-full max-w-100 md:max-w-250 mx-auto py-50 md:py-10 px-4">
        <h1 className="font-bold text-2xl">History of Lucban</h1><br/>
        <p className="text-lg text-justify">Lucban, Quezon, is a historic town founded in 1571 and known for its rich cultural heritage and vibrant traditions. Originally inhabited by Tagalog communities, Lucban flourished as an agricultural hub during the Spanish colonial period, with the establishment of the San Luis Obispo de Tolosa Parish Church marking its significance as a parish town. Over the years, it has preserved its agricultural roots while becoming famous for the Pahiyas Festival, held every May to honor San Isidro Labrador, the patron saint of farmers. Today, Lucban is celebrated for its colorful festivities, local delicacies like longganisang Lucban, and its enduring blend of history, culture, and community spirit.</p>
        <div className="py-10">
          <div className="flex gap-8 justify-center md:flex-row flex-col">
            <iframe className="rounded-md" title="Discover Lucban" allowFullScreen src="https://www.youtube.com/embed/MXjBm4bhjBM"/>
            <iframe className="rounded-md" title="Quick Tour" allowFullScreen src="https://www.youtube.com/embed/MlJqVkFiJbk"/>
            <iframe className="rounded-md" title="Quick Tour" allowFullScreen src="https://www.youtube.com/embed/rrAkFcn6fNg"/>
          </div>
        </div> 
      </div>
    </div>
  );
}
