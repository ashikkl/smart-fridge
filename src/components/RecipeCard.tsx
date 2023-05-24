"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@components/ui/Card";
import { cn } from "@/lib/utils";
import { Button } from "./ui/Button";
import axiosRetry from "axios-retry";
import axios from "axios";

type CardProps = React.ComponentProps<typeof Card>;
type RICardProps = CardProps & {
  id: string;
  title: string;
  missingIngredients: number;
  recipeImageUrl: string;
};

export async function getRecipeURL(id: string): Promise<string> {
  let config = {
    timeout: 10000,
    method: "get",
    maxBodyLength: Infinity,
    url: `/api/fetch/recipes/url`,
    params: { id: id },
    headers: {},
  };

  const client = axios.create(config);
  axiosRetry(client, {
    retries: 1,
    retryDelay: axiosRetry.exponentialDelay,
  });
  const recipiesURLReq = await client
    .request(config)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.error("Error fetching url from server:", err);
    });
  return recipiesURLReq.spoonacularSourceUrl;
}

function RecipeCard({
  id,
  title,
  missingIngredients,
  recipeImageUrl,
  className,
  ...props
}: RICardProps): React.JSX.Element {
  return (
    <div className="relative flex w-full flex-row items-center pt-4">
      <Card
        className={cn("w-full bg-slate-200/75 dark:bg-slate-800/75", className)}
        {...props}
      >
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center pl-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Recipe Image"
              src={recipeImageUrl}
              className="h-12 w-12 rounded-full object-cover opacity-90 "
            />
            <CardHeader>
              <CardTitle className="overflow-ellipsis">{title}</CardTitle>
              <CardDescription className="overflow-ellipsis text-slate-900/50 dark:text-slate-100/50">
                {"Missing ingredients : " + missingIngredients}
              </CardDescription>
            </CardHeader>
          </div>
          <div className="flex items-center gap-4 pr-4">
            <Button
              variant={"ghost"}
              value={id}
              onClick={async (e) => {
                let url: string = await getRecipeURL(e.currentTarget.value);
                window.location.assign(url);
              }}
            >
              View
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default RecipeCard;
