import { Building2, Flag, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { fetchTownyObjects } from "../actions";
import { PageControls } from "./PageControls";

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

const replaceUnderscoresWithSpaces = (input: string): string => input.replace(/_/g, " ");

export default async function TownyTable({ query, page, filter }: { query: string; page: number; filter: string }) {
  const townyObjectType: TownyObjectType = (filter.toLowerCase() as TownyObjectType) || "nations";
  const Icon = IconMap[townyObjectType];
  const colourGradient = ColourMap[townyObjectType];

  const townyObjects = await fetchTownyObjects(page, query, townyObjectType);

  return (
    <>
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
                {replaceUnderscoresWithSpaces(item.name)}
              </div>
              <Icon />
            </Link>
          ))}
      </div>
      <PageControls totalPages={townyObjects?.totalPages || 0} />
    </>
  );
}
