export const revalidate = 10;

import { DestinationCard } from '@/components/destinationCard';
import { retrieveData } from '@/lib/supabase';
import { getImageBySlug } from '@/lib/utils';

export default async function Home() {
  const allDestinations = await retrieveData("destinations");

  const groupedByCategory = {
    nature: allDestinations.filter(d => d.category === "nature"),
    resortandhotel: allDestinations.filter(d => d.category === "resortandhotel"),
    faith: allDestinations.filter(d => d.category === "faith"),
    heritage: allDestinations.filter(d => d.category === "heritage"),
  };

  const categories = [
    { name: "Stay at Resorts and Hotels", data: groupedByCategory.resortandhotel },
    { name: "Discover Nature", data: groupedByCategory.nature },
    { name: "Explore Our Heritage", data: groupedByCategory.heritage },
    { name: "Visit Faith Sites", data: groupedByCategory.faith },
  ];

  return (
    <div className='flex flex-col items-center w-full px-4 py-15'>
      <div className='text-center py-10 w-full max-w-6xl'>
        {categories.map((cat) => (
          <div key={cat.name}>
            <span className='font-bold text-2xl'>{cat.name}</span>
            <div className='grid gap-4 py-8 text-justify grid-cols-1 sm:grid-cols-3 md:grid-cols-4 justify-center'>
               {cat.data.map((d) => {
                const image = getImageBySlug(d.slug);

                return (
                  <DestinationCard
                    key={d.slug}
                    destination={d.name}
                    description={d.description}
                    link={d.slug}
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
