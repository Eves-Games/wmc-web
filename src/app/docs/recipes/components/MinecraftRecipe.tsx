import React from "react";
import { Equal } from "lucide-react";
import MinecraftItem from "@/components/minecraft/MinecraftItem";

export interface MinecraftRecipeProps {
  title: string;
  ingredients: (string | null)[];
  result: string;
}

const MinecraftRecipe: React.FC<MinecraftRecipeProps> = ({ title, ingredients, result }) => {
  return (
    <div>
      <h2 className="mb-2 text-2xl font-bold">{title}</h2>
      <div className="flex w-fit items-center gap-2 rounded-box bg-base-300 p-2">
        <div className="grid w-fit grid-cols-3 grid-rows-3 gap-2 bg-base-100 p-2">
          {[...Array(9)].map((_, index) => (
            <div key={index} className="size-12 bg-base-200">
              {ingredients[index] && <MinecraftItem imageSrc={ingredients[index]!} className="size-12 bg-base-200" />}
            </div>
          ))}
        </div>
        <Equal />
        <div className="bg-base-100 p-2">
          <MinecraftItem imageSrc={result} className="size-12 bg-base-200" />
        </div>
      </div>
    </div>
  );
};

export default MinecraftRecipe;
