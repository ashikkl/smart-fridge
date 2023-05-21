import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import React from "react";

async function FoodItems() {
  const user = await getServerSession(authOptions);
  if (!user) return notFound();
  return <div>FoodItems</div>;
}

export default FoodItems;
