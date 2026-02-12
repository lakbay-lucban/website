import { Explore } from "@/components/sections/Explore";
import { Hero } from "@/components/sections/Hero";
import { PlanMap } from "@/components/sections/Map";

export default function Home() {
  return (
    <div>
        <Hero/>
        <Explore/>
        <PlanMap/>
    </div>
  );
}
