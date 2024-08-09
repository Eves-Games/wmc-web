import { getNation } from "@/bridge";
import { Building2, Landmark } from "lucide-react";
import MinecraftItem from "@/components/minecraft/MinecraftItem";
import { Banner } from "@/banners";
import Link from "next/link";
import clsx from "clsx";
import { formatDateTime } from "@/format";

export const revalidate = 900;

export default async function Page({ params }: { params: { uuid: string } }) {
  let nation = await getNation(params.uuid);

  return (
    <section className="space-y-4">
      <div className="flex gap-4 rounded-box bg-gradient-to-r from-base-200 to-violet-200 p-4 shadow">
        <figure className="drop-shadow">
          <Banner baseColour="white-dye" primaryPattern={{ name: "Creeper Charge", colour: "red-dye" }} secondaryPattern={null} />
        </figure>
        <div className="flex w-full flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-black">{nation.name}</h1>
              <div className="badge badge-lg">
                <MinecraftItem imageSrc="/minecraft/item/gold_ingot.png" className="mr-1 size-4" /> {nation.bankAccount.toLocaleString()}
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
          <div className="flex flex-wrap gap-2">
            <div className="badge badge-lg bg-indigo-400 text-black">level {nation.level}</div>
            <div className="badge badge-info badge-lg">{nation.numTowns} towns</div>
            <div className={clsx("badge badge-lg", nation.isOpen ? "badge-primary" : "badge-warning")}>
              {nation.isOpen ? "open" : "invite-only"}
            </div>
            <div className={clsx("badge badge-lg", nation.isPublic ? "badge-primary" : "badge-error")}>
              {nation.isPublic ? "public-spawn" : "private-spawn"}
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-black">Tax</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-box bg-gradient-to-r from-base-200 to-emerald-200 p-4 shadow">
          <div className="flex items-center justify-between">
            <h3 className="font-bold">Standard Tax</h3>
            <div className="badge badge-lg">
              <MinecraftItem imageSrc="/minecraft/item/gold_ingot.png" className="mr-1 size-4" />
              {nation.settings.taxes.toLocaleString()}
              {nation.settings.isTaxPercentage && "%"}
            </div>
          </div>
          <p className="text-sm text-base-content/70">{nation.settings.isTaxPercentage ? "Percentage per town" : "Flat rate per town"}</p>
        </div>
        <div className="rounded-box bg-gradient-to-r from-base-200 to-rose-200 p-4 shadow">
          <div className="flex items-center justify-between">
            <h3 className="font-bold">Conquered Tax</h3>
            <div className="badge badge-lg">
              <MinecraftItem imageSrc="/minecraft/item/gold_ingot.png" className="mr-1 size-4" />
              {nation.settings.conqueredTax.toLocaleString()}
            </div>
          </div>
          <p className="text-sm text-base-content/70">Applied to conquered towns</p>
        </div>
        <div className="rounded-box bg-gradient-to-r from-base-200 to-amber-200 p-4 shadow">
          <div className="flex items-center justify-between">
            <h3 className="font-bold">Maximum Tax</h3>
            <div className="badge badge-lg">
              <MinecraftItem imageSrc="/minecraft/item/gold_ingot.png" className="mr-1 size-4" />
              {nation.settings.maxPercentTaxAmount.toLocaleString()}
            </div>
          </div>
          <p className="text-sm text-base-content/70">Upper limit for taxes</p>
        </div>
        <div className="rounded-box bg-gradient-to-r from-base-200 to-sky-200 p-4 shadow">
          <div className="flex items-center justify-between">
            <h3 className="font-bold">Maximum Tax</h3>
            <div className="badge badge-lg">{nation.settings.isTaxPercentage ? "Percentage" : "Flat Rate"}</div>
          </div>
          <p className="text-sm text-base-content/70">Method of tax calculation</p>
        </div>
      </div>
      <hr />
      <h2 className="text-xl font-black">Board</h2>
      <p>{nation.board}</p>
      <hr />
      <h2 className="text-xl font-black">Towns</h2>
      {nation.towns.length === 0 ? (
        <p>This nation has no towns.</p>
      ) : (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
          <Link
            href={`/towns/${nation.capital.UUID}`}
            className="btn btn-lg btn-block justify-between bg-gradient-to-r from-base-200 to-blue-200"
            key={nation.capital.UUID}
          >
            {nation.capital.name} (Capital)
            <Landmark />
          </Link>
          {nation.towns
            .filter((town) => town.UUID !== nation.capital.UUID)
            .map((town) => (
              <Link
                href={`/towns/${town.UUID}`}
                className="btn btn-lg btn-block justify-between bg-gradient-to-r from-base-200 to-blue-200"
                key={town.UUID}
              >
                {town.name}
                <Building2 />
              </Link>
            ))}
        </div>
      )}
    </section>
  );
}
