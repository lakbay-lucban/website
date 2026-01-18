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

export function DestinationCard({ destination, link, toDashboard = false}: DestinationCardProps) {

  const preview = getImageBySlug(link ?? "");
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
            className="object-cover transition-transform duration-500 ease-out hover:scale-105"
          />
          <CardFooter className="absolute bottom-0 left-0 p-2 text-white font-bold drop-shadow-lg bg-linear-to-t from-black/55 to-transparent w-full">
            {destination}
          </CardFooter>
        </Link>
      </Card>
    </div>
  );
}
