"use client";

import "./globals.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Inter } from "next/font/google";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import { InputGroup, InputGroupButton, InputGroupInput } from "@/components/ui/input-group";
import { Search, Menu } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });
const linkClasses = "font-bold text-[17px] hover:text-gray-900 hover:bg-white transition-colors duration-200";

export default function RootLayout({ children }: { children: React.ReactNode }) {

  const router = useRouter();
  const [query, setQuery] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;

    const cleaned = query
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/^-+|-+$/g, "");

    const encoded = encodeURIComponent(cleaned);

    router.push(`/destinations/${encoded}`);

    setQuery("");
  }

  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <div className="w-full bg-gray-900 text-white">
          <div className="px-4 md:px-10 py-2 flex flex-wrap justify-between">

            {/* Mobile Navigation */}
            <Sheet>
              <SheetTrigger className="md:hidden">
                <Menu className="stroke-3"/>
              </SheetTrigger>
              <SheetContent side="left" className="bg-gray-900 border-none text-white font-bold px-5 py-10 w-60">
                <nav className="flex flex-col gap-6 text-xl">
                  <Link href="/">Home</Link>
                  <Link href="/about-us">About Us</Link>
                  <Link href="/destinations">Destinations</Link>
                </nav>
              </SheetContent>
            </Sheet>

            {/* Desktop Navigation */}
            <div className="hidden md:flex">
              <NavigationMenu>
                  <NavigationMenuList className="gap-8">
                    <NavigationMenuItem>
                      <NavigationMenuLink asChild>  
                        <Link href="/" className={linkClasses}>
                          Home
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>

                  <NavigationMenuItem>
                      <NavigationMenuLink asChild>
                        <Link href="/about-us" className={linkClasses}>
                          About Us
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                      <NavigationMenuLink asChild>
                        <Link href="/destinations" className={linkClasses}>
                          Destinations
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  </NavigationMenuList>
              </NavigationMenu>
            </div>

            {/* Searchbar */}
            <form onSubmit={handleSubmit}>
              <div>
                <InputGroup className="border-gray-600">
                  <InputGroupInput placeholder="Search destinations.." value={query} onChange={(e) => setQuery(e.target.value)}/>
                  <InputGroupButton>
                      <Search className="w-5 h-5 stroke-4"/>
                    </InputGroupButton>
                </InputGroup>
              </div>
            </form>
          </div>
        </div>
        {children}
      </body>
    </html>
  );
}
