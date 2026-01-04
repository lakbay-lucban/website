import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { getAllSlugs } from "./supabase";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getImageBySlug(slug: string) {
  return `/${slug}.jpg`;
}

export async function getAllImages(): Promise<string[]> {
  const slugs = await getAllSlugs("destinations");
  return slugs.map(slug => `/${slug}.jpg`);
}