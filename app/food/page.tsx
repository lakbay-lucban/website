import { retrieveData } from "@/lib/supabase";
import { getImageBySlug } from "@/lib/utils";
import Image from "next/image";

export default async function Home() {

  const food = await retrieveData("food");

  return (
    <div className="flex flex-col items-center w-full px-4 py-25">
      <div className="w-full max-w-6xl ">
        <div className="flex justify-center mb-8">
          <h2 className="text-2xl font-bold">Local Food & Delicacies</h2>
        </div>
        <hr/>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8">
          {food.map((item, idx) => (
            <div
              key={idx}
              id={item.slug}
              className="flex items-start space-x-4 border-b pb-4 last:border-b-0"
            >
              <div className="w-30 h-45 relative shrink-0">
                <Image
                  src={getImageBySlug(item.slug)}
                  alt={item.name}
                  fill
                  className="object-cover rounded"
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
