import { getNation } from "@/bridge";
import { Building2, Medal, Users } from "lucide-react";
import MinecraftItem from "@/components/minecraft/MinecraftItem";
import Link from "next/link";
import { formatDateTime } from "@/format";
import DiscordLogo from "@/components/DiscordLogo";
import MinecraftBanner from "@/components/minecraft/MinecraftBanner";
import TownButton from "@/components/ui/towny/TownButton";
import NationButton from "@/components/ui/towny/NationButton";

export const revalidate = 60;

const replaceUnderscoresWithSpaces = (input: string): string => input.replace(/_/g, " ");

export async function generateMetadata({ params }: { params: { uuid: string } }) {
  let nation = await getNation(params.uuid);
  nation.name = replaceUnderscoresWithSpaces(nation.name);

  const rPlural = nation.numResidents > 1 ? "residents" : "resident";

  return {
    title: nation.name,
    description:
      nation.name +
      " is a nation on WorldMC owned by " +
      nation.king.name +
      " with " +
      nation.numResidents +
      ` ${rPlural}\n` +
      nation.board,
  };
}

export default async function Page({ params }: { params: { uuid: string } }) {
  const nation = await getNation(params.uuid);

  const bannerType = nation.bannerMeta?.type || "WHITE_BANNER";
  const bannerPatterns = nation.bannerMeta?.patterns || null;

  return (
    <section className="space-y-4">
      <div className="flex gap-4 rounded-box bg-gradient-to-r from-base-200 to-violet-200 p-4 shadow">
        <figure className="drop-shadow">
          <MinecraftBanner type={bannerType} patterns={bannerPatterns} className="banner" />
        </figure>
        <div className="flex w-full flex-col justify-between gap-2">
          <div className="flex-1">
            <h1 className="text-xl font-black">{replaceUnderscoresWithSpaces(nation.name)}</h1>
            <p>
              By{" "}
              <Link href={`/residents/${nation.king.UUID}`} className="link-hover link-secondary">
                {nation.king.name}
              </Link>
            </p>
            <i>Founded {formatDateTime(nation.registered)}</i>
          </div>

          <div className="flex flex-wrap gap-2">
            {nation.discordLink && (
              <div className="badge badge-lg">
                <DiscordLogo className="mr-1 size-4" />
                <Link href={nation.discordLink} className="link-hover link-secondary">
                  Discord
                </Link>
              </div>
            )}
            <div className="badge badge-lg">
              <MinecraftItem imageSrc="/minecraft/combined/gold_ingot.png" className="mr-1 size-4" /> {nation.bankAccount.toLocaleString()}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <div className="badge badge-info badge-lg">
              <Medal className="mr-1 size-4" /> Lvl {nation.level}
            </div>
            <div className="badge badge-info badge-lg">
              <Users className="mr-1 size-4" /> {nation.numResidents}
            </div>
            <div className="badge badge-info badge-lg">
              <Building2 className="mr-1 size-4" /> {nation.numTowns}
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-black">Tax</h2>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-box bg-gradient-to-r from-base-200 to-emerald-200 p-4 shadow">
          <div className="flex items-center justify-between">
            <h3 className="font-bold">Standard Tax</h3>
            <div className="badge badge-lg">
              <MinecraftItem imageSrc="/minecraft/combined/gold_ingot.png" className="mr-1 size-4" />
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
              <MinecraftItem imageSrc="/minecraft/combined/gold_ingot.png" className="mr-1 size-4" />
              {nation.settings.conqueredTax.toLocaleString()}
            </div>
          </div>
          <p className="text-sm text-base-content/70">Applied to conquered towns</p>
        </div>
        <div className="rounded-box bg-gradient-to-r from-base-200 to-amber-200 p-4 shadow">
          <div className="flex items-center justify-between">
            <h3 className="font-bold">Maximum Tax</h3>
            <div className="badge badge-lg">
              <MinecraftItem imageSrc="/minecraft/combined/gold_ingot.png" className="mr-1 size-4" />
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
          <TownButton item={nation.capital} showCapital={true} />
          {nation.towns
            .filter((town) => town.UUID !== nation.capital.UUID)
            .map((town) => (
              <TownButton item={town} key={town.UUID} />
            ))}
        </div>
      )}
      <hr />
      <h2 className="text-xl font-black">Allies</h2>
      {nation.allies.length === 0 ? (
        <p>This nation has no allies.</p>
      ) : (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
          {nation.allies.map((nation) => (
            <NationButton item={nation} key={nation.UUID} showRelation="ally" />
          ))}
        </div>
      )}
      <hr />
      <h2 className="text-xl font-black">Enemies</h2>
      {nation.enemies.length === 0 ? (
        <p>This nation has no enemies.</p>
      ) : (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
          {nation.enemies.map((nation) => (
            <NationButton item={nation} key={nation.UUID} showRelation="enemy" />
          ))}
        </div>
      )}
    </section>
  );
}
