import {
  Card,
  CardFooter,
} from "@/components/ui/card"
import Link from 'next/link';;
import Image from 'next/image';
import { getImageBySlug } from "@/lib/utils";

type DestinationCardProps = {
  destination: string;
  description: string;
  link: string;
  toDashboard?: boolean;
};

export async function DestinationCard({ destination, link, toDashboard = false}: DestinationCardProps) {

  const preview = await getImageBySlug(link ?? "");
  const direct = toDashboard
    ? `/dashboard/${link}`
    : `/destinations/${link}`;

  return (
    <div className="relative">
      <Card className="overflow-hidden p-0 w-full">
        <Link href={direct} className="block w-full h-50 relative">
          <Image
            src={preview}
            alt={destination}
            fill
            sizes="100vw"
            className="object-cover transition-transform duration-500 ease-out hover:scale-105"
            loading="lazy"
          />
          <CardFooter className="absolute bottom-0 left-0 p-2 text-white font-bold bg-linear-to-t from-black/45 to-transparent w-full">
            {destination}
          </CardFooter>
        </Link>
      </Card>
    </div>
  );
}
