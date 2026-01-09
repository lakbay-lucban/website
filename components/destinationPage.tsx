"use client";

import { ShowcaseCarousel } from "./showcaseCarousel";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import { getImageBySlug } from "@/lib/utils";
import { useParams } from "next/navigation";


type DestinationPageProps = {
  destination: string;
  image: string | string[];
  embed: string;
  category?: string;
  content?: string;
  location?: string;
};

export function DestinationPage({ destination, embed, content, category = "DESTINATION", location}: DestinationPageProps) {
  const params = useParams();
  const slug = params.slug as string;
  const image = getImageBySlug(slug);

  return (
    <div>
        <div className="w-full bg-gray-100 relative ">

          <ShowcaseCarousel images={image}/>
    
          <div className="absolute inset-0 flex items-center px-15 md:px-25 text-shadow-md text-shadow-black">
    
            <h1 className="text-white font-bold">
              <span className="text-lg">
                {category.toUpperCase()}<br />
              </span>
              <span className="text-4xl">
                {destination}<br/>
              </span>
              <span className="text-lg">
                {location}
              </span>
            </h1>
          </div>
        </div>
    
        <div className="w-full mx-auto py-10 flex max-w-85 md:max-w-300 md:flex-row flex-col justify-center md:gap-5 gap-5">
          <div className="prose prose-lg md:w-160 md:pr-6">
            <ReactMarkdown
              remarkPlugins={[remarkGfm, remarkBreaks]}
              components={{
                h1: ({ node, ...props }) => <h1 className="text-2xl font-bold py-3" {...props} />,
                h2: ({ node, ...props }) => <h2 className="text-xl font-semibold py-3" {...props} />,
                p: ({ node, ...props }) => <p className="text-base md:text-lg py-3" {...props} />,
                li: ({ node, ...props }) => <li className="ml-6 list-disc" {...props} />,
              }}
            >
              {content}
            </ReactMarkdown>
          </div>

          <div className="justify-items-center">
             <iframe className="border-0 h-65 w-75 rounded-xl" src={embed} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>
      </div>
  );
}
