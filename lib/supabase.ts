import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function retrieveData(type: string, category?: string) {
  let query = supabase
    .from(type)
    .select("slug, name, description");

  if (category) query = query.eq("category", category);

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching destinations:", error);
    return [];
  }

  return data ?? [];
}

export async function getAllSlugs(type: string, options?: { excludeCategory?: string; includeCategory?: string }): Promise<string[]> {
  const { data, error } = await supabase
    .from(type)
    .select("slug, category");

  if (error) {
    console.error("Error fetching slugs:", error);
    return [];
  }

  let filtered = data ?? [];

  if (options?.excludeCategory) {
    filtered = filtered.filter(d => d.category !== options.excludeCategory);
  }

  if (options?.includeCategory) {
    filtered = filtered.filter(d => d.category === options.includeCategory);
  }

  return filtered.map(d => d.slug as string);
}

export async function getInfoBySlug(type: string, slug: string) {
  const { data, error } = await supabase
    .from(type)
    .select("name, description, content, embed")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    console.error("Supabase error in getInfoBySlug:", error);
    return null;
  }

  return data;
}