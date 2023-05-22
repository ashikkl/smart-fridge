import FoodItemCard from "@/components/FoodItemCard";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import React from "react";

async function FoodItems() {
  const user = await getServerSession(authOptions);
  if (!user) return notFound();
  return <div><FoodItemCard title={"Carrot"} description={ new Date().toJSON().slice(0, 10)} content={""} footer={""} header={""} /></div>;
}

export default FoodItems;
