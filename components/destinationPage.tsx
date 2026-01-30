import { ShowcaseCarousel } from "./showcaseCarousel";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import { getImageBySlug } from "@/lib/utils";
import { Phone, Mail, Facebook, MapPin } from "lucide-react";


type AboutPage = {
  phone?: string;
  email?: string;
  facebook?: string;
  address?: string;
};

type DestinationPageProps = {
  destination: string;
  image: string | string[];
  embed: string;
  content?: string;
  description?: string;
  aboutPage?: AboutPage | null;
  slug: string;
};

export async function DestinationPage({ destination, embed, content, description, aboutPage, slug}: DestinationPageProps) {
  const image = await getImageBySlug(slug);

  return (
    <div>
        <div className="w-full bg-gray-100 relative ">

          <ShowcaseCarousel images={image}/>
    
          <div className="absolute inset-0 flex items-center px-15 md:px-25">

            <h1 className="text-white font-bold">
              <span className="text-lg">
                DESTINATION<br/>
              </span>
              <span className="text-4xl">
                {destination}<br/>
              </span>
              <span className="text-lg">
                {description}
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

          <div>
            {embed && (
              <div className="justify-items-center">
                <iframe
                  className="border-0 h-65 w-full rounded-xl"
                  src={embed}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            )}
            {aboutPage && (
              <>
            <br/>
            <span className="font-bold">About This Page</span><br/><br/>
            <div className="flex flex-col gap-3">
                  {aboutPage.phone && <span className="flex gap-2"><Phone/>{aboutPage.phone}</span>}
                  {aboutPage.email && <span className="flex gap-2"><Mail/>{aboutPage.email}</span>}
                  {aboutPage.facebook && <span className="flex gap-2"><Facebook/>{aboutPage.facebook}</span>}
                  {aboutPage.address && <span className="flex gap-2"><MapPin/>{aboutPage.address}</span>}
            </div>
              </>
            )}
          </div>
        </div>
      </div>
  );
}
