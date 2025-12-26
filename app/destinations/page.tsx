

import { DestinationCard } from '@/components/destinationCard';
import { retrieveDestinations } from '@/lib/supabase';

export default async function Home() {

  const nature = await retrieveDestinations("nature");
  const resortandhotel = await retrieveDestinations("resortandhotel");
  const faith = await retrieveDestinations("faith");

  const categories = [
    { name: "Stay at Resorts and Hotels", data: resortandhotel },
    { name: "Discover Nature", data: nature },
    { name: "Visit Faith Sites", data: faith },
  ];

  return (
    <div className='flex flex-col items-center w-full px-4 py-15'>
      <div className='text-center py-10 w-full max-w-7xl'>
        {categories.map((cat) => (
          <div key={cat.name}>
            <span className='font-bold text-2xl'>{cat.name}</span>
            <div className='grid gap-4 py-8 text-justify grid-cols-2 sm:grid-cols-[repeat(auto-fit,minmax(200px,auto))] justify-center'>
              {cat.data.map((d) => (
                <DestinationCard
                  key={d.slug}
                  destination={d.destination}
                  description={d.location}
                  link={d.slug}
                  preview={d.images}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
