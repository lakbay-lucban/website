"use client";

import { ShowcaseCarousel } from "@/components/showcaseCarousel";
import { ExternalLink } from 'lucide-react';


export default function Home() {
  return (
    <div>
      <div className="relative w-full">
          <ShowcaseCarousel images={"/kamaynihesus.jpg"} />
      
          <h1 className="absolute top-1/2 md:left-10 transform -translate-y-1/2 text-5xl md:text-left text-center font-bold px-15 text-white text-shadow-md text-shadow-black pointer-events-none">
          <span className="text-4xl">About Us</span>
        </h1>
      </div>

      <div className="w-full max-w-100 md:max-w-250 mx-auto py-10 px-4 md:text-lg text-base text-justify">
        <h1 className="font-bold text-2xl">About the Website</h1><br/>
        <p>Lakbay Lucban is a QR-code web-based information system serving as centralized guides to enhance the trip planning and visitor experience in Lucban, Quezon by offering details about destinations selected by the Tourism Office of Lucban. This website was made as the output of a research conducted by Lucban Academy Senior Highschool Grade-12 Students to modernize the tourism experience in Lucban, Quezon.</p>
        <br/><p>This website was created using the following technologies; NextJS as the front-end, TailwindCSS for the styling, and ShadCN as component library. Other miscellaneous technologies such as Google Maps integration through embeds, GitHub for version control, and Vercel for static-site hosting. All images showcasing each destinations are available publicly in their respective Facebook Pages. The code for this website is open-sourced and is available for viewing, it can be found <a className="text-blue-700 decoration-dotted underline" href="https://github.com/Profility/walking-tours">here{<ExternalLink className="inline-flex mx-1" size={16}/>}</a></p>      
      </div>
    </div>
  );
}
