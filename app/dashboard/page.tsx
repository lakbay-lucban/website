import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import { Card } from "@/components/ui/card";
import LogoutButton from "@/components/logout-button";
import { DestinationCard } from "@/components/destinationCard";
import CreateButton from "@/components/create-button";

export default async function DashboardPage() {
  const supabase = await createClient();
  
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/dashboard/login");
  }

  let query = supabase
  .from("destinations")
  .select("slug, name, description")

  const role = user.app_metadata?.role;
  const isSuperAdmin = role === "superadmin";

  if (!isSuperAdmin) {
    query = query.eq("owner_id", user.id);
  }

  const { data, error: destError } = await query;

  const destinations = data ?? [];


  return (
    <div className="min-h-screen bg-gray-50 py-25 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between mb-8 flex-col md:flex-row gap-4 md:gap-0">
          <h1 className="text-3xl font-bold">My Destinations</h1>
          <div className="flex gap-3">
            {isSuperAdmin && <CreateButton />}
            <LogoutButton />
          </div>
        </div>

        {destinations.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-gray-600">
              You don't have any destinations assigned yet. Contact an administrator to get access.
            </p>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {destinations.map((destination) => (
                <DestinationCard
                    key={destination.slug}
                    destination={destination.name}
                    description={destination.description}
                    link={destination.slug}
                    toDashboard
                />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
