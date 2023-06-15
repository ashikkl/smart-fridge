"use client";

import { useEffect, useState } from "react";
import { FoodItem, useFoodItemStore } from "./FoodItemsStore";
import { useFridgeStore } from "./FridgeSelector";
import axios from "axios";
import axiosRetry from "axios-retry";

function ClassifyImage() {
  const [imageURL, setImageURL] = useState<string>("");
  const { fridge, updateURL } = useFridgeStore();
  const fridgeId = fridge;
  useEffect(() => {
    const fetchImageURL = async () => {
      let config = {
        timeout: 30000,
        method: "get",
        maxBodyLength: Infinity,
        url: `/api/fetch/inside`,
        params: { fridgeId: fridgeId },
        headers: {},
      };

      const client = axios.create(config);
      axiosRetry(client, {
        retries: 3,
        retryDelay: axiosRetry.exponentialDelay,
      });
      const ImageReq = await client
        .request(config)
        .then((response) => {
          const url = response.data.url;
          setImageURL(url);
          updateURL(url);
        })
        .catch((err) => {
          console.error("Error fetching image url from server:", err);
        });
    };

    fetchImageURL();
  }, [fridgeId, updateURL]);
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

  const raw = JSON.stringify({
    user_app_id: {
      user_id: "clarifai",
      app_id: "main",
    },
    inputs: [
      {
        data: {
          image: {
            url: imageURL,
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
          let newFoodItems = out.map((foodItem: any) => {
            let checker = notInList(foodItem.name);

            if (checker && foodItem.value > 0.005) {
              return {
                foodItemName: foodItem.name,
                dateAdded: new Date(),
              };
            }
            if (!checker) {
              let oldDate = getDate(foodItem.name);

              return { foodItemName: foodItem.name, dateAdded: oldDate };
            }
            return null;
          });
          newFoodItems = newFoodItems.filter((item: any) => item !== null);

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
