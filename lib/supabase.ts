import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function retrieveData(type: string, category?: string) {
  let query = supabase
    .from(type)
    .select("slug, name, description, category");

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
    .select("name, description, content, embed, about_page")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    console.error("Supabase error in getInfoBySlug:", error);
    return null;
  }

  return data;
}

// Dashboard functions - require authentication
export async function getDestinationWithOwner(slug: string) {
  const { data, error } = await supabase
    .from("destinations")
    .select("slug, name, description, content, embed, about_page, owner_id")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    console.error("Supabase error in getDestinationWithOwner:", error);
    return null;
  }

  return data;
}

// Note: For dashboard, use server-side client directly in server components
// This function is kept for backwards compatibility but may not work for authenticated queries
export async function getDestinationsByOwner(ownerId: string) {
  const { data, error } = await supabase
    .from("destinations")
    .select("slug, name, description")
    .eq("owner_id", ownerId);

  if (error) {
    console.error("Supabase error in getDestinationsByOwner:", error);
    return [];
  }

  return data ?? [];
}