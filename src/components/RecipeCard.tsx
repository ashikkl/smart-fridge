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

type CardProps = React.ComponentProps<typeof Card>;
type RICardProps = CardProps & {
  title: string;
  content: string | "";
  description: string;
  recipeImageUrl: string;
};

function FoodItemCard({
  title,
  content,
  description,
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
              <CardTitle className="whitespace-nowrap">{title}</CardTitle>
              <CardDescription className="text-slate-900/50 dark:text-slate-100/50">
                {"Missed ingredients count : " + description}
              </CardDescription>
            </CardHeader>
          </div>
          <div className="flex items-center gap-4 pr-4">
            <Button variant={"ghost"}>View</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default FoodItemCard;
