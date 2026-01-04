

import { DestinationCard } from '@/components/destinationCard';
import { retrieveData } from '@/lib/supabase';
import { getImageBySlug } from '@/lib/utils';

export default async function Home() {

  const nature = await retrieveData("destinations", "nature");
  const resortandhotel = await retrieveData("destinations","resortandhotel");
  const faith = await retrieveData("destinations","faith");

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
               {cat.data.map((d) => {
                const image = getImageBySlug(d.slug);

                return (
                  <DestinationCard
                    key={d.slug}
                    destination={d.name}
                    description={d.description}
                    link={d.slug}
                    preview={image}
                    type='destinations'
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
