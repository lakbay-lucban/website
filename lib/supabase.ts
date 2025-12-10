import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function retrieveDestinations(category?: string) {
  let query = supabase.from("destinations").select("*");

  if (category) query = query.eq("category", category);

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching destinations:", error);
    return [];
  }

  return data ?? [];
}

export async function getAllDestinationSlugs(): Promise<string[]> {
  const { data, error } = await supabase
    .from("destinations")
    .select("slug");

  if (error) {
    console.error("Error fetching slugs:", error);
    return [];
  }

  return data?.map(d => d.slug as string) ?? [];
}

export async function getDestinationBySlug(slug: string) {
  const { data, error } = await supabase
    .from("destinations")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    console.error("Supabase error in getDestinationBySlug:", error);
    return null;
  }

  return data;
}
