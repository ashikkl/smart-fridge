"use client";
import React from "react";
import RecipeCard from "@/components/RecipeCard";

import useRecipeStore from "@components/RecipeStore";

function Recipes() {
  const { recipes, fetchAndUpdateRecipes, needToUpdate } = useRecipeStore();
  needToUpdate ?? fetchAndUpdateRecipes();
  interface Recipe {
    id: string;
    title: string;
    image: string;
    missingIngredients: number;
  }
  return (
    <div className="flex w-full flex-col items-center justify-start">
      {recipes.map((recipe: Recipe) => {
        return (
          <RecipeCard
            key={recipe.id}
            title={recipe.title}
            missingIngredients={recipe.missingIngredients}
            recipeImageUrl={recipe.image}
          />
        );
      })}
    </div>
  );
}

export default Recipes;
