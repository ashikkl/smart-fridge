"use client";

import { useEffect } from "react";
import { useFoodItemStore } from "./FoodItemsStore";
import { useFridgeStore } from "./FridgeSelector";
import axios from "axios";
import axiosRetry from "axios-retry";

function ClassifyImage() {
  const { fridge, updateURL } = useFridgeStore();
  const fridgeId = fridge;
  const { foodItems, updateFoodItems } = useFoodItemStore();

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

  useEffect(() => {
    const fetchImageURL = async () => {
      try {
        const config = {
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

        const response = await client.request(config);
        const url = response.data.url;
        updateURL(url);

        const raw = JSON.stringify({
          user_app_id: {
            user_id: "clarifai",
            app_id: "main",
          },
          inputs: [
            {
              data: {
                image: {
                  url: url,
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

        const fetchFoodItems = async () => {
          try {
            const response = await fetch(
              `https://api.clarifai.com/v2/models/food-item-recognition/versions/1d5fd481e0cf4826aa72ec3ff049e044/outputs`,
              requestOptions
            );
            const result = await response.json();

            const out = result.outputs[0].data.concepts;
            console.log(out);
            
            let newFoodItems = out.map((foodItem: any) => {
              let checker = notInList(foodItem.name);

              if (checker && foodItem.value > 0.5) {
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

            updateFoodItems(newFoodItems);
          } catch (error) {
            console.log("error", error);
          }
        };

        if (url.length) {
          await fetchFoodItems();
        }
      } catch (err) {
        console.error("Error fetching food item data from server:", err);
      }
    };

    fetchImageURL();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fridgeId]);

  return <div />;
}

export default ClassifyImage;
