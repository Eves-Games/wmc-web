import { getAuthenticatedUser } from "@/auth";
import { getNation, getNationTowns, getResident } from "@/bridge";
import { generateBanner } from "@/banners";
import { formatDateTime } from "@/format";
import clsx from "clsx";
import { AlertTriangle, DollarSign, Ellipsis, LogOut, Pencil, Percent, TrendingUp } from "lucide-react";
import Link from "next/link";
import MinecraftItem from "@/components/minecraft/MinecraftItem";

export const revalidate = 900;

export default async function Page({ params }: { params: { uuid: string } }) {
  const user = getAuthenticatedUser();

  const nation = await getNation(params.uuid);
  const towns = await getNationTowns(params.uuid);
  const resident = user ? await getResident(user.uuid) : null;

  const hasNation = resident && resident.nation;
  const isResident = hasNation && resident.nation!.UUID == nation.UUID;
  const isKing = user && nation.king.UUID == user.uuid;

  return (
    <section className="space-y-4">
      <div className="relative flex gap-4 rounded-box bg-gradient-to-r from-base-200 to-violet-200 p-4 shadow-lg">
        <figure className="drop-shadow-lg">
          {generateBanner(
            "white-dye",
            {
              name: "Creeper Charge",
              colour: "red-dye",
            },
            null,
          )}
        </figure>
        <div className="flex w-full flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-black">{nation.name}</h1>
              <div className={clsx("dropdown dropdown-end absolute right-4 top-4", !isResident && "hidden")}>
                <button className="btn btn-ghost btn-xs">
                  <Ellipsis />
                </button>
                <ul tabIndex={0} className="menu dropdown-content menu-sm z-[1] w-fit rounded-box bg-base-100 shadow">
                  <li className={clsx(!isKing && "hidden")}>
                    <Link href={`/towns/${nation.UUID}/configure`} className="text-nowrap">
                      <Pencil className="size-5" />
                      Configure
                    </Link>
                  </li>
                  <li className={clsx(isKing && "hidden")}>
                    <button className="text-nowrap">
                      <LogOut className="size-5" />
                      Leave Nation
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <p>
              By{" "}
              <Link href={`/residents/${nation.king.UUID}`} className="link-hover link-secondary">
                {nation.king.name}
              </Link>
            </p>
            <i>Founded {formatDateTime(nation.registered)}</i>
          </div>
          <div className="flex flex-col justify-between gap-2 md:flex-row md:items-end">
            <div className="flex gap-2">
              <div className="badge badge-lg bg-indigo-400 text-black">level {nation.level}</div>
              <div className="badge badge-info badge-lg">{nation.numTowns} towns</div>
              <div className={clsx("badge badge-lg", nation.isOpen ? "badge-primary" : "badge-warning")}>
                {nation.isOpen ? "open" : "invite-only"}
              </div>
            </div>
            <button className={clsx("btn btn-outline", hasNation && "hidden")}>Submit Town</button>
          </div>
        </div>
      </div>
      <h2 className="text-xl font-black">Board</h2>
      <p>{nation.board}</p>
      <hr />
      <h2 className="text-xl font-black">Taxation</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-box bg-gradient-to-r from-base-200 to-emerald-200 p-4 shadow-lg">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="font-bold">Standard Tax</h3>
            <DollarSign className="size-5" />
          </div>
          <p className="text-2xl font-bold">
            {nation.settings.taxes}
            {nation.settings.isTaxPercentage && "%"} <MinecraftItem imageSrc="/minecraft/item/gold_ingot.png" className="inline-block" />
          </p>
          <p className="text-sm text-base-content/70">{nation.settings.isTaxPercentage ? "Percentage per town" : "Flat rate per town"}</p>
        </div>
        <div className="rounded-box bg-gradient-to-r from-base-200 to-rose-200 p-4 shadow-lg">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="font-bold">Conquered Tax</h3>
            <AlertTriangle className="size-5" />
          </div>
          <p className="text-2xl font-bold">
            {nation.settings.conqueredTax} <MinecraftItem imageSrc="/minecraft/item/gold_ingot.png" className="inline-block" />
          </p>
          <p className="text-sm text-base-content/70">Applied to conquered towns</p>
        </div>
        <div className="rounded-box bg-gradient-to-r from-base-200 to-amber-200 p-4 shadow-lg">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="font-bold">Maximum Tax</h3>
            <TrendingUp className="size-5" />
          </div>
          <p className="text-2xl font-bold">
            {nation.settings.maxPercentTaxAmount} <MinecraftItem imageSrc="/minecraft/item/gold_ingot.png" className="inline-block" />
          </p>
          <p className="text-sm text-base-content/70">Upper limit for taxes</p>
        </div>
        <div className="rounded-box bg-gradient-to-r from-base-200 to-sky-200 p-4 shadow-lg">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="font-bold">Tax Type</h3>
            <Percent className="size-5" />
          </div>
          <p className="text-2xl font-bold">{nation.settings.isTaxPercentage ? "Percentage" : "Flat Rate"}</p>
          <p className="text-sm text-base-content/70">Method of tax calculation</p>
        </div>
      </div>
      <hr />
      <h2 className="text-xl font-black">Towns ({nation.numTowns})</h2>
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
      <div className="relative w-full overflow-hidden rounded-box pt-[56.25%] shadow-lg">
        <iframe
          src={`https://map.worldmc.net/?world=minecraft_overworld&zoom=5&x=${nation.spawn.x}&z=${nation.spawn.z}`}
          className="absolute left-0 top-0 h-full w-full"
          allowFullScreen
        />
      </div>
    </section>
  );
}
