"use client";
import { devtools, persist } from "zustand/middleware";
import { create } from "zustand";

interface Recipe {
  id: string;
  title: string;
  image: string;
  missingIngredients: number;
}

interface RecipeStoreState {
  recipes: Recipe[];
  needToUpdate: boolean;
  addRecipe: (recipe: Recipe) => void;
  fetchAndUpdateRecipes: () => void;
}

const useRecipeStore = create<RecipeStoreState>()(
  devtools(
    persist(
      (set) => ({
        recipes: [],
        needToUpdate: true,
        addRecipe: (recipe) =>
          set((state) => ({ recipes: [...state.recipes, recipe] })),
        fetchAndUpdateRecipes: () => {
          // Simulating API call
          setTimeout(() => {
            const updatedRecipes: Recipe[] = [
              {
                id: "1",
                title: "Pasta Carbonara",
                image: "carbonara.jpg",
                missingIngredients: 3,
              },
              {
                id: "2",
                title: "Chicken Stir Fry",
                image: "stir-fry.jpg",
                missingIngredients: 1,
              },
            ];
            set({ needToUpdate: false });
            set({ recipes: updatedRecipes });
          }, 2000);
        },
      }),
      { name: "recipe-store" }
    )
  )
);

export default useRecipeStore;
