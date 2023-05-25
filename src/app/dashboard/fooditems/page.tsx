import FoodItems from "@/components/FoodItems";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import React from "react";

//TODO add functionality

async function FoodItemsPage() {
  const user = await getServerSession(authOptions);
  if (!user) return notFound();
  return (
    <div className="flex flex-col items-center justify-start md:pb-10">
      <FoodItems />
    </div>
  );
}

export default FoodItemsPage;
