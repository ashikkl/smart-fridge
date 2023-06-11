"use client";

import axios from "axios";
import axiosRetry from "axios-retry";
import { FunctionComponent, useEffect, useState } from "react";
import { useFridgeStore } from "./FridgeSelector";

const InsideImage: FunctionComponent = () => {
  const [imageURL, setImageURL] = useState<string>("");
  const { fridge } = useFridgeStore();
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
        })
        .catch((err) => {
          console.error("Error fetching image url from server:", err);
        });
    };

    fetchImageURL();
  }, [fridgeId]);

  return imageURL.length ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={imageURL} alt="Inside of fridge" className="w-screen" />
  ) : (
    <h1 className="flex h-[70vh] items-center justify-center text-lg font-medium tracking-tight text-slate-900/75 dark:text-white/75">
      404: Image Not Found
    </h1>
  );
};

export default InsideImage;
