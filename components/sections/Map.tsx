import { Button } from "@/components/ui/button"
import { Map, MapControls } from "@/components/ui/map";

const styles = {
  default: undefined,
  openstreetmap: "https://tiles.openfreemap.org/styles/liberty",
  openstreetmap3d: "https://tiles.openfreemap.org/styles/liberty",
};


export function PlanMap() {
  return (
    <section className="py-15 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        
        <div className="space-y-6">
          <h1 className="tracking-widest">FIND YOUR WAY AROUND</h1>
          <p>
            Explore Lucban’s attractions, landmarks, and hidden gems all in one interactive map. Plan your route, find nearby points of interest, and make the most of your visit
          </p>
          <Button variant="outline" className="hover:bg-black hover:text-white border-black">View Map</Button>
        </div>

        <div className="relative w-full h-64 md:h-100 rounded-lg overflow-hidden">
            <Map center={[121.554832, 14.114280]} theme="light" styles={{ light: "https://tiles.openfreemap.org/styles/bright", dark: "https://tiles.openfreemap.org/styles/bright" }} zoom={16}>
                <MapControls />
            </Map>
        </div>

      </div>
    </section>
  )
}
