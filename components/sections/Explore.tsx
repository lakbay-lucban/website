import { Card, CardTitle, CardDescription, CardHeader } from "@/components/ui/card"
import Image from "next/image"

export function Explore() {
  return (
    <section className="py-15 px-6">
      <div className="max-w-6xl mx-auto">
        
        <div className="mb-10 flex flex-col gap-3">
            <h1 className="tracking-widest">EXPLORE LUCBAN</h1>
            <span className="text-lg">Discover destinations and experiences unique to Lucban, Quezon.</span>
        </div>

        
        <div className="grid gap-6 md:grid-cols-3">
            <Card className="max-w-sm overflow-hidden group cursor-pointer p-0">
                <div className="relative w-full aspect-video overflow-hidden">
                    <Image src="/images/church.jpg" alt="San Obispo Church" fill className="object-cover block transition-transform duration-700 ease-out group-hover:scale-105"/>
                </div>

                <CardHeader className="p-4 mt-0">
                    <CardTitle>San Obispo Church</CardTitle>
                    <CardDescription>
                        A historic Baroque church built in 1595, known for its grand façade and deep cultural roots in Lucban’s faith and traditions.
                    </CardDescription>
                </CardHeader>
            </Card>

            <Card className="max-w-sm overflow-hidden group cursor-pointer p-0">
                <div className="relative w-full aspect-video overflow-hidden">
                    <Image src="/images/aliw.jpg" alt="Aliw Falls" fill className="object-cover block transition-transform duration-700 ease-out group-hover:scale-105"/>
                </div>

                <CardHeader className="p-4 mt-0">
                    <CardTitle>Aliw Falls</CardTitle>
                    <CardDescription>
                        A stunning multi-tiered waterfall surrounded by lush greenery — perfect for nature lovers and adventurers.
                    </CardDescription>
                </CardHeader>
            </Card>

            <Card className="max-w-sm overflow-hidden group cursor-pointer p-0">
                <div className="relative w-full aspect-video overflow-hidden">
                    <Image src="/images/kamaynihesus.jpg" alt="Kamay ni Hesus" fill className="object-cover block transition-transform duration-700 ease-out group-hover:scale-105"/>
                </div>

                <CardHeader className="p-4 mt-0">
                    <CardTitle>Kamay ni Hesus</CardTitle>
                    <CardDescription>
                       A famous pilgrimage site featuring a towering statue of the Risen Christ and scenic hilltop views.
                    </CardDescription>
                </CardHeader>
            </Card>
        </div>

      </div>
    </section>
  )
}
