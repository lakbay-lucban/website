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

export function getImageBySlug(slug: string) {
  const { data } = supabase.storage
    .from("Images")
    .getPublicUrl(`${slug}.jpg`);

  return data.publicUrl;
}

export async function getAllImages(): Promise<string[]> {
  const slugs = await getAllSlugs("destinations");

  return slugs.map((slug) => getImageBySlug(slug));
}