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
  fetchAndUpdateFoodItems: () => void;
}

export const useFoodItemStore = create<FoodItemStoreState>()(
  devtools(
    persist(
      (set) => ({
        foodItems: [
          {
            foodItemName: "carrot",
            dateAdded: "2023-5-22",
          },
          {
            foodItemName: "eggs",
            dateAdded: "2023-5-23",
          },
          {
            foodItemName: "milk",
            dateAdded: "2023-5-26",
          },
        ],
        addFoodItem: (foodItem) =>
          set((state) => ({ foodItems: [...state.foodItems, foodItem] })),
        clearFoodItems: () => set({ foodItems: [] }),
        fetchAndUpdateFoodItems: async () => {
          try {
            const response = await fetch("YOUR_API_ENDPOINT");
            const data = await response.json();

            if (Array.isArray(data)) {
              const foodItems: FoodItem[] = data.map((item) => ({
                foodItemName: item.foodItemName,
                expiryDate: item.expiryDate
                  ? new Date(item.expiryDate)
                  : undefined,
                dateAdded: item.dateAdded,
              }));

              set({ foodItems });
            }
          } catch (error) {
            console.error("Error fetching and updating food items:", error);
          }
        },
      }),
      { name: "food-item-store" }
    )
  )
);
