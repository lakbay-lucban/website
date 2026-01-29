import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { getAllSlugs } from "./supabase";
import { supabase } from "./supabase";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// export function getImageBySlug(slug: string) {
//   return `/${slug}.jpg`;
// }

export async function getImageBySlug(slug: string) {
  const { data: files } = await supabase.storage
    .from("Images")
    .list("", { search: `${slug}.jpg` });

  const file = files?.find(f => f.name === `${slug}.jpg`);

  const { data: urlData } = supabase.storage.from("Images").getPublicUrl(`${slug}.jpg`);

  const updatedAt = file?.updated_at ? new Date(file.updated_at).getTime() : 1;

  return `${urlData.publicUrl}?v=${updatedAt}`;
}


export async function getAllImages(): Promise<string[]> {
  const slugs = await getAllSlugs("destinations");

  return await Promise.all(slugs.map((slug) => getImageBySlug(slug)));
}