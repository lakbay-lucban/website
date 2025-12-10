import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/navBar";
import { retrieveDestinations } from "@/lib/supabase";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const destinations = await retrieveDestinations();
  const items = destinations.map((d) => ({
    name: d.destination,
    link: d.slug,
  }));

  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Navbar items={items} />
        {children}
      </body>
    </html>
  );
}
