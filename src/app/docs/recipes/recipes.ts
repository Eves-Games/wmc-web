import { MinecraftRecipeProps } from "./components/MinecraftRecipe";

const recipes: MinecraftRecipeProps[] = [
  {
    title: "End Stone",
    ingredients: [
      "/minecraft/block/sand.png",
      "/minecraft/block/sand.png",
      "/minecraft/block/sand.png",
      "/minecraft/block/sand.png",
      "/minecraft/block/cobblestone.png",
      "/minecraft/block/sand.png",
      "/minecraft/block/sand.png",
      "/minecraft/block/sand.png",
      "/minecraft/block/sand.png",
    ],
    result: "/minecraft/block/end_stone.png",
  },
  {
    title: "Prismarine Shard",
    ingredients: [
      null,
      null,
      null,
      "/minecraft/block/sand.png",
      "/minecraft/block/dirt.png",
      "/minecraft/item/lapis_lazuli.png",
      null,
      null,
      null,
    ],
    result: "/minecraft/item/prismarine_shard.png",
  },
  {
    title: "Prismarine Crystals",
    ingredients: [null, null, null, null, "/minecraft/item/prismarine_shard.png", "/minecraft/item/glowstone_dust.png", null, null, null],
    result: "/minecraft/item/prismarine_crystals.png",
  },
  {
    title: "Cobweb",
    ingredients: [
      "/minecraft/item/string.png",
      "/minecraft/item/string.png",
      "/minecraft/item/string.png",
      "/minecraft/item/string.png",
      "/minecraft/item/string.png",
      "/minecraft/item/string.png",
      "/minecraft/item/string.png",
      "/minecraft/item/string.png",
      "/minecraft/item/string.png",
    ],
    result: "/minecraft/block/cobweb.png",
  },
  {
    title: "Powered Rail",
    ingredients: [
      "/minecraft/item/iron_ingot.png",
      null,
      "/minecraft/item/iron_ingot.png",
      "/minecraft/item/iron_ingot.png",
      "/minecraft/item/stick.png",
      "/minecraft/item/iron_ingot.png",
      "/minecraft/item/iron_ingot.png",
      "/minecraft/item/redstone.png",
      "/minecraft/item/iron_ingot.png",
    ],
    result: "/minecraft/block/powered_rail.png",
  },
  {
    title: "Shulker Shell",
    ingredients: [
      "/minecraft/block/amethyst_block.png",
      "/minecraft/block/amethyst_block.png",
      "/minecraft/block/amethyst_block.png",
      "/minecraft/block/amethyst_block.png",
      "/minecraft/item/phantom_membrane.png",
      "/minecraft/block/amethyst_block.png",
      "/minecraft/item/amethyst_shard.png",
      "/minecraft/item/amethyst_shard.png",
      "/minecraft/item/amethyst_shard.png",
    ],
    result: "/minecraft/item/shulker_shell.png",
  },
];

export default recipes;
