"use client";

import { DestinationCard } from '@/components/destinationCard';
import destinations from '@/data/destinations.json';

export default function Home() {
const natureSites = destinations.filter(d => d.category === "nature");
const faithSites = destinations.filter(d => d.category === "faith");

  return (
    <div className='flex flex-col items-center'>
        <div className='text-center py-8'>
            <span className='font-bold text-2xl'>Discover Nature</span>
            <div className='md:flex gap-4 grid grid-cols-2 items-center py-8 text-justify'>
                {natureSites.map((d) => (
                    <DestinationCard
                    key={d.link}
                    destination={d.destination}
                    description={d.description}
                    link={d.link}
                    preview={d.preview}
                    />
                ))}
            </div>
            <span className='font-bold text-2xl'>Visit Faith Sites</span>
            <div className='md:flex gap-4 grid grid-cols-2 py-8 text-justify justify-center'>
                {faithSites.map((d) => (
                    <DestinationCard
                    key={d.link}
                    destination={d.destination}
                    description={d.description}
                    link={d.link}
                    preview={d.preview}
                    />
                ))}
            </div>
        </div>
    </div>
  );
}
