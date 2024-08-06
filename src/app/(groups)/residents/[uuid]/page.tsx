import { getResident } from "@/bridge";
import { formatDateTime } from "@/format";
import { Crown, Shield, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Page({ params }: { params: { uuid: string } }) {
  const resident = await getResident(params.uuid);

  return (
    <section className="space-y-4">
      <div className="relative flex gap-4 rounded-box bg-gradient-to-r from-base-200 to-green-200 p-4 shadow-lg">
        <figure className="drop-shadow-lg">
          <div
            className="banner bg-contain bg-no-repeat"
            style={{ backgroundImage: `url(https://crafatar.com/renders/body/${resident.UUID}?size=156&default=MHF_Steve&overlay)` }}
          />
        </figure>
        <div className="flex w-full flex-col justify-between">
          <div>
            <h1 className="text-xl font-black">{resident.name}</h1>
            <p>
              <span>Resident of </span>
              {resident.town ? (
                <Link href={`/towns/${resident.town.UUID}`} className="link link-secondary">
                  {resident.town.name}
                </Link>
              ) : (
                "the Wild"
              )}
            </p>
            <i>Joined {formatDateTime(resident.registered)}</i>
          </div>

          <div className="flex gap-2">
            {resident.isKing && (
              <div className="badge badge-lg bg-yellow-400 text-black">
                <Crown className="mr-1 h-4 w-4" /> King
              </div>
            )}
            {resident.isMayor && (
              <div className="badge badge-lg bg-green-400 text-black">
                <Shield className="mr-1 h-4 w-4" /> Mayor
              </div>
            )}
            {resident.isAdmin && (
              <div className="badge badge-lg bg-red-400 text-black">
                <Star className="mr-1 h-4 w-4" /> Admin
              </div>
            )}
            <div className="badge badge-lg bg-indigo-400 text-black">{resident.plotsCount} plots</div>
            <div className="badge badge-info badge-lg">{resident.friends.length} friends</div>
          </div>
        </div>
      </div>
      <h2 className="text-xl font-black">About</h2>
      <p>{resident.about}</p>
      <hr />
      <h2 className="text-xl font-black">Friends ({resident.friends.length})</h2>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-5 lg:grid-cols-7">
        {resident.friends.map((resident) => (
          <div className="flex flex-col items-center" key={resident.UUID}>
            <Image
              src={`https://crafatar.com/avatars/${resident.UUID}?size=100&default=MHF_Steve&overlay`}
              alt={`${resident.name}'s Face`}
              width={100}
              height={100}
              className="col-span-full p-2"
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
