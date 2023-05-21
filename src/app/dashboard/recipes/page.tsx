import React from "react";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

async function Recipes() {
  const user = await getServerSession(authOptions);
  if (!user) return notFound();
  return <div>Recipes</div>;
}

export default Recipes;
