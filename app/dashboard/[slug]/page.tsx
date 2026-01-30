import { redirect, notFound } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import EditDestinationForm from "@/components/edit-destination-form";
import LogoutButton from "@/components/logout-button";
import Link from "next/link";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: destination } = await supabase
    .from("destinations")
    .select("name")
    .eq("slug", slug)
    .maybeSingle();

  return {
    title: destination ? `Edit ${destination.name} - Lakbay Lucban Dashboard` : "Edit Destination - Lakbay Lucban Dashboard",
    description: "Edit destination details and content in the Lakbay Lucban dashboard.",
    robots: {
      index: false,
      follow: false,
    },
  };
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function EditDestinationPage({ params }: PageProps) {
  const { slug } = await params;
  const supabase = await createClient();
  
  // Check authentication
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  
  if (authError || !user) {
    redirect("/dashboard/login");
  }

  const role = user.app_metadata?.role;
  const isSuperAdmin = role === "superadmin";

  // Get destination and verify ownership
  const { data: destination, error } = await supabase
    .from("destinations")
    .select("slug, name, description, content, embed, about_page, owner_id")
    .eq("slug", slug)
    .maybeSingle();

  if (error || !destination) {
    notFound();
  }

  if (destination.owner_id !== user.id && !isSuperAdmin) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-gray-50 py-25 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <Link href="/dashboard" className="text-blue-600 decoration-none mb-2 inline-block">
              ← Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold">Edit {destination.name}</h1>
          </div>
          <LogoutButton />
        </div>

        <EditDestinationForm destination={destination} isSuperAdmin={isSuperAdmin}/>
      </div>
    </div>
  );
}
