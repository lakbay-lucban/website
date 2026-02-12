import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Search, AlignRight, Globe } from "lucide-react";
import Image from 'next/image'
import Link from "next/link";

export function Navbar() {

    const destinationItems = [
        { title: "Resorts & Hotels", description: "Relaxing stays near nature and town" },
        { title: "Nature & Outdoors", description: "Hiking trails, rivers, and scenic escapes" },
        { title: "Heritage & Culture", description: "Historic sites, traditions, and local life" },
        { title: "Faith & Pilgrimage", description: "Sacred sites and spiritual destinations" },
        { title: "Festivals & Events", description: "Experience Lucban’s famous Pahiyas and other celebrations" },
    ];

    const thingsToDoItems = [
        { title: "Food & Dining", description: "Savor local cuisine and must-try dishes" },
        { title: "Shopping & Souvenirs", description: "Find unique crafts and local products" },
        { title: "Arts & Culture", description: "Explore museums, galleries, and cultural centers" },
        { title: "Outdoor Activities", description: "Hiking, river tubing, and nature tours" },
        { title: "Family-Friendly", description: "Fun activities for all ages" },
        { title: "Festivals & Events", description: "Experience Lucban’sq famous Pahiyas and other celebrations" },
    ];

    const planItems = [
        { title: "How to Get There", description: "Transportation options to reach Lucban" },
        { title: "Best Time to Visit", description: "Seasonal highlights and weather tips" },
        { title: "Local Guides & Tours", description: "Find expert guides and tour packages" },
        { title: "Travel Tips", description: "Essential information for a smooth trip" },
        { title: "Itineraries", description: "Plans for different interests and durations" },
    ];

     const aboutItems = [
        { title: "About Us", description: "Learn about our mission and team" },
        { title: "Contact Us", description: "Get in touch for inquiries and support" },
        { title: "Privacy Policy", description: "Understand how we handle your data" },
        { title: "Terms of Service", description: "Review the rules and guidelines" },
    ];

    const renderDropdown = (items: typeof destinationItems) => (
        <ul className="grid grid-flow-col grid-rows-2 gap-3">
        {items.map((item, idx) => (
            <li key={idx} className="rounded-md p-3 hover:bg-accent transition-colors">
            <p className="font-semibold leading-none">{item.title}</p>
            <p className="text-xs text-muted-foreground mt-1 max-w-60 line-clamp-2">{item.description}</p>
            </li>
        ))}
        </ul>
    );

  return (
    <div className="w-full">

      <div className="hidden md:flex px-30 items-center justify-between py-5">

        <div className="flex-1">
            <Image src="/favicon.svg" alt="Lucban Logo" width={38} height={38}/>
        </div>

        <div className="flex-1 flex justify-center gap-5">
          <NavigationMenu>
            <NavigationMenuList className="flex gap-3">
              <NavigationMenuItem>
                <NavigationMenuTrigger className="font-bold">DESTINATIONS</NavigationMenuTrigger>
                <NavigationMenuContent className="px-5 py-5 flex gap-20 justify-center">
                    {renderDropdown(destinationItems)}
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="font-bold">THINGS TO DO</NavigationMenuTrigger>
                <NavigationMenuContent className="px-5 py-5 flex gap-20 justify-center">
                    {renderDropdown(thingsToDoItems)}
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="font-bold">PLAN YOUR TRIP</NavigationMenuTrigger>
                <NavigationMenuContent className="px-5 py-5 flex gap-20 justify-center">
                    {renderDropdown(planItems)}
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="font-bold">ABOUT</NavigationMenuTrigger>
                <NavigationMenuContent className="px-5 py-5 flex gap-20 justify-center">
                    {renderDropdown(aboutItems)}
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center flex-1 justify-end">
          <NavigationMenu>
            <NavigationMenuList className="flex gap-0">
              <NavigationMenuItem>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Link href="/search">
                    <Search className="stroke-3 size-6"/>
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="gap-2"><Globe className="size-6"/>English</NavigationMenuTrigger>
                <NavigationMenuContent></NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>

      <div className="md:hidden flex justify-between py-3 px-3">
        <Image src="/favicon.svg" alt="Lucban Logo" width={48} height={48}/>

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link href="/search">
                  <Search className="stroke-3 size-5"/>
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Sheet>
                  <SheetTitle>
                    <SheetTrigger asChild>
                      <Link href="#">
                        <AlignRight className="stroke-3"/>
                      </Link>
                    </SheetTrigger>
                  </SheetTitle>
                  <SheetContent side="top" className="h-full px-5 py-15">
                    <Accordion type="single" collapsible>
                      <AccordionItem value="destinations">
                        <AccordionTrigger className="font-bold">DESTINATIONS</AccordionTrigger>
                        <AccordionContent>
                            <ul className="space-y-3">
                                {destinationItems.map((item) => (
                                    <li key={item.title} className="cursor-pointer">
                                        <p className="font-medium">{item.title}</p>
                                    </li>
                                ))}
                            </ul>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="things-to-do">
                        <AccordionTrigger className="font-bold">THINGS TO DO</AccordionTrigger>
                        <AccordionContent>
                            <ul className="space-y-3">
                                {thingsToDoItems.map((item) => (
                                    <li key={item.title} className="cursor-pointer">
                                        <p className="font-medium">{item.title}</p>
                                    </li>
                                ))}
                            </ul>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="plan-your-trip">
                        <AccordionTrigger className="font-bold">PLAN YOUR TRIP</AccordionTrigger>
                        <AccordionContent>
                            <ul className="space-y-3">
                                {planItems.map((item) => (
                                    <li key={item.title} className="cursor-pointer">
                                        <p className="font-medium">{item.title}</p>
                                    </li>
                                ))}
                            </ul>
                        </AccordionContent>
                      </AccordionItem>

                      <AccordionItem value="about">
                        <AccordionTrigger className="font-bold">ABOUT</AccordionTrigger>
                        <AccordionContent>
                            <ul className="space-y-3">
                                {aboutItems.map((item) => (
                                    <li key={item.title} className="cursor-pointer">
                                        <p className="font-medium">{item.title}</p>
                                    </li>
                                ))}
                            </ul>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>

                    <SheetFooter>
                      <Accordion type="single" collapsible>
                        <AccordionItem value="language">
                          <AccordionTrigger className="font-bold">
                            <span className="flex gap-3"><Globe/>English</span>
                          </AccordionTrigger>
                          <AccordionContent>
                            
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </SheetFooter>

                  </SheetContent>
                </Sheet>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
}