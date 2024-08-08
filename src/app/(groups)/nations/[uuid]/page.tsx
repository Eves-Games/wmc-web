import React from "react";
import { getNation, getResident } from "@/bridge";
import { Wallet, Users, BarChart2, DollarSign, AlertTriangle, TrendingUp, Percent, Ellipsis, Pencil, LogOut } from "lucide-react";
import MinecraftItem from "@/components/minecraft/MinecraftItem";
import { Banner } from "@/banners";
import Link from "next/link";
import clsx from "clsx";
import { formatDateTime } from "@/format";

export const revalidate = 900;

export default async function Page({ params }: { params: { uuid: string } }) {
  const nation = await getNation(params.uuid);

  const gdpPerCapita = nation.numResidents > 0 ? Math.floor(nation.bankAccount / nation.numResidents) : 0;
  const economicDensity = nation.numTownblocks > 0 ? Math.floor(nation.bankAccount / nation.numTownblocks) : 0;

  return (
    <section className="space-y-4">
      <div className="relative flex gap-4 rounded-box bg-gradient-to-r from-base-200 to-violet-200 p-4 shadow">
        <figure className="drop-shadow">
          <Banner baseColour="white-dye" primaryPattern={{ name: "Creeper Charge", colour: "red-dye" }} secondaryPattern={null} />
        </figure>
        <div className="flex w-full flex-col justify-between">
          <div>
            <h1 className="text-xl font-black">{nation.name}</h1>
            <p>
              By{" "}
              <Link href={`/residents/${nation.king.UUID}`} className="link-hover link-secondary">
                {nation.king.name}
              </Link>
            </p>
            <i>Founded {formatDateTime(nation.registered)}</i>
          </div>
          <div className="flex gap-2">
            <div className="badge badge-lg bg-indigo-400 text-black">level {nation.level}</div>
            <div className="badge badge-info badge-lg">{nation.numTowns} towns</div>
            <div className={clsx("badge badge-lg", nation.isOpen ? "badge-primary" : "badge-warning")}>
              {nation.isOpen ? "open" : "invite-only"}
            </div>
          </div>
        </div>
      </div>
      <h2 className="text-xl font-black">Board</h2>
      <p>{nation.board}</p>
      <h2 className="text-xl font-black">Towns</h2>
      {nation.towns.length === 0 ? (
        <p>This nation has no towns.</p>
      ) : (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-5 lg:grid-cols-7">
          {nation.towns.map((town) => (
            <div className="flex flex-col items-center" key={town.UUID}>
              <div className="p-2">
                <Banner baseColour="white-dye" primaryPattern={{ name: "Snout", colour: "blue-dye" }} secondaryPattern={null} />
              </div>
              <Link href={`/towns/${town.UUID}`} className="btn btn-sm w-full shadow">
                <p className="truncate">{town.name}</p>
              </Link>
            </div>
          ))}
        </div>
      )}
      <h2 className="text-xl font-black">Economic Overview</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-box bg-base-200 p-4 shadow">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="font-bold">Bank Account</h3>
            <Wallet className="size-5" />
          </div>
          <p className="text-2xl font-bold">
            {nation.bankAccount} <MinecraftItem imageSrc="/minecraft/item/gold_ingot.png" className="inline-block" />
          </p>
          <p className="text-sm text-base-content/70">Total national reserve</p>
        </div>
        <div className="rounded-box bg-base-200 p-4 shadow">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="font-bold">GDP per Capita</h3>
            <Users className="size-5" />
          </div>
          <p className="text-2xl font-bold">
            {gdpPerCapita} <MinecraftItem imageSrc="/minecraft/item/gold_ingot.png" className="inline-block" />
          </p>
          <p className="text-sm text-base-content/70">Wealth per resident</p>
        </div>
        <div className="rounded-box bg-base-200 p-4 shadow">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="font-bold">Economic Density</h3>
            <BarChart2 className="size-5" />
          </div>
          <p className="text-2xl font-bold">
            {economicDensity} <MinecraftItem imageSrc="/minecraft/item/gold_ingot.png" className="inline-block" />
          </p>
          <p className="text-sm text-base-content/70">Wealth per town block</p>
        </div>
      </div>
      <h2 className="text-xl font-black">Taxation</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-box bg-gradient-to-r from-base-200 to-emerald-200 p-4 shadow">
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
        <div className="rounded-box bg-gradient-to-r from-base-200 to-rose-200 p-4 shadow">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="font-bold">Conquered Tax</h3>
            <AlertTriangle className="size-5" />
          </div>
          <p className="text-2xl font-bold">
            {nation.settings.conqueredTax} <MinecraftItem imageSrc="/minecraft/item/gold_ingot.png" className="inline-block" />
          </p>
          <p className="text-sm text-base-content/70">Applied to conquered towns</p>
        </div>
        <div className="rounded-box bg-gradient-to-r from-base-200 to-amber-200 p-4 shadow">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="font-bold">Maximum Tax</h3>
            <TrendingUp className="size-5" />
          </div>
          <p className="text-2xl font-bold">
            {nation.settings.maxPercentTaxAmount} <MinecraftItem imageSrc="/minecraft/item/gold_ingot.png" className="inline-block" />
          </p>
          <p className="text-sm text-base-content/70">Upper limit for taxes</p>
        </div>
        <div className="rounded-box bg-gradient-to-r from-base-200 to-sky-200 p-4 shadow">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="font-bold">Tax Type</h3>
            <Percent className="size-5" />
          </div>
          <p className="text-2xl font-bold">{nation.settings.isTaxPercentage ? "Percentage" : "Flat Rate"}</p>
          <p className="text-sm text-base-content/70">Method of tax calculation</p>
        </div>
      </div>
    </section>
  );
}

//<h2 className="text-xl font-black">Spawn Map</h2>
//<WorldMap coordinates={{ x: nation.spawn.x, z: nation.spawn.z }} />
