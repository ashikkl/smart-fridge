"use client";
import React, { useEffect } from "react";
import RecipeCard from "@/components/RecipeCard";
import useRecipeStore, { RecipeStoreState } from "@components/RecipeStore";

interface Recipe {
  id: string;
  title: string;
  image: string;
  missingIngredients: number;
}

function Recipes() {
  const {
    recipes,
    fetchAndUpdateRecipes,
    needToUpdate,
  }: {
    recipes: Recipe[]; // recipes is an array of Recipe objects
    fetchAndUpdateRecipes: () => void;
    needToUpdate: boolean;
  } = useRecipeStore();

  useEffect(() => {
    fetchAndUpdateRecipes();
  }, [fetchAndUpdateRecipes, needToUpdate]);


  if (!Array.isArray(recipes)) {
    return <div>Loading...</div>; // or display an appropriate message when the data is not an array
  }

  return (
    <div className="flex w-full flex-col items-center justify-start">
      {recipes.map((recipe: Recipe) => {
        return (
          <RecipeCard
            key={recipe.id}
            id={recipe.id}
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
