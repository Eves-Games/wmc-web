import type { Nation, PaginatedResult, PartialTown } from "@/types/bridge";
import { generateBanner } from "@/banners";
import Link from "next/link";
import WorldMap from "@/components/WorldMap";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface AboutTabProps {
  nation: Nation;
  towns: PaginatedResult<PartialTown>;
}

export default function AboutTab({ nation, towns }: AboutTabProps) {
  return (
    <>
      <h2 className="text-xl font-black">Board</h2>
      <p>{nation.board}</p>
      <hr />
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-black">Towns</h2>
        <div className="flex gap-4">
          <button className="btn btn-disabled btn-ghost btn-xs">
            <ChevronLeft />
          </button>
          <p>Page 1</p>
          <button className="btn btn-disabled btn-ghost btn-xs">
            <ChevronRight />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-5 lg:grid-cols-7">
        {towns.data.map((town) => (
          <div className="flex flex-col items-center" key={town.UUID}>
            <div className="p-2">
              {generateBanner(
                "white-dye",
                {
                  name: "Snout",
                  colour: "blue-dye",
                },
                null,
              )}
            </div>
            <Link href={`/towns/${town.UUID}`} className="btn btn-sm w-full shadow">
              <p className="truncate">{town.name}</p>
            </Link>
          </div>
        ))}
      </div>
      <hr />
      <h2 className="text-xl font-black">Map</h2>
      <WorldMap coordinates={{ x: nation.spawn.x, z: nation.spawn.z }} />
    </>
  );
}
