"use client";

import FoodItemCard from "./FoodItemCard";
import { FoodItem, useFoodItemStore } from "./FoodItemsStore";

function FoodItems(): JSX.Element {
  const { foodItems }: { foodItems: FoodItem[] } = useFoodItemStore();
  if (foodItems && foodItems.length > 0) {
    return (
      <div className="flex flex-col items-center w-full justify-start ">
        {foodItems.map((foodItem): JSX.Element => {
          return (
            <FoodItemCard
              key={foodItem.foodItemName}
              title={foodItem.foodItemName}
              dateCreated={foodItem.dateAdded}
            />
          );
        })}
      </div>
    );
  }
  return <div>No food items detected</div>;
}

export default FoodItems;
