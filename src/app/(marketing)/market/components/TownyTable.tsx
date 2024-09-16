import Link from "next/link";
import Image from "next/image";
import { fetchShops } from "../actions";
import { PageControls } from "./PageControls";
import MinecraftItem from "@/components/minecraft/MinecraftItem";

const replaceUnderscoresWithSpaces = (input: string): string => input.replace(/_/g, " ");

export default async function TownyTable({ material, page }: { material: string; page: number; filter: string }) {
  const shops = await fetchShops(page, material);

  return (
    <>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {shops &&
          shops.data.map((shop) => (
            <Link key={shop.id} href={`/market/${shop.id}`} className="btn btn-lg btn-block flex justify-between">
              <div className="flex min-w-0 flex-1 items-center gap-4">
                <Image
                  src={`https://crafatar.com/avatars/${shop.owner.UUID}?size=32&default=MHF_Steve&overlay`}
                  alt={`${shop.owner.name}'s Minecraft Face`}
                  height={32}
                  width={32}
                  className="size-8 shrink-0"
                />
                <div className="min-w-0 flex-1 text-left">
                  <p className="truncate leading-5">{replaceUnderscoresWithSpaces(shop.owner.name)}&apos;s Shop</p>
                  {shop.town && (
                    <p className="truncate text-sm font-normal text-base-content/70">{replaceUnderscoresWithSpaces(shop.town.name)}</p>
                  )}
                </div>
              </div>
              <div className="flex shrink-0 items-center space-x-1 font-normal">
                <div className="badge badge-lg whitespace-nowrap">
                  <MinecraftItem imageSrc={`/minecraft/combined/${shop.item.toLowerCase()}.png`} className="mr-1 size-4" />
                  {shop.amount}
                </div>
                <div className="badge badge-lg whitespace-nowrap">
                  <MinecraftItem imageSrc="/minecraft/combined/gold_ingot.png" className="mr-1 size-4" />
                  {shop.price}
                </div>
              </div>
            </Link>
          ))}
      </div>
      <PageControls totalPages={shops?.totalPages || 0} />
    </>
  );
}
