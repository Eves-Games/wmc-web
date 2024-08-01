import { getAuthenticatedUser } from "@/auth";
import { getResident, getNation, getNationTowns } from "@/bridge";
import { generateBanner } from "@/banners";
import { formatDateTime } from "@/format";
import clsx from "clsx";
import { Ellipsis, LogOut, Pencil } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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
      <div className="relative flex gap-4 rounded-box bg-base-200 p-4 shadow">
        <figure className="drop-shadow-lg">
          {generateBanner("white-dye", { name: "Creeper Charge", colour: "red-dye" }, null)}
        </figure>
        <div className="flex w-full flex-col justify-between">
          <div>
            <h1 className="text-xl font-black">{nation.name}</h1>
            <p>
              By{" "}
              <Link href={`/residents/${nation.king.UUID}`} className="link link-secondary">
                {nation.king.name}
              </Link>
            </p>
            <i>
              Founded {formatDateTime(nation.registered)}
            </i>
          </div>

          <div className="flex flex-col justify-between gap-2 md:flex-row md:items-end">
            <div className="flex gap-2">
              <div className="badge badge-lg bg-indigo-400 text-black">level {nation.level}</div>
              <div className="badge badge-info badge-lg">{nation.numTowns} towns</div>
              <div className={clsx("badge badge-lg", nation.isPublic ? "badge-primary" : "badge-warning")}>
                {nation.isPublic ? "public" : "invite-only"}
              </div>
            </div>
            <button className={clsx("btn btn-outline", hasNation && "hidden")}>Submit Town</button>
          </div>

          <div className={clsx("dropdown dropdown-end absolute right-4 top-4", !isResident && "hidden")}>
            <button className="btn btn-ghost btn-xs">
              <Ellipsis />
            </button>
            <ul tabIndex={0} className="menu dropdown-content menu-sm z-[1] w-fit rounded-box bg-base-300 shadow">
              <li className={clsx(!isKing && "hidden")}>
                <Link href={`/towns/${nation.UUID}/configure`} className="text-nowrap">
                  <Pencil />
                  Configure
                </Link>
              </li>
              <li className={clsx(isKing && "hidden")}>
                <button className="text-nowrap">
                  <LogOut />
                  Leave Nation
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <h2 className="text-xl font-black">Board</h2>
      <p>{nation.board}</p>
      <hr />
      <h2 className="text-xl font-black">Towns ({nation.numTowns})</h2>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-5 lg:grid-cols-7">
        {towns.data.map((town) => (
          <div className="flex flex-col items-center" key={town.UUID}>
            <Image
              src={`https://crafatar.com/avatars/${town.UUID}?size=96&default=MHF_Steve&overlay`}
              alt={`${town.name}'s Face`}
              width={96}
              height={96}
              className="size-24 p-2"
            />
            <Link href={`/towns/${town.UUID}`} className="btn btn-sm w-full shadow">
              <p className="truncate">{town.name}</p>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
