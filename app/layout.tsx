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
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import { InputGroup, InputGroupButton, InputGroupInput } from "@/components/ui/input-group";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";

import destinations from "@/data/destinations.json";

const items = destinations.map(d => ({ name: d.destination, link: d.link }));

import { Search, Menu } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });
const linkClasses = "font-bold text-[17px] focus:bg-gray-900 focus:text-white hover:text-gray-900 hover:bg-white transition-colors duration-200";

export default function RootLayout({ children }: { children: React.ReactNode }) {

  const router = useRouter();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

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
    setOpen(false);
  }

  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <div className="fixed top-0 left-0 w-full bg-gray-900 text-white z-50 shadow-md">
          <div className="px-4 md:px-10 py-2 flex flex-wrap justify-between">

            <Sheet>
              <SheetTrigger className="md:hidden">
                <Menu className="stroke-3"/>
              </SheetTrigger>
              <SheetContent side="left" className="bg-gray-900 border-none text-white font-bold px-5 py-10 w-60 h-full">
                <SheetTitle></SheetTitle>
                <nav className="flex flex-col gap-6 text-xl">
                  <SheetClose asChild>
                    <Link href="/">Home</Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href="/about-us">About Us</Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href="/destinations">Destinations</Link>
                  </SheetClose>
                </nav>
              </SheetContent>
            </Sheet>

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

            <form onSubmit={handleSubmit}>
              <div className="relative">
                <InputGroup className="border-gray-600 ">
                  <InputGroupInput
                    placeholder="Search destinations.."
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setOpen(true);
                    }}
                    onBlur={() => {
                      setTimeout(() => setOpen(false), 100); // delay allows click to register
                    }}
                    onFocus={() => setOpen(true)}
                  />
                  <InputGroupButton type="submit">
                    <Search className="w-5 h-5 stroke-4" />
                  </InputGroupButton>
                </InputGroup>


                {open && query !== "" && filteredItems.length > 0 && (
                  <div className="absolute left-0 right-0 mt-2 z-50 rounded-md shadow-md" onMouseDown={(e) => e.preventDefault()}>
                    <Command>
                      <CommandGroup className="bg-gray-900 text-white border border-gray-600">
                        {filteredItems.map(item => (
                          <CommandItem
                            key={item.link}
                            onSelect={() => {
                              router.push(`/destinations/${item.link}`);
                              setQuery("");
                              setOpen(false);
                            }}
                          >
                            {item.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </div>
                )}

              </div>
            </form>
          </div>
        </div>
        {children}
      </body>
    </html>
  );
}
