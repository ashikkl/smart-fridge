"use client";

import FoodItemCard from "./FoodItemCard";
import { FoodItem, useFoodItemStore } from "./FoodItemsStore";

function FoodItems() : JSX.Element | JSX.Element[] {
    const { foodItems }: { foodItems: FoodItem[]; } = useFoodItemStore();
    if (foodItems && foodItems.length > 0) {
        return foodItems.map((foodItem) => {
            return <FoodItemCard key={foodItem.foodItemName} title={foodItem.foodItemName} dateCreated={foodItem.dateAdded} />;
        });
    }
    return <div>No food items detected</div>;
}

export default FoodItems;
