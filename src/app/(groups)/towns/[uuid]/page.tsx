import { getTown } from "@/bridge";
import { generateBanner } from "@/banners";
import { formatDateTime } from "@/format";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 900;

export default async function Page({ params }: { params: { uuid: string } }) {
  const town = await getTown(params.uuid);

  return (
    <section className="space-y-4">
      <div className="relative flex gap-4 rounded-box bg-gradient-to-r from-base-200 to-blue-200 p-4 shadow-lg">
        <figure className="drop-shadow-lg">{generateBanner("white-dye", { name: "Creeper Charge", colour: "red-dye" }, null)}</figure>
        <div className="flex w-full flex-col justify-between">
          <div>
            <h1 className="text-xl font-black">{town.name}</h1>
            <p>
              By{" "}
              <Link href={`/residents/${town.mayor.UUID}`} className="link link-secondary">
                {town.mayor.name}
              </Link>
            </p>
            <i>
              Founded {formatDateTime(town.registered)} by <strong>{town.founder}</strong>
            </i>
          </div>

          <div className="flex gap-2">
            <div className="badge badge-lg bg-indigo-400 text-black">level {town.level}</div>
            <div className="badge badge-info badge-lg">{town.residents.length} residents</div>
            <div className={clsx("badge badge-lg", town.isPublic ? "badge-primary" : "badge-warning")}>
              {town.isPublic ? "public" : "invite-only"}
            </div>
          </div>
        </div>
      </div>
      <h2 className="text-xl font-black">Settings</h2>
      <div className="grid auto-cols-max grid-flow-col gap-2">
        <div className={clsx("badge badge-lg", town.settings.pvp ? "badge-primary" : "badge-accent")}>pvp</div>
        <div className={clsx("badge badge-lg", town.settings.fire ? "badge-primary" : "badge-accent")}>fire spread</div>
        <div className={clsx("badge badge-lg", town.settings.mobs ? "badge-primary" : "badge-accent")}>hostile mobs</div>
        <div className={clsx("badge badge-lg", town.settings.explosions ? "badge-primary" : "badge-accent")}>explosions</div>
      </div>
      <hr />
      <h2 className="text-xl font-black">Board</h2>
      <p>{town.board}</p>
      <hr />
      <h2 className="text-xl font-black">Residents ({town.residents.length})</h2>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-5 lg:grid-cols-7">
        {town.residents.map((resident) => (
          <div className="flex flex-col items-center" key={resident.UUID}>
            <Image
              src={`https://crafatar.com/avatars/${resident.UUID}?size=96&default=MHF_Steve&overlay`}
              alt={`${resident.name}'s Face`}
              width={96}
              height={96}
              className="size-24 p-2"
            />
            <Link href={`/residents/${resident.UUID}`} className="btn btn-sm w-full shadow">
              <p className="truncate">{resident.name}</p>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
