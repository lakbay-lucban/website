import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from 'next/link';;
import Image from 'next/image';

type DestinationCardProps = {
  destination: string;
  description: string;
  link: string;
  preview: string;
};

export function DestinationCard({ destination, description, link, preview }: DestinationCardProps) {
  return (
    <Card className="p-0 transition-transform duration-300 hover:scale-105">
      <Link href={`destinations/${link}`}>
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
