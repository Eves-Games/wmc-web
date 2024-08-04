import { AlertTriangle, DollarSign, Percent, TrendingUp, Wallet, Users, BarChart2, MapPin, Home, Map } from "lucide-react";
import MinecraftItem from "@/components/minecraft/MinecraftItem";
import type { Nation } from "@/types/bridge";

interface EconomyTabProps {
  nation: Nation;
}

export default function EconomyTab({ nation }: EconomyTabProps) {
  const gdpPerCapita = nation.numResidents > 0 ? Math.floor(nation.bankAccount / nation.numResidents) : 0;
  const economicDensity = nation.numTownblocks > 0 ? Math.floor(nation.bankAccount / nation.numTownblocks) : 0;

  return (
    <>
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
      <h2 className="mt-6 text-xl font-black">Taxation</h2>
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
    </>
  );
}
