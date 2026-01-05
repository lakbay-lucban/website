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
    <Card className="overflow-hidden p-0 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
      <Link href={`${type}/${link}`}>
        <Image
          src={preview}
          alt={destination}
          width={200}
          height={200}
          className="h-[200px] object-cover rounded-t-md"
        />
        <CardHeader className="p-4">
          <CardTitle className="text-base font-semibold">{destination}</CardTitle>
          <CardDescription className="text-sm text-muted-foreground line-clamp-2">{description}</CardDescription>
        </CardHeader>
      </Link>
    </Card>
  );
}
