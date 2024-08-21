import { getTown } from "@/bridge";
import { Banner } from "@/banners";
import { formatDateTime } from "@/format";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import MinecraftItem from "@/components/minecraft/MinecraftItem";
import { Flag, Medal, Shield, User, Users } from "lucide-react";
import DiscordLogo from "@/components/DiscordLogo";

export const revalidate = 60;

const replaceUnderscoresWithSpaces = (input: string): string => input.replace(/_/g, " ");

export async function generateMetadata({ params }: { params: { uuid: string } }) {
  let town = await getTown(params.uuid);
  town.name = replaceUnderscoresWithSpaces(town.name);

  const rPlural = town.residents.length > 1 ? "residents" : "resident";

  return {
    title: town.name,
    description:
      town.name + " is a town on WorldMC owned by " + town.mayor.name + " with " + town.residents.length + ` ${rPlural}.\n` + town.board,
  };
}

export default async function Page({ params }: { params: { uuid: string } }) {
  const town = await getTown(params.uuid);

  return (
    <section className="space-y-4">
      <div className="flex gap-4 rounded-box bg-gradient-to-r from-base-200 to-blue-200 p-4 shadow">
        <figure className="drop-shadow">
          <Banner baseColour="white-dye" primaryPattern={{ name: "Creeper Charge", colour: "red-dye" }} secondaryPattern={null} />
        </figure>
        <div className="flex w-full flex-col justify-between gap-2">
          <div className="flex-1">
            <h1 className="text-xl font-black">{replaceUnderscoresWithSpaces(town.name)}</h1>
            <p>
              By{" "}
              <Link href={`/residents/${town.mayor.UUID}`} className="link-hover link-secondary">
                {town.mayor.name}
              </Link>
            </p>
            <i>Founded {formatDateTime(town.registered)}</i>
          </div>

          <div className="flex flex-wrap gap-2">
            {town.discordLink && (
              <div className="badge badge-lg">
                <DiscordLogo className="mr-1 size-4" />
                <Link href={town.discordLink} className="link-hover link-secondary">
                  Discord
                </Link>
              </div>
            )}
            <div className="badge badge-lg">
              <MinecraftItem imageSrc="/minecraft/item/gold_ingot.png" className="mr-1 size-4" /> {town.bankAccount.toLocaleString()}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <div className="badge badge-info badge-lg">
              <Medal className="mr-1 size-4" /> Lvl {town.level}
            </div>
            <div className="badge badge-info badge-lg">
              <Users className="mr-1 size-4" /> {town.residents.length}
            </div>
          </div>
        </div>
      </div>
      <h2 className="text-xl font-black">Settings</h2>
      <div className="flex flex-wrap gap-2">
        <div className={clsx("badge badge-lg", town.settings.pvp ? "badge-primary" : "badge-accent")}>pvp</div>
        <div className={clsx("badge badge-lg", town.settings.fire ? "badge-primary" : "badge-accent")}>fire spread</div>
        <div className={clsx("badge badge-lg", town.settings.mobs ? "badge-primary" : "badge-accent")}>hostile mobs</div>
        <div className={clsx("badge badge-lg", town.settings.explosions ? "badge-primary" : "badge-accent")}>explosions</div>
      </div>
      <hr />
      <h2 className="text-xl font-black">Board</h2>
      <p>{town.board}</p>
      <hr />
      <h2 className="text-xl font-black">Nation</h2>
      {town.nation ? (
        <Link
          href={`/nations/${town.nation.UUID}`}
          className="btn btn-lg btn-block justify-between bg-gradient-to-r from-base-200 to-violet-200"
        >
          {replaceUnderscoresWithSpaces(town.nation.name)}
          <Flag />
        </Link>
      ) : (
        <p>This town has no nation.</p>
      )}
      <hr />
      <h2 className="text-xl font-black">Residents ({town.residents.length})</h2>
      {town.residents.length == 0 ? (
        <p>This town has no residents.</p>
      ) : (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
          <Link
            href={`/residents/${town.mayor.UUID}`}
            className="btn btn-lg btn-block justify-between bg-gradient-to-r from-base-200 to-green-200"
          >
            <div className="flex items-center gap-4">
              <Image
                src={`https://crafatar.com/avatars/${town.mayor.UUID}?size=32&default=MHF_Steve&overlay`}
                alt={`${town.mayor.name}'s Minecraft Face`}
                height={32}
                width={32}
                className="size-8"
              />
              {town.mayor.name} (Mayor)
            </div>
            <Shield />
          </Link>
          {town.residents
            .filter((resident) => resident.UUID !== town.mayor.UUID)
            .map((resident) => (
              <Link
                href={`/residents/${resident.UUID}`}
                className="btn btn-lg btn-block justify-between bg-gradient-to-r from-base-200 to-green-200"
                key={resident.UUID}
              >
                <div className="flex items-center gap-4">
                  <Image
                    src={`https://crafatar.com/avatars/${resident.UUID}?size=32&default=MHF_Steve&overlay`}
                    alt={`${resident.name}'s Minecraft Face`}
                    height={32}
                    width={32}
                    className="size-8"
                  />
                  {resident.name}
                </div>
                <User />
              </Link>
            ))}
        </div>
      )}
    </section>
  );
}
