import ClassifyImage from "@/components/ClassifyImage";
import FoodItems from "@/components/FoodItems";
import NoSSR from "@/components/NoSSR";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import React from "react";

async function FoodItemsPage() {
  const user = await getServerSession(authOptions);
  if (!user) return notFound();

  return (
    <div className="flex flex-col items-center justify-start md:pb-10">
      <NoSSR>
        <ClassifyImage />
        <FoodItems />
      </NoSSR>
    </div>
  );
}

export default FoodItemsPage;
