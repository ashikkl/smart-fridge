"use client";
import { devtools, persist } from "zustand/middleware";
import { create } from "zustand";
import axios from "axios";
import { FoodItem, useFoodItemStore } from "./FoodItemsStore";
import axiosRetry from "axios-retry";

interface Recipe {
  id: string;
  title: string;
  image: string;
  missingIngredients: number;
}

export interface RecipeStoreState {
  recipes: Recipe[];
  needToUpdate: boolean;
  updateNeedToUpdate: () => void;
  addRecipe: (recipe: Recipe) => void;
  fetchAndUpdateRecipes: () => void;
}

const useRecipeStore: any = create<RecipeStoreState>()(
  devtools(
    persist(
      (set) => ({
        recipes: [],
        needToUpdate: true,
        updateNeedToUpdate: () => {
          set((state) => ({ needToUpdate: !state.needToUpdate }));
        },
        addRecipe: (recipe) =>
          set((state) => ({ recipes: [...state.recipes, recipe] })),
        fetchAndUpdateRecipes: async () => {
          let ingredients: string = useFoodItemStore
            .getState()
            .foodItems.map((item: FoodItem) => item.foodItemName)
            .join(", ");

          if (ingredients.length > 0) {
            let config = {
              timeout: 10000,
              method: "get",
              maxBodyLength: Infinity,
              url: `/api/fetch/recipes`,
              params: { ingredients: ingredients },
              headers: {},
            };

            const client = axios.create(config);
            axiosRetry(client, {
              retries: 3,
              retryDelay: axiosRetry.exponentialDelay,
            });
            const recipiesReq = await client
              .request(config)
              .then((response) => {
                const recipes = response.data;
                if (Array.isArray(recipes.recipes)) {
                  set({ recipes: recipes.recipes });
                } else {
                  console.error(
                    "API response does not contain an array of recipes:",
                    response.data
                  );
                }
                return recipes
              })
              .catch((err) => {
                console.error("Error fetching recipes from server:", err);
              });

          }
          set({ needToUpdate: false });
        },
      }),
      { name: "recipe-store" }
    )
  )
);

export default useRecipeStore;
