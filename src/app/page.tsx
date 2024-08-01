import CopyIp from "@/components/CopyIp";
import Image from "next/image";

export default function Home() {
  return (
    <section className="space-y-4">
      <div className="hero rounded-box bg-base-200 py-8 shadow-lg" style={{backgroundImage: "url(/londondark.png)", backgroundBlendMode: "multiply"}}>
        <div className="hero-content text-center text-white">
          <div className="max-w-md">
            <h1 className="text-6xl font-black">WorldMC</h1>
            <h2 className="text-4xl font-bold">Minecraft Earth</h2>
            <p className="py-6">
              Explore a 1:1000 Earth map in Minecraft. Build empires, engage in politics, and shape the global economy in this immersive,
              player-driven world.
            </p>
            <CopyIp />
          </div>
        </div>
      </div>
    </section>
  );
}
