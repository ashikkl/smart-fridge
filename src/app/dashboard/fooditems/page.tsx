import FoodItemCard from "@/components/FoodItemCard";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import React from "react";

//TODO add functionality

async function FoodItems() {
  const user = await getServerSession(authOptions);
  if (!user) return notFound();
  return <div><FoodItemCard title={"Carrot"} dateCreated={"2023,5,20"} /></div>;
}

export default FoodItems;
