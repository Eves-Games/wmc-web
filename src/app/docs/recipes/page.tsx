import { Equal } from "lucide-react";
import MinecraftItem from "@/components/minecraft/MinecraftItem";

export default function Page() {
  return (
    <section className="space-y-4">
      <h1 className="text-5xl font-black">Custom Recipes</h1>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <div>
          <h2 className="mb-2 text-2xl font-bold">End Stone</h2>
          <div className="flex w-fit items-center gap-2 rounded-box bg-base-300 p-2">
            <div className="grid w-fit grid-cols-3 grid-rows-3 gap-2 bg-base-100 p-2">
              <MinecraftItem imageSrc="/minecraft/block/sand.png" className="size-12 bg-base-200" />
              <MinecraftItem imageSrc="/minecraft/block/sand.png" className="size-12 bg-base-200" />
              <MinecraftItem imageSrc="/minecraft/block/sand.png" className="size-12 bg-base-200" />
              <MinecraftItem imageSrc="/minecraft/block/sand.png" className="size-12 bg-base-200" />
              <MinecraftItem imageSrc="/minecraft/block/cobblestone.png" className="size-12 bg-base-200" />
              <MinecraftItem imageSrc="/minecraft/block/sand.png" className="size-12 bg-base-200" />
              <MinecraftItem imageSrc="/minecraft/block/sand.png" className="size-12 bg-base-200" />
              <MinecraftItem imageSrc="/minecraft/block/sand.png" className="size-12 bg-base-200" />
              <MinecraftItem imageSrc="/minecraft/block/sand.png" className="size-12 bg-base-200" />
            </div>
            <Equal />
            <div className="bg-base-100 p-2">
              <MinecraftItem imageSrc="/minecraft/block/end_stone.png" className="size-12 bg-base-200" />
            </div>
          </div>
        </div>

        <div>
          <h2 className="mb-2 text-2xl font-bold">Prismarine Shard</h2>
          <div className="flex w-fit items-center gap-2 rounded-box bg-base-300 p-2">
            <div className="grid w-fit grid-cols-3 grid-rows-3 gap-2 bg-base-100 p-2">
              <div className="size-12 bg-base-200" />
              <div className="size-12 bg-base-200" />
              <div className="size-12 bg-base-200" />
              <MinecraftItem imageSrc="/minecraft/block/sand.png" className="size-12 bg-base-200" />
              <MinecraftItem imageSrc="/minecraft/block/dirt.png" className="size-12 bg-base-200" />
              <MinecraftItem imageSrc="/minecraft/item/lapis_lazuli.png" className="size-12 bg-base-200" />
              <div className="size-12 bg-base-200" />
              <div className="size-12 bg-base-200" />
              <div className="size-12 bg-base-200" />
            </div>
            <Equal />
            <div className="bg-base-100 p-2">
              <MinecraftItem imageSrc="/minecraft/item/prismarine_shard.png" className="size-12 bg-base-200" />
            </div>
          </div>
        </div>

        <div>
          <h2 className="mb-2 text-2xl font-bold">Prismarine Crystals</h2>
          <div className="flex w-fit items-center gap-2 rounded-box bg-base-300 p-2">
            <div className="grid w-fit grid-cols-3 grid-rows-3 gap-2 bg-base-100 p-2">
              <div className="size-12 bg-base-200" />
              <div className="size-12 bg-base-200" />
              <div className="size-12 bg-base-200" />
              <div className="size-12 bg-base-200" />
              <MinecraftItem imageSrc="/minecraft/item/prismarine_shard.png" className="size-12 bg-base-200" />
              <MinecraftItem imageSrc="/minecraft/item/glowstone_dust.png" className="size-12 bg-base-200" />
              <div className="size-12 bg-base-200" />
              <div className="size-12 bg-base-200" />
              <div className="size-12 bg-base-200" />
            </div>
            <Equal />
            <div className="bg-base-100 p-2">
              <MinecraftItem imageSrc="/minecraft/item/prismarine_crystals.png" className="size-12 bg-base-200" />
            </div>
          </div>
        </div>

        <div>
          <h2 className="mb-2 text-2xl font-bold">Cobweb</h2>
          <div className="flex w-fit items-center gap-2 rounded-box bg-base-300 p-2">
            <div className="grid w-fit grid-cols-3 grid-rows-3 gap-2 bg-base-100 p-2">
              <MinecraftItem imageSrc="/minecraft/item/string.png" className="size-12 bg-base-200" />
              <MinecraftItem imageSrc="/minecraft/item/string.png" className="size-12 bg-base-200" />
              <MinecraftItem imageSrc="/minecraft/item/string.png" className="size-12 bg-base-200" />
              <MinecraftItem imageSrc="/minecraft/item/string.png" className="size-12 bg-base-200" />
              <MinecraftItem imageSrc="/minecraft/item/string.png" className="size-12 bg-base-200" />
              <MinecraftItem imageSrc="/minecraft/item/string.png" className="size-12 bg-base-200" />
              <MinecraftItem imageSrc="/minecraft/item/string.png" className="size-12 bg-base-200" />
              <MinecraftItem imageSrc="/minecraft/item/string.png" className="size-12 bg-base-200" />
              <MinecraftItem imageSrc="/minecraft/item/string.png" className="size-12 bg-base-200" />
            </div>
            <Equal />
            <div className="bg-base-100 p-2">
              <MinecraftItem imageSrc="/minecraft/block/cobweb.png" className="size-12 bg-base-200" />
            </div>
          </div>
        </div>

        <div>
          <h2 className="mb-2 text-2xl font-bold">Powered Rail</h2>
          <div className="flex w-fit items-center gap-2 rounded-box bg-base-300 p-2">
            <div className="grid w-fit grid-cols-3 grid-rows-3 gap-2 bg-base-100 p-2">
              <MinecraftItem imageSrc="/minecraft/item/iron_ingot.png" className="size-12 bg-base-200" />
              <div className="size-12 bg-base-200" />
              <MinecraftItem imageSrc="/minecraft/item/iron_ingot.png" className="size-12 bg-base-200" />
              <MinecraftItem imageSrc="/minecraft/item/iron_ingot.png" className="size-12 bg-base-200" />
              <MinecraftItem imageSrc="/minecraft/item/stick.png" className="size-12 bg-base-200" />
              <MinecraftItem imageSrc="/minecraft/item/iron_ingot.png" className="size-12 bg-base-200" />
              <MinecraftItem imageSrc="/minecraft/item/iron_ingot.png" className="size-12 bg-base-200" />
              <MinecraftItem imageSrc="/minecraft/item/redstone.png" className="size-12 bg-base-200" />
              <MinecraftItem imageSrc="/minecraft/item/iron_ingot.png" className="size-12 bg-base-200" />
            </div>
            <Equal />
            <div className="bg-base-100 p-2">
              <MinecraftItem imageSrc="/minecraft/block/powered_rail.png" className="size-12 bg-base-200" />
            </div>
          </div>
        </div>

        <div>
          <h2 className="mb-2 text-2xl font-bold">Shulker Shell</h2>
          <div className="flex w-fit items-center gap-2 rounded-box bg-base-300 p-2">
            <div className="grid w-fit grid-cols-3 grid-rows-3 gap-2 bg-base-100 p-2">
              <MinecraftItem imageSrc="/minecraft/block/amethyst_block.png" className="size-12 bg-base-200" />
              <MinecraftItem imageSrc="/minecraft/block/amethyst_block.png" className="size-12 bg-base-200" />
              <MinecraftItem imageSrc="/minecraft/block/amethyst_block.png" className="size-12 bg-base-200" />
              <MinecraftItem imageSrc="/minecraft/block/amethyst_block.png" className="size-12 bg-base-200" />
              <MinecraftItem imageSrc="/minecraft/item/phantom_membrane.png" className="size-12 bg-base-200" />
              <MinecraftItem imageSrc="/minecraft/block/amethyst_block.png" className="size-12 bg-base-200" />
              <MinecraftItem imageSrc="/minecraft/item/amethyst_shard.png" className="size-12 bg-base-200" />
              <MinecraftItem imageSrc="/minecraft/item/amethyst_shard.png" className="size-12 bg-base-200" />
              <MinecraftItem imageSrc="/minecraft/item/amethyst_shard.png" className="size-12 bg-base-200" />
            </div>
            <Equal />
            <div className="bg-base-100 p-2">
              <MinecraftItem imageSrc="/minecraft/item/shulker_shell.png" className="size-12 bg-base-200" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
