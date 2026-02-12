import { Button } from "@/components/ui/button";
import { CircleArrowDown } from 'lucide-react';

export function Hero() {

  return (
    <section className="relative h-screen">
       <video className="absolute inset-0 h-full w-full object-cover object-center" autoPlay loop muted playsInline>
        <source src="/videos/hero.mp4" type="video/mp4"/>
      </video>

      <div className="absolute inset-0 flex flex-col gap-2 items-center justify-center opacity-90">
        <div className="rounded-md bg-white p-5 text-center max-w-xs sm:max-w-md">
          <h1 className="tracking-widest">LUCBAN, QUEZON</h1>
          <p className="text-sm">The Art & Summer Capital of Quezon Province</p>
        </div>
        <br/><br/>
        <div className="flex flex-col gap-3">
          <span className="text-white font-bold">DISCOVER MORE</span>
          <Button variant="default" className="bg-transparent hover:bg-transparent">
            <CircleArrowDown className="size-8"/>
          </Button>
        </div>
      </div>
    </section>
  );
}