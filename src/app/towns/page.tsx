import { getAuthenticatedUser } from "@/auth";
import { getResident, getTowns } from "@/bridge";
import { Building2, Plus, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 900;

export default async function Page() {
  const towns = await getTowns();
  const user = getAuthenticatedUser();
  const resident = user ? await getResident(user.uuid) : null;

  return (
    <section className="space-y-4 text-center">
      <h1 className="text-5xl font-black">Towns</h1>
      <div className="flex gap-2">
        <label className="input input-bordered flex w-full items-center gap-2">
          <input type="text" className="grow" placeholder="Search" />
          <Search className="size-4 opacity-70" />
        </label>
        {resident &&
          (resident.town ? (
            <Link
              href={`/towns/${resident.town.UUID}`}
              className="btn btn-outline"
            >
              <Building2 /> My Town
            </Link>
          ) : (
            <Link href="/towns/create" className="btn btn-primary">
              <Plus /> Create Town
            </Link>
          ))}
      </div>
      <div className="space-y-2">
        {towns.map((town) => (
          <Link
            href={`/towns/${town.UUID}`}
            className="btn btn-lg btn-block justify-between"
            key={town.UUID}
          >
            {town.name}
            <div>
              <Image
                src={`https://crafatar.com/avatars/${town.mayor.UUID}?size=64&default=MHF_Steve&overlay`}
                alt={`${town.mayor.name}'s Face`}
                width={64}
                height={64}
                className="mr-2 inline-block p-2"
              />
              {town.mayor.name}
            </div>
          </Link>
        ))}
      </div>
      <div className="join mx-auto grid w-fit grid-cols-2">
        <button className="btn btn-outline join-item">Previous page</button>
        <button className="btn btn-outline join-item">Next</button>
      </div>
    </section>
  );
}
