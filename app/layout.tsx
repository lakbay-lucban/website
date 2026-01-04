import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/navBar";
import { retrieveData } from "@/lib/supabase";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const destinations = (await retrieveData("destinations")) ?? [];
  const food = (await retrieveData("food")) ?? [];

  const items = [
    ...destinations.map((d) => ({
      name: d.name,
      path: `/destinations/${d.slug}`,
    })),
    ...food.map((f) => ({
      name: f.name,
      path: `/food/${f.slug}`,
    })),
  ];

  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Navbar items={items} />
        {children}
      </body>
    </html>
  );
}
