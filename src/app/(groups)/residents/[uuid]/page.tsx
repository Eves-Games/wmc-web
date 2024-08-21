import { getResident } from "@/bridge";
import { formatDateTime } from "@/format";
import { Bot, Building2, Crown, Flag, Lock, Shield, Star, User, Wallet } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import MinecraftItem from "@/components/minecraft/MinecraftItem";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: { uuid: string } }) {
  const resident = await getResident(params.uuid);

  return {
    title: resident.name,
    description:
      resident.name +
      " is one of the thousands of residents on WorldMC. Join " +
      resident.name +
      " on WorldMC and explore Minecraft Earth together!",
  };
}

export default async function Page({ params }: { params: { uuid: string } }) {
  const resident = await getResident(params.uuid);

  return (
    <section className="space-y-4">
      <div className="flex gap-4 rounded-box bg-gradient-to-r from-base-200 to-green-200 p-4 shadow">
        <figure className="drop-shadow">
          <div
            className="banner bg-contain bg-no-repeat"
            style={{ backgroundImage: `url(https://crafatar.com/renders/body/${resident.UUID}?size=156&default=MHF_Steve&overlay)` }}
          />
        </figure>
        <div className="flex w-full flex-col justify-between">
          <div>
            <div className="flex justify-between gap-2">
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black">{resident.name}</h1>
                <span
                  className={`badge badge-sm ${resident.isOnline ? "bg-primary" : "bg-gray-400"}`}
                  title={resident.isOnline ? "Online" : "Offline"}
                ></span>
              </div>
              <div className="badge badge-lg">
                <MinecraftItem imageSrc="/minecraft/item/gold_ingot.png" className="mr-1 size-4" /> {resident.bankAccount.toLocaleString()}
              </div>
            </div>

            <p>
              <span>Resident of </span>
              {resident.town ? (
                <Link href={`/towns/${resident.town.UUID}`} className="link-hover link-secondary">
                  {resident.town.name}
                </Link>
              ) : (
                "the Wild"
              )}
            </p>
            <i>Joined {formatDateTime(resident.registered)}</i>
          </div>

          <div className="flex flex-wrap gap-2">
            {resident.isKing && (
              <div className="badge badge-lg bg-yellow-400 text-black">
                <Crown className="mr-1 size-4" /> King
              </div>
            )}
            {resident.isMayor && (
              <div className="badge badge-lg bg-green-400 text-black">
                <Shield className="mr-1 size-4" /> Mayor
              </div>
            )}
            {resident.isAdmin && (
              <div className="badge badge-lg bg-red-400 text-black">
                <Star className="mr-1 size-4" /> Admin
              </div>
            )}
            {resident.isNPC && (
              <div className="badge badge-lg bg-pink-400 text-black">
                <Bot className="mr-1 size-4" /> NPC
              </div>
            )}
            {resident.jailStatus.isJailed && (
              <div className="badge badge-lg bg-gray-400 text-black">
                <Lock className="mr-1 size-4" /> Jailed
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
      <h2 className="text-xl font-black">Residence</h2>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {!resident.town && "This player does not have any residence."}
        {resident.town && (
          <Link
            href={`/towns/${resident.town.UUID}`}
            className="btn btn-lg flex-1 justify-between bg-gradient-to-r from-base-200 to-blue-200"
          >
            {resident.town.name}
            <Building2 />
          </Link>
        )}
        {resident.nation && (
          <Link
            href={`/nations/${resident.nation.UUID}`}
            className="btn btn-lg flex-1 justify-between bg-gradient-to-r from-base-200 to-violet-200"
          >
            {resident.nation.name}
            <Flag />
          </Link>
        )}
      </div>
      <hr />
      <h2 className="text-xl font-black">Friends ({resident.friends.length})</h2>
      {resident.friends.length == 0 ? (
        <p>This resident has no friends.</p>
      ) : (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
          {resident.friends.map((resident) => (
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
