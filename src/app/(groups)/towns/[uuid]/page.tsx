import { getTown } from "@/bridge";
import { Banner } from "@/banners";
import { formatDateTime } from "@/format";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import MinecraftItem from "@/components/minecraft/MinecraftItem";
import { Flag, Shield, User } from "lucide-react";

export const revalidate = 900;

export default async function Page({ params }: { params: { uuid: string } }) {
  const town = await getTown(params.uuid);

  return (
    <section className="space-y-4">
      <div className="flex gap-4 rounded-box bg-gradient-to-r from-base-200 to-blue-200 p-4 shadow">
        <figure className="drop-shadow">
          <Banner baseColour="white-dye" primaryPattern={{ name: "Creeper Charge", colour: "red-dye" }} secondaryPattern={null} />
        </figure>
        <div className="flex w-full flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2">
              <h1 className="text-xl font-black">{town.name}</h1>
              <div className="badge badge-lg">
                <MinecraftItem imageSrc="/minecraft/item/gold_ingot.png" className="mr-1 size-4" /> {town.bankAccount.toLocaleString()}
              </div>
            </div>
            <p>
              By{" "}
              <Link href={`/residents/${town.mayor.UUID}`} className="link-hover link-secondary">
                {town.mayor.name}
              </Link>
            </p>
            <i>
              Founded {formatDateTime(town.registered)} by <strong>{town.founder}</strong>
            </i>
          </div>

          <div className="flex flex-wrap gap-2">
            <div className="badge badge-lg bg-indigo-400 text-black">level {town.level}</div>
            <div className="badge badge-info badge-lg">{town.residents.length} residents</div>
            <div className={clsx("badge badge-lg", town.isOpen ? "badge-primary" : "badge-warning")}>
              {town.isOpen ? "open" : "invite-only"}
            </div>
            <div className={clsx("badge badge-lg", town.isPublic ? "badge-primary" : "badge-error")}>
              {town.isPublic ? "public-spawn" : "private-spawn"}
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
          {town.nation.name}
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
