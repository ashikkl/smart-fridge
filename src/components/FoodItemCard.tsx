"use client";
import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@components/ui/Card";
import { cn } from "@/lib/utils";

type CardProps = React.ComponentProps<typeof Card>;
type FICardProps = CardProps & {
  title: string | "";
  content: string | "";
  description: string | "";
  footer: string | "";
  header: string | "";
};

function FoodItemCard({
  title,
  content,
  description,
  footer,
  header,
  className,
  ...props
}: FICardProps) {
    const daysPassed:number= 0;
  const valueStart: number = 0;
  const valueEnd: number = 66;
  const [value, setValue] = React.useState(valueStart);
  React.useEffect(() => {
    setValue(valueEnd);
  }, [valueEnd]);
  return (
    <div className="relative flex w-full flex-row items-center pt-4">
      <Card
        className={cn("w-full bg-slate-200/75 dark:bg-slate-800/75", className)}
        {...props}
      >
        <div className="flex flex-row items-center justify-between pr-6">
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription className="text-slate-900/50 dark:text-slate-100/50">
              {description}
            </CardDescription>
          </CardHeader>
          <div className="flex items-center gap-4">
            <span className="block whitespace-nowrap text-sm text-slate-900/75 dark:text-slate-100/75">
              {`Days elapsed: ${daysPassed}`}
            </span> <div className="w-10 h-10">
            <CircularProgressbar
              value={value}
              styles={buildStyles({
                // Rotation of path and trail, in number of turns (0-1)
                rotation: 0,

                // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                strokeLinecap: "butt",

                // Text size
                textSize: "16px",

                // How long animation takes to go from one percentage to another, in seconds
                pathTransitionDuration: 0.5,

                // Can specify path transition in more detail, or remove it entirely
                // pathTransition: 'none',

                // Colors
                pathColor: `rgba(62, 152, 199, ${value / 100})`,
                textColor: "#f88",
                trailColor: "#143BFF",
                backgroundColor: "#3CFF14",
              })}
              strokeWidth={20}
            /></div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default FoodItemCard;
