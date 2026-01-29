export const revalidate = 10;

import { retrieveData } from "@/lib/supabase";
import { getImageBySlug } from "@/lib/utils";
import Image from "next/image";

export default async function Home() {
  const food = await retrieveData("food");

  const foodWithImages = await Promise.all(
    food.map(async (item) => ({
      ...item,
      imageUrl: await getImageBySlug(item.slug),
    }))
  );

  return (
    <div className="flex flex-col items-center w-full px-4 py-25">
      <div className="w-full max-w-6xl">
        <div className="flex justify-center mb-8">
          <h2 className="text-2xl font-bold">Local Food & Delicacies</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8">
          {foodWithImages.map((item, idx) => (
            <div
              key={idx}
              id={item.slug}
              className="flex items-start space-x-4 pb-4 border-b last:border-b-0"
            >
              <div className="w-30 h-45 relative shrink-0">
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  fill
                  sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, 192px"
                  className="object-cover rounded"
                  loading="lazy"
                />
              </div>
              <div>
                <h3 className="font-bold text-lg">{item.name}</h3>
                <p className="text-gray-700 mt-1">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
