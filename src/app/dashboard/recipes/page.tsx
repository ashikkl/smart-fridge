import React from "react";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

//TODO add functionality

async function Recipes() {
  const user = await getServerSession(authOptions);
  if (!user) return notFound();
  return <div>Recipes</div>;
}

export default Recipes;
