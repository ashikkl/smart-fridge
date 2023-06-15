"use client";

import { useEffect, useState } from "react";
import { FoodItem, useFoodItemStore } from "./FoodItemsStore";
import { useFridgeStore } from "./FridgeSelector";

function ClassifyImage() {
  const { imageURL } = useFridgeStore();
  const { foodItems, updateFoodItems } = useFoodItemStore();
  const [newFoodItems, setFoodItems] = useState<FoodItem[]>([]);

  function notInList(item: string) {
    if (foodItems.length === 0) return true;

    return !foodItems.some((foodItem) => foodItem.foodItemName === item);
  }

  function getDate(foodName: string) {
    let result;
    foodItems.map((foodItem) => {
      if (foodItem.foodItemName === foodName) {
        result = foodItem.dateAdded;
      }
    });
    return result;
  }

  const IMAGE_URL =
    "https://media.istockphoto.com/id/175448913/photo/refrigerator.jpg?s=1024x1024&w=is&k=20&c=QuR48VAZTuxXkg18PU0t0sBV7CeN3fC4JRBj6YVz4Hc=";

  const raw = JSON.stringify({
    user_app_id: {
      user_id: "clarifai",
      app_id: "main",
    },
    inputs: [
      {
        data: {
          image: {
            url: IMAGE_URL,
          },
        },
      },
    ],
  });

  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: "Key " + "eb298c4d60804755903fa44945fda330",
    },
    body: raw,
  };

  useEffect(() => {
    async function fetchFoodItems() {
      await fetch(
        `https://api.clarifai.com/v2/models/food-item-recognition/versions/1d5fd481e0cf4826aa72ec3ff049e044/outputs`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          const out = result.outputs[0].data.concepts;
          const newFoodItems = out.map((foodItem: any) => {
            let checker = notInList(foodItem.name);
            if (checker) {
              return {
                foodItemName: foodItem.name,
                dateAdded: new Date(),
              };
            } else {
              let oldDate = getDate(foodItem.name);

              return { foodItemName: foodItem.name, dateAdded: oldDate };
            }
          });

          setFoodItems(newFoodItems);
          updateFoodItems(newFoodItems);
        })
        .catch((error) => console.log("error", error));
    }

    fetchFoodItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div />;
}

export default ClassifyImage;
