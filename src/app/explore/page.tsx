import React from "react";
import { SearchBar } from "@/app/explore/components/SearchBar";
import Link from "next/link";
import { fetchTownyObjects } from "@/app/explore/actions";
import { Building2, Flag, User } from "lucide-react";
import { PageControls } from "@/app/explore/components/PageControls";
import { twMerge } from "tailwind-merge";
import Image from "next/image";

export const revalidate = 900;

type TownyObjectType = "nations" | "towns" | "residents";

const IconMap = {
  nations: Flag,
  towns: Building2,
  residents: User,
};

const ColourMap = {
  nations: "to-violet-200",
  towns: "to-blue-200",
  residents: "to-green-200",
};

export default async function Page({ searchParams }: { searchParams: { query?: string; page?: string; filter?: string } }) {
  const page = Number(searchParams?.page || "");
  const query = searchParams?.query || "";
  const filter = searchParams?.filter || "";

  const townyObjectType: TownyObjectType = (filter.toLowerCase() as TownyObjectType) || "nations";
  const Icon = IconMap[townyObjectType];
  const colourGradient = ColourMap[townyObjectType];

  const townyObjects = await fetchTownyObjects(page, query, townyObjectType);

  return (
    <section className="space-y-4 text-center">
      <h1 className="text-5xl font-black">Explore</h1>
      <SearchBar placeholder="Search Earth..." />
      <div className="space-y-2">
        {townyObjects &&
          townyObjects.data.map((item) => (
            <Link
              href={`/${townyObjectType}/${item.UUID}`}
              className={twMerge("btn btn-lg btn-block justify-between bg-gradient-to-r from-base-200", colourGradient)}
              key={item.UUID}
            >
              <div className="flex items-center gap-4">
                {townyObjectType === "residents" && (
                  <Image
                    src={`https://crafatar.com/avatars/${item.UUID}?size=32&default=MHF_Steve&overlay`}
                    alt={`${item.name}'s Minecraft Face`}
                    height={32}
                    width={32}
                    className="size-8"
                  />
                )}
                {item.name}
              </div>
              <Icon />
            </Link>
          ))}
      </div>
      <PageControls totalPages={townyObjects?.totalPages || 0} />
    </section>
  );
}
