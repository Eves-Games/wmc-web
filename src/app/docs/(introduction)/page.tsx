import Image from "next/image";
import { TriangleAlert } from "lucide-react";

export default function Page() {
  return (
    <section className="space-y-4">
      <h1 className="text-5xl font-black">Welcome to WorldMC!</h1>

      <Image src="/worldmap.png" alt="WorldMC Earth Map" className="rounded-box shadow" width={1920} height={1080} layout="responsive" />

      <p>
        WorldMC is an immersive Minecraft experience where you can explore a 1:1000 scale Earth map, build empires, engage in politics, and
        shape the global economy.
      </p>

      <div>
        <h2 className="mb-2 text-2xl font-bold">Key Features</h2>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            Supports up to <strong>500 players</strong> simultaneously
          </li>
          <li>
            Powered by cutting-edge <strong>Paper Folia</strong> server software
          </li>
          <li>More interactions, grander cities, and epic battles!</li>
          <li>
            Enhanced <strong>Towny plugin</strong> for rich political gameplay
          </li>
          <li>Found your own town or join existing alliances</li>
          <li>Engage in diplomacy, run for office, or become a business tycoon</li>
          <li>
            <strong>Gold-based economy</strong> controlled by supply and demand
          </li>
          <li>Start businesses, trade resources, or master a craft</li>
          <li>Player-managed shops and fluctuating market prices</li>
        </ul>
      </div>

      <div className="alert alert-warning shadow">
        <TriangleAlert />
        Remember! In WorldMC, your actions shape the world. Will you rise to the challenge and leave your mark on history?
      </div>
    </section>
  );
}
