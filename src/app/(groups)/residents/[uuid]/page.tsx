import { getResident } from "@/bridge";
import { formatDateTime } from "@/format";
import { Bot, Building2, Crown, Flag, Lock, Shield, Star, Wallet } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import MinecraftItem from "@/components/minecraft/MinecraftItem";

export default async function Page({ params }: { params: { uuid: string } }) {
  let resident = await getResident(params.uuid);

  return (
    <section className="space-y-4">
      <div className="relative flex gap-4 rounded-box bg-gradient-to-r from-base-200 to-green-200 p-4 shadow">
        <figure className="drop-shadow">
          <div
            className="banner bg-contain bg-no-repeat"
            style={{ backgroundImage: `url(https://crafatar.com/renders/body/${resident.UUID}?size=156&default=MHF_Steve&overlay)` }}
          />
        </figure>
        <div className="flex w-full flex-col justify-between">
          <div>
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black">{resident.name}</h1>
                <span
                  className={`badge badge-sm ${resident.isOnline ? "bg-primary" : "bg-gray-400"}`}
                  title={resident.isOnline ? "Online" : "Offline"}
                ></span>
              </div>
              <div className="badge badge-lg">
                <MinecraftItem imageSrc="/minecraft/item/gold_ingot.png" className="mr-1" /> {resident.bankAccount.toLocaleString()}
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
      <div className="flex gap-4">
        {!(resident.town && resident.nation) && "This player does not have any residence."}
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
