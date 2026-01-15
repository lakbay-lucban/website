"use client";

import { ShowcaseCarousel } from "@/components/showcaseCarousel";
import { anchor } from "@/components/anchor";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


export default function Home() {
  return (
    <div>
      <div className="relative w-full">
          <ShowcaseCarousel images={"/about-us.jpg"} />
      
          <h1 className="absolute top-1/2 md:left-10 transform -translate-y-1/2 text-5xl md:text-left text-center font-bold px-15 text-white text-shadow-md text-shadow-black pointer-events-none">
          <span className="text-4xl">About Us</span>
        </h1>
      </div>

      <div className="w-full max-w-100 md:max-w-250 mx-auto py-10 px-4 md:text-lg text-base text-justify">
        <h1 className="font-bold text-2xl">About the Website</h1><br/>
        <p>Lakbay Lucban is a QR-code web-based information system serving as a centralized guide to enhance the trip planning and visitor experience in Lucban, Quezon by offering details about destinations selected by the Tourism Office of Lucban. This website was made as the output of a research conducted by Lucban Academy Senior High School Grade-12 Students to modernize the tourism experience in Lucban, Quezon.</p>
        <br/>
        <hr/><br/>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-xl">What is this website built with?</AccordionTrigger>
            <AccordionContent className="text-md">
              <p>
                This website is fundamentally built with {anchor({ href: "https://nextjs.org/", children: "Next.js" })}, a React framework for building web applications. It utilizes {anchor({ href: "https://supabase.com/", children: "Supabase" })} as its backend service for data storage and retrieval. The user interface is designed using {anchor({ href: "https://tailwindcss.com/", children: "Tailwind CSS" })} and {anchor({ href: "https://ui.shadcn.com/", children: "shadcn/ui" })}.
              </p>
              <br/>
              <p>
                Other technologies include {anchor({ href: "https://www.google.com/maps/", children: "Google Maps" })} for maps integration, allowing easy navigation to destinations, {anchor({ href: "https://github.com/", children: "GitHub" })} for version control and managing the codebase, and {anchor({ href: "https://vercel.com/", children: "Vercel" })} for hosting and deployment of the website.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-xl">Where can I find the source-code?</AccordionTrigger>
            <AccordionContent className="text-md">
              <p>
                The source-code for this website is publicly available on GitHub. You can access the repository through this {anchor({ href: "https://github.com/lakbay-lucban/website", children: "link" })}.
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-xl">Where are the images from?</AccordionTrigger>
            <AccordionContent className="text-md">
              <p>
                All images used on this website such as destinations pictures are publicly available from their respective Facebook pages. Images containing food items can ben found in the internet. All images are used for educational purposes only.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
