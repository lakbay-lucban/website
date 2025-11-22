"use client";

import { ShowcaseCarousel } from "./showcaseCarousel";

type DestinationPageProps = {
  destination: string;
  image: string | string[];
  title: string;
  description: string,
  embed: string;
};

export function DestinationPage({ destination, image, title, description, embed}: DestinationPageProps) {
  return (
    <div>
        <div className="w-full bg-gray-100 relative h-170">

          <ShowcaseCarousel images={image}/>
    
          <div className="absolute inset-0 flex items-center px-40 text-shadow-md text-shadow-black">
    
            <h1 className="text-white font-bold">
              <span className="text-lg">
                DESTINATION<br/>
              </span>
              <span className="text-4xl">
                {destination}
              </span>
            </h1>
          </div>
        </div>
    
        <div className="w-full mx-auto py-50 md:py-10 flex max-w-85 md:max-w-300 md:flex-row flex-col justify-center gap-26">
          <div className="md:w-160 md:pr-6">
            <h1 className="font-bold text-2xl">{title}</h1><br/>
            <p className="text-xl text-justify">{description}</p>  
          </div>  
    
          <div>
             <iframe className="border-0 h-85 w-85 rounded-xl" src={embed} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>
      </div>
  );
}
