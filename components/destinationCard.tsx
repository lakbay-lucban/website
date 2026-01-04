import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from 'next/link';;
import Image from 'next/image';
import { getImageBySlug } from "@/lib/utils";

type DestinationCardProps = {
  destination: string;
  description: string;
  link: string;
  preview: string;
  type: string;
};

export function DestinationCard({ destination, description, link, type}: DestinationCardProps) {

  const preview = getImageBySlug(link);
  return (
    <Card className="p-0 transition-transform duration-300 hover:scale-105">
      <Link href={`${type}/${link}`}>
        <Image
          src={preview}
          alt={destination}
          width={200}
          height={200}
          className="h-[200px] object-cover w-50 rounded-t-md"
        />
        <CardHeader className="p-2">
          <CardTitle>{destination}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
      </Link>
    </Card>
  );
}
