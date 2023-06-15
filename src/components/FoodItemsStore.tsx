"use client";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface FoodItem {
  foodItemName: string;
  expiryDate?: Date;
  dateAdded: string;
}

interface FoodItemStoreState {
  foodItems: FoodItem[];
  addFoodItem: (foodItem: FoodItem) => void;
  clearFoodItems: () => void;
  updateFoodItems: (foodItems: FoodItem[]) => void;
}

export const useFoodItemStore = create<FoodItemStoreState>()(
  devtools(
    persist(
      (set) => ({
        foodItems: [],
        addFoodItem: (foodItem) =>
          set((state) => ({ foodItems: [...state.foodItems, foodItem] })),
        clearFoodItems: () => set({ foodItems: [] }),
        updateFoodItems: (foodItems) => set({ foodItems: foodItems }),
      }),
      { name: "food-item-store" }
    )
  )
);
