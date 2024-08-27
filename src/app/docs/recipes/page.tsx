import React from "react";
import MinecraftRecipe from "./components/MinecraftRecipe";
import recipes from "./recipes";

export default function Page() {
  return (
    <section className="space-y-4">
      <h1 className="text-5xl font-black">Custom Recipes</h1>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {recipes.map((recipe, index) => (
          <MinecraftRecipe key={index} title={recipe.title} ingredients={recipe.ingredients} result={recipe.result} />
        ))}
      </div>
    </section>
  );
}
