

import { DestinationCard } from '@/components/destinationCard';
import { retrieveData } from '@/lib/supabase';
import { getImageBySlug } from '@/lib/utils';

export default async function Home() {

  const food = await retrieveData("food");

  const categories = [
    { name: "Taste Delicacies of Lucban", data: food }
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
                    type='food'
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
