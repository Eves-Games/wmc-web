import { getAuthenticatedUser } from "@/auth";
import { getResident, getResidentFriends } from "@/bridge";
import { formatDateTime } from "@/format";
import clsx from "clsx";
import { Clock, Crown, Ellipsis, Shield, Star, UserRoundMinus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Page({ params }: { params: { uuid: string } }) {
  const user = getAuthenticatedUser();
  
  const resident = await getResident(params.uuid);
  const friends = await getResidentFriends(params.uuid);

  const isMe = user && user.uuid == resident.UUID;

  return (
    <section className="space-y-4">
      <div className="relative flex gap-4 rounded-box bg-gradient-to-r from-base-200 to-blue-200 p-4 shadow-lg">
        <figure className="drop-shadow-lg">
          <div className="banner bg-contain bg-no-repeat" style={{backgroundImage: `url(https://crafatar.com/renders/body/${resident.UUID}?size=156&default=MHF_Steve&overlay)`}} />
        </figure>
        <div className="flex w-full flex-col justify-between">
          <div>
            <h1 className="text-xl font-black">{resident.name}</h1>
            <p>
              <span>Resident of </span>
              {resident.town ? (
                <Link
                  href={`/towns/${resident.town.UUID}`}
                  className="link link-secondary"
                >
                  {resident.town.name}
                </Link>
              ) : (
                "the Wild"
              )}
            </p>
            <i>Joined {formatDateTime(resident.registered)}</i>
          </div>

          <div className="flex flex-col justify-between gap-2 md:flex-row md:items-end">
            <div className="flex gap-2">
            {resident.isKing && <div className="badge badge-lg bg-yellow-400 text-black"><Crown className="w-4 h-4 mr-1" /> King</div>}
            {resident.isMayor && <div className="badge badge-lg bg-green-400 text-black"><Shield className="w-4 h-4 mr-1" /> Mayor</div>}
            {resident.isAdmin && <div className="badge badge-lg bg-red-400 text-black"><Star className="w-4 h-4 mr-1" /> Admin</div>}
              <div className="badge badge-lg bg-indigo-400 text-black">{resident.plotsCount} plots</div>
              <div className="badge badge-info badge-lg">{friends.data.length} friends</div>
            </div>
            <button className={clsx("btn btn-outline", isMe && "hidden")}>Add Friend</button>
          </div>

          <div className={clsx("dropdown dropdown-end absolute right-4 top-4")}>
            <button className="btn btn-ghost btn-xs">
              <Ellipsis />
            </button>
            <ul tabIndex={0} className="menu dropdown-content menu-sm z-[1] w-fit rounded-box bg-base-300 shadow">
              <li>
                <button className="text-nowrap">
                  <UserRoundMinus />
                  Remove Friend
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <h2 className="text-xl font-black">About</h2>
      <p>{resident.about}</p>
      <hr />
      <h2 className="text-xl font-black">Friends ({friends.data.length})</h2>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-5 lg:grid-cols-7">
        {friends.data.map((resident) => (
          <div className="flex flex-col items-center" key={resident.UUID}>
            <Image
              src={`https://crafatar.com/avatars/${resident.UUID}?size=100&default=MHF_Steve&overlay`}
              alt={`${resident.name}'s Face`}
              width={100}
              height={100}
              className="col-span-full p-2"
            />
            <Link
              href={`/residents/${resident.UUID}`}
              className="btn btn-sm w-full shadow"
            >
              <p className="truncate">{resident.name}</p>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
